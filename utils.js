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

const timesFromStringtoDate = prayer => ({
  fajr: parseDateTime(prayer.fajr, prayer.day, prayer.month),
  chorouq: parseDateTime(prayer.chorouq, prayer.day, prayer.month),
  dhuhr: parseDateTime(prayer.dhuhr, prayer.day, prayer.month),
  asr: parseDateTime(prayer.asr, prayer.day, prayer.month),
  maghrib: parseDateTime(prayer.maghrib, prayer.day, prayer.month),
  ishae: parseDateTime(prayer.ishae, prayer.day, prayer.month),
  day: parseDay(prayer.day, prayer.month)
});

module.exports = {
  parseDateTime,
  parseDay,
  timesFromStringtoDate
};
