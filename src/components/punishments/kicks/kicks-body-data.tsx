import { getKicks, sanitizeKicks } from "@/lib/punishment/kick";

import { AvatarName } from "@/components/table/avatar-name";
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface KicksBodyDataProps {
  language: string;
  page: number;
  player?: string;
  staff?: string;
}

export const KicksBodyData = async ({
  language,
  page,
  player,
  staff
}: KicksBodyDataProps) => {

  const dbKicks = await getKicks(page, player, staff);
  const kicks = await sanitizeKicks(dbKicks);

  return (  
    <TableBody>
      {kicks.map((kick) => (
        <TableRow key={kick.id}>
          <TableCell className="text-center w-16 !px-1">
            {kick.id}
          </TableCell>
          <TableCell className="space-y-1 w-40 text-center">
            <AvatarName query="player" name={kick.name!} uuid={kick.uuid!} />
          </TableCell>
          <TableCell className="space-y-1 w-40 text-center">
            <AvatarName query="staff" name={kick.banned_by_name!} uuid={kick.banned_by_uuid!} console={kick.console} />
          </TableCell>
          <TableCell className="text-center w-32">
            {kick.server ?? "-"}
          </TableCell>
          <TableCell className="w-[260px]">
            {kick.reason}
          </TableCell>
          <TableCell className="w-[150px]">
            <RelativeTimeTooltip lang={language} time={kick.time} />
          </TableCell>
          <TableCell className="!pl-0 !pr-3">
            <PunishmentInfoButton type="kick" id={kick.id} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}