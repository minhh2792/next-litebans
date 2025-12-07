"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { siteConfig } from "@config/site"

import { Badge } from "@/components/ui/badge"
import { WebsiteLogo } from "@/components/images/website-logo"
import { useLang } from "@/lib/language/components/language-provider"
import { Icons } from "@/components/layout/icons"

interface MainNavProps {
  bans: number;
  mutes: number;
  warns: number;
  kicks: number;
}

export const MainNav = ({ bans, mutes, warns, kicks}: MainNavProps) => {
  const pathname = usePathname()
  const { dictionary } = useLang()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <WebsiteLogo 
          width={24}
          height={24}
        />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.title}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link 
          href="/bans"
          className={cn("inline-flex items-center gap-2 transition-colors", pathname.startsWith("/bans") ? "hover:text-foreground text-foreground/80" : "hover:text-foreground/80 text-foreground/60")}
        >
          <Icons.ban className={cn("h-4 w-4", pathname.startsWith("/bans") ? "text-red-500" : "text-red-400" )} aria-hidden />
          <span>{dictionary.words.bans.singular}</span>
          <Badge variant={pathname.startsWith("/bans") ? "default" : "secondary"} className="!px-1 !py-0 hidden lg:inline-flex">{bans}</Badge>
        </Link>

        <Link 
          href="/mutes"
          className={cn("inline-flex items-center gap-2 transition-colors", pathname.startsWith("/mutes") ? "hover:text-foreground text-foreground/80" : "hover:text-foreground/80 text-foreground/60")}
        >
          <Icons.mute className={cn("h-4 w-4", pathname.startsWith("/mutes") ? "text-purple-500" : "text-purple-400" )} aria-hidden />
          <span>{dictionary.words.mutes.singular}</span>
          <Badge variant={pathname.startsWith("/mutes") ? "default" : "secondary"} className="!px-1 !py-0 hidden lg:inline-flex">{mutes}</Badge>
        </Link>
        
        <Link 
          href="/warns"
          className={cn("inline-flex items-center gap-2 transition-colors", pathname.startsWith("/warns") ? "hover:text-foreground text-foreground/80" : "hover:text-foreground/80 text-foreground/60")}
        >
          <Icons.warn className={cn("h-4 w-4", pathname.startsWith("/warns") ? "text-amber-500" : "text-amber-400" )} aria-hidden />
          <span>{dictionary.words.warns.singular}</span>
          <Badge variant={pathname.startsWith("/warns") ? "default" : "secondary"} className="!px-1 !py-0 hidden lg:inline-flex">{warns}</Badge>
        </Link>
        
        <Link 
          href="/kicks"
          className={cn("inline-flex items-center gap-2 transition-colors", pathname.startsWith("/kicks") ? "hover:text-foreground text-foreground/80" : "hover:text-foreground/80 text-foreground/60")}
        >
          <Icons.kick className={cn("h-4 w-4", pathname.startsWith("/kicks") ? "text-blue-500" : "text-blue-400" )} aria-hidden />
          <span>{dictionary.words.kicks.singular}</span>
          <Badge variant={pathname.startsWith("/kicks") ? "default" : "secondary"} className="!px-1 !py-0 hidden lg:inline-flex">{kicks}</Badge>
        </Link>
      </nav>
    </div>
  )
}
