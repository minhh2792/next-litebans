import { Dictionary } from "@/lib/language/types";
import { getMutes, sanitizeMutes } from "@/lib/punishment/mute";
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

interface MutesBodyDataProps {
  language: string;
  dictionary: Dictionary;
  page: number;
  player?: string;
  staff?: string;
}

export const MutesBodyData = async ({
  language,
  dictionary,
  page,
  player,
  staff
}: MutesBodyDataProps) => {

  const localDictionary = dictionary.pages.mutes;
  const dbMutes = await getMutes(page, player, staff);
  const mutes = await sanitizeMutes(localDictionary, dbMutes);

  return (  
    <TableBody>
      {mutes.map((mute) => (
        <TableRow key={mute.id}>
          <TableCell className="text-center w-16 !px-1">
            {mute.id}
          </TableCell>
          <TableCell className="space-y-1 w-40 text-center">
            <AvatarName query="player" name={mute.name!} uuid={mute.uuid!} />
          </TableCell>
          <TableCell className="space-y-1 w-40 text-center">
            <AvatarName query="staff" name={mute.banned_by_name!} uuid={mute.banned_by_uuid!} console={mute.console} />
          </TableCell>
          <TableCell className="text-center w-32">
            {mute.server ?? "-"}
          </TableCell>
          <TableCell className="w-[200px]">
            {mute.reason}
          </TableCell>
          <TableCell className="w-[150px]">
            <RelativeTimeTooltip lang={language} time={mute.time} />
          </TableCell>
          <TableCell className="w-[200px]">
            <div className="space-y-1">
              <p className="flex items-center">
                <PunishmentStatusDot
                  dictionary={localDictionary}
                  status={mute.status}
                  tooltipOverride={mute.statusTooltip}
                  variant={mute.revoked ? "revoked" : undefined}
                />
                <RelativeTimeTooltip lang={language} time={mute.until} />
              </p>
              {mute.revoked && mute.removed_by_name && (
                <p className="text-xs text-muted-foreground">
                    {p(localDictionary.table.revoked_by, { staff: mute.removed_by_name ?? dictionary.words.staff })}
                </p>
              )}
              {mute.revoked && mute.removed_by_reason && (
                <p className="text-xs text-muted-foreground">{mute.removed_by_reason}</p>
              )}
            </div>
          </TableCell>
          <TableCell className="!pl-0 !pr-3">
            <PunishmentInfoButton type="mute" id={mute.id} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}