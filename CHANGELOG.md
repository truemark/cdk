# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.16.0

### Changes

-   Changes hashing algorithm used for identifiers on BehaviorBuilder.
-   Dependency updates

## v1.15.2

### Fixed

-   Fixed bug where healthCheckGracePeriod wasn't being applied correctly with StandardApplicationFargateService.

## v1.15.1

### Added

-   Added CloudFrontBucketV2 and support for Origin Access Control

## v1.15.0

### Added

-   Added additional checks to Python bundling in bundle-python.sh
-   Added additional fields to make DynamoDB partition table definitions more flexible.

### Changed

-   Bumped ts-jest to 29.2.5
-   Bumped esbuild to 0.24.0
-   Bumped @types/node to 22.7.
-   Bumped aws-cdk and related dependencies to 2.163.0
-   Bumped cdk-monitoring-construct to 8.3.2

### Fixed

-   Fixed issue where fallback origins cause errors of duplicate origins inside CloudFront when using DistributionBuilder.
-   Fixed issue where dead letter queues alarms were breaching on missing data.

### Removed

-   Removed healthCheckGracePeriod from StandardFargateService
