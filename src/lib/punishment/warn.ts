import { cache } from "react";

import { siteConfig } from "@config/site";
import { PunishmentListItem } from "@/types";

import { db } from "../db";
import { getPlayerName } from "./punishment";
import { stripColorCodes } from "../utils";

const getWarnCount = async (player?: string, staff?: string) => {
  const count = await db.litebans_warnings.count({
    where: {
      uuid: player,
      banned_by_uuid: staff
    }
  });
  return count;
}

const getWarns = async (page: number, player?: string, staff?: string) => {
  const warns =  await db.litebans_warnings.findMany({
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
      warned: true,
      removed_by_uuid: true,
      removed_by_name: true,
      removed_by_reason: true,
      removed_by_date: true
    },
    orderBy: {
      time: "desc"
    }
  });

  return warns;
}

const sanitizeWarns = async (warns: (PunishmentListItem & { warned: boolean | string})[]) => {

  const sanitized = await Promise.all(warns.map(async (warn) => {
    const name = await getPlayerName(warn.uuid!);
    const revoked = Boolean(warn.removed_by_uuid || warn.removed_by_name || warn.removed_by_reason);
    const removalDate = revoked && warn.removed_by_date ? new Date(warn.removed_by_date) : undefined;
    const untilValue = revoked ? removalDate : (warn.until && warn.until.toString() !== "0" ? new Date(parseInt(warn.until.toString())) : undefined);
    const active = typeof warn.active === "boolean" ? warn.active : warn.active === "1";
    const reason = stripColorCodes(warn.reason ?? "");
    const removedReason = stripColorCodes(warn.removed_by_reason ?? "");
    return {
      ...warn,
      id: warn.id.toString(),
      time: new Date(parseInt(warn.time.toString())),
      console: warn.banned_by_uuid === siteConfig.console.uuid,
      active,
      reason,
      warned: typeof warn.warned === "boolean" ? warn.warned : warn.warned === "1",
      removed_by_date: removalDate,
      removed_by_reason: removedReason || undefined,
      revoked,
      until: untilValue,
      server: warn.server_origin ?? "-",
      serverScope: warn.server_scope ?? "-",
      name
    }
  }));

  return sanitized;
}

const getWarn = async (id: number) => {
  const warn = await db.litebans_warnings.findUnique({
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
      active: true,
      server_origin: true,
      server_scope: true,
      warned: true,
      removed_by_uuid: true,
      removed_by_name: true,
      removed_by_reason: true,
      removed_by_date: true
    }
  });

  if (!warn) {
    return null;
  }
  
  const sanitized = (await sanitizeWarns([warn]))[0];

  return {
    ...sanitized,
    server: warn.server_origin,
    serverScope: warn.server_scope ?? "-"
  }
}

const getCachedWarn = cache(
  async (id: number) => getWarn(id)
);

export { getWarnCount, getWarns, sanitizeWarns, getWarn, getCachedWarn }