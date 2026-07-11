App({
  onLaunch() {
    // 检查登录状态
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      // 未登录，后续在首页引导登录
    }
  },

  globalData: {
    userInfo: null,
    isLogin: false
  }
});
