import { Prisma } from "@prisma/client";
import { siteConfig } from "@config/site";
import { PunishmentListItem } from "@/types";

import { db } from "../db";
import { Dictionary } from "../language/types";
import p from "../language/utils/parse";
import { stripColorCodes } from "../utils";

const getPunishmentCount = async (player?: string, staff?: string) => {
  const bans = await db.litebans_bans.count({
    where: {
      uuid: player,
      banned_by_uuid: staff
    }
  });
  const mutes = await db.litebans_mutes.count({
    where: {
      uuid: player,
      banned_by_uuid: staff
    }
  });
  const warns = await db.litebans_warnings.count({
    where: {
      uuid: player,
      banned_by_uuid: staff
    }
  });
  const kicks = await db.litebans_kicks.count({
    where: {
      uuid: player,
      banned_by_uuid: staff
    }
  });

  return { bans, mutes, warns, kicks }
}

const getPlayerName = async (uuid: string) => {
  const player = await db.litebans_history.findFirst({
    where: {
      uuid
    },
    orderBy: {
      date: 'desc'
    },
    select: {
      name: true
    }
  });

  return player?.name;
}

const getPunishments = async (page: number, player?: string, staff?: string) => {
  const query = Prisma.sql`
  SELECT id, uuid, banned_by_name, banned_by_uuid, reason, time, until, active, removed_by_uuid, removed_by_name, removed_by_reason, removed_by_date, server_origin, server_scope, 'ban' AS type FROM litebans_bans ${player || staff ? Prisma.sql`WHERE ` : Prisma.sql``}${player ? Prisma.sql` uuid = ${player} ` : Prisma.sql``} ${player && staff ? Prisma.sql`AND` : Prisma.sql``} ${staff ? Prisma.sql` banned_by_uuid = ${staff}` : Prisma.sql``}
  UNION ALL 
  SELECT id, uuid, banned_by_name, banned_by_uuid, reason, time, until, active, removed_by_uuid, removed_by_name, removed_by_reason, removed_by_date, server_origin, server_scope, 'mute' AS type FROM litebans_mutes ${player || staff ? Prisma.sql`WHERE ` : Prisma.sql``}${player ? Prisma.sql` uuid = ${player} ` : Prisma.sql``} ${player && staff ? Prisma.sql`AND` : Prisma.sql``} ${staff ? Prisma.sql` banned_by_uuid = ${staff}` : Prisma.sql``}
  UNION ALL 
  SELECT id, uuid, banned_by_name, banned_by_uuid, reason, time, until, active, removed_by_uuid, removed_by_name, removed_by_reason, removed_by_date, server_origin, server_scope, 'warn' AS type FROM litebans_warnings ${player || staff ? Prisma.sql`WHERE ` : Prisma.sql``}${player ? Prisma.sql` uuid = ${player} ` : Prisma.sql``} ${player && staff ? Prisma.sql`AND` : Prisma.sql``} ${staff ? Prisma.sql` banned_by_uuid = ${staff}` : Prisma.sql``}
  UNION ALL 
  SELECT id, uuid, banned_by_name, banned_by_uuid, reason, time, until, active, NULL as removed_by_uuid, NULL as removed_by_name, NULL as removed_by_reason, NULL as removed_by_date, server_origin, server_scope, 'kick' AS type FROM litebans_kicks ${player || staff ? Prisma.sql`WHERE ` : Prisma.sql``}${player ? Prisma.sql` uuid = ${player} ` : Prisma.sql``} ${player && staff ? Prisma.sql`AND` : Prisma.sql``} ${staff ? Prisma.sql` banned_by_uuid = ${staff}` : Prisma.sql``}
  ORDER BY time DESC
  LIMIT 10
  OFFSET ${(page - 1) * 10}
  `
  const punishments = await db.$queryRaw(query) as PunishmentListItem[];

  return punishments;
}

const sanitizePunishments = async (dictionary: Dictionary, punishments: PunishmentListItem[]) => {
  const now = new Date();
  const sanitized = await Promise.all(punishments.map(async (punishment) => {
    const name = await getPlayerName(punishment.uuid!);
    const revoked = Boolean(punishment.removed_by_uuid || punishment.removed_by_name || punishment.removed_by_reason);
    const removalDate = revoked && punishment.removed_by_date ? new Date(punishment.removed_by_date) : undefined;
    const removalFallbackDate = removalDate ?? new Date(parseInt(punishment.time.toString()));
    const active = typeof punishment.active === "boolean" ? punishment.active : punishment.active === "1";
    const until = (punishment.type == "ban" || punishment.type == "mute") ?
                    (revoked ? removalFallbackDate : (punishment.until.toString() === "0" ? 
                    dictionary.table.permanent : 
                    new Date(parseInt(punishment.until.toString())))) : 
                  (revoked ? removalDate ?? "" : "");
    const status = (punishment.type == "ban" || punishment.type == "mute") ?
                    revoked ? false :
                    (typeof until === "string" ? active : until < now ? false : undefined) :
                  undefined;
    const statusTooltip = revoked && punishment.removed_by_name ? p(dictionary.table.active.revoked, { staff: punishment.removed_by_name }) :
                          revoked ? dictionary.table.active.revoked :
                          undefined;
    const reason = stripColorCodes(punishment.reason ?? "");
    const removedReason = stripColorCodes(punishment.removed_by_reason ?? "");
    return {
      ...punishment,
      id: punishment.id.toString(),
      time: new Date(parseInt(punishment.time.toString())),
      console: punishment.banned_by_uuid === siteConfig.console.uuid,
      removed_by_date: removalDate,
      revoked,
      reason,
      removed_by_reason: removedReason || undefined,
      statusTooltip,
      status,
      server: punishment.server_origin ?? "-",
      serverScope: punishment.server_scope ?? "-",
      until,
      name
    }
  }));

  return sanitized;
}

export { getPunishmentCount, getPlayerName, getPunishments, sanitizePunishments }