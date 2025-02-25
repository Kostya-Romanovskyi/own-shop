import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import StaffOrdersList from '../../components/StaffOrdersList/StaffOrdersList';
import StaffReservationList from '../../components/StaffReservationList/StaffReservationList';
import io from 'socket.io-client';
import { useAllReservations } from '../../hooks/useReservations';
import { useGetAllOrders } from '../../hooks/useOrder';
import { useQueryClient } from '@tanstack/react-query';
import playOrderSound from '../../helpers/PlayOrderSound';

import './staff.scss';

const Staff = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const tab = searchParams.get('tab') || 'orders';
  const { data: orders, isPending } = useGetAllOrders();
  const { data: reservations } = useAllReservations();

  const newOrdersCount = orders
    ? orders.reduce((acc, order) => acc + (order.status === 'Pending' ? 1 : 0), 0)
    : 0;
  const newReservationCount = reservations
    ? reservations.reduce((acc, res) => acc + (res.status === 'Pending' ? 1 : 0), 0)
    : 0;

  useEffect(() => {
    // const socket = io('http://localhost:3000');
    const socket = io('https://own-shop-back.onrender.com');

    socket.on('NEW_ORDER', newOrder => {
      queryClient.invalidateQueries({ queryKey: ['AllOrders'] });
      console.log('New order received:', newOrder);
      playOrderSound();
    });

    socket.on('NEW_RESERVATION', newReservation => {
      queryClient.invalidateQueries({ queryKey: ['all-reservations'] });
      console.log('New reservation received:', newReservation);
      playOrderSound();
    });

    return () => {
      socket.off('NEW_ORDER');
      socket.off('NEW_RESERVATION');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="staff__container">
      <div className="tabs__wrapper">
        <button
          className={`tabs__btn ${tab === 'orders' ? 'tabs__red' : ''} ${newOrdersCount > 0 ? 'tabs__blink' : ''}`}
          onClick={() => setSearchParams({ tab: 'orders' })}
        >
          Orders {newOrdersCount}
        </button>
        <button
          className={`tabs__btn ${tab === 'reservations' ? 'tabs__red' : ''} ${newReservationCount > 0 ? 'tabs__blink' : ''}`}
          onClick={() => setSearchParams({ tab: 'reservations' })}
        >
          Reservations {newReservationCount}
        </button>
      </div>
      {tab === 'orders' ? (
        <StaffOrdersList allOrders={orders || []} isLoading={isPending} />
      ) : (
        <StaffReservationList allReservations={reservations || []} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} classStyle="staff__modal">
        <p className="staff__modal__title">Click to enable sound notifications for new orders.</p>
        <button onClick={() => setIsModalOpen(false)} className="order__submit__btn">
          Enable sound notifications
        </button>
      </Modal>
    </div>
  );
};

export default Staff;
