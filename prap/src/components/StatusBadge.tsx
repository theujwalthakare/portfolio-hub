type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const color = status === "ok" ? "bg-green-500" : status === "warn" ? "bg-yellow-500" : "bg-red-500";
  return <span className={`px-3 py-1 rounded text-white text-xs ${color}`}>{status}</span>;
}
