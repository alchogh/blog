import type { Metadata } from "next";
import { pretendard, siteConfig } from "@/shared/config";
import { ThemeProvider, ThemeScript } from "@/shared/providers";
import { Footer, Header } from "@/shared/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <ThemeScript />
        <ThemeProvider>
          <Header />
          <main className="flex-1 py-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
