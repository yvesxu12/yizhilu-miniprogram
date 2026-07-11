Page({
  data: {
    conversations: [
      {
        id: 1,
        name: '小暖',
        avatar: '🤖',
        lastMsg: '好的，我在这里。想说什么都可以~',
        time: '刚刚',
        unread: 0,
        type: 'ai'
      },
      {
        id: 2,
        name: '张规划师',
        avatar: '张',
        lastMsg: '好的，周五下午2点见，到时候我们可以详细聊聊你的转型方向。',
        time: '昨天',
        unread: 1,
        type: 'coach'
      },
      {
        id: 3,
        name: '小雅',
        avatar: '雅',
        lastMsg: '谢谢你今天的分享，照顾好自己。下次随时找我。',
        time: '2天前',
        unread: 0,
        type: 'listener'
      }
    ]
  },

  // 进入对话
  openChat(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/message/chat?id=${id}`
    });
  }
});
