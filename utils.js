const moment = require('moment');
const NAMES = require('./data/names').map(e => e.name);

const parseDay = (day, month) => {
  let date = moment.utc(`${day}-${month}`, 'D-M');
  return date.toISOString();
};

const parseDateTime = (timeString, day, month, year = null) => {
  if (!year) {
    year = moment.utc().year();
  }
  return moment
    .utc(
      `${day}-${month}-${year} ${timeString} ${process.env.TIMEZONE}`,
      'D-M-YYYY HH:mm Z'
    )
    .toISOString();
};

const timesFromStringtoDate = prayer => {
  let result = {};
  NAMES.forEach(name => {
    const time = parseDateTime(prayer[name], prayer.day, prayer.month);
    result[name] = time;
  });
  return result;
};

module.exports = {
  parseDateTime,
  timesFromStringtoDate,
  parseDay
};
