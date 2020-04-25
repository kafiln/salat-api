const moment = require('moment');
const NAMES = require('./data/names').map((e) => e.name);

const parseDay = (day, month) => {
  let myDate = moment.utc();
  myDate.millisecond(0);
  myDate.minute(0);
  myDate.hour(0);
  myDate.second(0);

  myDate.date(day);
  myDate.month(month - 1);
  return myDate.toISOString();
};

const parseDateTime = (timeString, day, month, year = null) => {
  if (!year) {
    year = moment.utc().year();
  }
  return moment
    .utc(`${day}-${month}-${year} ${timeString} +0100`, 'D-M-YYYY HH:mm Z')
    .toISOString();
};

const timesFromStringtoDate = (prayer) => {
  let result = {};
  NAMES.forEach((name) => {
    const time = parseDateTime(prayer[name], prayer.day, prayer.month);
    result[name] = time;
  });
  return result;
};

module.exports = {
  parseDateTime,
  timesFromStringtoDate,
  parseDay,
};
