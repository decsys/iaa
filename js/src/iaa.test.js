import IntervalAgreementApproach from "./iaa";

test("matches `main.py`", () => {
  const intervals = [[1, 7], [2, 6], [2, 4], [6, 9]];

  const fs = new IntervalAgreementApproach();
  for (const d of intervals) fs.addInterval(d);

  expect(fs.membership(1)).toEqual(0.25);
  expect(fs.membership(2)).toEqual(0.75);
  expect(fs.membership(7)).toEqual(0.5);
  expect(parseFloat(fs.centroid.toFixed(2))).toEqual(4.57);
});

test("works with floats at both extremes", () => {
  const intervals = [[29, 51.067613404], [20.640571195, 40]];

  const fs = new IntervalAgreementApproach();
  for (const d of intervals) fs.addInterval(d);

  expect(fs.membership(1)).not.toBeNaN();
  expect(parseFloat(fs.centroid)).not.toBeNaN();
});

test("works with values exclusively outside the range 0 - 10", () => {
  const intervals = [[60, 90], [50, 90], [40, 90], [80, 90]];

  const fs = new IntervalAgreementApproach();
  for (const d of intervals) fs.addInterval(d);

  expect(fs.membership(1)).toEqual(0);
  expect(fs.membership(62)).toEqual(0.75);
  expect(fs.membership(42)).toEqual(0.25);
  expect(parseFloat(fs.centroid)).not.toBeNaN();
});

test("works with endpoint only values", () => {
  const intervals = [[0, 100], [0, 0], [100, 100]];

  const fs = new IntervalAgreementApproach();
  for (const d of intervals) fs.addInterval(d);

  expect(fs.membership(1)).not.toBeNaN();
  expect(parseFloat(fs.centroid)).not.toBeNaN();
});


test("Mean of maxima works", () => {
  const intervals = [[1,5], [1,3], [2,5]];

  const fs = new IntervalAgreementApproach();
  for (const d of intervals) fs.addInterval(d);

  expect(fs.mean_of_maxima).toEqual([2,3]);
  
});
test("Mean of midpoints work", () => {
  const intervals = [[1,5], [1,3], [2,5]];

  const fs = new IntervalAgreementApproach();
  for (const d of intervals) fs.addInterval(d);

  expect(parseFloat(fs.mean_of_midpoints).toFixed(2)).toEqual("2.83")
});
