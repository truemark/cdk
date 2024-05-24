# TrueMark CDK Library

[![NPM Version][npm-image]][npm-url]
[![TypeScript Style Guide][gts-image]][gts-url]
[![GitHub Actions][github-image]][github-url]

This library provides common constructs and functionality to ease CDK development.

The main objectives of this project is to

-   Provide extended constructs that add additional functionality to existing CDK constructs
-   Provide standard constructs that are simple to use and adhere to best practices
-   Provide constructs for commonly used patterns
-   Reduce the amount of boilerplate coding required to work with CDK

## Conventions

-   **Standard** Constructs are simplified constructs meant for general use. They follow general best practices and have been given sane optimized defaults.
-   **Extended** Constructs are extensions of Constructs in the standard CDK library which add functionality such as logging and monitoring.
-   Other Constructs found in this library are crafted CDK constructs for specific common use cases which follow CDK's principle of composition over inheritance.

In general, you should use **Standard** over **Extended** constructs unless they do not fit your use case.

## Versioning

This project follows a [semantic versioning](https://semver.org/) pattern.

```
<major>.<minor>.<patch>
```

[github-url]: https://github.com/truemark/cdk/actions
[github-image]: https://github.com/truemark/cdk/workflows/ci/badge.svg
[npm-url]: https://npmjs.org/package/@ncryptyr/client
[npm-image]: https://img.shields.io/npm/v/truemark-cdk-lib.svg
[gts-image]: https://img.shields.io/badge/code%20style-google-blueviolet.svg
[gts-url]: https://github.com/google/gts
