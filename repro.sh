#!/bin/bash

npm ci

for i in {1..30}; do
    rm -rf build/*
    NODE_ENV=production ./node_modules/.bin/webpack
    cp -R build build_$i
done
