# Type-1 Interval Agreement Approach

This repository contains code for applying the type-1 Interval Agreement Approach.

Details of the interval agreement approach are within

C. Wagner, S. Miller, J. M. Garibaldi, D. T. Anderson and T. C. Havens,

"From Interval-Valued Data to General Type-2 Fuzzy Sets,"

in IEEE Transactions on Fuzzy Systems, vol. 23, no. 2,
pp. 248-269, April 2015.

doi: 10.1109/TFUZZ.2014.2310734

# Implementations

The repository contains multiple implementations as deemed useful, derived from a canonical Python implementation.

## Python

This is the original implementation.

1. You'll need `numpy`
   - `pip install numpy`
2. Modify `main.py` as desired
3. `py main.py`

Note that currently centroid calculation is hardcoded for values between 0 and 10.
- Values outside this range will not be factored into the centroid calculation
- If ALL values are outside this range, centroid result will be `nan`

## ES Modules (JavaScript)

This implementation was developed for use in the DECSYS Project, in which client-side React Components implement the Interval Value Ellipse Scale, and use this code to provide statistical analysis of the results.

Because it is used in DECSYS, it is available on `npm`, but only as ES modules (which meets the needs of DECSYS Response Components)

### Usage in a project:

`npm i @decsys/iaa`

```js
import IntervalAgreementApproach from "@decsys/iaa";

const intervals = [[1, 7], [2, 6], [2, 4], [6, 9]];

const fs = new IntervalAgreementApproach();
for (const d of intervals) fs.addInterval(d);

fs.membership(1); // 0.25
fs.membership(2); // 0.75
fs.membership(7); // 0.5
parseFloat(fs.centroid.toFixed(2)); // 4.57
```

### Building

1. `npm i`
2. `npm test` - Run Jest tests
3. `npm run build` - Build the ESM bundle used for the npm package.

# Licensing

This software is primarily licensed under the **GNU Affero General Public License v3.0 only** (`AGPL-3.0-only`)

    Type-1 Interval Agreement Approach
    Copyright (C) 2015 - 2019

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

Other license arrangements may be made as appropriate on request.
