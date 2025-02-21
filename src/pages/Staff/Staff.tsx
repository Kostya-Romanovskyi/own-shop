import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import StaffOrdersList from '../../components/StaffOrdersList/StaffOrdersList';
import StaffReservationList from '../../components/StaffReservationList/StaffReservationList';
import audioNotification from '../../assets/audio/newOrder.mp3';
import io from 'socket.io-client';
import { useAllReservations } from '../../hooks/useReservations';
import { useGetAllOrders } from '../../hooks/useOrder';
import { useQueryClient } from '@tanstack/react-query';
import LogoutBtn from '../../components/LogoutBtn/LogoutBtn';
import './staff.scss';

// hook for checking status
const usePendingStatus = (items: any, statusType: string) => {
  const [hasPending, setHasPending] = useState(false);

  useEffect(() => {
    setHasPending(items ? items.some((item: any) => item.status === statusType) : false);
  }, [items, statusType]);

  return hasPending;
};

// hook for sound
const useSoundNotification = (shouldPlay: boolean, message: string) => {
  useEffect(() => {
    if (!shouldPlay) return;

    const playSound = () => {
      console.log(message);
      const audio = new Audio(audioNotification);
      audio.play().catch(err => console.error('Audio play error:', err));
    };

    playSound();

    const intervalId = setInterval(playSound, 5000);

    return () => clearInterval(intervalId);
  }, [shouldPlay, message]);
};

const Staff = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const tab = searchParams.get('tab') || 'orders';
  const { data: orders } = useGetAllOrders();
  const { data: reservations } = useAllReservations();

  const hasPendingOrders = usePendingStatus(orders, 'Pending');
  const hasPendingReservations = usePendingStatus(reservations, 'Pending');

  useSoundNotification(hasPendingOrders, 'orders Pending!');
  useSoundNotification(hasPendingReservations, 'reservations Pending!');

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
      new Audio(audioNotification).play().catch(err => console.error('Audio play error:', err));
    });

    socket.on('NEW_RESERVATION', newReservation => {
      queryClient.invalidateQueries({ queryKey: ['all-reservations'] });
      console.log('New reservation received:', newReservation);
      new Audio(audioNotification).play().catch(err => console.error('Audio play error:', err));
    });

    return () => {
      socket.off('NEW_ORDER');
      socket.off('NEW_RESERVATION');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="container">
      <div className="staff__logout">
        <LogoutBtn />
      </div>

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
        <StaffOrdersList allOrders={orders || []} />
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
