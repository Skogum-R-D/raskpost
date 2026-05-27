import Link from "next/link";
import { getOpenJobs } from "@/lib/jobs";
import { JobCard } from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/Button";
import { Job } from "@/types";

export const revalidate = 30;

export default async function JobBoardPage() {
  let jobs: Job[] = [];
  let error = false;

  try {
    const raw = await getOpenJobs();
    jobs = raw.map((j) => ({
      ...j,
      createdAt: j.createdAt.toISOString(),
      claimedAt: j.claimedAt?.toISOString() ?? null,
      pickedUpAt: j.pickedUpAt?.toISOString() ?? null,
      deliveredAt: j.deliveredAt?.toISOString() ?? null,
    })) as Job[];
  } catch {
    error = true;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ledige oppdrag</h1>
          <p className="mt-1 text-sm text-slate-500">
            {error ? "Kunne ikke laste oppdrag" : `${jobs.length} oppdrag tilgjengelig`}
          </p>
        </div>
        <Link href="/jobs/new">
          <Button>Legg ut pakke</Button>
        </Link>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Klarte ikke å hente oppdrag. Sjekk at databasen kjører.
        </div>
      )}

      {!error && jobs.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white py-20 text-center">
          <p className="text-slate-400 mb-4">Ingen ledige oppdrag akkurat nå</p>
          <Link href="/jobs/new">
            <Button>Legg ut det første oppdraget</Button>
          </Link>
        </div>
      )}

      {jobs.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
