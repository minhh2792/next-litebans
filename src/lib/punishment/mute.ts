import { cache } from "react";

import { siteConfig } from "@config/site";
import { PunishmentListItem } from "@/types";

import { db } from "../db";
import { getPlayerName } from "./punishment";
import { Dictionary } from "../language/types";
import p from "../language/utils/parse";

const getMuteCount = async (player?: string, staff?: string) => {
  const count = await db.litebans_mutes.count({
    where: {
      uuid: player,
      banned_by_uuid: staff
    }
  });
  return count;
}

const getMutes = async (page: number, player?: string, staff?: string) => {
  const mutes =  await db.litebans_mutes.findMany({
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
      server_scope: true,
      removed_by_uuid: true,
      removed_by_name: true,
      removed_by_reason: true,
      removed_by_date: true
    },
    orderBy: {
      time: "desc"
    }
  });

  return mutes;
}

const sanitizeMutes = async (dictionary: Dictionary, mutes: PunishmentListItem[]) => {

  const now = new Date();
  const sanitized = await Promise.all(mutes.map(async (mute) => {
    const name = await getPlayerName(mute.uuid!);
    const revoked = Boolean(mute.removed_by_uuid || mute.removed_by_name || mute.removed_by_reason);
    const removalDate = revoked && mute.removed_by_date ? new Date(mute.removed_by_date) : undefined;
    const active = typeof mute.active === "boolean" ? mute.active : mute.active === "1";
    const removalFallbackDate = removalDate ?? new Date(parseInt(mute.time.toString()));
    const until = revoked ? removalFallbackDate : (mute.until.toString() === "0" ? dictionary.table.permanent : new Date(parseInt(mute.until.toString())));
    return {
      ...mute,
      id: mute.id.toString(),
      time: new Date(parseInt(mute.time.toString())),
      removed_by_date: removalDate,
      revoked,
      statusTooltip: revoked && mute.removed_by_name ? p(dictionary.table.active.revoked, { staff: mute.removed_by_name }) :
                     revoked ? dictionary.table.active.revoked :
                     undefined,
      status: until == dictionary.table.permanent ? 
                (active ? true : false) : 
                (revoked ? false : (typeof until === "string" ? active : until < now ? false : undefined)),
      console: mute.banned_by_uuid === siteConfig.console.uuid,
      permanent: until == dictionary.table.permanent,
      active,
      server: mute.server_origin ?? "-",
      serverScope: mute.server_scope ?? "-",
      until,
      name
    }
  }));

  return sanitized;
}

const getMute = async (id: number, dictionary: Dictionary) => {
  const mute = await db.litebans_mutes.findUnique({
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
      server_scope: true,
      removed_by_uuid: true,
      removed_by_name: true,
      removed_by_reason: true,
      removed_by_date: true
    }
  });

  if (!mute) {
    return null;
  }
  
  const sanitized = (await sanitizeMutes(dictionary, [mute]))[0];

  return {
    ...sanitized,
    ipban: mute.ipban,
    server: mute.server_origin,
    serverScope: mute.server_scope ?? "-"
  }
}

const getCachedMute = cache(
  async (id: number, dictionary: Dictionary) => getMute(id, dictionary)
);

export { getMuteCount, getMutes, sanitizeMutes, getMute, getCachedMute }