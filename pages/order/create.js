Page({
  data: {
    providerName: '',
    serviceName: '',
    price: 0,
    duration: '',
    step: 1,
    userRequirement: '',
    selectedDate: '',
    selectedTime: '',
    timeSlots: ['09:00-09:30', '10:00-10:30', '14:00-14:30', '15:00-15:30', '16:00-16:30', '19:00-19:30'],
    selectedSlotIndex: -1
  },

  onLoad(options) {
    this.setData({
      providerName: options.providerName || '',
      serviceName: options.serviceName || '',
      price: parseInt(options.price) || 0,
      duration: options.duration || ''
    });
  },

  // 步骤1→2：填写需求
  onRequirementInput(e) {
    this.setData({ userRequirement: e.detail.value });
  },

  nextToStep2() {
    if (!this.data.userRequirement.trim()) {
      wx.showToast({ title: '请简单描述你的需求', icon: 'none' });
      return;
    }
    this.setData({ step: 2 });
  },

  backToStep1() {
    this.setData({ step: 1 });
  },

  // 步骤2→3：选择时间
  selectDate(e) {
    this.setData({ selectedDate: e.detail.value });
  },

  selectTime(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ selectedSlotIndex: index, selectedTime: this.data.timeSlots[index] });
  },

  nextToStep3() {
    if (!this.data.selectedDate) {
      wx.showToast({ title: '请选择日期', icon: 'none' });
      return;
    }
    if (this.data.selectedSlotIndex < 0) {
      wx.showToast({ title: '请选择时间段', icon: 'none' });
      return;
    }
    this.setData({ step: 3 });
  },

  backToStep2() {
    this.setData({ step: 2 });
  },

  // 提交订单
  submitOrder() {
    wx.showModal({
      title: '确认预约',
      content: `${this.data.serviceName}\n${this.data.providerName}\n${this.data.selectedDate} ${this.data.selectedTime}\n¥${this.data.price}`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '提交中...' });
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({ title: '预约成功！', icon: 'success' });
            setTimeout(() => {
              wx.switchTab({ url: '/pages/message/message' });
            }, 1500);
          }, 800);
        }
      }
    });
  }
});
