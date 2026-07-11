/**
 * 工具函数
 */

// 格式化时间
const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute].map(formatNumber).join(':')}`;
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

// 获取今日日期字符串
const getTodayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};

// 显示加载中
const showLoading = (title = '加载中...') => {
  wx.showLoading({ title, mask: true });
};

// 隐藏加载
const hideLoading = () => {
  wx.hideLoading();
};

// 显示提示
const showToast = (title, icon = 'none') => {
  wx.showToast({ title, icon, duration: 2000 });
};

// 简单的防抖
const debounce = (fn, delay = 500) => {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

// 请求封装
const request = (url, options = {}) => {
  const { method = 'GET', data = {}, header = {} } = options;

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header: {
        'content-type': 'application/json',
        ...header
      },
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
};

// API基础URL（上线时替换为实际域名）
const API_BASE = 'https://your-api-domain.com/api';

// AI对话接口
const chatWithAI = async (messages, personality = 'listener') => {
  return request(`${API_BASE}/ai/chat`, {
    method: 'POST',
    data: { messages, personality }
  });
};

// 心情日记AI分析
const analyzeMood = async (moodValue, note) => {
  return request(`${API_BASE}/ai/mood-analyze`, {
    method: 'POST',
    data: { mood: moodValue, note }
  });
};

module.exports = {
  formatTime,
  getTodayStr,
  showLoading,
  hideLoading,
  showToast,
  debounce,
  request,
  chatWithAI,
  analyzeMood
};
