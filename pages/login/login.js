Page({
  data: {
    canAgree: false,
    agreed: false
  },

  onLoad() {
    // 检查是否已同意协议
    const hasAgreed = wx.getStorageSync('hasAgreedPrivacy');
    if (hasAgreed) {
      this.setData({ canAgree: true, agreed: true });
    }
  },

  // 切换协议同意
  toggleAgree() {
    this.setData({
      agreed: !this.data.agreed,
      canAgree: !this.data.canAgree
    });
    wx.setStorageSync('hasAgreedPrivacy', this.data.agreed);
  },

  // 微信一键登录
  onGetUserInfo(e) {
    if (!this.data.agreed) {
      wx.showToast({ title: '请先阅读并同意用户协议', icon: 'none' });
      return;
    }

    wx.getUserProfile({
      desc: '用于完善个人资料',
      success: (res) => {
        const userInfo = res.userInfo;
        // 保存用户信息
        wx.setStorageSync('userInfo', userInfo);

        // 更新全局状态
        const app = getApp();
        app.globalData.userInfo = userInfo;
        app.globalData.isLogin = true;

        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500
        });

        // 延迟返回首页
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      },
      fail: (err) => {
        console.log('用户拒绝授权', err);
        // 即使拒绝授权，也允许使用基础功能
        wx.showToast({ title: '已进入体验模式', icon: 'none' });
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      }
    });
  },

  // 跳过登录（游客模式）
  skipLogin() {
    wx.navigateBack();
  },

  // 查看隐私政策
  viewPrivacy() {
    wx.showToast({ title: '隐私政策页面', icon: 'none' });
  },

  // 查看用户协议
  viewAgreement() {
    wx.showToast({ title: '用户协议页面', icon: 'none' });
  }
});
