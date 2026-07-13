const MODEL = 'google/gemini-3.5-flash';

const STYLE_PROMPTS = {
  family: 'Người viết là ông/bà, cô, chú hoặc bác của cô dâu chú rể. Giọng văn ấm áp, trang trọng vừa phải, có sự chở che của người thân trong gia đình.',
  coworker: 'Người viết là đồng nghiệp của cô dâu chú rể. Giọng văn lịch sự, chân thành, tươi vui, có nét gần gũi nơi công sở.',
  friend: 'Người viết là bạn bè của cô dâu chú rể. Giọng văn thân mật, vui vẻ, tự nhiên, có sự quý mến của bạn thân.',
};

const LENGTH_PROMPTS = {
  long: 'Viết dài hơn, văn chương, giàu hình ảnh nhưng tự nhiên. Bắt buộc tối đa 460 ký tự.',
  short: 'Viết ngắn, thân mật, dễ gửi ngay. Bắt buộc tối đa 240 ký tự.',
};

function cleanWish(text) {
  return String(text ?? '')
    .replace(/^["'“”‘’\s]+|["'“”‘’\s]+$/g, '')
    .replace(/\s+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function isUsableWish(text) {
  return /[à-ỹđ]/i.test(text)
    && text.length >= 40
    && /\b(Vy|Thịnh|hai bạn|hai cháu|cô dâu|chú rể|hạnh phúc)\b/i.test(text);
}

function limitWish(text, maxChars) {
  if (text.length <= maxChars) return text;
  const clipped = text.slice(0, maxChars);
  const punctuationIndex = Math.max(
    clipped.lastIndexOf('.'),
    clipped.lastIndexOf('!'),
    clipped.lastIndexOf('?'),
  );
  if (punctuationIndex > maxChars * 0.65) {
    return clipped.slice(0, punctuationIndex + 1).trim();
  }
  return `${clipped.replace(/\s+\S*$/, '').trim()}...`;
}

export async function generateWish({ style, length, name = '', draft = '' }) {
  if (!process.env.OPENROUTER_API_KEY) {
    const err = new Error('Missing OPENROUTER_API_KEY');
    err.status = 500;
    throw err;
  }

  const stylePrompt = STYLE_PROMPTS[style];
  const lengthPrompt = LENGTH_PROMPTS[length];
  if (!stylePrompt || !lengthPrompt) {
    const err = new Error('Invalid wish options');
    err.status = 400;
    throw err;
  }

  const requestBody = {
    model: MODEL,
    messages: [
      {
        role: 'system',
        content: [
          'Bạn là trợ lý viết lời chúc đám cưới bằng tiếng Việt.',
          'Chỉ trả về đúng một đoạn lời chúc hoàn chỉnh bằng tiếng Việt.',
          'Không tiêu đề, không nhãn vai trò, không giải thích, không markdown.',
          'Không nhắc đến việc dùng AI. Không bịa kỷ niệm riêng.',
        ].join(' '),
      },
      {
        role: 'user',
        content: [
          'Viết một lời chúc mừng lễ thành hôn cho Vy và Thịnh.',
          'Ngày cưới: 02.08.2026.',
          stylePrompt,
          lengthPrompt,
          name ? `Tên người gửi: ${String(name).slice(0, 40)}.` : '',
          draft ? `Nếu phù hợp, hãy cải thiện ý từ bản nháp này: ${String(draft).slice(0, 500)}` : '',
          'Trả lời ngay bằng lời chúc, bắt đầu bằng tiếng Việt tự nhiên.',
        ].filter(Boolean).join('\n'),
      },
    ],
    temperature: 0.85,
    max_tokens: length === 'long' ? 500 : 260,
    reasoning: { effort: 'minimal' },
  };

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'http://localhost:5173',
      'X-Title': 'Vy & Thinh Wedding Invitation',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const detail = await response.text();
    const err = new Error(`OpenRouter request failed: ${response.status} ${detail.slice(0, 300)}`);
    err.status = 502;
    throw err;
  }

  const data = await response.json();
  const maxChars = length === 'long' ? 480 : 260;
  const wish = limitWish(cleanWish(data?.choices?.[0]?.message?.content), maxChars);
  if (!wish || !isUsableWish(wish)) {
    const err = new Error('OpenRouter returned an unusable wish');
    err.status = 502;
    throw err;
  }

  return { wish };
}
