/* eslint-disable @next/next/no-img-element */
"use server"

import Link from "next/link";

import { getSkinUUID } from "@/utils/bedrock";
import { language } from "@/lib/language/dictionaries";

import { AvatarBody } from "@/components/avatar/avatar-body";
import { AvatarBust } from "@/components/avatar/avatar-bust";
import { ConsoleAvatar } from "@/components/avatar/console-avatar";

interface PunishmentInfoCardProps {
  punishment: {
    uuid: string | null;
    name: string | null | undefined;
    banned_by_uuid: string | null;
    banned_by_name: string | null;
    console: boolean;
  };
  children: React.ReactNode;
}

export const PunishmentInfoCard = async ({ punishment, children }: PunishmentInfoCardProps) => {
  const { dictionary } = await language();
  
  return (
    <div className="w-full">
      <div className="grid w-full gap-6 rounded-xl border bg-card/80 p-4 shadow-sm sm:grid-cols-2 sm:p-5 md:grid-cols-[1fr_minmax(280px,1.1fr)_1fr] md:p-6">
        <div className="flex flex-col items-center gap-3 text-center sm:text-left">
          <h2 className="text-xl font-semibold text-muted-foreground">{dictionary.words.player}</h2>
          <Link href={`/@${punishment.name}`} className="block w-full">
            <AvatarBody 
              uuid={punishment.uuid!} 
              name={punishment.name!} 
              className="mx-auto h-[220px] max-w-[220px] transition hover:scale-105 md:h-[280px]"
            />
            <AvatarBust 
              uuid={punishment.uuid!} 
              name={punishment.name!} 
              className="mx-auto transition hover:scale-105"
            />
          </Link>
          <div className="flex items-center space-x-2 text-sm text-foreground/90">
            <img 
              src={`https://visage.surgeplay.com/face/128/${getSkinUUID(punishment.name!, punishment.uuid!)}`}
              alt={`${punishment.name}'s avatar`}
              width={28}
              height={28}
              className="rounded-sm"
            />
            <p className="text-base font-medium">{punishment.name}</p>
          </div>
        </div>

        <div className="order-3 space-y-4 rounded-lg border bg-card/40 p-4 sm:col-span-2 sm:order-2 md:order-2 md:col-auto md:border-l md:border-r md:p-5">
          {children}
        </div>

        <div className="order-2 flex flex-col items-center gap-3 text-center sm:text-left md:order-3">
          <h2 className="text-xl font-semibold text-muted-foreground">{dictionary.words.staff}</h2>
          <Link href={`/history?staff=${punishment.banned_by_uuid}`} className="block w-full">
            <AvatarBody 
              uuid={punishment.banned_by_uuid!} 
              name={punishment.banned_by_name!} 
              console={punishment.console} 
              className="mx-auto h-[220px] max-w-[220px] scale-x-[-1] transition hover:scale-x-[-1.05] hover:scale-y-105 md:h-[280px]"
            />
            <AvatarBust 
              uuid={punishment.banned_by_uuid!} 
              name={punishment.banned_by_name!} 
              console={punishment.console} 
              className="mx-auto scale-x-[-1] transition hover:scale-x-[-1.05] hover:scale-y-105"
            />
          </Link>
          <div className="flex items-center space-x-2 text-sm text-foreground/90">
            {punishment.console ? 
              <ConsoleAvatar name={punishment.banned_by_name!} size={28} />
              :
              <img 
                src={`https://visage.surgeplay.com/face/128/${punishment.banned_by_uuid}`}
                alt={`${punishment.banned_by_name}'s avatar`}
                width={28}
                height={28}
                className="rounded-sm"
              />
            }
            <p className="text-base font-medium">{punishment.banned_by_name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}