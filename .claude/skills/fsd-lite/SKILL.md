---
name: fsd-lite
description: 개인 블로그용 라이트 FSD. 레이어/슬라이스/세그먼트 규칙과 import 방향.
---

# FSD Lite — 블로그용 간소화 FSD

이 프로젝트는 풀 FSD가 아니라 **3개 레이어**만 쓴다. 오버엔지니어링 방지가 우선.

## 사용하는 레이어

```
src/
├── app/        # Next.js App Router (페이지/라우트/API)
├── entities/   # 도메인 단위 (post, stats, ...)
└── shared/     # 어디서나 쓰는 것 (ui, lib, config, providers, mdx)
```

`features/`, `widgets/`, `pages/`, `processes/`는 **만들지 않는다**. 정말 필요해질 때만 추가하고, 그 전엔 entities/shared로 해결.

## 슬라이스 내부 세그먼트

각 entity 슬라이스는 필요한 세그먼트만 둔다.

```
entities/<name>/
├── ui/      # 이 도메인 전용 컴포넌트
├── model/   # 타입, 도메인 로직, 상수
├── lib/     # 이 도메인 전용 순수 헬퍼
├── api/     # 데이터 페칭/뮤테이션 (server-only일 수 있음)
└── index.ts # public API 배럴
```

세그먼트가 비어있을 거면 만들지 말 것.

## Import 방향 (단방향)

```
app  →  entities  →  shared
```

- 역방향 금지: `shared`는 `entities`를 모르고, `entities`는 `app`을 모름.
- **같은 레이어 슬라이스끼리 import 금지**: `entities/post`는 `entities/stats`를 import 하면 안 됨. 두 도메인을 합쳐야 한다면 `app` 또는 `widgets`(추후 도입 시)에서 조합.
- 슬라이스 내부 파일 간 import는 자유. 단, 외부에서 들어올 때는 항상 슬라이스 `index.ts`를 통해.

## Public API 규칙

- 슬라이스/세그먼트는 `index.ts`로만 외부에 공개. 내부 파일 직접 import 금지 (`@/entities/post/ui/post-card` ❌ → `@/entities/post` ✅).
- 슬라이스가 export하지 않는 건 외부에 안 보여야 함. 누수되면 캡슐화 깨진 신호.

## 새 도메인 추가 체크리스트

1. `entities/<name>/`에 필요한 세그먼트만 만든다.
2. 각 세그먼트에 `index.ts`로 배럴.
3. 슬라이스 루트 `index.ts`에서 `export * from "./api"; export * from "./model"; ...`
4. 다른 도메인을 끌어다 써야 하면 그건 entity가 아니라 widget/feature 신호 — 한 번 멈추고 재검토.

## 안티 패턴

- ❌ `shared/lib`에 도메인 지식이 들어감 (예: `shared/lib/post-utils.ts`) → `entities/post/lib`로.
- ❌ `entities/post`가 `entities/stats`를 import.
- ❌ 슬라이스 내부 파일을 외부에서 직접 import.
- ❌ "혹시 몰라서" 빈 `features/`, `widgets/` 폴더 만들기.
