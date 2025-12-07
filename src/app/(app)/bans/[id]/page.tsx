import { notFound } from "next/navigation";

import { IoCalendar } from "react-icons/io5";
import { PiProhibitBold, PiScrollFill } from "react-icons/pi";
import { FaEarthEurope, FaServer } from "react-icons/fa6";
import { PiClockCountdownBold } from "react-icons/pi";

import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import { language } from "@/lib/language/dictionaries";
import { formatDate, formatDuration } from "@/lib/date";
import { getCachedBan as getBan } from "@/lib/punishment/ban";

import { Badge } from "@/components/ui/badge";
import { PunishmentInfoCard } from "@/components/info/punishment-info-card";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentStatusDot } from "@/components/punishments/punishment-status-dot";

export async function generateMetadata({ params }: { params: { id: string } }) {
  
  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.bans;

  if (isNaN(parseInt(params.id))) {
    return notFound();
  }

  const ban = await getBan(parseInt(params.id), localDictionary);

  if (!ban) {
    return notFound();
  }
  
  return {
    title: p(dictionary.pages.bans.info.title, {
      id: params.id
    }),
    openGraph: {
      images: `https://minotar.net/helm/${ban?.uuid ?? ban?.name}`,
      description: p(siteConfig.openGraph.punishments.ban.description, {
        name: ban.name,
        staff: ban.banned_by_name,
        reason: ban.reason,
        time: formatDate(ban.time),
        duration: ban.until instanceof Date ? formatDuration(ban.time, ban.until, lang) : ban.until,
        server: ban.server
      })
    }
  }
}

export default async function Ban({
  params
}: {
  params: { id: string }
}) {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.bans;
  const badgeGreen = "px-3 py-1 text-sm bg-green-600 text-white hover:bg-green-700";
  const badgeBlue = "px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700";
  const formatScope = (scope?: string | null) => scope === "*" ? (dictionary.words.serverScopeAll ?? scope) : (scope ?? "-");

  if (isNaN(parseInt(params.id))) {
    return notFound();
  }

  const ban = await getBan(parseInt(params.id), localDictionary);

  if (!ban) {
    return notFound();
  }

  return (
    <div className="flex h-full flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-18 px-8">
      <div className="space-y-2 mx-auto">
        <h1 className="text-center text-5xl font-bold leading-tight tracking-tighter sm:text-6xl lg:leading-[1.1]">
          {p(localDictionary.info.title, {
            id: params.id
          })}
        </h1>
        <div className="flex space-x-2 justify-center">
          {ban.ipban && (
            <Badge variant="secondary" className={badgeGreen}>{localDictionary.info.badges.ipban}</Badge>
          )}
          {ban.revoked && (
            <Badge variant="secondary" className={badgeBlue}>{localDictionary.info.badges.revoked}</Badge>
          )}
          {(!ban.revoked && ban.active) && (
            <Badge variant="secondary" className={badgeGreen}>{localDictionary.info.badges.active}</Badge>
          )}
          {(!ban.revoked && ban.status !== undefined && !ban.status) && (
            <Badge variant="secondary" className={badgeGreen}>{localDictionary.info.badges.expired}</Badge>
          )}
          {(ban.permanent && ban.status) && (
            <Badge variant="secondary" className={badgeGreen}>{localDictionary.info.badges.permanent}</Badge>
          )}
        </div>
      </div>

      <section className="space-y-4 text-center md:text-left">
        <PunishmentInfoCard punishment={ban}>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><PiScrollFill className="mr-2 text-rose-500"/>{dictionary.words.reason}</h3>
            <p>{ban.reason}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><IoCalendar className="mr-2 text-sky-500"/>{dictionary.words.date}</h3>
            <p><RelativeTimeTooltip lang={lang} time={ban.time}/></p>
          </div>
          {!ban.revoked && (
            <div className="space-y-1 flex flex-col items-center sm:items-start">
              <h3 className="inline-flex items-center text-lg font-medium"><PiClockCountdownBold className="mr-2 text-amber-500"/>{dictionary.words.expires}</h3>
              <p className="flex items-center gap-2 sm:justify-start justify-center">
                <PunishmentStatusDot dictionary={localDictionary} status={ban.status} />
                <RelativeTimeTooltip lang={lang} time={ban.until}/>
              </p>
            </div>
          )}
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><FaEarthEurope className="mr-2 text-emerald-500"/>{dictionary.words.originServer}</h3>
            <p>{ban.server}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><FaServer className="mr-2 text-indigo-500"/>{dictionary.words.serverScope}</h3>
            <p>{formatScope(ban.serverScope)}</p>
          </div>
          {ban.revoked && (
            <div className="space-y-1">
              <h3 className="inline-flex items-center text-lg font-medium"><PiProhibitBold className="mr-2 text-red-500"/>{localDictionary.table.active.revoked}</h3>
              {ban.removed_by_date instanceof Date && (
                <p className="flex items-center justify-center sm:justify-start gap-2">
                  <PunishmentStatusDot
                    dictionary={localDictionary}
                    status={false}
                    tooltipOverride={localDictionary.table.active.revoked}
                    variant="revoked"
                  />
                  <RelativeTimeTooltip lang={lang} time={ban.removed_by_date} />
                </p>
              )}
              <p>{p(localDictionary.table.revoked_by, { staff: ban.removed_by_name ?? dictionary.words.staff })}</p>
              {ban.removed_by_reason && (
                <p className="text-sm text-muted-foreground">{ban.removed_by_reason}</p>
              )}
            </div>
          )}
        </PunishmentInfoCard>

      </section>
    </div>
  )
}