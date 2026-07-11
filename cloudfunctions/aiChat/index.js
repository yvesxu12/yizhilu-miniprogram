const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

// DeepSeek API configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'your-api-key-here';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

/**
 * AI 对话云函数
 * 支持三种角色：listener(倾听)、career(职业规划)、parent(家长助手)
 */
exports.main = async (event, context) => {
  const { messages, personality } = event;

  // 安全校验：消息数量限制
  if (!messages || messages.length === 0) {
    return { content: '请说点什么吧。' };
  }

  try {
    const response = await cloud.openapi.cloudbase.request({
      method: 'POST',
      url: DEEPSEEK_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      data: {
        model: 'deepseek-chat',
        messages: messages,
        temperature: personality === 'career' ? 0.5 : 0.8,
        max_tokens: personality === 'career' ? 600 : 300,
        top_p: 0.9
      }
    });

    if (response.status === 200) {
      const reply = response.data.choices[0].message.content;
      return { content: reply };
    }

    return { content: '嗯，我在听...（请稍后再试）' };

  } catch (err) {
    console.error('DeepSeek API error:', err.message);

    // 降级：返回安全的默认回复
    const fallbacks = {
      listener: '我在这里。你想说什么都可以，我在听。',
      career: '抱歉，AI服务暂时不可用。请稍后再试，或预约真人规划师获得更准确的建议。',
      parent: 'AI服务正在维护中。你可以先浏览我们的家长课程，或预约1v1咨询。'
    };

    return { content: fallbacks[personality] || fallbacks.listener };
  }
};
