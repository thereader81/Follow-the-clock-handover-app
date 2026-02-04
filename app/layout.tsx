import type { Metadata } from "next";
import "./globals.css";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "600", "700", "800"]
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"]
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Helix | Follow-the-Sun Orchestrator",
  description: "AI-powered global handover intelligence platform for seamless 24/7 delivery"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-[var(--bg-base)] text-[var(--text-secondary)]">
        <AuthProvider>
          {/* Gradient background effects */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(61,155,155,0.16),_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(212,168,83,0.12),_transparent_45%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(167,139,250,0.16),_transparent_40%)]" />
            <div className="noise-layer absolute inset-0 opacity-60" />
          </div>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
