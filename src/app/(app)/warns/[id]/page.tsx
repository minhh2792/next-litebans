import { notFound } from "next/navigation";

import { IoCalendar } from "react-icons/io5";
import { PiProhibitBold, PiScrollFill } from "react-icons/pi";
import { FaEarthEurope, FaServer } from "react-icons/fa6";
import { MdOutlineNotificationsActive } from "react-icons/md";

import { formatDate } from "@/lib/date";
import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import { language } from "@/lib/language/dictionaries";
import { getCachedWarn as getWarn } from "@/lib/punishment/warn";

import { PunishmentInfoCard } from "@/components/info/punishment-info-card";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentStatusDot } from "@/components/punishments/punishment-status-dot";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({ params }: { params: { id: string } }) {
  
  const { dictionary } = await language();

  if (isNaN(parseInt(params.id))) {
    return {
      title: dictionary.pages.errors.notFound.title
    }
  }

  const warn = await getWarn(parseInt(params.id));

  if (!warn) {
    return notFound();
  }
  
  return {
    title: p(dictionary.pages.warns.info.title, {
      id: params.id
    }),
    openGraph: {
      images: `https://minotar.net/helm/${warn?.uuid ?? warn?.name}`,
      description: p(siteConfig.openGraph.punishments.warn.description, {
        name: warn.name,
        staff: warn.banned_by_name,
        reason: warn.reason,
        time: formatDate(warn.time),
        server: warn.server
      })
    }
  }
}

export default async function Warn({
  params
}: {
  params: { id: string }
}) {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.warns;
  const badgeGreen = "px-3 py-1 text-sm bg-green-600 text-white hover:bg-green-700";
  const badgeBlue = "px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700";
  const formatScope = (scope?: string | null) => scope === "*" ? (dictionary.words.serverScopeAll ?? scope) : (scope ?? "-");

  if (isNaN(parseInt(params.id))) {
    return notFound();
  }

  const warn = await getWarn(parseInt(params.id));

  if (!warn) {
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
          {warn.revoked && (
            <Badge variant="secondary" className={badgeBlue}>{localDictionary.info.badges.revoked}</Badge>
          )}
          {!warn.revoked && warn.active && (
            <Badge variant="secondary" className={badgeGreen}>{localDictionary.info.badges.active}</Badge>
          )}
          {!warn.revoked && warn.active === false && (
            <Badge variant="secondary" className={badgeGreen}>{localDictionary.info.badges.expired}</Badge>
          )}
        </div>
      </div>

      <section className="space-y-4 text-center md:text-left">
        <PunishmentInfoCard punishment={warn}>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><PiScrollFill className="mr-2 text-rose-500"/>{dictionary.words.reason}</h3>
            <p>{warn.reason}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><IoCalendar className="mr-2 text-sky-500"/>{dictionary.words.date}</h3>
            <p><RelativeTimeTooltip lang={lang} time={warn.time}/></p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><MdOutlineNotificationsActive className="mr-2 text-cyan-500"/>{dictionary.words.notified}</h3>
            <p>{warn.warned ? dictionary.words.yes : dictionary.words.no}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><FaEarthEurope className="mr-2 text-emerald-500"/>{dictionary.words.originServer}</h3>
            <p>{warn.server}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><FaServer className="mr-2 text-indigo-500"/>{dictionary.words.serverScope}</h3>
            <p>{formatScope(warn.serverScope)}</p>
          </div>
          {warn.revoked && (
            <div className="space-y-1">
              <h3 className="inline-flex items-center text-lg font-medium"><PiProhibitBold className="mr-2 text-red-500"/>{localDictionary.table.active.revoked}</h3>
              {warn.removed_by_date instanceof Date && (
                <p className="flex items-center justify-center sm:justify-start gap-2">
                  <PunishmentStatusDot
                    dictionary={localDictionary}
                    status={false}
                    tooltipOverride={localDictionary.table.active.revoked}
                    variant="revoked"
                  />
                  <RelativeTimeTooltip lang={lang} time={warn.removed_by_date} />
                </p>
              )}
              <p>{p(localDictionary.table.revoked_by, { staff: warn.removed_by_name ?? dictionary.words.staff })}</p>
              {warn.removed_by_reason && (
                <p className="text-sm text-muted-foreground">{warn.removed_by_reason}</p>
              )}
            </div>
          )}
        </PunishmentInfoCard>

      </section>
    </div>
  )
}