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
    overall = `${pt.name}는 ${zodiac.name}에게 최고의 ${pt.ending}입니다! 모든 일이 순조롭게 풀릴 것입니다. 자신감을 가지고 중요한 결정을 내리기 좋은 시기입니다.`;
  } else if (totalScore >= 80) {
    overall = `${zodiac.name}에게 좋은 ${pt.ending}가 될 것입니다. 평소 하고 싶었던 일을 시작하기 좋은 시기입니다. 긍정적인 마음가짐을 유지하세요.`;
  } else if (totalScore >= 70) {
    overall = `무난한 ${pt.ending}가 될 것입니다. 큰 변화보다는 안정적으로 지내는 것이 좋습니다. 작은 행복을 찾아보세요.`;
  } else {
    overall = `조금 조심스러운 ${pt.ending}입니다. 서두르지 말고 천천히 신중하게 행동하세요. ${pt.future} 더 좋은 시기가 올 것입니다.`;
  }

  // 띠별 특별 메시지
  const specialMessages = {
    rat: '영리한 판단력이 빛을 발하는 날입니다.',
    ox: '성실함이 결실을 맺을 것입니다.',
    tiger: '용기있는 도전이 좋은 결과를 가져올 것입니다.',
    rabbit: '온화한 태도가 주변 사람들에게 긍정적인 영향을 줄 것입니다.',
    dragon: '카리스마가 빛나는 날입니다. 리더십을 발휘해보세요.',
    snake: '직관을 믿으세요. 중요한 결정을 내리기 좋은 날입니다.',
    horse: '활발한 에너지가 넘치는 날입니다. 적극적으로 행동하세요.',
    goat: '창의적인 아이디어가 떠오를 것입니다.',
    monkey: '재치있는 대화로 좋은 인연을 만들 수 있습니다.',
    rooster: '성실한 노력이 인정받을 것입니다.',
    dog: '충실한 태도가 신뢰를 쌓아갈 것입니다.',
    pig: '평화로운 하루를 보낼 수 있습니다. 여유를 즐기세요.'
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
    overall = `${pt.name}는 ${zodiac.name}에게 최고의 ${pt.ending}입니다! 모든 일이 순조롭게 풀릴 것입니다. 자신감을 가지고 중요한 결정을 내리기 좋은 시기입니다.`;
  } else if (totalScore >= 80) {
    overall = `${zodiac.name}에게 좋은 ${pt.ending}가 될 것입니다. 평소 하고 싶었던 일을 시작하기 좋은 시기입니다. 긍정적인 마음가짐을 유지하세요.`;
  } else if (totalScore >= 70) {
    overall = `무난한 ${pt.ending}가 될 것입니다. 큰 변화보다는 안정적으로 지내는 것이 좋습니다. 작은 행복을 찾아보세요.`;
  } else {
    overall = `조금 조심스러운 ${pt.ending}입니다. 서두르지 말고 천천히 신중하게 행동하세요. ${pt.future} 더 좋은 시기가 올 것입니다.`;
  }

  // 별자리별 특별 메시지
  const specialMessages = {
    aries: '열정적인 에너지가 빛을 발하는 날입니다. 도전을 두려워하지 마세요.',
    taurus: '안정적인 하루입니다. 차근차근 목표를 향해 나아가세요.',
    gemini: '호기심이 새로운 기회를 가져다줄 것입니다.',
    cancer: '감성이 풍부해지는 날입니다. 사랑하는 이들과 시간을 보내세요.',
    leo: '당신의 카리스마가 빛나는 날입니다. 자신감을 가지세요.',
    virgo: '완벽을 추구하는 당신의 노력이 결실을 맺을 것입니다.',
    libra: '균형잡힌 판단력이 빛을 발할 것입니다.',
    scorpio: '직관을 믿으세요. 숨겨진 기회를 발견할 수 있습니다.',
    sagittarius: '자유로운 영혼이 새로운 모험을 이끌 것입니다.',
    capricorn: '책임감 있는 태도가 주변의 신뢰를 얻을 것입니다.',
    aquarius: '독창적인 아이디어가 빛을 발할 것입니다.',
    pisces: '직관과 감성이 조화를 이루는 날입니다.'
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
