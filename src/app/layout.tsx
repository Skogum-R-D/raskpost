import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raskpost — Rask pakkelevering mellom privatpersoner",
  description: "Post et leveringsoppdrag og få pakken din levert av en sjåfør i nærheten — raskere enn posten.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Raskpost — Raskere enn posten
        </footer>
      </body>
    </html>
  );
}
