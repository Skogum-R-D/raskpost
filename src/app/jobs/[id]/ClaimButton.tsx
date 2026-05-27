"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function ClaimButton({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function claim() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/jobs/${jobId}/claim`, { method: "POST" });
      if (!res.ok) {
        const { error: msg } = await res.json();
        throw new Error(msg || "Klarte ikke å reservere oppdraget");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noe gikk galt");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      {error && (
        <div className="mb-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">{error}</div>
      )}
      <Button size="lg" className="w-full" onClick={claim} loading={loading}>
        Ta oppdraget
      </Button>
    </div>
  );
}
