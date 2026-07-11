Page({
  data: {
    todayMood: null,
    todayNote: '',
    selectedMood: -1,
    moods: [
      { emoji: '😊', label: '开心', value: 5 },
      { emoji: '😌', label: '平静', value: 4 },
      { emoji: '😐', label: '一般', value: 3 },
      { emoji: '😔', label: '低落', value: 2 },
      { emoji: '😢', label: '难过', value: 1 }
    ],
    aiReply: '',
    showAiReply: false,
    diaryHistory: []
  },

  onLoad() {
    this.loadTodayRecord();
    this.loadHistory();
  },

  loadTodayRecord() {
    const today = this.getTodayStr();
    const record = wx.getStorageSync('mood_' + today);
    if (record) {
      this.setData({
        todayMood: record.mood,
        todayNote: record.note,
        aiReply: record.aiReply || '',
        showAiReply: true
      });
    }
  },

  loadHistory() {
    const history = wx.getStorageSync('mood_history') || [];
    this.setData({ diaryHistory: history.slice(0, 30) });
  },

  // 选择心情
  selectMood(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ selectedMood: index });
  },

  // 输入文字
  onNoteInput(e) {
    this.setData({ todayNote: e.detail.value });
  },

  // 提交记录
  submitMood() {
    if (this.data.selectedMood < 0) {
      wx.showToast({ title: '请选择一个心情哦', icon: 'none' });
      return;
    }

    const mood = this.data.moods[this.data.selectedMood];
    const today = this.getTodayStr();

    // 生成AI回复（模拟，实际应该调用API）
    const aiReplies = {
      5: ['太棒了！能分享一下今天开心的事吗？✨', '看到你开心，我也开心～继续保持哦！'],
      4: ['平静也是一种很好的状态 🍃', '今天的你很从容呢。'],
      3: ['有时候一天就这样过去了，也没关系。', '谢谢你愿意记录下来。'],
      2: ['听起来今天不太容易。这种时候，你是怎么照顾自己的呢？', '低落的时候，允许自己慢一点。'],
      1: ['我在。难过的时候不需要马上好起来。', '如果你愿意，可以说说发生了什么。我在这里听。']
    };
    const replies = aiReplies[mood.value];
    const aiReply = replies[Math.floor(Math.random() * replies.length)];

    // 保存记录
    const record = {
      date: today,
      mood: mood.value,
      moodEmoji: mood.emoji,
      moodLabel: mood.label,
      note: this.data.todayNote,
      aiReply: aiReply,
      time: new Date().toLocaleTimeString()
    };

    wx.setStorageSync('mood_' + today, record);

    // 更新历史
    const history = wx.getStorageSync('mood_history') || [];
    const existIndex = history.findIndex(h => h.date === today);
    if (existIndex >= 0) {
      history[existIndex] = record;
    } else {
      history.unshift(record);
    }
    wx.setStorageSync('mood_history', history);

    this.setData({
      todayMood: mood.value,
      todayNote: record.note,
      aiReply: aiReply,
      showAiReply: true,
      diaryHistory: history.slice(0, 30),
      selectedMood: -1
    });

    wx.showToast({ title: '记录成功 🌟', icon: 'none' });
  },

  getTodayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
});
