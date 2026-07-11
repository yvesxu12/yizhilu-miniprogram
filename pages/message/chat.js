Page({
  data: {
    chatId: '',
    chatName: '',
    chatType: '',
    messages: [],
    inputText: ''
  },

  onLoad(options) {
    const id = options.id;
    this.setData({ chatId: id });
    this.loadChat(id);
  },

  loadChat(id) {
    // 模拟对话数据
    const mockChats = {
      '1': {
        name: '小暖',
        type: 'ai',
        messages: [
          { role: 'ai', content: '嗨，我在。今天想聊点什么？', time: '10:30' },
          { role: 'user', content: '今天工作上的事有点烦', time: '10:31' },
          { role: 'ai', content: '听起来今天不太顺利呢。愿意多说说发生了什么吗？', time: '10:31' },
          { role: 'user', content: '就是项目被领导否了，改了好几版还是不行', time: '10:32' },
          { role: 'ai', content: '反复修改却还是不通过，这种感觉确实很消耗人。你已经在很努力地做了，这不是你的问题。', time: '10:33' }
        ]
      },
      '2': {
        name: '张规划师',
        type: 'coach',
        messages: [
          { role: 'ai', content: '你好！看到你预约了周五的职业规划咨询。这是我的简单介绍，你可以提前了解一下。有什么问题也可以先问我。', time: '昨天 14:20' },
          { role: 'user', content: '好的张老师，我先发我的简历给您看看', time: '昨天 14:25' },
          { role: 'ai', content: '收到，我看了你的简历。你的ICU临床经验非常宝贵，很多企业都很需要这种急重症背景的人才。周五我们可以详细聊。', time: '昨天 15:00' }
        ]
      },
      '3': {
        name: '小雅',
        type: 'listener',
        messages: [
          { role: 'ai', content: '谢谢你今天的分享，照顾好自己。下次随时找我。', time: '2天前 21:15' }
        ]
      }
    };

    const chat = mockChats[id] || { name: '对话', type: '', messages: [] };
    this.setData({
      chatName: chat.name,
      chatType: chat.type,
      messages: chat.messages
    });
  },

  onInput(e) {
    this.setData({ inputText: e.detail.value });
  },

  sendMessage() {
    const text = this.data.inputText.trim();
    if (!text) return;

    const msg = { role: 'user', content: text, time: this.getTime() };
    this.setData({
      messages: [...this.data.messages, msg],
      inputText: ''
    });

    // 模拟自动回复（实际接入IM或AI）
    if (this.data.chatType === 'ai') {
      setTimeout(() => {
        const replies = ['嗯，我在听。', '这种感觉我理解。', '你继续说，我在这里。'];
        const reply = { role: 'ai', content: replies[Math.floor(Math.random() * replies.length)], time: this.getTime() };
        this.setData({ messages: [...this.data.messages, reply] });
      }, 1000);
    }
  },

  getTime() {
    const d = new Date();
    return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
  }
});
