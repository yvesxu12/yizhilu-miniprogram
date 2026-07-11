const app = getApp();

Page({
  data: {
    // AI角色
    personalities: [
      {
        key: 'listener',
        name: '小暖',
        emoji: '🤖',
        title: 'AI倾听陪伴',
        desc: '温暖、包容、不评判。随时愿意听你说。',
        color: '#66BB6A',
        welcome: '嗨，我在。今天想聊点什么？'
      },
      {
        key: 'career',
        name: '小职',
        emoji: '🎯',
        title: 'AI职业顾问',
        desc: '帮医学和保险从业者分析转型方向。',
        color: '#5B9BD5',
        welcome: '你好！我是小职，你的AI职业顾问。\n可以帮你分析职业方向、优化简历、了解行业行情。\n想聊聊什么？'
      },
      {
        key: 'parent',
        name: '小知',
        emoji: '🌻',
        title: 'AI家长助手',
        desc: '回答家庭教育问题，提供亲子沟通建议。',
        color: '#F5A623',
        welcome: '你好呀！我是小知，你的家庭教育助手。\n可以问我任何关于和孩子相处的问题～'
      }
    ],

    activePersonality: 'listener',
    personality: null,

    // 对话
    messages: [],
    inputText: '',
    isTyping: false,
    scrollToView: '',

    // 安全提示
    showSafetyTip: true
  },

  onLoad(options) {
    const key = options.type || 'listener';
    this.switchPersonality(key);
  },

  switchPersonality(key) {
    const p = this.data.personalities.find(p => p.key === key);
    if (!p) return;

    this.setData({
      activePersonality: key,
      personality: p,
      messages: [
        { role: 'ai', content: p.welcome, time: this.getTime() }
      ],
      showSafetyTip: true
    });
  },

  onPersonalityTap(e) {
    const key = e.currentTarget.dataset.key;
    this.switchPersonality(key);
  },

  // 输入
  onInput(e) {
    this.setData({ inputText: e.detail.value });
  },

  // 发送消息
  sendMessage() {
    const text = this.data.inputText.trim();
    if (!text) return;

    const msg = { role: 'user', content: text, time: this.getTime() };
    const messages = [...this.data.messages, msg];

    this.setData({
      messages,
      inputText: '',
      isTyping: true,
      showSafetyTip: false,
      scrollToView: 'msg-' + (messages.length - 1)
    });

    // 调用AI
    this.callAI(text, messages);
  },

  // 调用AI API
  async callAI(userInput, history) {
    try {
      // 构建消息历史（最近10轮）
      const recentHistory = history.slice(-20).map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }));

      const systemPrompt = this.getSystemPrompt();

      const res = await wx.cloud.callFunction({
        name: 'aiChat',
        data: {
          messages: [
            { role: 'system', content: systemPrompt },
            ...recentHistory
          ]
        }
      });

      const aiContent = res.result.content || res.result.reply || '嗯，我在听。';

      const aiMsg = { role: 'ai', content: aiContent, time: this.getTime() };
      const messages = [...this.data.messages, aiMsg];

      this.setData({
        messages,
        isTyping: false,
        scrollToView: 'msg-' + (messages.length - 1)
      });

      // 安全检查
      this.safetyCheck(userInput, aiContent);

    } catch (err) {
      console.error('AI调用失败', err);
      // 降级：本地回复
      const fallback = this.getFallbackReply();
      const aiMsg = { role: 'ai', content: fallback, time: this.getTime() };
      this.setData({
        messages: [...this.data.messages, aiMsg],
        isTyping: false
      });
    }
  },

  getSystemPrompt() {
    const prompts = {
      listener: `你是小暖，一位温暖、包容、不评判的AI陪伴者。
你的风格：温柔而简短、不主动建议、不分析评价、不说教。
你会：倾听、共情、温和引导、允许沉默。
你不会：诊断、治疗、评价对错、给人生建议、打破砂锅问到底。
如果用户表达了危险信号（自伤/自杀/伤害他人），你要：
1. 表达关心，不要恐慌
2. 提醒有专业的危机干预热线：全国心理援助热线 400-161-9995
3. 建议和真人聊聊
回复控制在100字以内，像朋友聊天一样自然。`,

      career: `你是小职，一位AI职业顾问，专注于医学和保险从业者的职业发展。
你擅长的领域：医生转型路径（药企MSL/MA、互联网医疗、医学写作、医学投资、健康保险）、保险从业者职业发展（核保/理赔/产品/培训/管理）。
你的风格：理性清晰、提供信息和选择、不替人做决定。
你有以下知识：
- 药企MSL入行薪资25-40万，3年目标50-70万
- 互联网医疗运营入行薪资20-35万
- 健康险核保入行薪资18-30万
- 转型前需要准备的：英语（MSL）、商业思维（互联网）、保险知识（核保）
回复时给出具体、有数据支撑的建议，但最后加上"最终决定还是看你自己"。`,

      parent: `你是小知，一位AI家庭教育助手，专注于积极教养和亲子沟通。
你的知识基础：积极心理学、非暴力沟通、PET父母效能训练。
你会：提供具体的沟通话术、引导家长看见孩子的需求、给温暖而实用的建议。
你不会：诊断孩子的心理问题、批评家长的做法、建议打骂或惩罚。
回复时给出"可以试试这样说..."的具体话术。`
    };
    return prompts[this.data.activePersonality] || prompts.listener;
  },

  // 安全关键词检测
  safetyCheck(input, reply) {
    const dangerWords = ['自杀', '想死', '不想活', '自残', '割腕', '跳楼', '安眠药', '结束生命', '伤害自己', '伤害别人'];
    const found = dangerWords.some(w => input.includes(w));
    if (found) {
      // 记录预警日志
      console.warn('⚠️ 安全预警触发', { input: input.substring(0, 50) });
    }
  },

  // 降级回复（API不可用时）
  getFallbackReply() {
    const replies = [
      '嗯，我在听。',
      '听起来这对你很重要。',
      '谢谢你愿意和我分享这些。',
      '我理解这种感觉。',
      '你可以继续说，我不急。'
    ];
    if (this.data.activePersonality === 'career') {
      return '医生转型的主要方向有药企MSL、互联网医疗运营、医学写作、健康险核保等。你想了解哪一个方向的具体信息？';
    }
    if (this.data.activePersonality === 'parent') {
      return '和孩子沟通时，可以先试着说出他的感受："你看起来很生气"，再表达你的关心。要不要试试看？';
    }
    return replies[Math.floor(Math.random() * replies.length)];
  },

  getTime() {
    const d = new Date();
    return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
  },

  // 快速话题
  onQuickTopic(e) {
    const topic = e.currentTarget.dataset.topic;
    this.setData({ inputText: topic });
    this.sendMessage();
  },

  onShareAppMessage() {
    return {
      title: '和AI聊聊吧，有人在听 💬',
      path: '/pages/ai-chat/index'
    };
  }
});
