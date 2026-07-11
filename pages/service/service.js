const app = getApp();

Page({
  data: {
    activeTab: 'career',
    tabs: [
      { key: 'career', label: '职业成长' },
      { key: 'coach', label: '心理教练' },
      { key: 'listen', label: '倾听陪伴' },
      { key: 'youth', label: '青少年' }
    ],

    // 职业规划师
    planners: [
      {
        id: 'p1', name: '张规划师', avatar: '张', title: '前心内科医师 → 药企MSL',
        rating: 4.9, orders: 128, price: 199, tags: ['医生转型', '药企MSL', '简历优化'],
        intro: '心内科主治医师5年，2019年转型药企医学联络官(MSL)，后晋升为区域医学经理。已辅导128位医护成功转型到药企、互联网医疗、医学写作等领域。',
        services: [
          { name: '职业方向快答', price: 199, duration: '30分钟', desc: '适合有明确方向、需要确认的用户' },
          { name: '深度职业规划', price: 999, duration: '90分钟', desc: '适合从零探索方向、需要完整路线图的用户' },
          { name: '转型陪跑计划', price: 2999, duration: '3个月', desc: '全程陪伴直到拿到心仪offer' }
        ]
      },
      {
        id: 'p2', name: '李导师', avatar: '李', title: '保险高管 → 创业顾问',
        rating: 4.8, orders: 96, price: 299, tags: ['保险转型', '创业辅导', '管理咨询'],
        intro: '保险行业15年，从一线销售做到省级分公司总经理，后创立保险科技公司。擅长辅导保险从业者的职业转型、创业规划和能力提升。',
        services: [
          { name: '职业方向快答', price: 299, duration: '30分钟', desc: '快速诊断你的职业瓶颈和突破方向' },
          { name: '深度职业规划', price: 1299, duration: '90分钟', desc: '从行业分析到个人定位的完整规划' }
        ]
      },
      {
        id: 'p3', name: '王猎头', avatar: '王', title: '医疗行业猎头顾问',
        rating: 4.7, orders: 203, price: 199, tags: ['医疗猎头', '面试辅导', '薪资谈判'],
        intro: '专注医疗健康行业招聘8年，服务过强生、罗氏、美敦力等知名企业，熟悉药企/器械/互联网医疗各岗位的招聘标准。',
        services: [
          { name: '职业方向快答', price: 199, duration: '30分钟', desc: '行业薪资和岗位需求快速查询' },
          { name: '深度职业规划', price: 799, duration: '90分钟', desc: '含简历优化+模拟面试+薪资谈判' }
        ]
      }
    ],

    // 心理教练
    coaches: [
      {
        id: 'c1', name: '陈教练', avatar: '陈', title: '积极心理教练 · 6年经验',
        rating: 4.8, orders: 89, price: 299, tags: ['积极心理学', '职业倦怠', '关系改善'],
        intro: '中科院心理所认证，积极心理学取向。擅长帮助来访者发现自身优势、突破职业倦怠、改善人际关系。相信每个人内心都有成长的力量。',
        services: [
          { name: '单次心理教练', price: 299, duration: '50分钟', desc: '聚焦一个议题的深度探索' },
          { name: '积极成长计划', price: 999, duration: '月度', desc: '4次教练对话+每周练习+期间文字支持' }
        ]
      },
      {
        id: 'c2', name: '林教练', avatar: '林', title: '正念教练 · 8年冥想经验',
        rating: 4.9, orders: 156, price: 399, tags: ['正念减压', '情绪管理', '睡眠改善'],
        intro: 'MBSR正念减压认证导师，8年个人冥想练习经验。温和而坚定，陪伴你学会与情绪共处、在压力中找到内在的平静。',
        services: [
          { name: '单次心理教练', price: 399, duration: '50分钟', desc: '含正念引导练习' },
          { name: '正念减压计划', price: 1499, duration: '8周', desc: '经典MBSR体系，每周1次+每日练习指导' }
        ]
      }
    ],

    // 倾听师
    listeners: [
      {
        id: 'l1', name: '小雅', avatar: '雅', title: '温柔倾听 · 情感陪伴',
        rating: 4.9, orders: 256, price: 19, online: true, tags: ['情感', '家庭', '压力'],
        intro: '我愿意听你说说那些压在心里的话。不评判、不建议、不分析。只是在这里，安静地听。每一次倾诉都值得被温柔对待。',
        services: [
          { name: '15分钟体验', price: 19, duration: '15分钟', desc: '试试看，和一个人说说话的感觉' },
          { name: '30分钟陪伴', price: 39, duration: '30分钟', desc: '有足够的时间展开' },
          { name: '60分钟深度', price: 69, duration: '60分钟', desc: '慢慢来，不急' }
        ]
      },
      {
        id: 'l2', name: '大海', avatar: '海', title: '理性倾听 · 职场成长',
        rating: 4.8, orders: 167, price: 19, online: true, tags: ['职场', '学业', '成长'],
        intro: '陪你理清思路，看清方向。不替你做决定，但陪你找到属于你自己的答案。',
        services: [
          { name: '15分钟体验', price: 19, duration: '15分钟' },
          { name: '30分钟陪伴', price: 39, duration: '30分钟' },
          { name: '60分钟深度', price: 69, duration: '60分钟' }
        ]
      },
      {
        id: 'l3', name: '晓晓', avatar: '晓', title: '温暖陪伴 · 青少年友好',
        rating: 4.7, orders: 98, price: 19, online: false, tags: ['青少年', '学业压力', '同伴关系'],
        intro: '有耐心、有活力的倾听者。和年轻人一起面对成长中的困惑和压力。',
        services: [
          { name: '15分钟体验', price: 19, duration: '15分钟' },
          { name: '30分钟陪伴', price: 39, duration: '30分钟' }
        ]
      }
    ],

    // 青少年服务
    youthServices: [
      {
        id: 'y1', type: 'course', name: '家长加油站',
        subtitle: '6周线上训练营 · 下一期 3月15日',
        price: 699, enrolled: 128, maxSlots: 30,
        tags: ['录播课', '每周讨论', '社群打卡'],
        desc: '"如何听懂你的孩子"——6周系统学习积极倾听、非暴力沟通、优势教养',
        weeks: [
          'Week 1：孩子的情绪在说什么',
          'Week 2：积极倾听——先听后说',
          'Week 3：不说"你怎么又..."',
          'Week 4：发现孩子的优势',
          'Week 5：和学习压力做朋友',
          'Week 6：建立家庭情绪安全空间'
        ]
      },
      {
        id: 'y2', type: 'coach', name: '青少年1v1成长教练',
        subtitle: '12-18岁 · 50分钟线上视频',
        price: 399, coachName: '陈教练', coachTitle: '教育学硕士 · 5年青少年工作经验',
        rating: 4.8, orders: 56,
        tags: ['考试焦虑', '同伴关系', '自信心', '亲子沟通'],
        desc: '不是治疗师，是成长伙伴。帮助青少年面对学业压力、人际困扰和自我认同的困惑。'
      },
      {
        id: 'y3', type: 'group', name: '儿童心理素质小组',
        subtitle: '6-12岁 · 4-6人小组 · 40分钟/次',
        price: 150,
        groups: ['情绪小怪兽-认识和管理情绪', '友谊万花筒-社交技能', '我能行-自信心和抗挫力'],
        desc: '通过游戏和故事，在安全和有趣的氛围中提升孩子的心理素质。'
      }
    ],

    // 筛选
    filterTags: [],
    selectedFilter: ''
  },

  onLoad(options) {
    if (options.tab) {
      this.setData({ activeTab: options.tab });
    }
    this.updateFilters();
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab, selectedFilter: '' });
    this.updateFilters();
  },

  updateFilters() {
    const tab = this.data.activeTab;
    let tags = [];
    if (tab === 'career') tags = ['全部', '医生转型', '保险转型', '猎头辅导'];
    else if (tab === 'coach') tags = ['全部', '积极心理', '正念减压', '情绪管理'];
    else if (tab === 'listen') tags = ['全部', '情感', '职场', '青少年'];
    else if (tab === 'youth') tags = ['全部', '家长课程', '1v1教练', '小组活动'];
    this.setData({ filterTags: tags });
  },

  onFilterTap(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({ selectedFilter: tag === this.data.selectedFilter ? '' : tag });
  },

  // 查看详情
  onItemTap(e) {
    const { item, type } = e.currentTarget.dataset;
    const tab = this.data.activeTab;
    if (tab === 'listen') {
      // 倾听师 → 直接进入快速连接
      wx.navigateTo({ url: `/pages/listen/connect?id=${item.id}&name=${item.name}&price=${item.price}&online=${item.online}` });
    } else if (tab === 'youth' && item.type === 'course') {
      wx.navigateTo({ url: `/pages/youth/course?id=${item.id}` });
    } else {
      wx.navigateTo({ url: `/pages/provider/detail?id=${item.id}&type=${tab}` });
    }
  },

  // 一键连接倾听师
  onQuickConnect(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({ url: `/pages/listen/connect?id=${item.id}&name=${item.name}&price=${item.price}&online=${item.online}` });
  }
});
