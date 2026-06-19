import { ExperienceCard, type ExperienceEntry } from "./experience-card";
import { SectionTitle } from "./section-title";

const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    company: "나무기술",
    role: "BE + FE",
    period: "2026.05 - 재직중",
    tagline: "gmrc · 국문 docx 보고서 영문 번역 도구",
    summary:
      "한국어 보고서를 올리면 영문 docx로 받아보는 사내 번역 도구. AI 번역 엔진을 뺀 FE·BE 개발부터 배포·운영·문서화까지 전 과정을 맡았다.",
    bullets: [
      "보고서에 DB의 설비 영문본·용어집을 합쳐 AI로 보내고, 진행률(SSE)·결과 파일을 스트리밍으로 되돌리는 중계 서버 설계 — AI 장애별 한글 에러 처리 포함",
      "설비·용어집 저장 구조(Prisma · SQLite), 업로드 검증·한글 파일명 복원",
      "업로드 → 진행률 → 영문 docx 다운로드 변환 화면 구현",
      "GPU 서버(BE·AI, 외부 차단)와 GCP(FE, nginx)로 분리 배포·인바운드 출처 제한, 세 서비스 단일 레포 통합 + ./dev.sh 원커맨드 기동, CodeRabbit PR 리뷰 자동화",
    ],
    tech: [
      "NestJS",
      "Prisma",
      "SSE",
      "React 19",
      "TanStack Start",
      "FSD",
      "nginx",
      "GCP",
    ],
  },
  {
    company: "나무기술",
    role: "FE",
    period: "2025.07 - 2026.05",
    tagline: "NAA · 사내 LLM 채팅 플랫폼",
    summary:
      "LLM 응답이 실시간으로 흘러나오는 사내 채팅 플랫폼의 프론트엔드를 맡았다.",
    bullets: [
      "응답 생성 중에도 화면이 멈춰 보이지 않는 스트리밍 채팅 화면 구현 (중단 가능, AbortController)",
      "메시지 전송 즉시 UI에 먼저 반영해 체감 지연 제거 (낙관적 업데이트)",
      "에러·상태 알림을 도메인별 Toast로 일원화",
    ],
    tech: ["React", "TypeScript", "Tailwind", "GCP", "Nginx", "Docker"],
  },
  {
    company: "Loud AI",
    role: "FE",
    period: "2024.09 - 2025.05",
    tagline: "LoudGen · AI 챗봇",
    summary: "AI 챗봇 LoudGen의 프론트엔드 구조를 다시 잡고 사내 패키지로 분리했다.",
    bullets: [
      "Page Router로 쌓인 챗봇을 App Router로 옮겨 라우팅·렌더링 구조 정리 (Next.js 15)",
      "기능별로 흩어진 코드를 FSD로 재구성해 경계 명확화",
      "서버 상태와 클라이언트 상태를 분리해 중복 관리 제거",
      "LoudGen을 사내 재사용 가능한 패키지로 분리",
    ],
    tech: ["React", "Next.js", "SCSS", "tmux"],
  },
  {
    company: "한국 클라우드",
    role: "FE",
    period: "2024.03 - 2024.09",
    bullets: [
      "기업 홈페이지 신규 구축",
      "S3 + CloudFront로 정적 배포 파이프라인 구성",
    ],
    tech: ["Next.js", "Docker", "AWS S3", "CloudFront"],
  },
  {
    company: "한국 클라우드",
    role: "FE",
    period: "2023.09 - 2024.02",
    tagline: "AI 챗봇",
    bullets: [
      "Page Router 챗봇을 App Router로 이전",
      "SSE로 LLM 응답을 실시간 스트리밍 처리",
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
