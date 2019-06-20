# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- ## [Unreleased] -->

## 1.0.0 - 2019-06-20

### Added

- Azure Pipelines CI/CD config

### Changed

- Various documentation changes

## 1.0.0-beta.5 - 2019-06-10

### Fixed

- fixed the number check for the value `0`. `0` being falsey previously led to this failing.

## 1.0.0-beta.3 - 2019-05-26

### Fixed

- `linspace()` now rounds the number of intervals up to the next largest integer, if it was passed a float

## 1.0.0-beta.2 - 2019-05-24

### Added

- This changelog

### Fixed

- Centroid calculation was hardcoded to between `0` and `10`, with `101` linearly spaced samples.
  - it now uses the smallest and largest values from the dataset
  - and 10 times the width of the dataset for the number of linearly spaced samples.
