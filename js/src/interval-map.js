/**
 * @module
 *
 * This module is used to create an interval-based `Map`.
 *
 * Assign values to interval keys.
 *
 * @example
 * const map = new IntervalMap()
 * map.set([1,3]) = 2
 * map.set([2,4]) = 4
 * // The value of a single-valued key is the maximum assigned value
 * console.log(map.get(1))  // 2
 * console.log(map.get(2))  // 6
 */

/**
 * Store a `Map` in which the keys are intervals
 */
class IntervalMap {
  constructor() {
    /**
     * The Interval Map.
     *
     * If a key has been assigned multiple values the sum is returned.
     *
     * This works in a Map where the keys are reference types (e.g. Array).
     */
    this._map = new Map();
  }

  /**
   * Assign value to the continuous interval key.
   * @param {Array<number>} key
   * The interval as an array in the form `[start, stop]`.
   * @param {number} value The value to assign.
   */
  set(key, value) {
    if (!(key instanceof Array) || key.length !== 2)
      throw new TypeError("The key must be an Array with 2 elements.");
    if (key.some(x => isNaN(parseFloat(x))))
      throw new TypeError("Both end points must be numbers.");
    this._map.set(key, value);
  }

  /**
   * Return the value of the singleton `point`.
   * @param {number} point The point to retrieve the value for.
   */
  get(point) {
    const values = [];
    for (const [interval, value] of this._map) {
      if (this.isWithinInterval(interval, point)) values.push(value);
    }
    return values.reduce((a, v) => a + v, 0);
  }

  /**
   * Return the list of unique interval singleton values
   *
   * @example
   * const map = new IntervalMap();
   * map.set([1,3], 1);
   * map.set([1,5], 1);
   * console.log(map.singletonKeys); // [1, 3, 5]
   */
  get singletonKeys() {
    return [...new Set([...this._map.keys()].reduce((a, v) => [...a, ...v]))];
  }
  get intervalSet() {
    return [...this._map.keys()];
  }

  get size() {
    return this._map.size;
  }

  /**
   * Check if `point` is within `interval`.
   * @param {Array<number>} interval The interval to check, in the form `[start, stop]`.
   * @param {number} point The point value to check.
   */
  isWithinInterval(interval, point) {
    // py checks if the first element is a tuple
    // I can't work out why it ever would be?
    return point >= interval[0] && point <= interval[1];
  }
}

export default IntervalMap;
