import {menu} from './menu';
import moment from 'moment';

const formatDateTime = (dateString) => {
  return moment(dateString).format('MM/DD/YYYY h:mm:ss A');
};

const formatHashString = (hash) => {
  if (!hash || typeof hash !== 'string') return `Hash not exist!`;
  if (hash.length > 60) {
    const threeDot = '...';
    const hashFormated = `${hash.slice(0, 40)}${threeDot}`;
    return hashFormated;
  } else return hash;
};

export {menu, formatDateTime, formatHashString};
