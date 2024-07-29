#!/usr/bin/env bash

set -euo pipefail

# Check if PIP and Python are installed
if ! command -v pip &> /dev/null
then
    echo "pip could not be found"
    exit
fi

if ! command -v python &> /dev/null
then
    echo "python could not be found"
    exit
fi

# Check if CDK_BUNDLING_OUTPUT_DIR is set
if [ -z "${CDK_BUNDLING_OUTPUT_DIR}" ]; then
    echo "CDK_BUNDLING_OUTPUT_DIR is not set"
    exit 1
fi

# Check if requirements.txt exists and install dependencies
if [ -f requirements.txt ]; then
    echo "Installing Python dependencies..."
    pip install --target "${CDK_BUNDLING_OUTPUT_DIR}" -r requirements.txt
else
    echo "requirements.txt does not exist"
fi

# Copy all files to the output directory
echo "Copying files to output directory..."
cp -a ./* "${CDK_BUNDLING_OUTPUT_DIR}"

echo "Bundling completed successfully"
