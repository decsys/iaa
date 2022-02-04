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
    const intervalSet = [...this.intervals.intervalSet]
    const sample = linspace([smallestValue, largestValue], ((largestValue - smallestValue) / 0.01) + 1)

    const sample_item_count_object = Object.assign(
      {},
      ...sample.map(item => {
        const el = {}
        el[item] = intervalSet.filter(element => item >= element[0] && item <= element[1]).length
        return el
      })
    )

    let highest_agreement_values = []
    Object.keys(sample_item_count_object).map(item => {
      if (sample_item_count_object[item] == Math.max(...Object.values(sample_item_count_object))) {
        highest_agreement_values.push(item)
      }
    })

    highest_agreement_values = highest_agreement_values.sort(function (a, b) { return parseFloat(a) - parseFloat(b) })

    // determine intervals of highest agreement from list of values with highest agreement
    const finalArr = []
    let skip = []
    highest_agreement_values.map((item, index) => {
      if (skip.includes(item)) {
        return
      }
      else if (item == largestValue) {
        finalArr.push([item, item])
        return
      }
      else {
        let start = item
        let currentNum = item
        let currentIndex = index

        const startIndex = sample.findIndex((qwer) => qwer == item)

        for (let i = startIndex; i < sample.length; i++) {
          if (currentIndex == (highest_agreement_values.length - 1)) {
            finalArr.push([start, currentNum])
            break
          }
          else if (sample[i + 1] == highest_agreement_values[currentIndex + 1]) {
            skip.push(highest_agreement_values[currentIndex + 1])
            currentNum = highest_agreement_values[currentIndex + 1]
            currentIndex++
          }
          else {
            finalArr.push([start, currentNum])
            break
          }
        }
      }
    })

    return finalArr.flat().reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / finalArr.flat().length;
    //return highest_agreement_values.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / highest_agreement_values.length;

  }

  /**
   * sum all minimum values and all maximum values then divide 
   * by the count of all summed values (i.e. sum of the counts of min and max)
   */
  get mean_of_midpoints() {
    const intervalSet = [...this.intervals.intervalSet]
    const midpoints = intervalSet.map(item => (item[0] + item[1]) / 2)
    return midpoints.reduce((a, b) => a + b, 0) / midpoints.length
  }
}

export default IntervalAgreementApproach;
