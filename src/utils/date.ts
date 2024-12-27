import {padZero} from "@/utils/number";

export const formatDate = (date: string) => {
  const dateObj = new Date(date);

  const dateStr = `${padZero(dateObj.getDate())}-${padZero(dateObj.getMonth() + 1)}-${padZero(dateObj.getFullYear())}`;

  const timeStr = `${padZero(dateObj.getHours())}:${padZero(dateObj.getMinutes())}`;

  return `${dateStr} ${timeStr}`;
};
