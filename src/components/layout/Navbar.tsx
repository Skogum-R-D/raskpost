import Link from "next/link";
import { auth, signOut } from "@auth";
import { Button } from "@/components/ui/Button";

export async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-slate-900">Rask<span className="text-orange-500">post</span></span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
          <Link href="/jobs" className="hover:text-slate-900 transition-colors">Se oppdrag</Link>
          {!user && (
            <Link href="/register" className="hover:text-slate-900 transition-colors">Bli sjåfør</Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-sm text-slate-600 sm:block">
                {user.name}
                <span className="ml-1.5 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                  {user.role === "DRIVER" ? "Sjåfør" : "Avsender"}
                </span>
              </span>
              <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
                <Button type="submit" variant="ghost" size="sm">Logg ut</Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Logg inn</Button>
              </Link>
              <Link href="/jobs/new">
                <Button size="sm">Legg ut pakke</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
