/**
 * Sleep for n miliseconds
 * @param {*} n number of miliseconds
 */
const msleep = n =>
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);

/**
 * Sleep for n seconds
 *
 * @param {*} n
 */
const sleep = n => msleep(n * 1000);

module.exports = {
  sleep,
  msleep
};
