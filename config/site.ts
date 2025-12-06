export const siteConfig = {
  title: "MineVN Puinishments",
  logo: "/minevn.png",
  favicon: "/minevn.png",
  languages: {
    available: [
      "vi",
    ],
    default: "vi",
  },
  console: {
    name: "Console", // Just for filter badge
    uuid: "[Console]", // Use for filter url and to check if a punishment is made from the Console. In some versions of Litebans, the console uuid is "CONSOLE".
    icon: "/console.webp",
    body: "/console-body.webp",
    bust: "/console-bust.webp",
  },
  defaultPlayerLookup: "CursedKiwi",
  timeZone: "UTC",
  // When enabled, body and bust images will show a steve skin
  bedrock: {
    enabled: true,
    prefix: "BP_",
  },
  openGraph: {
    dateFormat: "dd-MM-yyyy hh:mm:ss",
    pages: {
      main: {
        // Placeholders: {total}, {bans}, {mutes}, {kicks}, {warns}
        description: `
        Lịch sử xử lý vi phạm tại MineVN.

        Đã xử lý: {total}

          🚫 Khoá tài khoản: {bans}
          🔇 Cấm chat: {mutes}
          ⚠️ Cảnh cáo: {warns}
          ❌ Kick: {kicks}
        `
      },
      history: {
        // Placeholders: {total}, {bans}, {mutes}, {kicks}, {warns}
        description: `
        Tổng số vi phạm đã xử lý: {total}

          🚫 Khoá tài khoản: {bans}
          🔇 Cấm chat: {mutes}
          ⚠️ Cảnh cáo: {warns}
          ❌ Kick: {kicks}
        `
      },
      player: {
        // Placeholders: {name}, {total}, {bans}, {mutes}, {kicks}, {warns}
        description: `
        Vi phạm của {name}.

        Tổng số vi phạm đã xử lý: {total}

          🚫 Khoá tài khoản: {bans}
          🔇 Cấm chat: {mutes}
          ⚠️ Cảnh cáo: {warns}
          ❌ Kick: {kicks}
        `,
        bans: {
          description: `
          Khoá tài khoản của {name}.

          Tổng số khoá tài khoản: {total}
          `,
        },
        mutes: {
          description: `
          Cấm chat của {name}.

          Tổng số Cấm chat: {total}
          `,
        },
        warns: {
          description: `
          Cảnh cáo của {name}.

          Tổng số cảnh cáo: {total}
          `,
        },
        kicks: {
          description: `
          Kick của {name}.

          Tổng số kick: {total}
          `,
        },
      },
      bans: {
        // Placeholders: {total}
        description: "Tổng số khoá tài khoản: {total}"
      },
      mutes: {
        // Placeholders: {total}
        description: "Tổng số cấm chat: {total}"
      },
      warns: {
        // Placeholders: {total}
        description: "Tổng số cảnh cáo: {total}"
      },
      kicks: {
        // Placeholders: {total}
        description: "Tổng số kick: {total}"
      },
    },
    punishments: {
      ban: {
        // Placeholders: {name}, {staff}, {reason}, {time}, {duration}, {server}
        description: `
        👤 Người chơi: {name}
        👮 Staff: {staff}

        📜 Lý do: {reason}
        🕒 Thời gian: {time}
        ⌛ Thời hạn: {duration}
        `
      },
      mute: {
        // Placeholders: {name}, {staff}, {reason}, {time}, {duration}, {server}
        description: `
        👤 Người chơi: {name}
        👮 Staff: {staff}

        📜 Lý do: {reason}
        🕒 Thời gian: {time}
        ⌛ Thời hạn: {duration}
        `
      },
      warn: {
        // Placeholders: {name}, {staff}, {reason}, {time}, {server}
        description: `
        👤 Người chơi: {name}
        👮 Staff: {staff}

        📜 Lý do: {reason}
        🕒 Thời gian: {time}
        `
      },
      kick: {
        // Placeholders: {name}, {staff}, {reason}, {time}, {server}
        description: `
        👤 Người chơi: {name}
        👮 Staff: {staff}

        📜 Lý do: {reason}
        🕒 Thời gian: {time}
        `
      }
    }
  }
}
export type SiteConfig = typeof siteConfig;