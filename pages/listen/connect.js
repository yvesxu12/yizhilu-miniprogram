Page({
  data: {
    listenerId: '',
    listenerName: '',
    basePrice: 19,
    online: true,
    selectedDuration: 15,
    selectedPrice: 19,
    connecting: false,
    connected: false,
    countdown: 0,
    timer: null
  },

  onLoad(options) {
    this.setData({
      listenerId: options.id,
      listenerName: options.name || '倾听师',
      basePrice: parseInt(options.price) || 19,
      online: options.online !== 'false'
    });
    this.selectDuration(15);
  },

  selectDuration(minutes) {
    const priceMap = { 15: this.data.basePrice, 30: this.data.basePrice * 2, 60: this.data.basePrice * 3 + 10 };
    this.setData({
      selectedDuration: minutes,
      selectedPrice: priceMap[minutes]
    });
  },

  // 开始连接
  startConnect() {
    if (!this.data.online) {
      wx.showToast({ title: '该倾听师暂未在线，请预约', icon: 'none' });
      return;
    }

    this.setData({ connecting: true });

    // 模拟连接过程
    let count = 3;
    this.setData({ countdown: count });

    const timer = setInterval(() => {
      count--;
      this.setData({ countdown: count });
      if (count <= 0) {
        clearInterval(timer);
        this.setData({ connecting: false, connected: true });
      }
    }, 1000);

    this.setData({ timer });
  },

  // 取消连接
  cancelConnect() {
    if (this.data.timer) clearInterval(this.data.timer);
    this.setData({ connecting: false, connected: false, countdown: 0 });
  },

  // 结束通话
  endCall() {
    wx.showModal({
      title: '结束通话',
      content: '确定要结束本次倾听吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ connected: false });
          wx.showToast({ title: '通话已结束', icon: 'none' });
        }
      }
    });
  }
});
