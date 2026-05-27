import { JobStatus } from "@/types";

const statusStyles: Record<JobStatus, string> = {
  OPEN: "bg-green-100 text-green-800",
  CLAIMED: "bg-blue-100 text-blue-800",
  PICKED_UP: "bg-yellow-100 text-yellow-800",
  DELIVERED: "bg-slate-100 text-slate-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const statusLabels: Record<JobStatus, string> = {
  OPEN: "Ledig",
  CLAIMED: "Reservert",
  PICKED_UP: "Hentet",
  DELIVERED: "Levert",
  CANCELLED: "Avlyst",
};

export function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
