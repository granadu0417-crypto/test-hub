// Cloudflare Pages Function - 크롤러를 위한 동적 OG 메타 태그
// KakaoTalk, Facebook, Twitter 등의 크롤러가 접근할 때만 동작

// 모든 테스트 결과 데이터 (각 테스트별로 매핑)
const TEST_DATA = {
  'mbti-simple': {
    title: '간단한 MBTI 성격 테스트',
    baseUrl: 'https://test-hub-er7.pages.dev/tests/mbti-simple/',
    results: {
      'ESTJ': { badge: '👔', title: 'ESTJ - 경영자형', subtitle: '실용적이고 체계적인 리더' },
      'ESFJ': { badge: '🤝', title: 'ESFJ - 친선도모형', subtitle: '따뜻하고 배려심 많은 사교가' },
      'ISTJ': { badge: '📋', title: 'ISTJ - 청렴결백형', subtitle: '신뢰할 수 있는 완벽주의자' },
      'ISFJ': { badge: '🛡️', title: 'ISFJ - 수호자형', subtitle: '헌신적이고 따뜻한 보호자' },
      'ESTP': { badge: '⚡', title: 'ESTP - 활동가형', subtitle: '에너지 넘치는 문제 해결사' },
      'ESFP': { badge: '🎉', title: 'ESFP - 연예인형', subtitle: '즐겁고 활기찬 사교적 인물' },
      'ISTP': { badge: '🔧', title: 'ISTP - 만능재주꾼', subtitle: '논리적이고 실용적인 장인' },
      'ISFP': { badge: '🎨', title: 'ISFP - 성인군자형', subtitle: '감성적이고 예술적인 영혼' },
      'ENTJ': { badge: '👑', title: 'ENTJ - 지휘관형', subtitle: '카리스마 넘치는 리더' },
      'ENFJ': { badge: '💫', title: 'ENFJ - 언변능숙형', subtitle: '카리스마 있는 영감을 주는 리더' },
      'INTJ': { badge: '🧠', title: 'INTJ - 전략가형', subtitle: '독립적이고 전략적인 사색가' },
      'INFJ': { badge: '🌟', title: 'INFJ - 예언자형', subtitle: '이상주의적인 통찰력 있는 조언자' },
      'ENTP': { badge: '💡', title: 'ENTP - 발명가형', subtitle: '창의적이고 논쟁을 즐기는 혁신가' },
      'ENFP': { badge: '🌈', title: 'ENFP - 스파크형', subtitle: '열정적이고 창의적인 자유로운 영혼' },
      'INTP': { badge: '🔬', title: 'INTP - 논리술사형', subtitle: '논리적이고 창의적인 사색가' },
      'INFP': { badge: '🦋', title: 'INFP - 중재자형', subtitle: '이상주의적이고 감성적인 몽상가' }
    }
  },
  'stress-level': {
    title: '스트레스 지수 테스트',
    baseUrl: 'https://test-hub-er7.pages.dev/tests/stress-level/',
    results: {
      'low': { badge: '😊', title: '낮은 스트레스 상태', subtitle: '건강한 마음 상태를 유지하고 있어요' },
      'moderate': { badge: '😐', title: '보통 스트레스 상태', subtitle: '주의가 필요한 시기입니다' },
      'high': { badge: '😰', title: '높은 스트레스 상태', subtitle: '적극적인 관리가 필요합니다' }
    }
  },
  'self-esteem': {
    title: '자존감 테스트',
    baseUrl: 'https://test-hub-er7.pages.dev/tests/self-esteem/',
    results: {
      'high': { badge: '⭐', title: '높은 자존감', subtitle: '자신감 있고 긍정적인 마인드' },
      'moderate': { badge: '🌟', title: '보통 자존감', subtitle: '균형 잡힌 자아상을 가지고 있어요' },
      'low': { badge: '💙', title: '낮은 자존감', subtitle: '자신을 소중히 여기는 연습이 필요해요' }
    }
  },
  'empathy': {
    title: '공감 능력 테스트',
    baseUrl: 'https://test-hub-er7.pages.dev/tests/empathy/',
    results: {
      'emotional': { badge: '❤️', title: '감정적 공감형', subtitle: '타인의 감정을 깊이 느끼는 당신' },
      'cognitive': { badge: '🧠', title: '인지적 공감형', subtitle: '이해와 분석으로 공감하는 당신' },
      'balanced': { badge: '⚖️', title: '균형 공감형', subtitle: '감정과 이성의 조화로운 공감' },
      'low': { badge: '🤔', title: '낮은 공감형', subtitle: '객관적이고 논리적인 당신' }
    }
  },
  'sociability': {
    title: '사회성 테스트',
    baseUrl: 'https://test-hub-er7.pages.dev/tests/sociability/',
    results: {
      'extroverted': { badge: '🎉', title: '사교형', subtitle: '활발하고 외향적인 소셜 마스터' },
      'friendly': { badge: '😊', title: '친화형', subtitle: '따뜻하고 편안한 관계 지향형' },
      'selective': { badge: '🤝', title: '선택형', subtitle: '의미 있는 관계를 중시하는 당신' },
      'introverted': { badge: '📚', title: '내향형', subtitle: '깊이 있는 소통을 선호하는 당신' }
    }
  },
  'burnout': {
    title: '번아웃 지수 테스트',
    baseUrl: 'https://test-hub-er7.pages.dev/tests/burnout/',
    results: {
      'normal': { badge: '✨', title: '정상 상태', subtitle: '에너지가 충만한 건강한 상태예요' },
      'warning': { badge: '⚠️', title: '주의 상태', subtitle: '휴식이 필요한 시점입니다' },
      'danger': { badge: '🚨', title: '위험 상태', subtitle: '적극적인 회복이 필요합니다' }
    }
  },
  'love-language': {
    title: '애정 표현 방식 테스트',
    baseUrl: 'https://test-hub-er7.pages.dev/tests/love-language/',
    results: {
      'words': { badge: '💬', title: '긍정의 말형', subtitle: '따뜻한 말로 사랑을 전하는 당신' },
      'time': { badge: '⏰', title: '함께하는 시간형', subtitle: '소중한 시간으로 사랑을 표현하는 당신' },
      'gifts': { badge: '🎁', title: '선물형', subtitle: '마음을 담은 선물로 사랑을 나누는 당신' },
      'service': { badge: '🤲', title: '봉사형', subtitle: '행동으로 사랑을 보여주는 당신' },
      'touch': { badge: '🤗', title: '스킨십형', subtitle: '따뜻한 접촉으로 사랑을 느끼는 당신' }
    }
  }
};

// 크롤러 User-Agent 패턴
const CRAWLER_PATTERNS = [
  'kakaotalk',           // 카카오톡
  'facebookexternalhit', // 페이스북
  'Facebot',            // 페이스북
  'Twitterbot',         // 트위터
  'LinkedInBot',        // 링크드인
  'Slackbot',           // 슬랙
  'TelegramBot',        // 텔레그램
  'WhatsApp',           // 왓츠앱
  'Pinterest',          // 핀터레스트
  'Google-InspectionTool', // 구글
  'Googlebot',
  'bingbot',            // Bing
  'Discordbot'          // 디스코드
];

// 크롤러 감지
function isCrawler(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return CRAWLER_PATTERNS.some(pattern => ua.includes(pattern.toLowerCase()));
}

// URL에서 테스트 ID와 결과 타입 추출
function parseTestUrl(url) {
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/').filter(Boolean);

  // /tests/mbti-simple/ 형태에서 mbti-simple 추출
  const testId = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];

  // ?result=ESTJ 에서 ESTJ 추출
  const resultType = urlObj.searchParams.get('result');

  return { testId, resultType };
}

// 동적 OG 메타 태그 생성
function generateOGTags(testId, resultType) {
  const testData = TEST_DATA[testId];
  if (!testData) return null;

  const result = testData.results[resultType];
  if (!result) return null;

  const shareTitle = `나는 ${result.badge} ${result.title}!`;
  const shareDescription = `${result.subtitle}\n당신도 테스트해보세요 👉`;
  const shareUrl = `${testData.baseUrl}?result=${resultType}`;

  return {
    title: shareTitle,
    description: shareDescription,
    url: shareUrl
  };
}

// HTML에 OG 태그 주입
function injectOGTags(html, ogData) {
  if (!ogData) return html;

  // 기존 OG 태그 제거 (있다면)
  let modifiedHtml = html.replace(/<meta property="og:.*?".*?>/g, '');

  // 새로운 OG 태그 생성
  const ogTags = `
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHtml(ogData.title)}">
    <meta property="og:description" content="${escapeHtml(ogData.description)}">
    <meta property="og:url" content="${escapeHtml(ogData.url)}">
    <meta property="og:site_name" content="심리테스트 모음">
    <meta property="og:image" content="https://test-hub-er7.pages.dev/og-default.jpg">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(ogData.title)}">
    <meta name="twitter:description" content="${escapeHtml(ogData.description)}">
    <meta name="twitter:image" content="https://test-hub-er7.pages.dev/og-default.jpg">
  `;

  // <head> 태그 내부에 삽입
  modifiedHtml = modifiedHtml.replace('</head>', `${ogTags}\n</head>`);

  return modifiedHtml;
}

// HTML 이스케이프
function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 메인 미들웨어 함수
export async function onRequest(context) {
  const { request, next, env } = context;
  const userAgent = request.headers.get('User-Agent') || '';
  const url = request.url;

  // 크롤러가 아니면 그냥 통과
  if (!isCrawler(userAgent)) {
    return next();
  }

  // URL 파싱
  const { testId, resultType } = parseTestUrl(url);

  // 테스트 결과 URL이 아니면 통과
  if (!testId || !resultType || !TEST_DATA[testId]) {
    return next();
  }

  // OG 태그 데이터 생성
  const ogData = generateOGTags(testId, resultType);
  if (!ogData) {
    return next();
  }

  // 원본 응답 가져오기
  const response = await next();

  // HTML이 아니면 그냥 반환
  const contentType = response.headers.get('Content-Type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  // HTML 읽기
  let html = await response.text();

  // OG 태그 주입
  html = injectOGTags(html, ogData);

  // 새로운 응답 반환
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}
