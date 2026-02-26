import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Engineering Roadmap Tracker",
  description:
    "A 6-month transition plan from Senior Software Engineer to Applied LLM Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-surface-0 text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
