import { ExperienceCard, type ExperienceEntry } from "./experience-card";
import { SectionTitle } from "./section-title";

const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    company: "나무기술",
    role: "BE + FE",
    period: "2026.05 - 재직중",
    tagline: "gmrc · 국문 docx 보고서 영문 번역 도구",
    summary:
      "한국어 보고서를 올리면 영문 docx로 받아보는 사내 번역 도구. AI 번역 엔진을 뺀 나머지를 기획·BE·FE 개발부터 배포·운영·문서화까지 혼자 맡았다.",
    bullets: [
      "첨부 조립 책임을 서버(BFF)로 옮겨 FE는 국문 원본만 전송하게 함 — DB의 설비 영문본·용어집을 BE가 자동으로 붙여 로컬 LLM에 중계하고, 클라이언트는 단순하게 유지",
      "axios 에러를 {code, message, detail} 규격으로 매핑(ECONNREFUSED→503, ETIMEDOUT→504)해 장애 원인을 프론트에서 바로 식별 가능하게 함",
      "JWT 액세스/리프레시 이중 토큰 + 회전에 @Roles 가드로 권한 세분화(조회=로그인, 업로드/삭제=관리자). 업로드는 확장자 + 매직바이트 이중 검증으로 위조 차단, 토큰은 메모리 보관(XSS 차단)·single-flight refresh로 재발급 경쟁 제거",
      "피처를 api(순수 HTTP)·model(Query 훅)로 갈라 비즈니스 로직과 뷰를 독립적으로 확장. SSE는 fetch + ReadableStream으로 수동 파싱해 다중 파일 실시간 진행률 제공",
      "LLM을 GPU 근처에 두려고 client / api 2-서버로 분리 — 추론 지연을 줄이면서 프론트 배포를 독립화. 멀티스테이지 Dockerfile로 빌드 캐시를 최적화하고, nginx 업스트림을 envsubst 런타임 주입해 이미지 재빌드 없이 전환",
    ],
    tech: [
      "NestJS",
      "Prisma",
      "SSE",
      "React 19",
      "TanStack Start",
      "FSD",
      "Docker",
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
      "LLM 응답이 실시간으로 흘러나오는 사내 채팅 플랫폼의 프론트엔드와 배포를 맡았다.",
    bullets: [
      "스트리밍 API마다 중복되던 중단 로직을 Mutation 팩토리(createAbortableMutation)로 통합해 중복 코드 70% 제거",
      "메시지 전송을 UI에 먼저 반영하고 대화 목록 캐시를 부분 갱신 — 체감 지연과 불필요한 전체 리렌더링·추가 API 호출을 함께 제거 (낙관적 업데이트)",
      "채팅 모드(Normal / Deep Thinking)별 로직을 전용 훅으로 분리해 기능 확장과 독립 테스트 확보",
      "Core Web Vitals 기반 번들 최적화(code splitting)·폰트 로딩 전략으로 Lighthouse 85점 이상 유지",
      "에러·상태 알림을 도메인별 Toast 헬퍼로 일원화하고, 성공/에러/경고 타입별 옵션을 차등화",
    ],
    tech: [
      "React",
      "TypeScript",
      "TanStack Query",
      "Tailwind",
      "GCP",
      "Nginx",
      "Docker",
    ],
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
