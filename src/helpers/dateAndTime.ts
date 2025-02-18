import { format } from 'date-fns';

const dateAndTime = (date: string | Date = '2025-01-08T08:38:08.000Z') => {
  return format(new Date(date), 'MM.dd.yyyy hh:mm a');
};

export default dateAndTime;
