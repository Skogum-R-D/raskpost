"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PackageSize, PACKAGE_SIZE_LABELS } from "@/types";

const sizes = Object.entries(PACKAGE_SIZE_LABELS) as [PackageSize, string][];

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      title: form.get("title"),
      description: form.get("description") || undefined,
      pickupAddress: form.get("pickupAddress"),
      pickupLat: 0,
      pickupLng: 0,
      dropoffAddress: form.get("dropoffAddress"),
      dropoffLat: 0,
      dropoffLng: 0,
      packageSize: form.get("packageSize"),
      weightKg: form.get("weightKg") ? Number(form.get("weightKg")) : undefined,
      pricNok: Number(form.get("pricNok")),
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const { error: msg } = await res.json();
        throw new Error(msg || "Noe gikk galt");
      }

      const { id } = await res.json();
      router.push(`/jobs/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noe gikk galt");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Legg ut pakke</h1>
      <p className="text-sm text-slate-500 mb-8">Fyll inn detaljer, så henter en sjåfør den for deg.</p>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tittel</label>
          <input
            name="title"
            required
            placeholder="F.eks. «Stor eske til Stavanger»"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Beskrivelse (valgfri)</label>
          <textarea
            name="description"
            rows={2}
            placeholder="Skjøre gjenstander, spesielle instruksjoner…"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Henteadresse</label>
            <input
              name="pickupAddress"
              required
              placeholder="Gate og sted"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Leveringsadresse</label>
            <input
              name="dropoffAddress"
              required
              placeholder="Gate og sted"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Pakkestørrelse</label>
          <div className="grid grid-cols-2 gap-2">
            {sizes.map(([value, label]) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-orange-400 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                <input type="radio" name="packageSize" value={value} required className="accent-orange-500" />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Vekt (kg, valgfri)</label>
            <input
              name="weightKg"
              type="number"
              min="0"
              step="0.1"
              placeholder="0.0"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tilbudt pris (NOK)</label>
            <input
              name="pricNok"
              type="number"
              min="1"
              required
              placeholder="200"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">{error}</div>
        )}

        <Button type="submit" size="lg" className="w-full" loading={loading}>
          Legg ut oppdraget
        </Button>
      </form>
    </div>
  );
}
