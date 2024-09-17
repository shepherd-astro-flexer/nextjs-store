import { Skeleton } from "../ui/skeleton";

function LoadingTable({ rows = 5 }: { rows?: number }) {
  const tableRows = Array.from({ length: rows }, (_, idx) => {
    return <Skeleton key={idx} className="w-full h-8 rounded" />;
  });

  return <div className="grid gap-y-4">{tableRows}</div>;
}
export default LoadingTable;
