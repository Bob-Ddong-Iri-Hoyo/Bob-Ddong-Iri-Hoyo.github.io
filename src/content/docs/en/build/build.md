---
title: 빌드 시작하기
description: 빌드 관련 문서입니다.
---

import { Card, CardGrid } from '@astrojs/starlight/components';

## Wine(와인) 기반

<CardGrid>
  <Card title="CrossOver Wine">
    <p>Version: <code>26.1.0</code></p>
  </Card>

  <Card title="DMXT">
    <p>Version: <code>0.80</code></p>
  </Card>
</CardGrid>

## CrossCompiler 빌드 및 설치

2가지 크로스 컴파일러를 사용한다.

- `mingw` 툴체인
- `dxmt` 빌드에 필요한 `llvm`

이는 실제 빌드 관련 GitHub에 공개되어 있다.