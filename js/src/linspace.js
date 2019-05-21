/**
 * @module
 * JS implementation of (most of) Python's `numpy.linspace`
 * since JS doesn't have one in a library.
 *
 * Differences:
 * - interval `start` and `stop` values can only be numbers, not array-like.
 * - `retstep` functionality is not provided.
 * - `dtype` is irrelevant because JS only has the `number` type.
 * - `axis` is irrelevant because we only support `number` not `array` for `start` and `stop`.
 */

/**
 * Returns `num` evenly spaced samples, calculated over the `interval`.
 *
 * The `endpoint` of the interval can optionally be excluded from the results.
 * @param {Array<number>} interval in the form `[start, stop]`.
 * @param {number} [num] Optional number of samples to generate. Deafults to `50`.
 * @param {bool} [endpoint]
 * Whether to include the endpoint (`interval`'s stop value) in the results.
 * Defaults to `true`.
 */
export const linspace = (interval, num = 50, endpoint = true) => {
  if (!(interval instanceof Array) || interval.length !== 2)
    throw new TypeError("Interval must be an Array with 2 elements.");
  if (interval.some(x => isNaN(parseFloat(x))))
    throw new TypeError("Both end points must be numbers.");
  if (num <= 0) throw new TypeError("Num must be a positive integer.");

  // some shortcuts
  const [start, stop] = interval;
  switch (num) {
    case 1:
      return [start];
    case 2:
      return interval;
    default:
      const step = (stop - start) / (endpoint ? num - 1 : num);
      return Array(endpoint ? num : num - 1)
        .fill(start)
        .map((start, i) => start + i * step);
  }
};

export default linspace;
