import { TableBody } from "@/components/ui/table";
import { HistoryRowSkeleton } from "@/components/punishments/history/history-row-skeleton";

export const HistoryBodySkeleton = ({ idOnEdge = false }: { idOnEdge?: boolean }) => (
  <TableBody>
    {Array.from({ length: 10 }).map((_, index) => (
      <HistoryRowSkeleton key={index} idOnEdge={idOnEdge} />
    ))}
  </TableBody>
)