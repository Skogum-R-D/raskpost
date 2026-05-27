"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Feil e-post eller passord");
      setLoading(false);
      return;
    }

    router.push(params.get("callbackUrl") || "/jobs");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">E-post</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="deg@eksempel.no"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Passord</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      <Button type="submit" size="lg" className="w-full" loading={loading}>
        Logg inn
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Logg inn</h1>
        <p className="mt-1 text-sm text-slate-500">Velkommen tilbake til Raskpost</p>
      </div>

      <Suspense fallback={<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-48 animate-pulse" />}>
        <LoginForm />
      </Suspense>

      <p className="mt-4 text-center text-sm text-slate-500">
        Har du ikke konto?{" "}
        <Link href="/register" className="font-medium text-orange-500 hover:text-orange-600">
          Registrer deg
        </Link>
      </p>
    </div>
  );
}
