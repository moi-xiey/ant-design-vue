import moment from 'moment';
import Objects from './objects';

export const Format = {
  Date: 'YYYY-MM-DD',
  Time: 'HH:mm:ss',
  DateTime: 'YYYY-MM-DD HH:mm:ss',
};

export const isDate = Objects.isDate;

export const timeFix = () => {
  const time = new Date();
  const hour = time.getHours();
  if (hour < 9) {
    return '早上好';
  }
  if (hour < 11) {
    return '上午好';
  }
  if (hour <= 13) {
    return '中午好';
  }
  if (hour <= 20) {
    return '下午好';
  }
  return '晚上好';
};

const format = (timestamp, format = Format.Date, fallback = '-') => {
  const d = new Date(+timestamp);
  if (!isDate(d)) {
    return fallback;
  }
  return moment(d).format(format);
};

export default {
  timeFix,
  format,
  Format,
  isDate,
};
