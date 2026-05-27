import { notFound } from "next/navigation";
import { getJobById } from "@/lib/jobs";
import { StatusBadge } from "@/components/ui/Badge";
import { PACKAGE_SIZE_LABELS } from "@/types";
import { ClaimButton } from "./ClaimButton";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let job;

  try {
    job = await getJobById(id);
  } catch {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-center text-slate-500">
        Klarte ikke å laste oppdraget. Sjekk at databasen kjører.
      </div>
    );
  }

  if (!job) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{job.title}</h1>
            {job.description && <p className="mt-1 text-sm text-slate-500">{job.description}</p>}
          </div>
          <StatusBadge status={job.status} />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Hentes fra</p>
              <p className="text-sm font-medium text-slate-800">{job.pickupAddress}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Leveres til</p>
              <p className="text-sm font-medium text-slate-800">{job.dropoffAddress}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-slate-400">Størrelse: </span>
              <span className="font-medium text-slate-700">{PACKAGE_SIZE_LABELS[job.packageSize]}</span>
            </div>
            {job.weightKg && (
              <div>
                <span className="text-slate-400">Vekt: </span>
                <span className="font-medium text-slate-700">{job.weightKg} kg</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Lagt ut av</p>
              <p className="text-sm font-medium text-slate-700">{job.sender.name}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 mb-0.5">Betaling</p>
              <p className="text-2xl font-bold text-orange-500">{job.pricNok} kr</p>
            </div>
          </div>
        </div>

        {job.status === "OPEN" && <ClaimButton jobId={job.id} />}

        {job.status !== "OPEN" && job.driver && (
          <div className="mt-6 rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-800">
            Sjåfør: <span className="font-medium">{job.driver.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
