import Link from "next/link"
import { BookOpenText, Users } from "lucide-react"

import { getPunishmentCount } from "@/lib/punishment/punishment";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { PlayerInput } from "@/components/input/player-lookup";
import { Button } from "@/components/ui/button";

import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export const SiteHeader = async () => {
  const { bans, mutes, warns, kicks } = await getPunishmentCount();

  return(
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center gap-2 px-3 sm:px-4">
        <MobileNav bans={bans} mutes={mutes} warns={warns} kicks={kicks} />
        <MainNav bans={bans} mutes={mutes} warns={warns} kicks={kicks} />
        <div className="flex flex-1 justify-end">
          <nav className="flex w-full items-center justify-end gap-1 sm:gap-2">
            <div className="w-[140px] sm:w-[220px] md:w-[260px]">
              <PlayerInput />
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Button asChild variant="ghost" size="sm" className="gap-1.5">
                <Link href="https://minevn.net/noi-quy" target="_blank" rel="noreferrer">
                  <BookOpenText className="h-4 w-4" aria-hidden />
                  Nội quy
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="gap-1.5">
                <Link href="https://minevn.net/cong-dong-minevn/" target="_blank" rel="noreferrer">
                  <Users className="h-4 w-4" aria-hidden />
                  Cộng đồng
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-1 sm:hidden">
              <Button asChild variant="ghost" size="icon" className="h-9 w-9" aria-label="Nội quy">
                <Link href="https://minevn.net/noi-quy" target="_blank" rel="noreferrer">
                  <BookOpenText className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-9 w-9" aria-label="Cộng đồng">
                <Link href="https://minevn.net/cong-dong-minevn/" target="_blank" rel="noreferrer">
                  <Users className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}