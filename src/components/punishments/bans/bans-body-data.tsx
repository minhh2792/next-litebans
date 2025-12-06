import { Dictionary } from "@/lib/language/types";
import { getBans, sanitizeBans } from "@/lib/punishment/ban";
import p from "@/lib/language/utils/parse";

import { AvatarName } from "@/components/table/avatar-name";
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";
import { PunishmentStatusDot } from "@/components/punishments/punishment-status-dot";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface BansBodyDataProps {
  language: string;
  dictionary: Dictionary;
  page: number;
  player?: string;
  staff?: string;
}

export const BansBodyData = async ({
  language,
  dictionary,
  page,
  player,
  staff
}: BansBodyDataProps) => {

  const localDictionary = dictionary.pages.bans;
  const dbBans = await getBans(page, player, staff);
  const bans = await sanitizeBans(localDictionary, dbBans);

  return (  
    <TableBody>
      {bans.map((ban) => (
        <TableRow key={ban.id}>
          <TableCell className="text-center w-16 !px-1">
            {ban.id}
          </TableCell>
          <TableCell className="space-y-1 w-40 text-center">
            <AvatarName query="player" name={ban.name!} uuid={ban.uuid!} />
          </TableCell>
          <TableCell className="space-y-1 w-40 text-center">
            <AvatarName query="staff" name={ban.banned_by_name!} uuid={ban.banned_by_uuid!} console={ban.console} />
          </TableCell>
          <TableCell className="text-center w-32">
            {ban.server ?? "-"}
          </TableCell>
          <TableCell className="w-[200px]">
            {ban.reason}
          </TableCell>
          <TableCell className="w-[150px]">
            <RelativeTimeTooltip lang={language} time={ban.time} />
          </TableCell>
          <TableCell className="w-[200px]">
            <div className="space-y-1">
              <p className="flex items-center">
                <PunishmentStatusDot
                  dictionary={localDictionary}
                  status={ban.status}
                  tooltipOverride={ban.statusTooltip}
                  variant={ban.revoked ? "revoked" : undefined}
                />
                <RelativeTimeTooltip lang={language} time={ban.until} />
              </p>
              {ban.revoked && ban.removed_by_name && (
                <p className="text-xs text-muted-foreground">
                    {p(localDictionary.table.revoked_by, { staff: ban.removed_by_name ?? dictionary.words.staff })}
                </p>
              )}
              {ban.revoked && ban.removed_by_reason && (
                <p className="text-xs text-muted-foreground">{ban.removed_by_reason}</p>
              )}
            </div>
          </TableCell>
          <TableCell className="!pl-0 !pr-3">
            <PunishmentInfoButton type="ban" id={ban.id} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}