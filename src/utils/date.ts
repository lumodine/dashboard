import { padZero } from "./number";

export const formatDate = (date: string) => {
    const dateObj = new Date(date);

    const dateStr = `${dateObj.getDate()}-${padZero(dateObj.getMonth() + 1)}-${padZero(dateObj.getFullYear())}`;

    const timeStr = `${padZero(dateObj.getHours())}:${padZero(dateObj.getMinutes())}`;

    return `${dateStr} ${timeStr}`;
};
