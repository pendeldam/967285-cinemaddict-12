import moment from "moment";

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  return array[getRandomIntegerNumber(0, array.length)];
};

export const getRandomArray = (length, cb) => {
  return new Array(length)
    .fill(``)
    .map(cb);
};

export const formatTime = (date) => {
  console.log(date)
  const now = new Date();
  const diff = moment(date).diff(now);
  return moment.duration(diff).humanize(true);
};

export const formatDuration = (value) => {
  const hours = Math.floor(value / 60);
  const minutes = (value - 60 * hours);

  if (value >= 60 && value < 300) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};
