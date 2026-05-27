import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-slate-900">Rask<span className="text-orange-500">post</span></span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
          <Link href="/jobs" className="hover:text-slate-900 transition-colors">Se oppdrag</Link>
          <Link href="/driver" className="hover:text-slate-900 transition-colors">Bli sjåfør</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/jobs/new">
            <Button size="sm">Legg ut pakke</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
