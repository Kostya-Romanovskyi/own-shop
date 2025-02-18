import { FC, useEffect, useState, useCallback } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useUpdateStatusStaff } from '../../hooks/useOrder';
import { IStaffAllOrders } from '../../API/order/order.interface';
import SelectComponent from '../SelectComponent/SelectComponent';
import { orderStatusSelect } from '../../constants/statusSelect';
import dateAndTime from '../../helpers/dateAndTime';

import Modal from '../Modal/Modal';
import OrderInfoModal from '../OrderInfoModal/OrderInfoModal';
import './staff-orders-list.scss';

interface IDataRow {
  id: number;
  customer: string;
  status: string;
  phone: string;
  email: string;
  date: string;
  more_info: string;
}
interface StaffOrdersListProps {
  allOrders: IStaffAllOrders[];
}

const rowStyles = {
  height: '100px',
  fontSize: '1.2rem',
};

const dateStyle = {
  fontSize: '1.1rem',
};

const customStyles = {
  headCells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
      fontSize: '1.5rem',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
};

const StaffOrdersList: FC<StaffOrdersListProps> = ({ allOrders = [] }) => {
  const [filterText, setFilterText] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<IStaffAllOrders | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [currentOrder, setCurrentOrder] = useState<IStaffAllOrders | null>(null);
  const [selectedOption, setSelectedOption] = useState({ value: 'pending', label: 'Pending' });
  const { mutate, isPending } = useUpdateStatusStaff();

  const filteredOrders = allOrders
    .filter(order =>
      [
        order?.id,
        order?.user?.name,
        order?.status,
        order?.user?.phone,
        order?.user?.email,
        dateAndTime(order?.order_date),
      ]
        .join(' ')
        .toLowerCase()
        .includes(filterText.toLowerCase())
    )
    .map(order => ({
      id: order.id,
      customer: order.user.name,
      status: order.status,
      phone: order.user.phone,
      email: order.user.email,
      date: dateAndTime(order.order_date),
      more_info: order.additional_information,
    }));

  const handleStatusClick = useCallback(
    (row: IDataRow) => {
      const fullOrder = allOrders.find(order => order.id === row.id);
      if (fullOrder) {
        setSelectedOrder(fullOrder);
        setShowModal(true);
      } else {
        console.error('Order not found for row:', row);
      }
    },
    [allOrders]
  );

  const handleStatusChange = () => {
    if (selectedOrder && selectedOption.value !== selectedOrder.status) {
      const updatedStatus = {
        status: selectedOption.value,
        orderId: selectedOrder.id,
        time: '30',
      };
      mutate(updatedStatus);
    }
    setShowModal(false);
  };

  const handleDetailsClick = (orderId: number) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const columns: TableColumn<IDataRow>[] = [
    {
      name: 'Order_ID',
      selector: row => row.id.toString(),
      sortable: true,
      style: rowStyles,
    },
    {
      name: 'Customer',
      selector: row => row.customer,
      sortable: true,
      style: rowStyles,
    },
    {
      name: 'Status',
      cell: row =>
        isPending ? (
          <div>Loading...</div>
        ) : (
          <div
            className={`status__styles--${row.status.replace(' ', '-')}`}
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onClick={() => handleStatusClick(row)}
          >
            {row.status}
          </div>
        ),
      style: rowStyles,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: true,
      style: rowStyles,
    },
    {
      name: 'Date & Time',
      selector: row => row.date,
      sortable: true,
      style: dateStyle,
    },

    {
      name: 'Details',
      cell: row => (
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#007BFF',
          }}
          onClick={() => {
            setShowModalAdd(true);
            handleDetailsClick(row.id);
          }}
        >
          &#x25BC; Open details
        </button>
      ),
      ignoreRowClick: true,
    },
  ];

  useEffect(() => {
    const selectedOrder = allOrders.find(order => order.id === expandedOrderId);

    if (selectedOrder) {
      setCurrentOrder(selectedOrder);
    }
  }, [expandedOrderId, allOrders]);

  return (
    <div className="font">
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Search orders..."
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '14px',
            width: '100%',
            maxWidth: '300px',
          }}
        />
      </div>

      <DataTable columns={columns} data={filteredOrders} customStyles={customStyles} pagination />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} classStyle="status__modal">
        <h3 className="change__status__title">Change user status</h3>

        <SelectComponent
          options={orderStatusSelect}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <div className="modal-actions-status">
          <button className="button__status" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="button__status" onClick={handleStatusChange}>
            Save
          </button>
        </div>
      </Modal>

      <Modal isOpen={showModalAdd} onClose={() => setShowModalAdd(false)}>
        <OrderInfoModal currentOrder={currentOrder} />
      </Modal>
    </div>
  );
};

export default StaffOrdersList;
