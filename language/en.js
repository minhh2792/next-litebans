const language = {
  info: {
    country_code: "GB",
    lang_name: "English"
  },
  site: {
    description: "A simple and lightweight Litebans web interface."
  },
  words: {
    bans: {
      singular: "Ban",
      plural: "Bans"
    },
    mutes: {
      singular: "Mute",
      plural: "Mutes"
    },
    kicks: {
      singular: "Kick",
      plural: "Kicks"
    },
    warns: {
      singular: "Warn",
      plural: "Warns"
    },
    yes: "Yes",
    no: "No",
    player: "Player",
    staff: "Staff",
    reason: "Reason",
    date: "Date",
    expires: "Expires",
    id: "ID",
    originServer: "Origin server",
    serverScope: "Server scope",
    serverScopeAll: "All servers",
    notified: "Notified",
  },
  pages: {
    home: {
      title: "Home",
      // Placeholders: {total}, {bans}, {mutes}, {kicks}, {warns}
      subtitle: "Welcome to Litebans Web Interface!"
    },
    history: {
      title: "History",
      // Placeholders: {total}
      subtitle: "Total punishments: {total}",
      table: {
        heads: {
          type: "Type",
          player: "Player",
          by: "Punished by",
          server: "Origin server",
          reason: "Reason",
          date: "Date",
          expires: "Expires"
        },
        permanent: "Permanent punishment",
        expire_not_applicable: "N/A",
        active: {
          true: "Active",
          temporal: "Temporal",
          false: "Expired",
          revoked: "Revoked"
        },
        revoked_by: "Removed by {staff}"
      }
    },
    bans: {
      title: "Bans",
      // Placeholders: {total}
      subtitle: "Ban count: {total}",
      table: {
        heads: {
          player: "Player",
          by: "Banned by",
          server: "Origin server",
          reason: "Reason",
          date: "Date",
          expires: "Expires"
        },
        permanent: "Permanent ban",
        active: {
          true: "Active",
          temporal: "Temporal",
          false: "Expired",
          revoked: "Unbanned"
        },
        revoked_by: "Unbanned by {staff}"
      },
      info: {
        title: "Ban #{id}",
        badges: {
          ipban: "IP Ban",
          active: "Active",
          expired: "Expired",
          revoked: "Unbanned",
          permanent: "Permanent",
        }
      }
    },
    mutes: {
      title: "Mutes",
      // Placeholders: {total}
      subtitle: "Mute count: {total}",
      table: {
        heads: {
          player: "Player",
          by: "Muted by",
          server: "Origin server",
          reason: "Reason",
          date: "Date",
          expires: "Expires"
        },
        permanent: "Permanent mute",
        active: {
          true: "Active",
          temporal: "Temporal",
          false: "Expired",
          revoked: "Unmuted"
        },
        revoked_by: "Unmuted by {staff}"
      },
      info: {
        title: "Mute #{id}",
        badges: {
          ipmute: "IP Mute",
          active: "Active",
          expired: "Expired",
          revoked: "Unmuted",
          permanent: "Permanent",
        }
      }
    },
    warns: {
      title: "Warns",
      // Placeholders: {total}
      subtitle: "Warn count: {total}",
      table: {
        heads: {
          player: "Player",
          by: "Warned by",
          server: "Origin server",
          reason: "Reason",
          date: "Date",
          status: "Status",
          notified: "Notified"
        },
        active: {
          true: "Active",
          false: "Inactive",
          revoked: "Unwarned"
        },
        revoked_by: "Unwarned by {staff}"
      },
      info: {
        title: "Warn #{id}"
      }
    },
    kicks: {
      title: "Kicks",
      // Placeholders: {total}
      subtitle: "Kick count: {total}",
      table: {
        heads: {
          player: "Player",
          by: "Kicked by",
          server: "Origin server",
          reason: "Reason",
          date: "Date"
        }
      },
      info: {
        title: "Kick #{id}"
      }
    },
    playerHistory: {
      // Placeholders: {player}
      title: "{player}"
    },
    errors: {
      notFound: {
        title: "404",
        description: "Seems like you are lost. Please go back to the main page.",
        button: "Back to home page"
      }
    }
  },
  pagination: {
    previous: "Previous",
    next: "Next"
  },
  notifications: {
    playerNotFound: {
      title: "Error",
      description: "The player does not exist in the database.",
    }
  }
}

module.exports = language;