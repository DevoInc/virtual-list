#!/usr/bin/env sh

rm -rf dist ./virtual-list.tar.gz
NODE_ENV=production babel src/component --ignore "__tests__","**/*.spec.js","**/*.test.js","__snapshots__" --out-dir dist
#tar -czf ../virtual-list.tar.gz . && mv ../virtual-list.tar.gz .
