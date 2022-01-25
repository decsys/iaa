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

  /**
   * Calculating mean of maxima is similar to centroid in that it will need to 
   * sample linearly spaced values across a range (or ranges!), but then it will average all sampled values
   */
  get mean_of_maxima() {
    const smallestValue = Math.min(...this.intervals.singletonKeys);
    const largestValue = Math.max(...this.intervals.singletonKeys);
    const values = linspace(
      [smallestValue, largestValue],
      (largestValue - smallestValue) * 10 + 1
    )
    const sum = values.reduce((a, b) => a + b, 0)
    const mean = sum/values.length
    
    return mean;
  }

  /**
   * sum all minimum values and all maximum values then divide 
   * by the count of all summed values (i.e. sum of the counts of min and max)
   */
  get mean_of_midpoints() {
    const intervalSet = [...this.intervals.intervalSet]
    const minValues = []
    const maxValues = []
    intervalSet.map(item=>{
      minValues.push(...(item.filter(val=> val == Math.min(...item))))
    })
    intervalSet.map(item=>{
      maxValues.push(...(item.filter(val=> val == Math.max(...item))))
    })
    
    const divideNum = minValues.length+maxValues.length

    const minSum = minValues.reduce((a, b) => a + b, 0)
    const maxSum = maxValues.reduce((a, b) => a + b, 0)
    
    return (minSum+maxSum)/divideNum;
  }
}

export default IntervalAgreementApproach;
