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
