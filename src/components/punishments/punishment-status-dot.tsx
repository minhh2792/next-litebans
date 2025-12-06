import { cn } from "@/lib/utils";
import { Dictionary } from "@/lib/language/types"

import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface PunishmentStatusDotProps {
  dictionary: Dictionary
  status: boolean | undefined
  tooltipOverride?: string
  variant?: "revoked"
  showLabel?: boolean
}

export const PunishmentStatusDot = ({
  dictionary,
  status,
  tooltipOverride,
  variant,
  showLabel
}: PunishmentStatusDotProps) => {
  const label = tooltipOverride ?? (status === undefined ? dictionary.table.active.temporal : (status ? dictionary.table.active.true : dictionary.table.active.false));

  return (
  <TooltipProvider delayDuration={50}>
    <Tooltip>
      <TooltipTrigger asChild>
        <span 
          className={cn(
            variant === "revoked" ?
              "bg-blue-500" :
            status === undefined ? 
              "bg-orange-500" :
              status ? "bg-green-500" : "bg-red-500",
            "flex rounded-full p-1 mr-2"
          )} 
        />
      </TooltipTrigger>
      <TooltipContent>
        {label}
      </TooltipContent>
    </Tooltip>
    {showLabel && (
      <span className="text-sm text-muted-foreground">{label}</span>
    )}
  </TooltipProvider>
  )
}