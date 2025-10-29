// 🐭 띠별 운세 엔진
// ⭐ 별자리 운세 엔진

// 12별자리 정보
const WESTERN_ZODIAC = {
  aries: { name: '양자리', icon: '♈', symbol: '불', trait: '열정', startDate: [3, 21], endDate: [4, 19] },
  taurus: { name: '황소자리', icon: '♉', symbol: '흙', trait: '안정', startDate: [4, 20], endDate: [5, 20] },
  gemini: { name: '쌍둥이자리', icon: '♊', symbol: '공기', trait: '호기심', startDate: [5, 21], endDate: [6, 21] },
  cancer: { name: '게자리', icon: '♋', symbol: '물', trait: '감성', startDate: [6, 22], endDate: [7, 22] },
  leo: { name: '사자자리', icon: '♌', symbol: '불', trait: '리더십', startDate: [7, 23], endDate: [8, 22] },
  virgo: { name: '처녀자리', icon: '♍', symbol: '흙', trait: '완벽', startDate: [8, 23], endDate: [9, 22] },
  libra: { name: '천칭자리', icon: '♎', symbol: '공기', trait: '균형', startDate: [9, 23], endDate: [10, 22] },
  scorpio: { name: '전갈자리', icon: '♏', symbol: '물', trait: '신비', startDate: [10, 23], endDate: [11, 21] },
  sagittarius: { name: '사수자리', icon: '♐', symbol: '불', trait: '자유', startDate: [11, 22], endDate: [12, 21] },
  capricorn: { name: '염소자리', icon: '♑', symbol: '흙', trait: '책임', startDate: [12, 22], endDate: [1, 19] },
  aquarius: { name: '물병자리', icon: '♒', symbol: '공기', trait: '독창', startDate: [1, 20], endDate: [2, 18] },
  pisces: { name: '물고기자리', icon: '♓', symbol: '물', trait: '직관', startDate: [2, 19], endDate: [3, 20] }
};

// 12띠 정보
const CHINESE_ZODIAC = {
  rat: { name: '쥐띠', icon: '🐭', element: '물', trait: '지혜', years: [1948, 1960, 1972, 1984, 1996, 2008, 2020] },
  ox: { name: '소띠', icon: '🐮', element: '흙', trait: '근면', years: [1949, 1961, 1973, 1985, 1997, 2009, 2021] },
  tiger: { name: '호랑이띠', icon: '🐯', element: '나무', trait: '용맹', years: [1950, 1962, 1974, 1986, 1998, 2010, 2022] },
  rabbit: { name: '토끼띠', icon: '🐰', element: '나무', trait: '온화', years: [1951, 1963, 1975, 1987, 1999, 2011, 2023] },
  dragon: { name: '용띠', icon: '🐲', element: '흙', trait: '권위', years: [1952, 1964, 1976, 1988, 2000, 2012, 2024] },
  snake: { name: '뱀띠', icon: '🐍', element: '불', trait: '직관', years: [1953, 1965, 1977, 1989, 2001, 2013, 2025] },
  horse: { name: '말띠', icon: '🐴', element: '불', trait: '활력', years: [1954, 1966, 1978, 1990, 2002, 2014] },
  goat: { name: '양띠', icon: '🐑', element: '흙', trait: '감성', years: [1955, 1967, 1979, 1991, 2003, 2015] },
  monkey: { name: '원숭이띠', icon: '🐵', element: '금속', trait: '재치', years: [1956, 1968, 1980, 1992, 2004, 2016] },
  rooster: { name: '닭띠', icon: '🐔', element: '금속', trait: '성실', years: [1957, 1969, 1981, 1993, 2005, 2017] },
  dog: { name: '개띠', icon: '🐶', element: '흙', trait: '충성', years: [1958, 1970, 1982, 1994, 2006, 2018] },
  pig: { name: '돼지띠', icon: '🐷', element: '물', trait: '평화', years: [1959, 1971, 1983, 1995, 2007, 2019] }
};

// 럭키 컬러 풀
const LUCKY_COLORS = [
  { name: '빨강', hex: '#EF4444' },
  { name: '주황', hex: '#F97316' },
  { name: '노랑', hex: '#EAB308' },
  { name: '초록', hex: '#10B981' },
  { name: '파랑', hex: '#3B82F6' },
  { name: '남색', hex: '#6366F1' },
  { name: '보라', hex: '#A855F7' },
  { name: '분홍', hex: '#EC4899' },
  { name: '금색', hex: '#F59E0B' },
  { name: '은색', hex: '#94A3B8' }
];

// 럭키 넘버 풀 (1-99)
const LUCKY_NUMBERS = Array.from({ length: 99 }, (_, i) => i + 1);

// 출생년도로 띠 계산
function getZodiacByYear(year) {
  const zodiacOrder = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'];
  const baseYear = 1900; // 쥐띠 기준년도
  const index = (year - baseYear) % 12;
  return zodiacOrder[index];
}

// 간단한 해시 함수 (문자열 → 숫자)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32bit 정수로 변환
  }
  return Math.abs(hash);
}

// 결정론적 랜덤 (같은 시드 = 같은 결과)
function deterministicRandom(seed, min = 0, max = 1) {
  const hash = simpleHash(seed);
  const normalized = (hash % 10000) / 10000; // 0~1 사이 값
  return Math.floor(normalized * (max - min + 1)) + min;
}

// 현재 주차 계산 (ISO 8601 기준)
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

// 시간대별 시드 생성
function getPeriodSeed(baseKey, period) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  switch (period) {
    case 'today':
      return `${baseKey}-${year}-${month}-${day}`;
    case 'week':
      const weekNum = getWeekNumber(today);
      return `${baseKey}-${year}-week-${weekNum}`;
    case 'month':
      return `${baseKey}-${year}-${month}`;
    case 'year':
      return `${baseKey}-${year}`;
    default:
      return `${baseKey}-${year}-${month}-${day}`;
  }
}

// 배열에서 결정론적으로 선택
function deterministicChoice(seed, array) {
  const index = deterministicRandom(seed, 0, array.length - 1);
  return array[index];
}

// 오늘의 운세 생성
// 띠별 운세 생성 (시간대별)
function getChineseZodiacFortune(birthYear, period = 'today') {
  // 띠 계산
  const zodiacKey = getZodiacByYear(birthYear);
  const zodiac = CHINESE_ZODIAC[zodiacKey];

  // 시드 생성: 띠 + 시간대
  const seed = getPeriodSeed(zodiacKey, period);

  // 점수 생성 (0-100)
  const totalScore = deterministicRandom(`${seed}-total`, 60, 100);
  const loveScore = deterministicRandom(`${seed}-love`, 50, 100);
  const moneyScore = deterministicRandom(`${seed}-money`, 50, 100);
  const workScore = deterministicRandom(`${seed}-work`, 50, 100);

  // 럭키 컬러
  const luckyColor = deterministicChoice(`${seed}-color`, LUCKY_COLORS);

  // 럭키 넘버
  const luckyNumber = deterministicRandom(`${seed}-number`, 1, 99);

  // 운세 메시지 선택
  const messages = getFortuneMessages(zodiacKey, totalScore, period);

  // 시간대별 날짜 표시
  const today = new Date();
  let periodLabel = '';
  switch (period) {
    case 'today':
      periodLabel = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
      break;
    case 'week':
      periodLabel = `${today.getFullYear()}년 ${getWeekNumber(today)}주차`;
      break;
    case 'month':
      periodLabel = `${today.getFullYear()}년 ${today.getMonth() + 1}월`;
      break;
    case 'year':
      periodLabel = `${today.getFullYear()}년`;
      break;
  }

  return {
    zodiac,
    period,
    periodLabel,
    birthYear,
    scores: {
      total: totalScore,
      love: loveScore,
      money: moneyScore,
      work: workScore
    },
    luckyColor,
    luckyNumber,
    messages
  };
}

// 띠별 오늘의 운세 (하위 호환성)
function getTodayFortune(birthYear) {
  return getChineseZodiacFortune(birthYear, 'today');
}

// 운세 메시지 생성 (점수 기반)
function getFortuneMessages(zodiacKey, totalScore, period = 'today') {
  const zodiac = CHINESE_ZODIAC[zodiacKey];

  // 시간대별 문구
  const periodTexts = {
    today: { name: '오늘', ending: '날', future: '내일은' },
    week: { name: '이번주', ending: '한 주', future: '다음주는' },
    month: { name: '이번달', ending: '한 달', future: '다음달은' },
    year: { name: '올해', ending: '한 해', future: '내년은' }
  };

  const pt = periodTexts[period] || periodTexts.today;

  // 종합 운세 (점수별)
  let overall = '';
  if (totalScore >= 90) {
    overall = `${pt.name}는 ${zodiac.name}에게 최고의 ${pt.ending}입니다! 십이지신의 기운이 당신을 강하게 보호하고 있으며, 모든 일이 순조롭게 풀릴 것입니다. 이 시기는 당신이 그동안 쌓아온 노력과 인덕이 빛을 발하는 때입니다. 자신감을 가지고 중요한 결정을 내리세요. 특히 새로운 사업이나 프로젝트를 시작하기에 매우 좋은 타이밍입니다. ${zodiac.name} 특유의 장점이 최대한 발휘되어 주변 사람들로부터 인정과 지지를 받을 것입니다. 직관을 믿고 과감하게 행동하세요. 지금 당신이 내리는 결정과 시작하는 일들은 오랫동안 긍정적인 영향을 미칠 것입니다.`;
  } else if (totalScore >= 80) {
    overall = `${zodiac.name}에게 좋은 ${pt.ending}가 될 것입니다. 십이지의 순행이 당신에게 유리하게 작용하고 있어 평소보다 일이 수월하게 진행될 것입니다. 평소 하고 싶었던 일을 시작하기 좋은 시기입니다. 긍정적인 마음가짐을 유지하면서 주변 사람들과의 관계도 더욱 돈독히 하세요. ${zodiac.name}의 특성을 잘 활용한다면 예상치 못한 기회를 만날 수 있습니다. 작은 도전이라도 두려워하지 말고 시도해보세요. 비록 즉각적인 결과가 보이지 않더라도, 지금 당신이 뿌리는 씨앗은 곧 풍성한 열매로 돌아올 것입니다. 주변의 긍정적인 기운을 받아들이고, 당신도 그 기운을 나누어 주세요.`;
  } else if (totalScore >= 70) {
    overall = `무난한 ${pt.ending}가 될 것입니다. 큰 변화보다는 안정적으로 현재의 흐름을 유지하는 것이 좋습니다. ${zodiac.name}은 이 시기에 차분하고 신중한 태도가 필요합니다. 무리한 계획보다는 이미 진행 중인 일들을 차근차근 마무리하는 데 집중하세요. 작은 행복을 찾아보고, 일상 속에서 감사할 점들을 발견하려 노력하세요. ${zodiac.name}의 성품이 주변 사람들에게 안정감과 신뢰를 주고 있습니다. 급하게 서두르기보다는 천천히, 하지만 꾸준히 앞으로 나아가세요. 지금은 에너지를 비축하고 다음 기회를 준비하는 시간입니다. 조금만 더 인내심을 가지고 기다린다면, ${pt.future} 더 좋은 기회가 반드시 찾아올 것입니다.`;
  } else {
    overall = `조금 조심스러운 ${pt.ending}입니다. 서두르지 말고 천천히 신중하게 행동하세요. ${zodiac.name}의 기운이 다소 약해진 시기로, 중요한 결정이나 큰 변화는 미루는 것이 현명합니다. 지금은 적극적인 행동보다는 관찰과 계획, 그리고 휴식의 시간입니다. ${zodiac.name}의 장점이 때로는 부담이 될 수 있으니, 너무 완벽을 추구하기보다는 현실적이고 실천 가능한 목표를 세우세요. 주변 사람들의 조언에 귀를 기울이고, 혼자 모든 것을 해결하려 하기보다는 도움을 요청하는 것도 좋은 방법입니다. 어려운 상황이 있더라도 이는 일시적인 것이며, 이 시기를 지혜롭게 보낸다면 더 강하고 성숙해질 수 있습니다. ${pt.future} 더 좋은 시기가 반드시 올 것이니 희망과 믿음을 잃지 마세요.`;
  }

  // 띠별 특별 메시지 (확장)
  const specialMessages = {
    rat: '쥐띠 특유의 영리한 판단력과 민첩한 대응 능력이 빛을 발하는 시기입니다. 당신의 통찰력은 복잡한 상황에서도 핵심을 정확히 파악할 수 있게 합니다. 새로운 기회를 포착하는 능력이 뛰어난 시기이니 주변을 잘 관찰하세요. 재물운이 좋아지는 시기로 투자나 사업 관련 기회가 있을 수 있습니다. 다만 너무 욕심을 부리지 말고 적절한 선에서 만족하는 지혜가 필요합니다. 당신의 사교성과 적응력이 새로운 인맥을 만들어줄 것입니다. 빠른 판단력을 발휘하되, 중요한 결정은 한 번 더 신중하게 검토하세요.',
    ox: '소띠 특유의 성실함과 끈기가 마침내 결실을 맺을 시기입니다. 당신이 묵묵히 쌓아온 노력과 신뢰가 주변 사람들에게 인정받고 있습니다. 안정적이고 체계적인 접근 방식이 큰 성과로 이어질 것입니다. 급하게 서두르지 말고 당신의 페이스를 유지하세요. 인내심을 가지고 꾸준히 나아간다면 확실한 성취를 얻을 수 있습니다. 재물운도 안정적으로 유지되며, 장기적인 저축이나 투자가 좋습니다. 당신의 책임감 있는 태도가 가정과 직장에서 큰 신뢰를 얻고 있습니다. 가끔은 자신에게도 여유를 주고 휴식을 취하세요.',
    tiger: '호랑이띠의 용기와 추진력이 빛나는 시기입니다. 당신의 대담한 도전 정신이 새로운 기회를 만들어낼 것입니다. 두려움 없이 앞으로 나아가는 당신의 모습은 주변 사람들에게 큰 영감을 줍니다. 리더십을 발휘할 기회가 많이 올 것이며, 중요한 프로젝트를 이끌 수 있습니다. 다만 너무 성급하게 행동하거나 독단적인 결정은 피하세요. 다른 사람의 의견도 경청하는 자세가 필요합니다. 당신의 열정과 카리스마가 목표 달성에 큰 힘이 될 것입니다. 정의감과 의리를 중시하는 당신의 성품이 진정한 동료를 만들어줄 것입니다.',
    rabbit: '토끼띠의 온화하고 세심한 성품이 주변 사람들에게 큰 위로와 평화를 가져다주는 시기입니다. 당신의 공감 능력과 배려심이 관계를 더욱 돈독하게 만들 것입니다. 예술적 감각과 심미안이 빛을 발하여 창의적인 활동에서 좋은 성과를 거둘 수 있습니다. 평화로운 환경에서 당신의 능력이 최대한 발휘됩니다. 갈등 상황에서는 중재자 역할을 잘 해낼 수 있습니다. 다만 지나친 회피나 우유부단함은 경계하세요. 필요할 때는 자신의 의견을 분명히 표현하는 것도 중요합니다. 당신의 따뜻한 마음이 복을 불러올 것입니다.',
    dragon: '용띠의 강력한 카리스마와 리더십이 최고조에 달하는 시기입니다. 당신은 자연스럽게 사람들의 주목을 받고, 중요한 역할을 맡게 될 것입니다. 큰 그림을 그리고 비전을 제시하는 능력이 뛰어난 시기입니다. 자신감을 가지고 당신의 야망을 실현하세요. 주변의 지지와 협력도 잘 얻을 수 있습니다. 다만 자만심이나 독선은 경계해야 합니다. 겸손함과 배려를 잊지 마세요. 당신의 창의성과 행동력이 큰 성취로 이어질 것입니다. 명예운도 좋아 사회적으로 인정받을 기회가 많습니다.',
    snake: '뱀띠의 깊은 직관력과 예리한 통찰력이 진가를 발휘하는 시기입니다. 당신은 표면 아래 숨겨진 진실과 기회를 정확히 포착할 수 있습니다. 신중하고 전략적인 접근이 큰 성과를 가져올 것입니다. 중요한 결정을 내리기에 좋은 시기이며, 당신의 판단을 믿으세요. 지혜롭고 신비로운 매력이 사람들을 끌어당깁니다. 재물운도 좋아 투자나 사업에서 이득을 볼 수 있습니다. 다만 지나친 의심이나 비밀주의는 관계에 해가 될 수 있으니 적절한 소통이 필요합니다. 당신의 침착함과 냉정함이 복잡한 문제를 해결하는 열쇠가 될 것입니다.',
    horse: '말띠의 활발한 에너지와 자유로운 정신이 넘치는 시기입니다. 당신의 열정과 행동력이 새로운 도전을 성공으로 이끌 것입니다. 적극적으로 움직이고 기회를 만들어가세요. 여행이나 새로운 환경에서 좋은 기회를 만날 수 있습니다. 사교성이 높아져 새로운 인맥을 형성하기 좋습니다. 당신의 낙천적이고 긍정적인 태도가 주변에 활력을 줍니다. 다만 너무 성급하거나 변덕스러운 모습은 자제하세요. 시작한 일은 끝까지 책임지는 자세가 필요합니다. 당신의 순수한 열정이 많은 사람들에게 영감을 줄 것입니다.',
    goat: '양띠의 예술적 감각과 창의적인 아이디어가 빛을 발하는 시기입니다. 당신의 상상력과 감성이 아름다운 결과물을 만들어낼 것입니다. 예술, 디자인, 창작 활동에서 특히 좋은 성과를 거둘 수 있습니다. 온화하고 친절한 성품이 사람들에게 호감을 얻게 합니다. 평화롭고 조화로운 환경을 만드는 능력이 뛰어납니다. 재물운도 꾸준하며, 협력을 통한 이익이 있을 수 있습니다. 다만 우유부단하거나 의존적인 모습은 경계하세요. 자신의 결정에 책임을 지는 자세가 필요합니다. 당신의 부드러운 카리스마가 복을 불러옵니다.',
    monkey: '원숭이띠의 재치와 유머 감각이 빛나는 시기입니다. 당신의 명랑함과 영리함이 어려운 상황도 쉽게 풀어갈 수 있게 합니다. 재치있는 대화와 커뮤니케이션 능력으로 좋은 인연을 만들 수 있습니다. 새로운 아이디어와 해결책을 빠르게 찾아내는 능력이 뛰어납니다. 다재다능한 당신의 재능이 여러 방면에서 인정받을 것입니다. 재물운도 좋아 예상치 못한 수입이 있을 수 있습니다. 다만 장난기나 경솔함은 자제하세요. 진지할 때와 즐거울 때를 구분하는 지혜가 필요합니다. 당신의 밝은 에너지가 주변을 행복하게 만듭니다.',
    rooster: '닭띠의 성실함과 정직함이 큰 인정을 받는 시기입니다. 당신의 근면하고 책임감 있는 태도가 성과로 이어질 것입니다. 꼼꼼하고 체계적인 업무 처리 능력이 빛을 발합니다. 시간 약속과 계획을 잘 지키는 당신의 신뢰성이 높이 평가됩니다. 외모나 형식에도 신경 쓰는 것이 좋은 결과를 가져올 수 있습니다. 정의감과 원칙을 중시하는 당신의 모습이 존경받을 것입니다. 다만 지나친 완벽주의나 비판적 태도는 관계에 해가 될 수 있으니 유연성도 필요합니다. 당신의 성실한 노력이 반드시 보상받을 것입니다.',
    dog: '개띠의 충성심과 정직함이 깊은 신뢰를 쌓아가는 시기입니다. 당신의 성실하고 책임감 있는 태도가 가정과 직장에서 큰 인정을 받을 것입니다. 정의감과 의리를 중시하는 당신의 성품이 진정한 친구를 만들어줍니다. 어려운 사람을 돕는 일에서 큰 보람을 느낄 수 있습니다. 한결같고 변함없는 당신의 모습이 주변에 안정감을 줍니다. 가족이나 가까운 사람들과의 관계가 더욱 돈독해질 것입니다. 다만 지나친 걱정이나 염려는 자제하세요. 때로는 낙관적인 시각도 필요합니다. 당신의 진심 어린 마음이 복을 부를 것입니다.',
    pig: '돼지띠에게 평화롭고 풍요로운 시기입니다. 당신의 너그럽고 관대한 성품이 많은 사람들에게 사랑받을 것입니다. 정직하고 순수한 마음가짐이 좋은 인연과 기회를 끌어당깁니다. 물질적인 풍요와 정서적인 안정을 동시에 누릴 수 있는 시기입니다. 여유를 즐기고 삶의 기쁨을 만끽하세요. 가족이나 친구들과 함께하는 시간이 행복을 가져다줍니다. 재물운도 좋아 저축이나 투자에 유리합니다. 다만 지나친 낙관주의나 게으름은 경계하세요. 적절한 근면함과 계획성도 필요합니다. 당신의 복스러운 기운이 주변에 행운을 나누어줄 것입니다.'
  };

  return {
    overall,
    special: specialMessages[zodiacKey] || '좋은 하루 되세요!'
  };
}

// 별 아이콘 생성 (점수 → ★★★★☆)
function getStars(score) {
  const fullStars = Math.floor(score / 20);
  const hasHalfStar = (score % 20) >= 10;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
}

// ⭐ 별자리 계산 (월, 일 → 별자리 키)
function getZodiacByBirthdate(month, day) {
  const zodiacOrder = ['capricorn', 'aquarius', 'pisces', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius'];

  for (const key in WESTERN_ZODIAC) {
    const zodiac = WESTERN_ZODIAC[key];
    const [startMonth, startDay] = zodiac.startDate;
    const [endMonth, endDay] = zodiac.endDate;

    // 연말-연초를 걸치는 염소자리 특수 처리
    if (key === 'capricorn') {
      if ((month === 12 && day >= startDay) || (month === 1 && day <= endDay)) {
        return key;
      }
    } else {
      // 같은 달 안에 있는 경우
      if (month === startMonth && day >= startDay && day <= endDay) {
        return key;
      }
      // 다음 달로 넘어가는 경우
      if (month === startMonth && day >= startDay) {
        return key;
      }
      if (month === endMonth && day <= endDay) {
        return key;
      }
    }
  }

  return 'aries'; // 기본값
}

// ⭐ 별자리 운세 생성 (시간대별)
function getZodiacFortune(month, day, period = 'today') {
  // 별자리 계산
  const zodiacKey = getZodiacByBirthdate(month, day);
  const zodiac = WESTERN_ZODIAC[zodiacKey];

  // 시드 생성: 별자리 + 시간대
  const seed = getPeriodSeed(zodiacKey, period);

  // 점수 생성 (0-100)
  const totalScore = deterministicRandom(`${seed}-total`, 60, 100);
  const loveScore = deterministicRandom(`${seed}-love`, 50, 100);
  const moneyScore = deterministicRandom(`${seed}-money`, 50, 100);
  const workScore = deterministicRandom(`${seed}-work`, 50, 100);

  // 럭키 컬러
  const luckyColor = deterministicChoice(`${seed}-color`, LUCKY_COLORS);

  // 럭키 넘버
  const luckyNumber = deterministicRandom(`${seed}-number`, 1, 99);

  // 운세 메시지 선택
  const messages = getZodiacFortuneMessages(zodiacKey, totalScore, period);

  // 시간대별 날짜 표시
  const today = new Date();
  let periodLabel = '';
  switch (period) {
    case 'today':
      periodLabel = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
      break;
    case 'week':
      periodLabel = `${today.getFullYear()}년 ${getWeekNumber(today)}주차`;
      break;
    case 'month':
      periodLabel = `${today.getFullYear()}년 ${today.getMonth() + 1}월`;
      break;
    case 'year':
      periodLabel = `${today.getFullYear()}년`;
      break;
  }

  return {
    zodiac,
    period,
    periodLabel,
    birthdate: `${month}월 ${day}일`,
    scores: {
      total: totalScore,
      love: loveScore,
      money: moneyScore,
      work: workScore
    },
    luckyColor,
    luckyNumber,
    messages
  };
}

// 별자리 오늘의 운세 (하위 호환성)
function getTodayZodiacFortune(month, day) {
  return getZodiacFortune(month, day, 'today');
}

// ⭐ 별자리 운세 메시지 생성
function getZodiacFortuneMessages(zodiacKey, totalScore, period = 'today') {
  const zodiac = WESTERN_ZODIAC[zodiacKey];

  // 시간대별 문구
  const periodTexts = {
    today: { name: '오늘', ending: '하루', future: '내일은' },
    week: { name: '이번주', ending: '한 주', future: '다음주는' },
    month: { name: '이번달', ending: '한 달', future: '다음달은' },
    year: { name: '올해', ending: '한 해', future: '내년은' }
  };

  const pt = periodTexts[period] || periodTexts.today;

  // 종합 운세 (점수별)
  let overall = '';
  if (totalScore >= 90) {
    overall = `${pt.name}는 ${zodiac.name}에게 최고의 ${pt.ending}입니다! 우주의 별들이 당신에게 밝은 빛을 비추고 있으며, 모든 일이 순조롭게 풀릴 것입니다. 이 시기는 당신이 그동안 준비해온 것들이 결실을 맺는 때입니다. 자신감을 가지고 중요한 결정을 내리세요. 특히 새로운 프로젝트나 관계를 시작하기에 완벽한 타이밍입니다. 당신의 ${zodiac.trait} 성향이 최대한 발휘되어 주변 사람들에게 긍정적인 영향을 줄 수 있습니다. 직관을 믿고 과감하게 행동하세요. 지금 당신이 내리는 선택은 향후 긴 시간 동안 좋은 결과를 가져올 것입니다.`;
  } else if (totalScore >= 80) {
    overall = `${zodiac.name}에게 좋은 ${pt.ending}가 될 것입니다. ${zodiac.symbol}의 기운이 당신을 돕고 있어 평소보다 일이 수월하게 풀릴 것입니다. 평소 하고 싶었던 일을 시작하기 좋은 시기입니다. 긍정적인 마음가짐을 유지하면서 주변 사람들과의 관계도 더욱 돈독히 하세요. 당신의 장점인 ${zodiac.trait}을 활용한다면 예상치 못한 기회를 만날 수 있습니다. 작은 도전이라도 두려워하지 말고 시도해보세요. 비록 즉각적인 결과가 보이지 않더라도, 지금 당신이 뿌리는 씨앗은 곧 풍성한 열매를 맺을 것입니다. 주변의 긍정적인 에너지를 받아들이고, 당신도 그 에너지를 나누어 주세요.`;
  } else if (totalScore >= 70) {
    overall = `무난한 ${pt.ending}가 될 것입니다. 큰 변화보다는 안정적으로 현재의 흐름을 유지하는 것이 좋습니다. ${zodiac.name}은 ${zodiac.symbol}의 영향으로 차분하고 신중한 태도가 필요한 시기입니다. 무리한 계획보다는 이미 진행 중인 일들을 마무리하는 데 집중하세요. 작은 행복을 찾아보고, 일상 속에서 감사할 점들을 발견하려 노력하세요. 당신의 ${zodiac.trait} 성향이 주변 사람들에게 안정감을 주고 있습니다. 급하게 서두르기보다는 천천히, 하지만 꾸준히 앞으로 나아가세요. 지금은 에너지를 충전하고 다음 기회를 준비하는 시간입니다. 조금만 더 인내심을 가지고 기다린다면, ${pt.future} 더 좋은 기회가 찾아올 것입니다.`;
  } else {
    overall = `조금 조심스러운 ${pt.ending}입니다. 서두르지 말고 천천히 신중하게 행동하세요. ${zodiac.name}의 ${zodiac.symbol} 에너지가 다소 약해진 시기로, 중요한 결정은 미루는 것이 현명합니다. 지금은 행동보다는 관찰과 계획의 시간입니다. 당신의 ${zodiac.trait} 성향이 때로는 부담이 될 수 있으니, 너무 완벽을 추구하기보다는 현실적인 목표를 세우세요. 주변 사람들의 조언에 귀를 기울이고, 혼자 해결하려 하기보다는 도움을 요청하는 것도 좋은 방법입니다. 어려운 상황이 있더라도 이는 일시적인 것이며, 이 시기를 지혜롭게 보낸다면 더 강하고 성숙해질 수 있습니다. ${pt.future} 더 좋은 시기가 반드시 올 것이니 희망을 잃지 마세요. 지금은 휴식과 재충전이 필요한 때입니다.`;
  }

  // 별자리별 특별 메시지 (확장)
  const specialMessages = {
    aries: '양자리 특유의 열정적인 에너지가 빛을 발하는 시기입니다. 당신의 추진력과 용기는 주변 사람들에게 영감을 주고 있습니다. 도전을 두려워하지 마세요. 지금이야말로 새로운 프로젝트를 시작하거나 오랫동안 미뤄왔던 일에 도전할 완벽한 타이밍입니다. 다만 성급한 판단은 금물입니다. 당신의 직관을 믿되, 중요한 결정은 한 번 더 생각해보세요. 리더십을 발휘할 기회가 찾아올 수 있으니 자신감을 가지고 앞장서세요.',
    taurus: '황소자리에게 안정적이고 조화로운 시기입니다. 당신의 끈기와 인내심이 서서히 결실을 맺고 있습니다. 차근차근 목표를 향해 나아가며, 조급해하지 않는 것이 중요합니다. 물질적, 정서적 안정이 더욱 굳건해지는 때입니다. 당신이 쌓아온 신뢰는 주변 사람들에게 큰 힘이 됩니다. 급격한 변화보다는 현재의 기반을 더욱 튼튼히 하는 데 집중하세요. 작은 사치나 휴식을 통해 자신에게 보상하는 것도 좋습니다. 당신의 실용적인 접근 방식이 빛을 발할 것입니다.',
    gemini: '쌍둥이자리의 호기심과 커뮤니케이션 능력이 새로운 기회를 가져다줄 것입니다. 당신의 재치와 유연성이 어려운 상황을 쉽게 풀어갈 수 있게 합니다. 다양한 사람들과의 만남이나 정보 교류를 통해 예상치 못한 인사이트를 얻을 수 있습니다. 이 시기에는 학습이나 새로운 지식 습득이 특히 잘 됩니다. 여러 가지 일을 동시에 진행하는 것도 가능하지만, 너무 많은 것을 한꺼번에 시도하기보다는 우선순위를 정하는 것이 현명합니다. 당신의 말 한마디가 큰 영향력을 발휘할 수 있으니 신중하게 선택하세요.',
    cancer: '게자리에게 감성이 풍부해지고 직관이 예민해지는 시기입니다. 사랑하는 이들과 시간을 보내며 정서적 유대감을 강화하세요. 가족이나 가까운 사람들과의 관계에서 따뜻한 순간들을 경험할 것입니다. 당신의 공감 능력과 보살핌은 주변 사람들에게 큰 위로가 됩니다. 집이나 개인 공간을 정리하고 꾸미는 것도 좋은 활동입니다. 감정이 고조될 수 있으니 충분한 휴식과 자기 돌봄의 시간을 가지세요. 당신의 직관을 믿고 마음의 소리에 귀 기울이는 것이 중요합니다.',
    leo: '사자자리의 카리스마와 창의성이 최고조에 달하는 시기입니다. 당신은 자연스럽게 주목의 중심이 되고, 사람들은 당신의 에너지에 이끌립니다. 자신감을 가지고 당신의 재능을 마음껏 발휘하세요. 리더십을 발휘할 기회가 많이 올 것입니다. 다만 자만심은 경계해야 합니다. 다른 사람의 의견도 귀담아듣고 존중하는 태도가 필요합니다. 창의적인 프로젝트나 예술 활동에 참여한다면 큰 성취를 이룰 수 있습니다. 당신의 열정과 따뜻한 마음이 주변을 밝게 비춥니다.',
    virgo: '처녀자리의 분석력과 완벽을 추구하는 노력이 결실을 맺을 시기입니다. 당신의 세심한 관찰과 꼼꼼한 계획이 큰 성과로 이어질 것입니다. 업무나 학습에서 탁월한 성취를 이룰 수 있습니다. 다만 완벽주의가 지나쳐 스트레스를 받지 않도록 주의하세요. 때로는 70%의 완성도로도 충분하다는 것을 기억하세요. 건강 관리에도 신경 쓰기 좋은 시기입니다. 규칙적인 생활 습관과 운동은 당신에게 더욱 큰 에너지를 줄 것입니다. 봉사나 타인을 돕는 활동도 만족감을 가져다줄 것입니다.',
    libra: '천칭자리의 균형잡힌 판단력과 외교적 능력이 빛을 발할 시기입니다. 당신은 갈등 상황에서 조정자 역할을 훌륭히 해낼 수 있습니다. 사람들 사이의 관계를 조화롭게 만드는 당신의 능력이 큰 인정을 받을 것입니다. 예술적 감각도 높아지는 시기로, 아름다운 것들을 감상하거나 창작 활동에 참여하면 좋습니다. 다만 결정을 내리기 어려워하는 경향이 있으니, 중요한 선택은 신중하되 너무 오래 미루지는 마세요. 파트너십이나 협력 관계에서 좋은 성과를 거둘 수 있습니다.',
    scorpio: '전갈자리의 깊은 직관력과 통찰력이 진가를 발휘하는 시기입니다. 당신은 표면 아래 숨겨진 진실을 꿰뚫어 볼 수 있으며, 이는 중요한 결정을 내리는 데 큰 도움이 됩니다. 숨겨진 기회를 발견하거나 복잡한 문제를 해결하는 데 탁월한 능력을 보일 것입니다. 당신의 열정과 집중력은 어떤 목표든 이룰 수 있게 합니다. 다만 의심이나 집착은 자제하세요. 변화와 재생의 에너지가 강한 시기이므로, 오래된 것을 정리하고 새로운 시작을 준비하기 좋습니다. 당신의 카리스마가 사람들을 끌어당깁니다.',
    sagittarius: '궁수자리의 자유로운 영혼과 낙천적인 에너지가 새로운 모험을 이끌 시기입니다. 당신의 탐험 정신과 배움에 대한 열정이 흥미로운 경험으로 이어질 것입니다. 여행이나 새로운 철학, 문화를 접하는 것이 특히 유익합니다. 당신의 긍정적인 태도는 주변 사람들에게 희망과 용기를 줍니다. 새로운 프로젝트나 계획을 시작하기 좋은 때입니다. 다만 지나친 낙관주의는 경계하세요. 큰 그림을 보는 당신의 능력을 세부 계획과 조화시키면 더 큰 성과를 이룰 수 있습니다. 진리를 추구하는 당신의 여정이 빛을 발합니다.',
    capricorn: '염소자리의 책임감과 목표 지향적인 태도가 주변의 신뢰와 존경을 얻을 시기입니다. 당신의 끈기와 전문성이 인정받고, 중요한 역할을 맡게 될 수 있습니다. 장기적인 계획을 세우고 차근차근 실행하는 데 최적의 시기입니다. 당신의 실용적이고 체계적인 접근 방식이 큰 성과로 이어질 것입니다. 다만 일과 휴식의 균형을 잊지 마세요. 너무 엄격하게 자신을 몰아붙이면 번아웃이 올 수 있습니다. 당신이 쌓은 업적은 오래도록 빛날 것입니다. 전통과 혁신을 조화시키는 지혜를 발휘하세요.',
    aquarius: '물병자리의 독창적인 아이디어와 혁신적인 사고가 빛을 발할 시기입니다. 당신의 독특한 관점과 미래 지향적인 비전이 사람들의 주목을 받을 것입니다. 새로운 기술이나 트렌드를 빠르게 파악하고 활용하는 능력이 뛰어납니다. 그룹 활동이나 네트워킹이 특히 유익한 시기입니다. 당신의 인도주의적 가치관이 사회적으로 긍정적인 변화를 만들 수 있습니다. 다만 너무 앞서가다 보면 주변과 소통이 어려울 수 있으니, 적절한 설명과 공감이 필요합니다. 당신의 창의성과 자유로운 정신이 새로운 가능성을 열어줍니다.',
    pisces: '물고기자리의 직관과 감성이 완벽하게 조화를 이루는 시기입니다. 당신의 공감 능력과 상상력이 창의적인 결과물로 이어질 것입니다. 예술, 음악, 영성 관련 활동에서 큰 만족감을 느낄 수 있습니다. 당신의 치유 능력은 주변 사람들에게 위로와 평화를 가져다줍니다. 꿈과 무의식의 메시지에 주목하세요 - 중요한 통찰을 얻을 수 있습니다. 다만 현실적인 문제를 회피하지 않도록 주의하세요. 몽상과 실천의 균형이 필요합니다. 당신의 자비로운 마음과 영적 깊이가 삶에 풍요로움을 더합니다.'
  };

  return [
    overall,
    specialMessages[zodiacKey] || '좋은 하루 되세요!'
  ];
}

// 🃏 타로 카드 운세 엔진

// 22장 메이저 아르카나 카드
const TAROT_CARDS = {
  fool: {
    number: 0,
    name: '바보',
    nameEn: 'The Fool',
    icon: '🃏',
    keyword: '시작, 모험, 순수',
    upright: {
      short: '새로운 시작과 모험이 기다리고 있습니다.',
      love: '순수한 마음으로 새로운 만남이 찾아올 것입니다. 설레는 연애가 시작될 수 있습니다.',
      money: '새로운 투자나 사업 기회가 있습니다. 도전해볼 만한 가치가 있습니다.',
      work: '새로운 프로젝트나 직장의 시작. 열린 마음으로 받아들이세요.',
      advice: '두려움 없이 앞으로 나아가세요. 직관을 믿으세요.'
    }
  },
  magician: {
    number: 1,
    name: '마법사',
    nameEn: 'The Magician',
    icon: '🎩',
    keyword: '창조, 의지, 능력',
    upright: {
      short: '당신의 능력과 재능이 빛을 발할 때입니다.',
      love: '적극적인 어필이 효과적입니다. 당신의 매력이 상대를 사로잡을 것입니다.',
      money: '능력을 활용하여 수익을 창출할 수 있습니다. 자신감을 가지세요.',
      work: '리더십과 창의성이 발휘되는 시기. 중요한 프로젝트를 맡게 될 수 있습니다.',
      advice: '모든 도구와 능력이 당신 안에 있습니다. 행동으로 옮기세요.'
    }
  },
  highPriestess: {
    number: 2,
    name: '여사제',
    nameEn: 'The High Priestess',
    icon: '🌙',
    keyword: '직관, 신비, 지혜',
    upright: {
      short: '내면의 목소리에 귀를 기울이세요.',
      love: '숨겨진 감정이 있습니다. 상대의 진심을 파악하는 시간이 필요합니다.',
      money: '겉으로 보이는 것만 믿지 마세요. 신중한 판단이 필요합니다.',
      work: '직관을 믿고 결정하세요. 숨겨진 정보가 드러날 수 있습니다.',
      advice: '고요한 시간을 가지고 내면의 지혜를 찾으세요.'
    }
  },
  empress: {
    number: 3,
    name: '여황제',
    nameEn: 'The Empress',
    icon: '👑',
    keyword: '풍요, 사랑, 창조',
    upright: {
      short: '풍요와 사랑이 가득한 시기입니다.',
      love: '사랑이 만개하는 시기. 임신이나 결혼의 가능성도 있습니다.',
      money: '물질적 풍요가 찾아옵니다. 수입이 증가할 수 있습니다.',
      work: '창의적인 프로젝트가 성공합니다. 협력이 좋은 결과를 가져옵니다.',
      advice: '주변 사람들에게 사랑과 관심을 베푸세요.'
    }
  },
  emperor: {
    number: 4,
    name: '황제',
    nameEn: 'The Emperor',
    icon: '🏛️',
    keyword: '권위, 안정, 구조',
    upright: {
      short: '안정과 질서를 확립할 때입니다.',
      love: '안정적인 관계를 원합니다. 결혼이나 동거를 고려할 수 있습니다.',
      money: '재정적 안정을 이룹니다. 계획적인 저축과 투자가 효과적입니다.',
      work: '리더십을 발휘하세요. 체계적인 접근이 성공을 가져옵니다.',
      advice: '규칙과 질서를 지키며 목표를 향해 나아가세요.'
    }
  },
  hierophant: {
    number: 5,
    name: '교황',
    nameEn: 'The Hierophant',
    icon: '⛪',
    keyword: '전통, 가르침, 영성',
    upright: {
      short: '전통과 가르침이 중요한 시기입니다.',
      love: '전통적인 방식의 만남. 중매나 소개팅이 좋은 결과를 가져올 수 있습니다.',
      money: '안정적이고 전통적인 투자가 좋습니다. 무리한 모험은 피하세요.',
      work: '멘토의 조언을 구하세요. 교육이나 자격증 취득이 도움이 됩니다.',
      advice: '경험 많은 사람의 조언을 따르세요.'
    }
  },
  lovers: {
    number: 6,
    name: '연인',
    nameEn: 'The Lovers',
    icon: '💕',
    keyword: '사랑, 선택, 조화',
    upright: {
      short: '중요한 선택의 순간입니다.',
      love: '운명적인 만남이나 관계의 진전. 사랑이 깊어지는 시기입니다.',
      money: '파트너십이 중요합니다. 협력 투자가 좋은 결과를 가져올 수 있습니다.',
      work: '팀워크가 빛을 발합니다. 중요한 결정을 내려야 할 수도 있습니다.',
      advice: '마음이 이끄는 대로 선택하되, 책임감을 가지세요.'
    }
  },
  chariot: {
    number: 7,
    name: '전차',
    nameEn: 'The Chariot',
    icon: '🏇',
    keyword: '승리, 의지, 통제',
    upright: {
      short: '강한 의지로 승리를 쟁취할 때입니다.',
      love: '적극적으로 다가가세요. 당신의 열정이 상대를 움직일 것입니다.',
      money: '목표를 향해 나아가면 재정적 성공을 거둡니다. 집중력이 중요합니다.',
      work: '프로젝트를 성공적으로 완수합니다. 승진이나 인정을 받을 수 있습니다.',
      advice: '방향을 정하고 전진하세요. 포기하지 마세요.'
    }
  },
  strength: {
    number: 8,
    name: '힘',
    nameEn: 'Strength',
    icon: '🦁',
    keyword: '용기, 인내, 자제',
    upright: {
      short: '내면의 힘과 용기가 필요한 시기입니다.',
      love: '인내심을 가지고 관계를 다루세요. 부드러움이 힘을 발휘합니다.',
      money: '어려움을 극복하면 재정적 안정을 얻습니다. 조급해하지 마세요.',
      work: '힘든 상황을 지혜롭게 극복하세요. 침착함이 성공의 열쇠입니다.',
      advice: '부드러우면서도 단호하게. 자제력을 발휘하세요.'
    }
  },
  hermit: {
    number: 9,
    name: '은둔자',
    nameEn: 'The Hermit',
    icon: '🏮',
    keyword: '성찰, 고독, 탐구',
    upright: {
      short: '혼자만의 시간이 필요합니다.',
      love: '관계를 되돌아보는 시간. 급하게 서두르지 말고 천천히 생각하세요.',
      money: '신중한 재정 관리가 필요합니다. 전문가의 조언을 구하세요.',
      work: '혼자 집중하는 시간이 필요합니다. 깊이 있는 연구나 학습의 시기입니다.',
      advice: '내면을 돌아보고 진정한 자신을 찾으세요.'
    }
  },
  wheelOfFortune: {
    number: 10,
    name: '운명의 수레바퀴',
    nameEn: 'Wheel of Fortune',
    icon: '☸️',
    keyword: '운명, 변화, 순환',
    upright: {
      short: '운명의 바퀴가 당신에게 유리하게 돌아갑니다.',
      love: '예상치 못한 좋은 만남. 운명적인 인연이 찾아올 수 있습니다.',
      money: '행운이 따르는 시기. 예상치 못한 수입이 생길 수 있습니다.',
      work: '긍정적인 변화가 일어납니다. 새로운 기회가 찾아올 것입니다.',
      advice: '변화를 받아들이고 흐름에 몸을 맡기세요.'
    }
  },
  justice: {
    number: 11,
    name: '정의',
    nameEn: 'Justice',
    icon: '⚖️',
    keyword: '정의, 균형, 진실',
    upright: {
      short: '공정한 판단과 균형이 중요합니다.',
      love: '관계에서 공평함이 중요합니다. 솔직한 대화가 필요합니다.',
      money: '정당한 대가를 받습니다. 법적 문제가 유리하게 해결될 수 있습니다.',
      work: '공정한 평가를 받습니다. 계약이나 협상이 잘 진행됩니다.',
      advice: '올바른 결정을 내리세요. 양심에 따라 행동하세요.'
    }
  },
  hangedMan: {
    number: 12,
    name: '매달린 사람',
    nameEn: 'The Hanged Man',
    icon: '🙃',
    keyword: '희생, 관점, 깨달음',
    upright: {
      short: '다른 관점에서 바라볼 필요가 있습니다.',
      love: '기다림의 시간. 상대를 이해하려는 노력이 필요합니다.',
      money: '당장의 이익보다 장기적 관점이 중요합니다. 인내하세요.',
      work: '잠시 멈추고 생각할 시간. 다른 접근 방식을 시도해보세요.',
      advice: '현재 상황을 받아들이고 새로운 시각을 얻으세요.'
    }
  },
  death: {
    number: 13,
    name: '죽음',
    nameEn: 'Death',
    icon: '💀',
    keyword: '변화, 종료, 재탄생',
    upright: {
      short: '큰 변화와 새로운 시작이 다가옵니다.',
      love: '관계의 변화. 끝이거나 완전히 새로운 단계로의 진입입니다.',
      money: '재정 상황의 변화. 낡은 습관을 버리고 새로운 방식을 받아들이세요.',
      work: '직장이나 경력의 전환점. 변화를 두려워하지 마세요.',
      advice: '과거를 놓아주고 새로운 것을 받아들이세요.'
    }
  },
  temperance: {
    number: 14,
    name: '절제',
    nameEn: 'Temperance',
    icon: '🧘',
    keyword: '균형, 조화, 절제',
    upright: {
      short: '조화와 균형을 찾아야 합니다.',
      love: '관계에서 균형이 중요합니다. 극단적이지 않게 중용을 지키세요.',
      money: '적절한 지출과 저축의 균형. 과소비나 지나친 절약 모두 피하세요.',
      work: '팀워크와 협력. 다양한 의견을 조율하는 능력이 필요합니다.',
      advice: '서두르지 말고 천천히, 하지만 꾸준히 나아가세요.'
    }
  },
  devil: {
    number: 15,
    name: '악마',
    nameEn: 'The Devil',
    icon: '😈',
    keyword: '유혹, 속박, 집착',
    upright: {
      short: '속박에서 벗어나야 할 때입니다.',
      love: '불건전한 관계나 집착에 주의하세요. 자유로워질 필요가 있습니다.',
      money: '물질에 대한 과도한 집착. 빚이나 중독적 소비를 경계하세요.',
      work: '업무 중독이나 불합리한 상황. 스스로를 돌아보세요.',
      advice: '당신을 묶고 있는 것이 무엇인지 깨닫고 해방되세요.'
    }
  },
  tower: {
    number: 16,
    name: '탑',
    nameEn: 'The Tower',
    icon: '🗼',
    keyword: '파괴, 혼란, 계시',
    upright: {
      short: '갑작스러운 변화가 찾아올 수 있습니다.',
      love: '충격적인 진실이 드러날 수 있습니다. 허상이 무너지고 진실이 보입니다.',
      money: '예상치 못한 지출이나 손실. 재정 계획을 재검토하세요.',
      work: '갑작스러운 변화나 위기. 하지만 이는 새로운 기회의 시작입니다.',
      advice: '무너진 것 위에 더 튼튼한 것을 세울 수 있습니다.'
    }
  },
  star: {
    number: 17,
    name: '별',
    nameEn: 'The Star',
    icon: '⭐',
    keyword: '희망, 영감, 평화',
    upright: {
      short: '희망과 치유의 시기입니다.',
      love: '순수하고 아름다운 사랑. 마음의 평화를 찾습니다.',
      money: '장기적으로 긍정적인 전망. 희망을 가지고 투자하세요.',
      work: '영감과 창의성이 넘치는 시기. 꿈을 향해 나아가세요.',
      advice: '희망을 잃지 마세요. 밝은 미래가 기다리고 있습니다.'
    }
  },
  moon: {
    number: 18,
    name: '달',
    nameEn: 'The Moon',
    icon: '🌙',
    keyword: '환상, 불안, 직관',
    upright: {
      short: '불확실성과 착각에 주의하세요.',
      love: '불안한 감정이나 오해가 있을 수 있습니다. 명확한 소통이 필요합니다.',
      money: '재정 상황이 불분명합니다. 숨겨진 비용이나 사기에 주의하세요.',
      work: '애매한 상황이나 정보 부족. 직관을 믿되 확인도 하세요.',
      advice: '두려움에 휩싸이지 말고 진실을 찾으세요.'
    }
  },
  sun: {
    number: 19,
    name: '태양',
    nameEn: 'The Sun',
    icon: '☀️',
    keyword: '성공, 기쁨, 활력',
    upright: {
      short: '밝고 행복한 시기가 찾아옵니다.',
      love: '행복하고 따뜻한 관계. 결혼이나 출산의 기쁨이 있을 수 있습니다.',
      money: '재정적 성공과 풍요. 모든 것이 순조롭게 진행됩니다.',
      work: '성공과 인정. 프로젝트가 대성공을 거둡니다.',
      advice: '자신감을 가지고 밝게 빛나세요. 긍정적인 에너지를 발산하세요.'
    }
  },
  judgement: {
    number: 20,
    name: '심판',
    nameEn: 'Judgement',
    icon: '📯',
    keyword: '심판, 각성, 부활',
    upright: {
      short: '과거를 평가하고 새롭게 시작할 때입니다.',
      love: '관계를 재평가하는 시간. 화해나 재회의 가능성이 있습니다.',
      money: '과거의 노력이 보상받습니다. 재정적 판단을 내릴 시기입니다.',
      work: '업무 평가나 승진. 과거의 성과가 인정받습니다.',
      advice: '과거를 정리하고 새로운 삶을 시작하세요.'
    }
  },
  world: {
    number: 21,
    name: '세계',
    nameEn: 'The World',
    icon: '🌍',
    keyword: '완성, 성취, 여행',
    upright: {
      short: '목표 달성과 완성의 시기입니다.',
      love: '완벽한 조화와 만족. 관계가 안정적이고 행복합니다.',
      money: '재정적 목표 달성. 풍요롭고 안정적인 상태입니다.',
      work: '프로젝트 완성과 큰 성공. 국제적인 기회가 올 수 있습니다.',
      advice: '성취를 축하하고 다음 목표를 준비하세요.'
    }
  }
};

// 오늘의 타로 카드 뽑기 (날짜별 고정)
function getTodayTarotCard() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  // 날짜를 시드로 사용하여 카드 선택
  const cardKeys = Object.keys(TAROT_CARDS);
  const cardIndex = deterministicRandom(dateStr, 0, cardKeys.length - 1);
  const cardKey = cardKeys[cardIndex];
  const card = TAROT_CARDS[cardKey];

  return {
    key: cardKey,
    card: card,
    date: dateStr,
    dateKorean: `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`
  };
}

// 사용자가 선택한 카드 번호로 오늘의 운세 생성
function getTarotFortuneByChoice(cardNumber) {
  const cardKeys = Object.keys(TAROT_CARDS);
  const cardKey = cardKeys[cardNumber];
  const card = TAROT_CARDS[cardKey];

  const today = new Date();

  return {
    key: cardKey,
    card: card,
    date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
    dateKorean: `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`
  };
}

// 🌙 꿈해몽 엔진

// 꿈 상징 데이터
const DREAM_SYMBOLS = {
  snake: {
    name: '뱀',
    icon: '🐍',
    category: '동물',
    keywords: ['뱀', '구렁이', '독사', '뱀꿈'],
    meaning: '뱀은 재물운, 지혜, 변화, 치유를 상징합니다. 뱀 꿈은 대체로 좋은 꿈으로 해석되며, 특히 금전적인 행운이 따를 수 있습니다.',
    positive: '뱀꿈은 재물운 상승의 대표적인 길몽입니다. 사업이나 투자에서 좋은 성과를 거둘 수 있으며, 예상치 못한 횡재수가 있을 수 있습니다. 뱀이 집안으로 들어오거나 뱀을 잡는 꿈은 특히 좋습니다. 또한 지혜와 통찰력이 증가하여 어려운 문제를 슬기롭게 해결할 수 있습니다.',
    negative: '뱀에게 물리거나 뱀이 도망가는 꿈은 주의가 필요합니다. 재물 손실이나 기회를 놓칠 수 있으니 중요한 결정은 신중하게 하세요.',
    advice: '오늘은 재물과 관련된 기회에 주목하세요. 투자나 사업 제안이 있다면 신중히 검토해보세요. 직관을 믿되 충분한 정보 수집도 함께 하는 것이 좋습니다.'
  },
  dragon: {
    name: '용',
    icon: '🐲',
    category: '동물',
    keywords: ['용', '용꿈', '청룡', '황룡'],
    meaning: '용은 권력, 성공, 출세, 길운을 상징하는 최고의 길몽입니다. 용꿈은 큰 성취와 명예가 따를 것을 암시합니다.',
    positive: '용꿈은 대길몽 중의 대길몽입니다. 승진, 합격, 사업 성공 등 인생의 큰 전환점이 올 수 있습니다. 용이 하늘로 올라가거나 용을 타는 꿈은 특히 좋으며, 주변의 인정과 존경을 받게 됩니다. 리더십이 발휘되고 중요한 프로젝트를 성공적으로 이끌 수 있습니다.',
    negative: null,
    advice: '오늘은 자신감을 가지고 도전하세요. 중요한 발표나 면접, 시험이 있다면 좋은 결과가 기대됩니다. 리더십을 발휘할 기회를 적극적으로 활용하세요.'
  },
  pig: {
    name: '돼지',
    icon: '🐷',
    category: '동물',
    keywords: ['돼지', '멧돼지', '새끼돼지', '돼지꿈'],
    meaning: '돼지는 재물, 풍요, 복을 상징합니다. 돼지꿈은 금전운과 행운이 상승하는 길몽입니다.',
    positive: '돼지꿈은 재물과 풍요를 가져오는 좋은 꿈입니다. 돼지가 클수록, 많을수록 더 큰 재물운을 의미합니다. 복권이나 경품 행운이 있을 수 있으며, 사업이나 투자에서 좋은 수익을 기대할 수 있습니다. 임신을 계획 중이라면 태몽일 가능성도 있습니다.',
    negative: null,
    advice: '오늘은 재물운이 좋으니 투자나 구매 계획이 있다면 실행하기 좋은 날입니다. 복권을 구매해보는 것도 좋습니다. 단, 과도한 욕심은 금물입니다.'
  },
  tiger: {
    name: '호랑이',
    icon: '🐯',
    category: '동물',
    keywords: ['호랑이', '범', '백호', '호랑이꿈'],
    meaning: '호랑이는 용기, 권위, 보호, 성공을 상징합니다. 호랑이꿈은 강한 에너지와 성취를 암시합니다.',
    positive: '호랑이꿈은 출세, 승진, 권위 상승을 의미하는 좋은 꿈입니다. 호랑이를 타거나 집으로 들어오는 꿈은 큰 성공을 예고합니다. 어려운 상황을 돌파할 힘을 얻게 되며, 강력한 후원자나 귀인을 만날 수 있습니다.',
    negative: '호랑이에게 쫓기거나 공격받는 꿈은 스트레스나 압박을 의미할 수 있습니다. 권위자와의 갈등을 조심하세요.',
    advice: '오늘은 용기를 내서 도전하세요. 중요한 협상이나 프레젠테이션이 있다면 당당하게 임하세요. 귀인의 도움을 받을 수 있으니 네트워킹에 신경 쓰세요.'
  },
  water: {
    name: '물',
    icon: '💧',
    category: '자연',
    keywords: ['물', '강물', '바닷물', '맑은물', '물꿈'],
    meaning: '물은 재물, 감정, 정화, 생명력을 상징합니다. 물의 상태에 따라 해몽이 달라집니다.',
    positive: '맑은 물은 재물운과 정신적 안정을 의미합니다. 물이 흐르거나 샘솟는 꿈은 금전적 이득과 사업 번창을 암시합니다. 물을 마시는 꿈은 지혜와 영감을 얻게 됨을 의미하며, 물에 몸을 담그는 꿈은 정화와 새로운 시작을 상징합니다.',
    negative: '탁하거나 더러운 물은 주의가 필요합니다. 감정적 혼란이나 건강 문제를 암시할 수 있습니다. 물에 빠지는 꿈은 어려움에 직면할 수 있음을 경고합니다.',
    advice: '맑은 물꿈이었다면 오늘은 재물운이 좋은 날입니다. 투자나 저축 계획을 세우기 좋습니다. 감정적으로도 안정되어 있으니 중요한 결정을 내리기 적합합니다.'
  },
  fire: {
    name: '불',
    icon: '🔥',
    category: '자연',
    keywords: ['불', '화재', '불길', '불꿈', '화염'],
    meaning: '불은 열정, 변화, 정화, 재물을 상징합니다. 불꿈은 강력한 에너지와 변화를 암시합니다.',
    positive: '집에 불이 나지만 해가 없는 꿈은 대길몽입니다. 큰 재물운과 사업 번창을 의미하며, 명예와 성공이 따릅니다. 불을 지피거나 통제하는 꿈은 열정과 창의성이 빛을 발할 것을 암시합니다.',
    negative: '불에 타서 다치거나 재산이 손실되는 꿈은 주의가 필요합니다. 충동적인 행동이나 감정 폭발을 조심하세요.',
    advice: '오늘은 열정을 가지고 프로젝트에 집중하세요. 창의적인 아이디어가 떠오를 수 있으니 메모해두세요. 다만 충동적인 결정은 피하고 한 박자 쉬어가며 판단하세요.'
  },
  money: {
    name: '돈',
    icon: '💰',
    category: '사물',
    keywords: ['돈', '지폐', '동전', '현금', '돈꿈'],
    meaning: '돈꿈의 해석은 상황에 따라 다릅니다. 돈을 받거나 찾는 꿈과 잃는 꿈의 의미가 다릅니다.',
    positive: '돈을 받거나 돈을 줍는 꿈, 돈이 쌓여있는 꿈은 재물운 상승을 의미합니다. 특히 다른 사람에게 돈을 받는 꿈은 실제로 금전적 이득이 있을 수 있습니다. 통장에 돈이 많이 입금되는 꿈도 좋은 꿈입니다.',
    negative: '돈을 잃거나 빼앗기는 꿈은 지출 증가나 재정적 어려움을 경고할 수 있습니다. 하지만 꿈에서 돈을 쓰는 것은 실제로 돈이 들어온다는 역설적 해석도 있습니다.',
    advice: '오늘은 재정 계획을 점검하기 좋은 날입니다. 새로운 수입원을 모색하거나 절약 방법을 찾아보세요. 투자 기회가 있다면 신중하게 검토하세요.'
  },
  gold: {
    name: '금',
    icon: '🏆',
    category: '사물',
    keywords: ['금', '황금', '금덩어리', '금반지', '금꿈'],
    meaning: '금은 최고의 재물운과 성공, 명예를 상징하는 대길몽입니다.',
    positive: '금을 발견하거나 받는 꿈은 큰 재물운과 성공을 의미합니다. 금반지나 금목걸이를 얻는 꿈은 명예와 인정을 받게 됨을 암시합니다. 금덩어리를 캐거나 금광을 발견하는 꿈은 인생의 큰 기회가 올 것을 예고합니다.',
    negative: null,
    advice: '오늘은 큰 기회를 포착하세요. 중요한 제안이나 계약이 있다면 적극적으로 검토하세요. 당신의 능력이 빛을 발할 시기입니다.'
  },
  flying: {
    name: '날다',
    icon: '🕊️',
    category: '행동',
    keywords: ['날다', '하늘을날다', '비행', '날아가다'],
    meaning: '나는 꿈은 자유, 해방, 성공, 목표 달성을 상징합니다. 대체로 긍정적인 꿈입니다.',
    positive: '자유롭게 하늘을 나는 꿈은 제약에서 벗어나 목표를 달성할 것을 의미합니다. 승진, 합격, 사업 성공 등 큰 성취를 이룰 수 있습니다. 창의성과 상상력이 증가하며, 새로운 가능성을 발견하게 됩니다.',
    negative: '날다가 떨어지거나 제대로 날지 못하는 꿈은 목표 달성의 어려움이나 불안감을 나타낼 수 있습니다.',
    advice: '오늘은 자신감을 가지고 목표를 향해 나아가세요. 창의적인 프로젝트나 새로운 도전에 적극적으로 참여하세요. 당신의 잠재력이 발휘될 것입니다.'
  },
  falling: {
    name: '떨어지다',
    icon: '⬇️',
    category: '행동',
    keywords: ['떨어지다', '낙하', '추락', '떨어지는꿈'],
    meaning: '떨어지는 꿈은 불안, 통제력 상실, 변화에 대한 두려움을 나타낼 수 있습니다.',
    positive: '떨어지는 꿈도 긍정적으로 해석할 수 있습니다. 낙하 후 안전하게 착지하는 꿈은 어려움을 극복하고 안정을 찾을 것을 의미합니다. 변화와 새로운 시작의 전조일 수도 있습니다.',
    negative: '떨어지면서 불안을 느끼는 꿈은 현재 스트레스나 불안정한 상황을 반영합니다. 통제력을 잃었다는 느낌이나 실패에 대한 두려움을 나타낼 수 있습니다.',
    advice: '오늘은 불안감을 해소하는 데 집중하세요. 안정감을 주는 활동이나 명상, 휴식을 취하세요. 중요한 결정은 마음이 안정된 후에 내리는 것이 좋습니다.'
  },
  exam: {
    name: '시험',
    icon: '📝',
    category: '사물',
    keywords: ['시험', '시험보다', '시험지', '시험꿈', '고사'],
    meaning: '시험 꿈은 평가, 도전, 준비 상태를 상징합니다. 현재 인생에서 테스트를 받고 있음을 나타냅니다.',
    positive: '시험을 잘 보거나 합격하는 꿈은 실제로 좋은 결과를 얻을 것을 암시합니다. 준비한 것이 좋은 성과로 이어지며, 능력을 인정받게 됩니다.',
    negative: '시험에 떨어지거나 준비가 안 된 상태로 시험을 보는 꿈은 불안과 자신감 부족을 나타냅니다. 하지만 이는 경고의 메시지로, 더 준비하라는 신호입니다.',
    advice: '오늘은 준비와 계획에 집중하세요. 중요한 평가나 발표가 있다면 철저히 준비하세요. 자신감을 가지되 겸손한 태도를 유지하세요.'
  },
  wedding: {
    name: '결혼',
    icon: '💒',
    category: '사건',
    keywords: ['결혼', '결혼식', '결혼하다', '혼례', '결혼꿈'],
    meaning: '결혼 꿈은 결합, 파트너십, 새로운 시작, 변화를 상징합니다.',
    positive: '자신이 결혼하는 꿈은 새로운 시작과 좋은 파트너십을 의미합니다. 사업 파트너십이나 중요한 계약이 성사될 수 있습니다. 인간관계가 좋아지고 사랑운이 상승합니다.',
    negative: null,
    advice: '오늘은 협력과 파트너십에 집중하세요. 중요한 사람과의 관계를 돈독히 하고, 새로운 협력 기회를 모색하세요. 사랑하는 사람에게 마음을 표현하기 좋은 날입니다.'
  },
  house: {
    name: '집',
    icon: '🏠',
    category: '사물',
    keywords: ['집', '건물', '주택', '아파트', '집꿈'],
    meaning: '집은 자아, 안정, 가족, 재산을 상징합니다. 집의 상태가 당신의 현재 상태를 나타냅니다.',
    positive: '새집을 얻거나 집이 크고 아름다운 꿈은 재물운 상승과 안정을 의미합니다. 집을 짓는 꿈은 새로운 기반을 다지는 것을 의미하며, 집이 넓어지는 꿈은 운이 확장됨을 암시합니다.',
    negative: '집이 무너지거나 낡은 집 꿈은 불안정이나 변화를 암시할 수 있습니다. 하지만 이는 새로운 시작을 위한 준비일 수도 있습니다.',
    advice: '오늘은 기반과 안정에 집중하세요. 부동산 투자나 이사 계획이 있다면 검토하기 좋은 날입니다. 가족과의 시간을 소중히 하세요.'
  },
  car: {
    name: '자동차',
    icon: '🚗',
    category: '사물',
    keywords: ['자동차', '차', '자동차꿈', '운전', '승용차'],
    meaning: '자동차는 인생의 방향, 통제력, 목표 추구를 상징합니다.',
    positive: '새 차를 얻거나 편안하게 운전하는 꿈은 인생이 순조롭게 진행됨을 의미합니다. 좋은 차를 타는 꿈은 지위 상승과 성공을 암시하며, 목적지에 잘 도착하는 꿈은 목표 달성을 예고합니다.',
    negative: '차가 고장나거나 사고 나는 꿈은 계획에 차질이 생길 수 있음을 경고합니다. 방향을 잃거나 통제력을 잃을 수 있으니 주의하세요.',
    advice: '오늘은 목표와 방향을 점검하세요. 계획대로 진행되고 있는지 확인하고, 필요하다면 조정하세요. 중요한 이동이나 여행이 있다면 안전에 유의하세요.'
  },
  ocean: {
    name: '바다',
    icon: '🌊',
    category: '자연',
    keywords: ['바다', '해양', '바다꿈', '대양', '바닷가'],
    meaning: '바다는 무의식, 가능성, 감정, 재물을 상징합니다. 바다의 상태가 중요합니다.',
    positive: '잔잔하고 아름다운 바다는 마음의 평화와 풍요를 의미합니다. 바다에서 물고기를 잡는 꿈은 재물운 상승을 암시하며, 바다를 건너는 꿈은 큰 목표를 달성할 것을 예고합니다.',
    negative: '거친 바다나 파도에 휩쓸리는 꿈은 감정적 혼란이나 어려움을 암시할 수 있습니다.',
    advice: '오늘은 감정을 잘 관리하세요. 큰 그림을 보고 장기적 관점에서 계획을 세우세요. 새로운 가능성에 마음을 열고, 직관을 믿으세요.'
  }
};

// 키워드로 꿈 상징 찾기
function findDreamSymbol(keyword) {
  const normalizedKeyword = keyword.trim().toLowerCase();

  for (const key in DREAM_SYMBOLS) {
    const symbol = DREAM_SYMBOLS[key];
    // 키워드 배열에서 검색
    if (symbol.keywords.some(k => k.includes(normalizedKeyword) || normalizedKeyword.includes(k))) {
      return { key, symbol };
    }
  }

  return null; // 찾지 못함
}

// 꿈해몽 결과 생성
function getDreamInterpretation(keyword) {
  const result = findDreamSymbol(keyword);

  if (!result) {
    return {
      found: false,
      keyword: keyword,
      message: '해당 꿈 상징을 찾을 수 없습니다. 다른 키워드로 검색해보세요.'
    };
  }

  const { key, symbol } = result;
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  // 오늘 날짜 기반 추가 운세 생성
  const seed = `dream-${key}-${dateStr}`;
  const luckyScore = deterministicRandom(`${seed}-lucky`, 60, 100);
  const luckyColor = deterministicChoice(`${seed}-color`, LUCKY_COLORS);
  const luckyNumber = deterministicRandom(`${seed}-number`, 1, 99);

  // 오늘의 조언 (랜덤하게 선택)
  const todayAdvice = [
    `${symbol.name} 꿈을 꾸신 오늘, 특별한 하루가 될 것입니다. ${symbol.advice}`,
    `오늘의 행운 지수는 ${luckyScore}점입니다. ${symbol.name}의 기운이 당신과 함께 합니다.`,
    `${symbol.icon} ${symbol.name}이/가 당신에게 전하는 메시지에 귀 기울이세요. 중요한 깨달음을 얻을 수 있습니다.`
  ];

  const adviceIndex = deterministicRandom(`${seed}-advice`, 0, todayAdvice.length - 1);

  return {
    found: true,
    keyword: keyword,
    symbol: symbol,
    key: key,
    date: dateStr,
    dateKorean: `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`,
    luckyScore: luckyScore,
    luckyColor: luckyColor,
    luckyNumber: luckyNumber,
    todayAdvice: todayAdvice[adviceIndex]
  };
}

// 인기 꿈 키워드 목록
function getPopularDreamKeywords() {
  return [
    { key: 'snake', name: '뱀', icon: '🐍' },
    { key: 'dragon', name: '용', icon: '🐲' },
    { key: 'pig', name: '돼지', icon: '🐷' },
    { key: 'money', name: '돈', icon: '💰' },
    { key: 'water', name: '물', icon: '💧' },
    { key: 'fire', name: '불', icon: '🔥' },
    { key: 'flying', name: '날다', icon: '🕊️' },
    { key: 'ocean', name: '바다', icon: '🌊' },
    { key: 'gold', name: '금', icon: '🏆' },
    { key: 'tiger', name: '호랑이', icon: '🐯' },
    { key: 'wedding', name: '결혼', icon: '💒' },
    { key: 'exam', name: '시험', icon: '📝' }
  ];
}
