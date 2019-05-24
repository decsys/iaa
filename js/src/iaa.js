/**
 * @module
 * This module is for applying the type-1 Interval Agreement Approach.
 *
 * Details of the interval agreement approach are within
 * C. Wagner, S. Miller, J. M. Garibaldi, D. T. Anderson and T. C. Havens,
 * "From Interval-Valued Data to General Type-2 Fuzzy Sets,"
 * in IEEE Transactions on Fuzzy Systems, vol. 23, no. 2,
 * pp. 248-269, April 2015.
 * doi: 10.1109/TFUZZ.2014.2310734
 */

import IntervalMap from "./interval-map";
import linspace from "./linspace";

/**
 * This class type-1 interval agreement approach membership function.
 */
class IntervalAgreementApproach {
  constructor() {
    this.intervals = new IntervalMap();
  }

  /**
   * Add an interval to the fuzzy set.
   * @param {Array<number>} interval in the form `[start, stop]`
   */
  addInterval(interval) {
    this.intervals.set(interval, 1);
  }

  /**
   * Calculate the membership of x.
   * @param {number} x the point to get membership for.
   */
  membership(x) {
    return this.intervals.get(parseFloat(x)) / this.intervals.size;
  }

  /**
   * Return the centroid x-value of the fuzzy set.
   */
  get centroid() {
    const smallestValue = Math.min(...this.intervals.singletonKeys);
    const largestValue = Math.max(...this.intervals.singletonKeys);
    const { top, bottom } = linspace(
      [smallestValue, largestValue],
      (largestValue - smallestValue) * 10 + 1
    ).reduce(
      (a, x) => {
        const mu = this.membership(x);
        return {
          top: a.top + x * mu,
          bottom: a.bottom + mu
        };
      },
      { top: 0, bottom: 0 }
    );
    return top / bottom;
  }
}

export default IntervalAgreementApproach;
