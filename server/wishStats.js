const WISH_COUNT_OFFSET = 24;
const COUNTRY_COUNT = 6;
const REQUEST_TIMEOUT_MS = 5_000;

const LABELS = {
  vi: 'lời chúc đã được gửi đến Vy & Thịnh từ Việt Nam, Pháp, Trung Quốc, Hoa Kỳ, Hàn Quốc, Úc... ❦',
  en: 'wishes sent to Vy & Thịnh from Vietnam, France, China, the United States, South Korea, Australia... ❦',
  fr: "vœux envoyés à Vy & Thịnh depuis le Vietnam, la France, la Chine, les États-Unis, la Corée du Sud, l'Australie... ❦",
  zh: '条祝福已从越南、法国、中国、美国、韩国、澳大利亚等地送达 Vy & Thịnh ❦',
  ja: '件のメッセージがベトナム、フランス、中国、アメリカ、韓国、オーストラリアなどから Vy & Thịnh に届いています ❦',
};

function fallbackStats() {
  return {
    count: WISH_COUNT_OFFSET,
    countryCount: COUNTRY_COUNT,
    labels: LABELS,
  };
}

export async function getWishStats({
  fetchImpl = fetch,
  url = process.env.NEXT_PUBLIC_SUPABASE_URL,
  key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  signal = AbortSignal.timeout(REQUEST_TIMEOUT_MS),
} = {}) {
  if (!url || !key) return fallbackStats();

  try {
    const res = await fetchImpl(`${url}/rest/v1/wishes?select=*`, {
      method: 'HEAD',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: 'count=exact',
      },
      signal,
    });

    if (!res.ok) return fallbackStats();

    const contentRange = res.headers.get('content-range') ?? '';
    const total = Number.parseInt(contentRange.split('/')[1] ?? '', 10);

    if (!Number.isFinite(total)) return fallbackStats();

    return {
      count: total + WISH_COUNT_OFFSET,
      countryCount: COUNTRY_COUNT,
      labels: LABELS,
    };
  } catch {
    // Stats are decorative and should not turn a temporary database or DNS
    // outage into a failed API request. The form reports write errors itself.
    return fallbackStats();
  }
}
