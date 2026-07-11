Page({
  data: {
    isLogin: false,
    userInfo: null,
    orderStats: {
      total: 0,
      pending: 0,
      completed: 0
    },
    menuItems: [
      { icon: '📋', title: '我的订单', key: 'orders' },
      { icon: '⭐', title: '我的评价', key: 'reviews' },
      { icon: '📝', title: '心情日记', key: 'mood' },
      { icon: '🎯', title: '我的测评', key: 'assessment' },
      { icon: '💚', title: '我的教练/倾听师', key: 'providers' },
      { icon: '📚', title: '已购课程', key: 'courses' }
    ],
    serviceItems: [
      { icon: '🛠️', title: '帮助中心', key: 'help' },
      { icon: '📞', title: '联系客服', key: 'contact' },
      { icon: 'ℹ️', title: '关于我们', key: 'about' }
    ]
  },

  onShow() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({ isLogin: true, userInfo });
    }
  },

  goToLogin() {
    wx.navigateTo({ url: '/pages/login/login' });
  },

  onMenuTap(e) {
    const key = e.currentTarget.dataset.key;
    wx.showToast({ title: `${key} 功能开发中`, icon: 'none' });
  }
});
