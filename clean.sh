#!/usr/bin/env bash

set -euo pipefail
find . -name "*.d.ts" -not -path "./node_modules/*" -not -path "./test-files/*" -exec rm -f {} \;
find . -name "*.js.map" -not -path "./node_modules/*" -not -path "./test-files/*" -exec rm -f {} \;
find . -name "*.js" -not -path "./node_modules/*" -not -path "./test-files/*" -not -path "./jest.config.js" -not -path "./.prettierrc.js" -exec rm -f {} \;

