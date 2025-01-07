import { format } from "date-fns";

const dateAndTime = (date: string) => {
    return format(new Date(date), "MM.dd.yyyy hh:mm a")
}

export default dateAndTime