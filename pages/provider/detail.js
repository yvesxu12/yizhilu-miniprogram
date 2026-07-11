Page({
  data: {
    id: '',
    type: '',
    provider: null
  },

  onLoad(options) {
    this.setData({ id: options.id, type: options.type });
    this.loadProvider(options.id, options.type);
  },

  loadProvider(id, type) {
    // 模拟数据加载（实际应从API/数据库获取）
    wx.showLoading({ title: '加载中...' });
    setTimeout(() => {
      const mockData = this.getMockData(id);
      this.setData({ provider: mockData });
      wx.hideLoading();
    }, 300);
  },

  getMockData(id) {
    // 简化版mock，实际接入数据库
    return {
      id: id,
      name: '张规划师',
      avatar: '张',
      rating: 4.9,
      orders: 128,
      title: '前心内科医师 → 药企MSL',
      intro: '心内科主治医师5年，2019年转型药企医学联络官(MSL)，后晋升为区域医学经理。已辅导128位医护成功转型到药企、互联网医疗、医学写作等领域。相信每个人的临床经验都有独特的价值，关键是如何将"临床语言"翻译为"企业语言"。',
      tags: ['医生转型', '药企MSL', '简历优化', '面试辅导'],
      services: [
        { name: '职业方向快答', price: 199, duration: '30分钟', desc: '适合有明确方向、需要确认的用户' },
        { name: '深度职业规划', price: 999, duration: '90分钟', desc: '从能力评估到行动路线图的完整规划' },
        { name: '转型陪跑计划', price: 2999, duration: '3个月', desc: '每月2次咨询+不限次文字支持+面试辅导+Offer评估' }
      ],
      reviews: [
        { user: '李医生', rating: 5, text: '张老师非常专业！帮我从临床思维转换到企业思维，简历修改后投了5家，拿到3个面试。现在已经成功入职一家CRO公司了。', time: '2026-06' },
        { user: '王主任', rating: 5, text: '作为40岁的高年资医生，一直很焦虑转型的问题。张老师帮我分析了我的优势，梳理了可行的路径，整个过程很有安全感。', time: '2026-05' },
        { user: '陈同学', rating: 4, text: '作为应届医学生，对未来很迷茫。虽然一次咨询不能解决所有问题，但至少知道了有哪些选项和各自的利弊。', time: '2026-04' }
      ]
    };
  },

  // 预约服务
  bookService(e) {
    const service = e.currentTarget.dataset.service;
    const provider = this.data.provider;
    wx.navigateTo({
      url: `/pages/order/create?providerId=${provider.id}&providerName=${provider.name}&serviceName=${service.name}&price=${service.price}&duration=${service.duration}`
    });
  }
});
