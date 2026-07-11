Page({
  data: {
    // 轮播图
    banners: [
      {
        id: 1,
        image: '/images/banner-career.png',
        title: '职业迷茫？',
        subtitle: '和专业规划师聊聊你的方向',
        link: '/pages/service/service?tab=career'
      },
      {
        id: 2,
        image: '/images/banner-coach.png',
        title: '需要被倾听',
        subtitle: '此刻有人在，愿意听你说',
        link: '/pages/service/service?tab=listen'
      },
      {
        id: 3,
        image: '/images/banner-youth.png',
        title: '陪伴孩子成长',
        subtitle: '让每个孩子都被理解',
        link: '/pages/service/service?tab=youth'
      }
    ],

    // 三个入口卡片
    entryCards: [
      {
        id: 'career',
        icon: '🎯',
        title: '职业成长',
        desc: '找到属于你的方向',
        color: '#5B9BD5',
        bgColor: '#E3F2FD',
        path: '/pages/service/service?tab=career'
      },
      {
        id: 'coach',
        icon: '🌱',
        title: '心理教练',
        desc: '提升心力，从容前行',
        color: '#66BB6A',
        bgColor: '#E8F5E9',
        path: '/pages/service/service?tab=coach'
      },
      {
        id: 'youth',
        icon: '🌻',
        title: '青少年成长',
        desc: '理解孩子，陪伴成长',
        color: '#F5A623',
        bgColor: '#FFF3E0',
        path: '/pages/service/service?tab=youth'
      }
    ],

    // 推荐教练（横滑）
    recommendCoaches: [
      {
        id: 1,
        avatar: '/images/avatar-1.png',
        name: '张规划师',
        title: '前心内科医师 → 药企MSL',
        rating: 4.9,
        orders: 128,
        tag: '医学转型'
      },
      {
        id: 2,
        avatar: '/images/avatar-2.png',
        name: '小雅',
        title: '温暖倾听 · 情感陪伴',
        rating: 4.9,
        orders: 256,
        tag: '在线倾听'
      },
      {
        id: 3,
        avatar: '/images/avatar-3.png',
        name: '陈教练',
        title: '积极心理教练 · 6年经验',
        rating: 4.8,
        orders: 89,
        tag: '心理成长'
      },
      {
        id: 4,
        avatar: '/images/avatar-4.png',
        name: '大海',
        title: '理性倾听 · 职场成长',
        rating: 4.8,
        orders: 167,
        tag: '职场倾听'
      }
    ],

    // 快速工具
    quickTools: [
      {
        id: 'assessment',
        icon: '📊',
        title: '优势测评',
        desc: '发现你的性格优势',
        path: '/pages/assessment/assessment'
      },
      {
        id: 'mood',
        icon: '📝',
        title: '心情日记',
        desc: '记录每天的心情',
        path: '/pages/mood/mood'
      },
      {
        id: 'ai-chat',
        icon: '💬',
        title: '和AI聊聊',
        desc: '随时随地有人听',
        path: '/pages/ai-chat/ai-chat'
      }
    ],

    // 最新文章
    articles: [
      {
        id: 1,
        title: '从医生到互联网医疗：一位心内科医师的转型之路',
        category: '职业转型',
        readCount: 2300
      },
      {
        id: 2,
        title: '和孩子沟通，先听后说——积极倾听的三个层次',
        category: '家庭教育',
        readCount: 1800
      },
      {
        id: 3,
        title: '当你感到职业倦怠，试试这三个积极心理学练习',
        category: '心理成长',
        readCount: 1500
      }
    ],

    // 用户状态
    isLogin: false,
    userName: ''
  },

  onLoad() {
    this.checkLoginStatus();
  },

  onShow() {
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        isLogin: true,
        userName: userInfo.nickName || '朋友'
      });
    }
  },

  // 点击Banner
  onBannerTap(e) {
    const index = e.currentTarget.dataset.index;
    const banner = this.data.banners[index];
    if (banner.link) {
      wx.switchTab({ url: banner.link });
    }
  },

  // 点击入口卡片
  onEntryTap(e) {
    const path = e.currentTarget.dataset.path;
    if (path) {
      wx.switchTab({ url: path });
    }
  },

  // 点击推荐教练
  onCoachTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/provider/detail?id=${id}`
    });
  },

  // 点击快捷工具
  onToolTap(e) {
    const path = e.currentTarget.dataset.path;
    if (path) {
      wx.navigateTo({ url: path });
    }
  },

  // 点击文章
  onArticleTap(e) {
    const id = e.currentTarget.dataset.id;
    // 跳转到公众号文章
    wx.showToast({ title: '即将跳转文章', icon: 'none' });
  },

  // 去登录
  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '医职路 - 你的成长伙伴',
      path: '/pages/index/index'
    };
  }
});
