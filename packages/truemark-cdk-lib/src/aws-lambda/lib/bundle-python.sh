#!/usr/bin/env bash

set -euo pipefail

if [ -f requirements.txt ]; then
  pip install --target "${CDK_BUNDLING_OUTPUT_DIR}" -r requirements.txt
fi

cp -a ./* "${CDK_BUNDLING_OUTPUT_DIR}"
