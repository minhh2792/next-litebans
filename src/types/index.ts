export type SearchParams = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const PUNISMENT_TYPES = {
  BAN: "ban",
  MUTE: "mute",
  WARN: "warn",
  KICK: "kick"
} as const

export type PunishmentType = typeof PUNISMENT_TYPES[keyof typeof PUNISMENT_TYPES]

export type PunishmentListItem = {
  id: bigint | number
  uuid: string | null
  reason: string | null
  banned_by_uuid: string
  banned_by_name: string | null
  server_origin?: string | null
  server_scope?: string | null
  server?: string | null
  serverScope?: string | null
  time: bigint | number
  until: bigint | number
  active: boolean | string
  type?: PunishmentType
  removed_by_uuid?: string | null
  removed_by_name?: string | null
  removed_by_reason?: string | null
  removed_by_date?: Date | string | null
  revoked?: boolean
  statusTooltip?: string
}