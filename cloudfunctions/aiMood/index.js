const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'your-api-key-here';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

/**
 * AI心情日记分析云函数
 */
exports.main = async (event, context) => {
  const { mood, moodLabel, note } = event;

  const systemPrompt = `你是小暖，一位温暖的心理陪伴者。
用户刚记录了今天的心情：${moodLabel}（${mood}/5分）
${note ? '用户还写了一句话：' + note : ''}

请你用温柔而简短的语言（50字以内）回应，风格要求：
- 温暖、包容、不评判
- 简短有温度
- 不分析、不说教、不建议
- 肯定用户的感受

只回复你的回应文本，不要加引号或多余内容。`;

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
        messages: [{ role: 'user', content: systemPrompt }],
        temperature: 0.9,
        max_tokens: 100
      }
    });

    if (response.status === 200) {
      const reply = response.data.choices[0].message.content.trim();
      return { reply };
    }

  } catch (err) {
    console.error('AI Mood API error:', err.message);
  }

  // 降级回复
  const fallbacks = {
    5: '太棒了！开心的时候要好好记住这个感觉 ✨',
    4: '平静也是一种很好的状态 🍃',
    3: '有时候一天就这样过去了，也没关系。',
    2: '听起来今天不太容易。记得照顾自己。',
    1: '我在。难过的时候不需要马上好起来。'
  };
  return { reply: fallbacks[mood] || '谢谢你记录今天的心情。' };
};
