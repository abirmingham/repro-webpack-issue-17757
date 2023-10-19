This repository is intended to be a minimum reproduction of an issue where the "contenthash" is not consistent from build to build. See https://github.com/webpack/webpack/issues/17757

## Reproduction Steps:

1) Build the project 30 times, setting aside each output:
    `docker run --rm --entrypoint="" -v "$(pwd)":/usr/src/app -it $(docker build -q .) /usr/src/app/repro.sh`
    (30 times is probably unnecessary - in my experience ~5 is sufficient)

2) Check which builds differ:
    `echo "$(for i in {1..30}; do diff -qr build_$i build_$((i+1)); done)" | cut -f2- -d: | sort | uniq`

## Example Results

I have checked in a directory named `example_offending_output_files` that contains example offending results merged from two different builds. I have found that an effective way of viewing the diff between two offending files is to execute the following:
    `git diff --no-index --word-diff=color --word-diff-regex=. example_offending_output_files/4021.0ad7a981f0f8370e.js example_offending_output_files/4021.2351c58a807ec15b.js`

## Machine Used for Reproduction

- Intel(R) Core(TM) i7-9700K CPU @ 3.60GHz
- 32 GB
- Ubuntu 20.04.6 LTS running docker "node:18" image
