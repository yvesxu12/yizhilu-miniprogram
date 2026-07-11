Page({
  data: {
    activeTab: 'career',
    tabs: [
      { key: 'career', label: '职业成长' },
      { key: 'coach', label: '心理教练' },
      { key: 'listen', label: '倾听陪伴' },
      { key: 'youth', label: '青少年' }
    ]
  },

  onLoad(options) {
    if (options.tab) {
      this.setData({ activeTab: options.tab });
    }
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
  }
});
