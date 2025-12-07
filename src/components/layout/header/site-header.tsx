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
      <div className="container flex h-14 max-w-screen-2xl items-center space-x-1 px-4">
        <MobileNav bans={bans} mutes={mutes} warns={warns} kicks={kicks} />
        <MainNav bans={bans} mutes={mutes} warns={warns} kicks={kicks} />
        <div className="flex flex-1 justify-end">
          <nav className="flex items-center space-x-1">
            <PlayerInput />
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
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}