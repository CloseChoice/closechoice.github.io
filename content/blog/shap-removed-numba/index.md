---
title: Removing numba and llvmlite dependencies from SHAP
date: 2026-09-16
author: Tobias Pitters
tags: ["open-source", "SHAP"]
---

# SHAP got rid of Numba and llvmlite

## What we did

We moved performance-critical code from numba to C++. We got rid of numba entirely.

[The migration involved a series of PRs across SHAP's core utilities.](https://github.com/shap/shap/releases/tag/v0.53.0rc0)

## Why we did it

The main motivation came from our experience supporting new Python
versions.

Support for Python 3.14 exposed how much SHAP's Python support depended
on the release schedules and platform support of Numba and llvmlite. In
particular, we had to skip Python 3.14 builds on Intel macOS because
newer versions of Numba and llvmlite no longer provided wheels for that
platform.

[This was already one of the motivations when we started the migration.](https://github.com/shap/shap/wiki/ESoC-2026-Project-Ideas)

With Python 3.15 coming up, we wanted SHAP to be ready from day one.
And we are: SHAP 0.53 already builds and runs its tests against Python
3.15 release candidates.

[See the SHAP 0.53.0rc0 release notes.](https://github.com/shap/shap/releases/tag/v0.53.0rc0)

Removing Numba and llvmlite gives us more control over when we can
support new Python versions. But that isn't the only benefit.

## What this means for SHAP users

### Faster support for new Python versions

SHAP is now less dependent on the release schedules and compatibility
constraints of other projects when adding support for a new Python
version.

At the time of writing, the latest Numba release supports Python
versions below 3.15, while SHAP already builds and tests against Python
3.15 release candidates.

[See Numba's Python version support matrix.](https://numba.readthedocs.io/en/stable/user/installing.html#version-support-information)

### Fewer dependencies, fewer constraints

Numba and llvmlite are no longer runtime dependencies of SHAP.

Fewer dependencies mean fewer opportunities for version conflicts and
give users more freedom in the environments in which they install SHAP.

They also reduce SHAP's download footprint: Numba and especially
llvmlite aren't small dependencies.

### From JIT to AOT compilation

The performance-critical functionality previously compiled at runtime
by Numba is now implemented in C++ and compiled ahead of time.

Performance was not the motivation for this migration. Our goal was to
keep performance roughly comparable while removing the runtime compiler
dependency.

You can follow SHAP's performance across commits in our
[continuous ASV benchmarks](https://shap.github.io/asv-runner/).

The important change is when and where compilation happens: users no
longer need SHAP's JIT compiler stack at runtime.

### Supporting SHAP on more platforms

Removing Numba and llvmlite also removes some platform restrictions that
came with those dependencies.

One concrete example is Intel macOS. Numba 0.63 and llvmlite 0.46
dropped macOS x86-64 wheels. SHAP therefore had to pin older versions
of both dependencies and skip Python 3.14 builds on Intel Macs.

After removing these dependencies, SHAP can build for Python 3.14 on
Intel macOS again.

The same change also removed one of the blockers for free-threaded
Python builds.

### Towards SHAP in the browser

Moving to ahead-of-time compiled C++ also gives us a much clearer path
towards WebAssembly.

There is experimental work on bringing Numba and llvmlite to WebAssembly
as well, but there is currently no established production path for this.

For SHAP, removing this runtime compiler stack makes WebAssembly a much
simpler target.

And this is no longer just theoretical: work on building SHAP for
Pyodide and JupyterLite is already underway.

SHAP is coming to the browser.

[Follow the WebAssembly work here.](https://github.com/shap/shap/pull/5142)

## The maintainer perspective

There are always tradeoffs, and we have to pay a price for this.

We now own and maintain more C++ code ourselves. This moves some
complexity from our dependency stack into the SHAP codebase.

At the same time, nanobind allows us to target Python's Stable ABI.
Instead of building separate wheels for every supported Python version,
we can reuse the same binary across multiple Python versions.

For example, SHAP 0.52 ships `cp312-abi3` wheels: a single wheel can be
used across compatible CPython versions starting with Python 3.12.

That means fewer binaries to build and publish with every release.


Thanks to the [German Center for Open-Source AI](gcos.ai) for financing this project and
to [Zhihao Dai](https://github.com/daidahaohttps://github.com/daidahao) for driving the implementation.
