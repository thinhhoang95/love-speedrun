const WISH_COUNT_OFFSET = 24;
const COUNTRY_COUNT = 6;

const LABELS = {
  vi: 'lời chúc đã được gửi đến Vy & Thịnh từ Việt Nam, Pháp, Trung Quốc, Hoa Kỳ, Hàn Quốc, Úc... ❦',
  en: 'wishes sent to Vy & Thịnh from Vietnam, France, China, the United States, South Korea, Australia... ❦',
  fr: "vœux envoyés à Vy & Thịnh depuis le Vietnam, la France, la Chine, les États-Unis, la Corée du Sud, l'Australie... ❦",
  zh: '条祝福已从越南、法国、中国、美国、韩国、澳大利亚等地送达 Vy & Thịnh ❦',
  ja: '件のメッセージがベトナム、フランス、中国、アメリカ、韓国、オーストラリアなどから Vy & Thịnh に届いています ❦',
};

export async function getWishStats() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  const res = await fetch(`${url}/rest/v1/wishes?select=*`, {
    method: 'HEAD',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'count=exact',
    },
  });

  if (!res.ok) throw new Error(`Supabase HEAD failed: ${res.status}`);

  const contentRange = res.headers.get('content-range') ?? '';
  const total = parseInt(contentRange.split('/')[1] ?? '0', 10);

  return {
    count: (isNaN(total) ? 0 : total) + WISH_COUNT_OFFSET,
    countryCount: COUNTRY_COUNT,
    labels: LABELS,
  };
}
