import { cache } from "react";

import { siteConfig } from "@config/site";
import { PunishmentListItem } from "@/types";

import { db } from "../db";
import { getPlayerName } from "./punishment";
import { Dictionary } from "../language/types";
import p from "../language/utils/parse";

const getBanCount = async (player?: string, staff?: string) => {
  const count = await db.litebans_bans.count({
    where: {
      uuid: player,
      banned_by_uuid: staff
    }
  });
  return count;
}

const getBans = async (page: number, player?: string, staff?: string) => {
  const bans =  (await db.litebans_bans.findMany({
    where: {
      uuid: player,
      banned_by_uuid: staff
    },
    take: 10,
    skip: (page - 1) * 10,
    select: {
      id: true,
      uuid: true,
      banned_by_name: true,
      banned_by_uuid: true,
      reason: true,
      time: true,
      until: true,
      active: true,
      server_origin: true,
      removed_by_uuid: true,
      removed_by_name: true,
      removed_by_reason: true,
      removed_by_date: true
    },
    orderBy: {
      time: "desc"
    }
  }));

  return bans;
}

const sanitizeBans = async (dictionary: Dictionary, bans: PunishmentListItem[]) => {

  const now = new Date();
  const sanitized = await Promise.all(bans.map(async (ban) => {
    const name = await getPlayerName(ban.uuid!);
    const revoked = Boolean(ban.removed_by_uuid || ban.removed_by_name || ban.removed_by_reason);
    const removalDate = revoked && ban.removed_by_date ? new Date(ban.removed_by_date) : undefined;
    const active = typeof ban.active === "boolean" ? ban.active : ban.active === "1";
    const removalFallbackDate = removalDate ?? new Date(parseInt(ban.time.toString()));
    const until = revoked ? removalFallbackDate : (ban.until.toString() === "0" ? dictionary.table.permanent : new Date(parseInt(ban.until.toString())));
    return {
      ...ban,
      id: ban.id.toString(),
      time: new Date(parseInt(ban.time.toString())),
      removed_by_date: removalDate,
      revoked,
      statusTooltip: revoked && ban.removed_by_name ? p(dictionary.table.active.revoked, { staff: ban.removed_by_name }) :
                     revoked ? dictionary.table.active.revoked :
                     undefined,
      status: until == dictionary.table.permanent ? 
                active : 
                (revoked ? false : (typeof until === "string" ? active : until < now ? false : undefined)),
      console: ban.banned_by_uuid === siteConfig.console.uuid,
      permanent: until == dictionary.table.permanent,
      active,
      server: ban.server_origin ?? "-",
      until,
      name,
    }
  }));

  return sanitized;
}

const getBan = async (id: number, dictionary: Dictionary) => {
  const ban = await db.litebans_bans.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      uuid: true,
      banned_by_name: true,
      banned_by_uuid: true,
      reason: true,
      time: true,
      until: true,
      ipban: true,
      active: true,
      server_origin: true,
      removed_by_uuid: true,
      removed_by_name: true,
      removed_by_reason: true,
      removed_by_date: true
    }
  });

  if (!ban) {
    return null;
  }
  
  const sanitized = (await sanitizeBans(dictionary, [ban]))[0];

  return {
    ...sanitized,
    ipban: ban.ipban,
    server: ban.server_origin
  }
}

const getCachedBan = cache(
  async (id: number, dictionary: Dictionary) => getBan(id, dictionary)
);

export { getBanCount, getBans, sanitizeBans, getBan, getCachedBan }