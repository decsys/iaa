# Type-1 Interval Agreement Approach

This is the original Python reference implementation.

## Getting started

1. You'll need `numpy`
   - `pip install numpy`
2. Modify `main.py` as desired
3. `py main.py`

## Known issues

- Note that currently centroid calculation is hardcoded for values between 0 and 10.
    - Values outside this range will not be factored into the centroid calculation
    - If ALL values are outside this range, centroid result will be `nan`
