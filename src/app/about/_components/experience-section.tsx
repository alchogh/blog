import { ExperienceCard, type ExperienceEntry } from "./experience-card";
import { SectionTitle } from "./section-title";

const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    company: "나무기술",
    period: "2025.07 - 재직중",
    tagline: "NAA · 실시간 AI 스트리밍·LLM 플랫폼",
    bullets: [
      "스트리밍 채팅 구조 설계 및 AbortController 기반 중단 처리",
      "TanStack Query 기반 낙관적 업데이트",
      "도메인별 Toast 시스템 운영",
    ],
    tech: ["React", "TypeScript", "Tailwind", "GCP", "Nginx", "Docker"],
  },
  {
    company: "Loud AI",
    period: "2024.09 - 2025.05",
    tagline: "LoudGen · AI 챗봇",
    bullets: [
      "Next.js 15 App Router 마이그레이션",
      "FSD 구조 도입",
      "서버/클라이언트 상태 분리",
      "LoudGen 패키지화",
    ],
    tech: ["React", "SCSS", "tmux"],
  },
  {
    company: "한국 클라우드",
    period: "2024.03 - 2024.09",
    bullets: [
      "기업 홈페이지 제작",
      "AWS S3 + CloudFront 정적 배포 환경 구성",
    ],
    tech: ["Next.js", "Docker", "AWS S3", "CloudFront"],
  },
  {
    company: "한국 클라우드",
    period: "2023.09 - 2024.02",
    tagline: "AI 챗봇 마이그레이션",
    bullets: [
      "Page Router 챗봇을 App Router로 마이그레이션",
      "SSE 기반 스트리밍 응답 처리 구현",
    ],
    tech: ["Next.js", "Docker", "AWS S3", "CloudFront"],
  },
];

export function ExperienceSection() {
  return (
    <section>
      <SectionTitle>Work Experience</SectionTitle>
      <div className="space-y-4">
        {EXPERIENCE.map((entry) => (
          <ExperienceCard
            key={`${entry.company}-${entry.period}`}
            entry={entry}
          />
        ))}
      </div>
    </section>
  );
}
