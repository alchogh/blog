import type { Metadata } from "next";
import { Container } from "@/shared/ui";
import {
  BootcampSection,
  EducationSection,
  ExperienceSection,
  Intro,
  PrinciplesSection,
  ProfileHeader,
} from "./_components";

export const metadata: Metadata = {
  title: "About",
  description:
    "팀이 함께 보기 좋은 코드를 고민하는 프론트엔드 개발자. 관심사 분리와 구조 설계에 집중합니다.",
};

export default function AboutPage() {
  return (
    <Container
      size="prose"
      className="[font-family:var(--font-geist),var(--font-wanted-sans),system-ui,sans-serif]"
    >
      <ProfileHeader />
      <div className="space-y-14 pb-20">
        <Intro />
        <PrinciplesSection />
        <ExperienceSection />
        <BootcampSection />
        <EducationSection />
      </div>
    </Container>
  );
}
