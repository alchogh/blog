import Image from "next/image";
import { Mail } from "lucide-react";
import { siteConfig } from "@/shared/config";
import { GithubIcon } from "@/shared/ui";

export function ProfileHeader() {
  return (
    <header className="flex flex-col items-center gap-5 py-10 text-center sm:flex-row sm:gap-6 sm:text-left">
      <div className="border-border relative aspect-3/4 w-32 shrink-0 overflow-hidden rounded-lg border sm:w-36">
        <Image
          src="/profile.jpg"
          alt="조건호 프로필 사진"
          fill
          sizes="(min-width: 640px) 144px, 128px"
          className="object-cover"
          priority
        />
      </div>
      <div className="flex flex-col items-center gap-1.5 sm:items-start">
        <h1 className="text-2xl font-bold tracking-tight">조건호</h1>
        <p className="text-muted-foreground text-sm">
          Frontend Engineer · @{siteConfig.author.name}
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 sm:justify-start">
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="text-muted-foreground hover:text-foreground focus-visible:text-foreground focus-visible:ring-ring inline-flex items-center gap-1.5 rounded-sm text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <Mail className="h-3.5 w-3.5" />
            {siteConfig.author.email}
          </a>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground focus-visible:text-foreground focus-visible:ring-ring inline-flex items-center gap-1.5 rounded-sm text-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
