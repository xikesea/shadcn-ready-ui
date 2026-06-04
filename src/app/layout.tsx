import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const BASE_URL = "https://shadcn-ready-ui.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Shadcn Ready UI",
    template: "%s | Shadcn Ready UI",
  },
  description: "Production-ready shadcn/ui components for complex real-world projects. Tables, forms, file managers, ACL trees, and more.",
  keywords: ["shadcn", "shadcn/ui", "react", "nextjs", "tailwind", "typescript", "ui components"],
  authors: [{ name: "xikesea", url: "https://github.com/xikesea" }],
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Shadcn Ready UI",
    title: "Shadcn Ready UI",
    description: "Production-ready shadcn/ui components for complex real-world projects.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadcn Ready UI",
    description: "Production-ready shadcn/ui components for complex real-world projects.",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavigationProgress } from "@/components/navigation-progress";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <NavigationProgress />
            <Header />
            <main className="flex-1">{children}</main>
            <Toaster />
            <Analytics />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
