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
  const intervals2 = [[5,10], [2.5,5.5], [3,5]];
  const intervals3 = [[4,10], [3,6], [5,7]];
  const intervals4 = [[3.5,10], [2.5,6], [3,4]];
  const intervals5 = [[1,5], [1,3], [2,5],[6,30], [6,18], [12,30]];

  const fs = new IntervalAgreementApproach();
  for (const d of intervals) fs.addInterval(d);

  const fs2 = new IntervalAgreementApproach();
  for (const d2 of intervals2) fs2.addInterval(d2);

  const fs3 = new IntervalAgreementApproach();
  for (const d3 of intervals3) fs3.addInterval(d3);

  const fs4 = new IntervalAgreementApproach();
  for (const d4 of intervals4) fs4.addInterval(d4);

  const fs5 = new IntervalAgreementApproach();
  for (const d5 of intervals5) fs5.addInterval(d5);

  expect(fs.mean_of_maxima).toEqual(2.5);
  expect(fs2.mean_of_maxima).toEqual(5);
  expect(fs3.mean_of_maxima).toEqual(5.5);
  expect(fs4.mean_of_maxima).toEqual(3.75);
  expect(fs5.mean_of_maxima).toEqual(8.75);
  
  
});
test("Mean of midpoints work", () => {
  const intervals = [[1,5], [1,3], [2,5]];

  const fs = new IntervalAgreementApproach();
  for (const d of intervals) fs.addInterval(d);

  expect(parseFloat(fs.mean_of_midpoints).toFixed(2)).toEqual("2.83")
});
