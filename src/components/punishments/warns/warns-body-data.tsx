import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

import { Dictionary } from "@/lib/language/types";
import p from "@/lib/language/utils/parse";
import { getWarns, sanitizeWarns } from "@/lib/punishment/warn";

import { AvatarName } from "@/components/table/avatar-name";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";
import { PunishmentStatusDot } from "@/components/punishments/punishment-status-dot";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface WarnsBodyDataProps {
  language: string;
  dictionary: Dictionary;
  page: number;
  player?: string;
  staff?: string;
}

export const WarnsBodyData = async ({
  language,
  dictionary,
  page,
  player,
  staff
}: WarnsBodyDataProps) => {

  const localDictionary = dictionary.pages.warns;
  const dbWarns = await getWarns(page, player, staff);
  const warns = await sanitizeWarns(dbWarns);

  return (  
    <TableBody>
      {warns.map((warn) => (
        <TableRow key={warn.id}>
          <TableCell className="space-y-1 w-40 text-center">
            <AvatarName query="player" name={warn.name!} uuid={warn.uuid!} />
          </TableCell>
          <TableCell className="space-y-1 w-40 text-center">
            <AvatarName query="staff" name={warn.banned_by_name!} uuid={warn.banned_by_uuid!} console={warn.console} />
          </TableCell>
          <TableCell className="w-[292px]">
            {warn.reason}
          </TableCell>
          <TableCell className="w-[215px]">
            <RelativeTimeTooltip lang={language} time={warn.time} />
          </TableCell>
          <TableCell className="w-[200px]">
            <div className="space-y-1">
              <p className="flex items-center">
                <PunishmentStatusDot
                  dictionary={localDictionary}
                  status={warn.revoked ? false : warn.active}
                  tooltipOverride={warn.revoked ? localDictionary.table.active.revoked : undefined}
                  variant={warn.revoked ? "revoked" : undefined}
                />
                {warn.until instanceof Date && (
                  <RelativeTimeTooltip lang={language} time={warn.until} />
                )}
              </p>
              {warn.revoked && warn.removed_by_name && (
                <p className="text-xs text-muted-foreground">
                  {p(localDictionary.table.revoked_by, { staff: warn.removed_by_name ?? dictionary.words.staff })}
                </p>
              )}
              {warn.revoked && warn.removed_by_reason && (
                <p className="text-xs text-muted-foreground">{warn.removed_by_reason}</p>
              )}
            </div>
          </TableCell>
          <TableCell className="w-[150px]">
            {warn.warned ?
              <FaCheck className="mx-auto text-xl" />
              :
              <FaTimes className="mx-auto text-lg" />
            }
          </TableCell>
          <TableCell className="!pl-0 !pr-3">
            <PunishmentInfoButton type="warn" id={warn.id} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}