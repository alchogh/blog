<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Rules (read before writing code)

이 프로젝트는 **개인 개발 블로그**다. 클린 코드 / SRP / 함수형 우선 / 라이트 FSD를 지킨다. 오버엔지니어링은 명시적으로 거부한다.

코드 작성·수정·리팩토링 전에 해당 영역의 규칙 문서를 확인할 것:

- [.claude/skills/fsd-lite/SKILL.md](.claude/skills/fsd-lite/SKILL.md) — 레이어/슬라이스 구조, import 방향, 새 도메인 추가 규칙.
- [.claude/skills/clean-code/SKILL.md](.claude/skills/clean-code/SKILL.md) — SRP, 함수형 우선·class 사용 시점, 명명, 주석, 추상화 원칙.
- [.claude/skills/nextjs-app-router/SKILL.md](.claude/skills/nextjs-app-router/SKILL.md) — Server/Client 경계, 데이터 페칭, 캐싱, React 19 패턴.
- [.claude/skills/backend/SKILL.md](.claude/skills/backend/SKILL.md) — Supabase + Route Handler, 보안 경계, 원자성(RPC), 마이그레이션.

규칙끼리 충돌하면 **clean-code > fsd-lite > 그 외** 순으로 우선. 규칙이 현재 코드와 다르게 보이면 바로 고치지 말고 먼저 사용자에게 확인.

