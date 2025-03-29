# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.18.4

### Changed

- Modified ExtendedBucket to set the memory by default to 512MB for bucket deployments and allow overriding the memory size

## v1.18.3

### Fixed

- Bug with otel local file configuration failing to apply to the ECS otel-collector container

## v1.18.2

### Added

- Otel support for ECS services

## v1.18.1

### Fixed

- Bug with WebsiteBucket where bucket would be retained when stack was deleted even if removal policy was set to DESTROY

## v1.18.0

### Added

- Latency based Cname records to aws-route53
- Added ExtendedBucket and refactored WebsiteBucket and CloudFrontBucketV2 to use it
- Added support for creating vector indexes in OpenSearch to support Bedrock knowledge bases

### Changed

- Update ExtendedNodejsFunction and CdkPipeline to use Node 22 runtime as the default
- Modified StandardTable.addGlobalSecondaryIndex to allow for more flexible index definitions
- Simplified deploy methods on WebsiteBucket and CloudFrontBucketV2
- Updated dependencies to newer versions

## v1.17.2

### Added

- Added AWS::OpenSearchServerless::Collection to EXCLUDED_RESOURCES for tagging.

### Fixed

- Fixed issue where excludeResourceTypes was being overridden on StandardTags

## v1.17.1

### Changed

- Updated dependencies

## v1.17.0

### Changed

- Added exportAndOutputParameter to ExtendedStack to allow for exporting and outputting parameters in the stack with one call
- Default logging for all extended lambda functions is now JSON instead of TEXT
- Updated dependencies to newer versions

### Removed

- StringHelper has been removed and all functions are now exported directly from the helpers module

### Removed

- StringHelper has been removed and all functions are now exported directly from the helpers module

## v1.16.0

### Changed

- Changed hashing algorithm used for identifiers on BehaviorBuilder.
- Dependency updates
- Replaced GTS with standard prettier and eslint configuration
- Changed hashing algorithm used for identifiers on BehaviorBuilder.

## v1.15.2

### Fixed

- Fixed bug where healthCheckGracePeriod wasn't being applied correctly with StandardApplicationFargateService.

## v1.15.1

### Added

- Added CloudFrontBucketV2 and support for Origin Access Control

## v1.15.0

### Added

- Added additional checks to Python bundling in bundle-python.sh
- Added additional fields to make DynamoDB partition table definitions more flexible.

### Changed

- Bumped ts-jest to 29.2.5
- Bumped esbuild to 0.24.0
- Bumped @types/node to 22.7.
- Bumped aws-cdk and related dependencies to 2.163.0
- Bumped cdk-monitoring-construct to 8.3.2

### Fixed

- Fixed issue where fallback origins cause errors of duplicate origins inside CloudFront when using DistributionBuilder.
- Fixed issue where dead letter queues alarms were breaching on missing data.

### Removed

- Removed healthCheckGracePeriod from StandardFargateService
