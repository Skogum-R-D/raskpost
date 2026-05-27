"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const confirm = form.get("confirm") as string;

    if (password !== confirm) {
      setError("Passordene stemmer ikke overens");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          password,
          role: form.get("role"),
        }),
      });

      if (!res.ok) {
        const { error: msg } = await res.json();
        throw new Error(msg || "Registrering feilet");
      }

      await signIn("credentials", {
        email: form.get("email"),
        password,
        redirect: false,
      });

      router.push("/jobs");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noe gikk galt");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Opprett konto</h1>
        <p className="mt-1 text-sm text-slate-500">Kom i gang med Raskpost</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Navn</label>
          <input
            name="name"
            required
            placeholder="Ola Nordmann"
            autoComplete="name"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">E-post</label>
          <input
            name="email"
            type="email"
            required
            placeholder="deg@eksempel.no"
            autoComplete="email"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Passord</label>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="Minst 8 tegn"
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Bekreft passord</label>
          <input
            name="confirm"
            type="password"
            required
            placeholder="••••••••"
            autoComplete="new-password"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Jeg vil</label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-orange-400 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
              <input type="radio" name="role" value="SENDER" required className="accent-orange-500" defaultChecked />
              <span>Sende pakker</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-orange-400 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
              <input type="radio" name="role" value="DRIVER" className="accent-orange-500" />
              <span>Levere pakker</span>
            </label>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">{error}</div>
        )}

        <Button type="submit" size="lg" className="w-full" loading={loading}>
          Opprett konto
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-500">
        Har du allerede konto?{" "}
        <Link href="/login" className="font-medium text-orange-500 hover:text-orange-600">
          Logg inn
        </Link>
      </p>
    </div>
  );
}
