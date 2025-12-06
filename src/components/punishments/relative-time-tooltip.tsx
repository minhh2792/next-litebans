import { siteConfig } from "@config/site";

interface RelativeTimeTooltipProps {
  lang: string
  time: Date | string
}

export const RelativeTimeTooltip = ({
  lang,
  time
}: RelativeTimeTooltipProps) => (
  <span className="cursor-default">
    {time instanceof Date
      ? new Intl.DateTimeFormat(lang, {
          timeZone: siteConfig.timeZone,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }).format(time)
      : time}
  </span>
)