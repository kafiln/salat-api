const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();
const NAMES = require('./data/names').map(e => e.name);

const parseDay = (day, month, year = null) => {
  if (!year) {
    year = new Date().getFullYear();
  }
  return new Date(Date.UTC(year, month - 1, day));
};

const parseDateTime = (timeString, day, month, year = null) => {
  const [hour, minute] = timeString.split(':');
  const result = parseDay(day, month, year);
  result.setHours(hour);
  result.setMinutes(minute);
  return result;
};

const timesFromStringtoDate = prayer => {
  let result = {};
  NAMES.forEach(name => {
    result[name] = moment(parseDateTime(prayer[name], prayer.day, prayer.month))
      .add(process.env.HOURS_OFFSET, 'hour')
      .format('HH:mm');
  });
  return result;
};

module.exports = {
  parseDateTime,
  parseDay,
  timesFromStringtoDate
};
