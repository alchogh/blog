import { SectionTitle } from "./section-title";

const PRINCIPLES = [
  "관심사 분리와 DI를 우선합니다. 컴포넌트와 로직, 서버 상태와 클라이언트 상태의 경계를 명확히 갈라둡니다.",
  "FSD를 그대로 따르지 않고 프로젝트 규모에 맞게 변형 적용합니다. 이론보다 코드베이스의 가독성이 우선입니다.",
  "서버 상태는 TanStack Query, UI 상태는 Zustand로 역할을 갈라 중복 관리를 피합니다.",
] as const;

export function PrinciplesSection() {
  return (
    <section>
      <SectionTitle>Principles</SectionTitle>
      <ol className="space-y-3">
        {PRINCIPLES.map((text, idx) => (
          <li key={text} className="flex gap-3 text-sm leading-relaxed">
            <span className="text-muted-foreground/60 pt-0.5 text-xs tabular-nums">
              0{idx + 1}
            </span>
            <span className="text-foreground/85">{text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
