import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { format } from "date-fns";
import { useGetAllOrders, useUpdateStatus } from "../../hooks/useOrder";
import { IStaffAllOrders } from "../../API/order/order.interface";

import dateAndTime from "../../helpers/dateAndTime";

import Modal from "../Modal/Modal";

import './staff-orders-list.scss';
import OrderInfoModal from "../OrderInfoModal/OrderInfoModal";

const statusList = ["Pending", "Delivered", "Processing", "Cancelled"] as const;

interface IDataRow {
	id: number;
	customer: string;
	status: string;
	phone: string;
	email: string;
	date: string;
	more_info: string;
}

const getStatusColor = (status: string): string => {
	switch (status) {
		case "Pending":
			return "grey";
		case "Delivered":
			return "green";
		case "Processing":
			return "orange";
		case "Cancelled":
			return "red";
		default:
			return "black";
	}
};

const StaffOrdersList: React.FC = () => {
	const { data: allOrders = [] } = useGetAllOrders({ page: 1, limit: 100 });
	const [filterText, setFilterText] = useState<string>("");
	const [selectedOrder, setSelectedOrder] = useState<IStaffAllOrders | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
	const [newStatus, setNewStatus] = useState<string>("Pending");
	const [currentOrder, setCurrentOrder] = useState<IStaffAllOrders | null>(null);


	const { mutate, isPending } = useUpdateStatus();

	// Фильтрация заказов
	const filteredOrders = allOrders
		.filter((order) =>
			[order.id, order.user.name, order.status, order.user.phone, order.user.email, format(new Date(order.order_date), "dd.MM.yyyy HH:mm")]
				.join(" ")
				.toLowerCase()
				.includes(filterText.toLowerCase())
		)
		.map((order) => ({
			id: order.id,
			customer: order.user.name,
			status: order.status,
			phone: order.user.phone,
			email: order.user.email,
			date: dateAndTime(order.order_date),
			more_info: order.additional_information,
		}));

	const handleStatusClick = (row: IDataRow) => {
		const fullOrder = allOrders.find((order) => order.id === row.id);

		if (fullOrder) {
			setSelectedOrder(fullOrder);
			setNewStatus(fullOrder.status);
			setShowModal(true);
		} else {
			console.error("Order not found for row:", row);
		}
	};


	const handleStatusChange = () => {
		if (selectedOrder && newStatus !== selectedOrder.status) {
			const updatedStatus = {
				status: { status: newStatus },
				orderId: selectedOrder.id,
			};
			mutate(updatedStatus);
		}
		setShowModal(false);
	};

	const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

	const handleDetailsClick = (orderId: number) => {
		if (expandedOrderId === orderId) {
			setExpandedOrderId(null); // Свернуть, если тот же заказ
		} else {
			setExpandedOrderId(orderId); // Развернуть новый заказ
		}
	};


	const columns: TableColumn<IDataRow>[] = [
		{
			name: "Order_ID",
			selector: (row) => row.id.toString(),
			sortable: true,
		},
		{
			name: "Customer",
			selector: (row) => row.customer,
			sortable: true,
		},
		{
			name: "Status",
			cell: (row) => (
				<div
					style={{
						cursor: "pointer",
						color: getStatusColor(row.status),
						fontWeight: "bold",
					}}
					onClick={() => handleStatusClick(row)} // Передаём row
				>
					{row.status}
				</div>
			),
			sortable: true,
		},
		{
			name: "Phone",
			selector: (row) => row.phone,
			sortable: true,
		},
		{
			name: "Email",
			selector: (row) => row.email,
			sortable: true,
		},
		{
			name: "More info",
			selector: (row) => row.more_info,
			sortable: true,
		},
		{
			name: "Date & Time",
			selector: (row) => row.date,
			sortable: true,
		},

		{
			name: "Details",
			cell: (row) => (
				<button
					style={{
						backgroundColor: "transparent",
						border: "none",
						cursor: "pointer",
						fontSize: "16px",
						color: "#007BFF",
					}}
					onClick={() => {
						setShowModalAdd(true)
						handleDetailsClick(row.id)
					}}
				>
					&#x25BC; {/* Unicode символ стрелки вниз */}
				</button>
			),
			ignoreRowClick: true, // Игнорировать клик по строке для этой ячейки
		},
	];

	useEffect(() => {
		const selecterOrder = allOrders.find(order => order.id === expandedOrderId)
		console.log(selecterOrder);

		if (selecterOrder) {
			setCurrentOrder(selecterOrder)
		}

	}, [expandedOrderId])

	return (
		<div>
			<div style={{ marginBottom: "16px" }}>
				<input
					type="text"
					placeholder="Search orders..."
					value={filterText}
					onChange={(e) => setFilterText(e.target.value)}
					style={{
						padding: "8px",
						fontSize: "14px",
						width: "100%",
						maxWidth: "300px",
					}}
				/>
			</div>

			<DataTable columns={columns} data={filteredOrders} pagination />

			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>

				<h3>Select New Status</h3>
				<select
					value={newStatus}
					onChange={(e) => setNewStatus(e.target.value as string)}
				>
					{statusList.map((status) => (
						<option key={status} value={status}>
							{status}
						</option>
					))}
				</select>
				<div className="modal-actions">
					<button className="button__status" onClick={() => setShowModal(false)}>Cancel</button>
					<button className="button__status" onClick={handleStatusChange}>Save</button>
				</div>

			</Modal>

			<Modal isOpen={showModalAdd} onClose={() => setShowModalAdd(false)}>
				<OrderInfoModal currentOrder={currentOrder} />
			</Modal>

		</div>
	);
};

export default StaffOrdersList;

