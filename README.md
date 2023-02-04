# Rust `tarpaulin` Action

![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)
[![Gitter](https://badges.gitter.im/actions-rs/community.svg)](https://gitter.im/actions-rs/community)

This GitHub Action installs and runs [cargo-tarpaulin](https://github.com/xd009642/tarpaulin).
It can be used to run tests with coverage tracing enabled, and optionally upload the code coverage reports to coveralls or codecov.

## Example workflow

```yaml
on: [push]

name: build

jobs:
  check:
    name: Rust project
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Install stable toolchain
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          override: true

      - name: Run cargo-tarpaulin
        uses: actions-rs/tarpaulin@v0.1
        with:
          version: '0.15.0'
          target: 'x86_64-unknown-linux-gnu'
          args: '-- --test-threads 1'

      - name: Upload to codecov.io
        uses: codecov/codecov-action@v1.0.2
        with:
          token: ${{secrets.CODECOV_TOKEN}}

      - name: Archive code coverage results
        uses: actions/upload-artifact@v1
        with:
          name: code-coverage-report
          path: cobertura.xml
```

See [additional recipes here](https://github.com/actions-rs/meta).

## Inputs

| Name        | Required | Description                                                                                              | Type   | Default |
| ------------| :------: | ---------------------------------------------------------------------------------------------------------| ------ | --------|
| `version`   |          | The version of `cargo-tarpaulin` that will be installed.                                                 | string | latest  |
| `target`    |     ✓    | The target to install tarpaulin for i.e. `x86_64-unknown-linux-gnu`.                                     | string | latest  |
| `run-types` |          | The type of tests to run (`Tests`, or `Doctests`). Runs all by default. May be overridden by `args`.     | string |         |
| `timeout`   |          | The timeout, in seconds, before cancelling execution of a long running test. May be overriden by `args`. | string |         |
| `args`      |          | Extra command line arguments that are passed to `cargo-tarpaulin`.                                       | string |         |
| `out-type`  |          | Output format of coverage report (`Json`, `Toml,`, `Stdout`, `Xml`, `Html`, `Lcov`]. Defaults to `Xml`   | string | Xml     |
