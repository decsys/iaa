![GitHub](https://img.shields.io/github/license/decsys/iaa.svg)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@decsys/iaa/latest.svg)](https://www.npmjs.com/package/@decsys/iaa)

# Type-1 Interval Agreement Approach

This is a modern JavaScript (ES Modules) implementation of the Type-1 Interval Agreement Approach.

Details of the interval agreement approach are within [From Interval-Valued Data to General Type-2 Fuzzy Sets](https://ieeexplore.ieee.org/document/6762925).

| | From Interval-Valued Data to General Type-2 Fuzzy Sets |
|-|-|
| **Authors** | C. Wagner, S. Miller, J. M. Garibaldi, D. T. Anderson and T. C. Havens |
| **Published in** | IEEE Transactions on Fuzzy Systems, vol. 23, no. 2 April 2015. |
| **Pages** | 248 - 269 |
| **DOI** | [`10.1109/TFUZZ.2014.2310734`](https://doi.org/10.1109/TFUZZ.2014.2310734) |

## About this implementation

This implementation was developed for use in the DECSYS Project, in which client-side React Components implement the Interval Value Ellipse Scale, and use this code to provide statistical analysis of the results.

Because it is used in DECSYS, it is available on `npm`, but only as ES modules (which meets the needs of DECSYS Response Components).

# Getting Started

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

# Building

1. `npm i`
2. `npm test` - Run Jest tests
3. `npm run build` - Build the ESM bundle used for the npm package.

# Licensing

## Overview

This software is primarily licensed under the **GNU Affero General Public License v3.0 only** (`AGPL-3.0-only`).

A summary is provided below; the full license text may be found in `LICENSE.md`.

Other license arrangements may be made as appropriate on request.

## Copyright and License Summary

> Type-1 Interval Agreement Approach
>
> Copyright (C) 2019 Christian Wagner, LUCID (Lab for Uncertainty in Data and Decision Making)
>
> This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
>
> This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.
>
> You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.