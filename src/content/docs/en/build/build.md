---
title: Build Overview
description: Baseline information for building Wine and DXMT.
---

## Build Targets

This page summarizes the build baseline used by the Bob-Ddong-Iri-Hoyo launcher.
Regular launcher users do not need to build these components manually.

| Component | Version |
| --- | --- |
| CrossOver Wine | `26.1.0` |
| DXMT | `0.80` |

## Cross-Compiler Setup

The build process uses two toolchains for different purposes.

- Wine uses a `mingw` toolchain to build Windows-targeted binaries.
- DXMT uses an `llvm`-based toolchain for the Metal translation layer.

The Wine toolchain is prepared from a downloadable toolchain package.
The DXMT `llvm` setup is kept separate so the build flow stays aligned with the DXMT build guide.

When a build fails, first check whether the Wine, DXMT, `mingw`, and `llvm` versions match the expected baseline.
Small dependency differences can cause build errors or runtime issues in compatibility-layer projects.
