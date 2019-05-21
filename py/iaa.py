"""This module is for applying the type-1 Interval Agreement Approach.

Details of the interval agreement approach are within
C. Wagner, S. Miller, J. M. Garibaldi, D. T. Anderson and T. C. Havens,
"From Interval-Valued Data to General Type-2 Fuzzy Sets,"
in IEEE Transactions on Fuzzy Systems, vol. 23, no. 2,
pp. 248-269, April 2015.
doi: 10.1109/TFUZZ.2014.2310734
"""

from numpy import linspace

from interval_dict import IntervalDict


class IntervalAgreementApproach():
    """This class type-1 interval agreement approach membership function."""

    def __init__(self):
        """Create a membership function by the interval agreement approach."""
        self.intervals = IntervalDict()
        self._total_intervals = 0
        self._largest_value = 0  # largest value in the dict after summing
        self.height = 1

    def add_interval(self, interval):
        """Add an interval to the fuzzy set."""
        self.intervals[interval[0]:interval[1]] = 1
        self._total_intervals += 1
        self._largest_value = max([self.intervals[point] for point in
                                   self.intervals.singleton_keys()])
        self.height = self._largest_value / float(self._total_intervals)

    def calculate_membership(self, x):
        """Calculate the membership of x. Returns a float."""
        return float(self.intervals[x]) / self._total_intervals

    def calculate_centroid(self):
        """Calculate the centroid x-value of the fuzzy set."""
        top = 0
        bottom = 0
        for x in linspace(0, 10, 101):
            mu = self.calculate_membership(x)
            top += x * mu
            bottom += mu
        return top / bottom

