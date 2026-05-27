import Link from "next/link";
import { Job, PACKAGE_SIZE_LABELS } from "@/types";
import { StatusBadge } from "@/components/ui/Badge";

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n) + "…" : str;
}

export function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="block group">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow group-hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">{job.title}</h3>
            {job.description && (
              <p className="mt-0.5 text-sm text-slate-500 truncate">{job.description}</p>
            )}
          </div>
          <StatusBadge status={job.status} />
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400 shrink-0">Fra</span>
            <span className="text-slate-700 truncate font-medium">{truncate(job.pickupAddress, 45)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400 shrink-0">Til</span>
            <span className="text-slate-700 truncate font-medium">{truncate(job.dropoffAddress, 45)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>{PACKAGE_SIZE_LABELS[job.packageSize].split(" ")[0]}</span>
            {job.weightKg && <span>{job.weightKg} kg</span>}
          </div>
          <span className="text-lg font-bold text-orange-500">{job.pricNok} kr</span>
        </div>
      </div>
    </Link>
  );
}
