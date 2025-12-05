const language = {
  info: {
    country_code: "VN",
    lang_name: "Tiếng Việt"
  },
  site: {
    description: "Lịch sử xử lý vi phạm tại MineVN"
  },
  words: {
    bans: {
      singular: "Khoá tài khoản",
      plural: "Khoá tài khoản"
    },
    mutes: {
      singular: "Cấm chat",
      plural: "Cấm chat"
    },
    kicks: {
      singular: "Kick",
      plural: "Kick"
    },
    warns: {
      singular: "Cảnh cáo",
      plural: "Cảnh cáo"
    },
    yes: "Có",
    no: "Không",
    player: "Người chơi",
    staff: "Staff",
    reason: "Lý do",
    date: "Ngày",
    expires: "Hết hạn",
    originServer: "Server xử lý",
    notified: "Đã thông báo",
  },
  pages: {
    home: {
      title: "Trang chủ",
      // Placeholders: {total}, {bans}, {mutes}, {kicks}, {warns}
      subtitle: "Lịch sử xử lý vi phạm tại MineVN"
    },
    history: {
      title: "Lịch sử",
      // Placeholders: {total}
      subtitle: "Tổng số vi phạm đã xử lý: {total}",
      table: {
        heads: {
          type: "Loại",
          player: "Người chơi",
          by: "Xử lý bởi",
          reason: "Lý do",
          date: "Ngày",
          expires: "Hết hạn"
        },
        permanent: "Vĩnh viễn",
        expire_not_applicable: "N/A",
        active: {
          true: "Đang hiệu lực",
          temporal: "Có thời hạn",
          false: "Đã hết hạn"
        }
      }
    },
    bans: {
      title: "Khoá tài khoản",
      // Placeholders: {total}
      subtitle: "Số lượng khoá tài khoản: {total}",
      table: {
        heads: {
          player: "Người chơi",
          by: "Khoá bởi",
          reason: "Lý do",
          date: "Ngày",
          expires: "Hết hạn"
        },
        permanent: "Khoá vĩnh viễn",
        active: {
          true: "Đang hiệu lực",
          temporal: "Có thời hạn",
          false: "Đã hết hạn"
        }
      },
      info: {
        title: "Khoá tài khoản #{id}",
        badges: {
          ipban: "Khoá IP",
          active: "Đang hiệu lực",
          expired: "Đã hết hạn",
          permanent: "Vĩnh viễn",
        }
      }
    },
    mutes: {
      title: "Cấm chat",
      // Placeholders: {total}
      subtitle: "Số lượng cấm chat: {total}",
      table: {
        heads: {
          player: "Người chơi",
          by: "Cấm chat bởi",
          reason: "Lý do",
          date: "Ngày",
          expires: "Hết hạn"
        },
        permanent: "Cấm chat vĩnh viễn",
        active: {
          true: "Đang hiệu lực",
          temporal: "Có thời hạn",
          false: "Đã hết hạn"
        }
      },
      info: {
        title: "Cấm chat #{id}",
        badges: {
          ipmute: "Cấm chat IP",
          active: "Đang hiệu lực",
          expired: "Đã hết hạn",
          permanent: "Vĩnh viễn",
        }
      }
    },
    warns: {
      title: "Cảnh cáo",
      // Placeholders: {total}
      subtitle: "Số lượng cảnh cáo: {total}",
      table: {
        heads: {
          player: "Người chơi",
          by: "Cảnh cáo bởi",
          reason: "Lý do",
          date: "Ngày",
          notified: "Đã thông báo"
        },
      },
      info: {
        title: "Cảnh cáo #{id}"
      }
    },
    kicks: {
      title: "Kick",
      // Placeholders: {total}
      subtitle: "Số lượng kick: {total}",
      table: {
        heads: {
          player: "Người chơi",
          by: "Kick bởi",
          reason: "Lý do",
          date: "Ngày"
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
        description: "Có vẻ như bạn đã bị lạc. Vui lòng quay lại trang chủ.",
        button: "Quay lại trang chủ"
      }
    }
  },
  pagination: {
    previous: "Trước",
    next: "Sau"
  },
  notifications: {
    playerNotFound: {
      title: "Lỗi",
      description: "Người chơi không tồn tại trong cơ sở dữ liệu.",
    }
  }
}

module.exports = language;
