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

// 배열에서 결정론적으로 선택
function deterministicChoice(seed, array) {
  const index = deterministicRandom(seed, 0, array.length - 1);
  return array[index];
}

// 오늘의 운세 생성
function getTodayFortune(birthYear) {
  // 띠 계산
  const zodiacKey = getZodiacByYear(birthYear);
  const zodiac = CHINESE_ZODIAC[zodiacKey];

  // 오늘 날짜
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // 시드 생성: 띠 + 날짜
  const seed = `${zodiacKey}-${dateStr}`;

  // 점수 생성 (0-100)
  const totalScore = deterministicRandom(`${seed}-total`, 60, 100);
  const loveScore = deterministicRandom(`${seed}-love`, 50, 100);
  const moneyScore = deterministicRandom(`${seed}-money`, 50, 100);
  const workScore = deterministicRandom(`${seed}-work`, 50, 100);

  // 럭키 컬러
  const luckyColor = deterministicChoice(`${seed}-color`, LUCKY_COLORS);

  // 럭키 넘버
  const luckyNumber = deterministicRandom(`${seed}-number`, 1, 99);

  // 운세 메시지 선택 (나중에 더 추가)
  const messages = getFortuneMessages(zodiacKey, totalScore);

  return {
    zodiac,
    date: dateStr,
    dateKorean: `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`,
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

// 운세 메시지 생성 (점수 기반)
function getFortuneMessages(zodiacKey, totalScore) {
  const zodiac = CHINESE_ZODIAC[zodiacKey];

  // 종합 운세 (점수별)
  let overall = '';
  if (totalScore >= 90) {
    overall = `오늘은 ${zodiac.name}에게 최고의 날입니다! 모든 일이 순조롭게 풀릴 것입니다. 자신감을 가지고 중요한 결정을 내리기 좋은 날입니다.`;
  } else if (totalScore >= 80) {
    overall = `${zodiac.name}에게 좋은 하루가 될 것입니다. 평소 하고 싶었던 일을 시작하기 좋은 날입니다. 긍정적인 마음가짐을 유지하세요.`;
  } else if (totalScore >= 70) {
    overall = `무난한 하루가 될 것입니다. 큰 변화보다는 안정적으로 하루를 보내는 것이 좋습니다. 작은 행복을 찾아보세요.`;
  } else {
    overall = `조금 조심스러운 하루입니다. 서두르지 말고 천천히 신중하게 행동하세요. 내일은 더 좋은 날이 올 것입니다.`;
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

// ⭐ 별자리 오늘의 운세 생성
function getTodayZodiacFortune(month, day) {
  // 별자리 계산
  const zodiacKey = getZodiacByBirthdate(month, day);
  const zodiac = WESTERN_ZODIAC[zodiacKey];

  // 오늘 날짜
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // 시드 생성: 별자리 + 날짜
  const seed = `${zodiacKey}-${dateStr}`;

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
  const messages = getZodiacFortuneMessages(zodiacKey, totalScore);

  return {
    zodiac,
    date: dateStr,
    dateKorean: `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`,
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

// ⭐ 별자리 운세 메시지 생성
function getZodiacFortuneMessages(zodiacKey, totalScore) {
  const zodiac = WESTERN_ZODIAC[zodiacKey];

  // 종합 운세 (점수별)
  let overall = '';
  if (totalScore >= 90) {
    overall = `오늘은 ${zodiac.name}에게 최고의 날입니다! 모든 일이 순조롭게 풀릴 것입니다. 자신감을 가지고 중요한 결정을 내리기 좋은 날입니다.`;
  } else if (totalScore >= 80) {
    overall = `${zodiac.name}에게 좋은 하루가 될 것입니다. 평소 하고 싶었던 일을 시작하기 좋은 날입니다. 긍정적인 마음가짐을 유지하세요.`;
  } else if (totalScore >= 70) {
    overall = `무난한 하루가 될 것입니다. 큰 변화보다는 안정적으로 하루를 보내는 것이 좋습니다. 작은 행복을 찾아보세요.`;
  } else {
    overall = `조금 조심스러운 하루입니다. 서두르지 말고 천천히 신중하게 행동하세요. 내일은 더 좋은 날이 올 것입니다.`;
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

  return {
    overall,
    special: specialMessages[zodiacKey] || '좋은 하루 되세요!'
  };
}
