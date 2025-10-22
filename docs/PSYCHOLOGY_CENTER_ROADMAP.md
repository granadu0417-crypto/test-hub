# 🧠 심리 분석 센터 구현 로드맵

**프로젝트명:** 무료 심리 분석 센터
**목표:** 유료 서비스 수준의 심리 분석을 완전 무료로 제공
**기간:** 10일
**상태:** 기획 완료 → 구현 대기

---

## 🎯 프로젝트 목표

1. **사회적 가치:** 심리 건강 정보 접근성 향상
2. **사용자 가치:** 자기 이해 및 성장 기회 제공
3. **차별화:** 종합적이고 과학적인 무료 심리 분석

---

## 📋 작업 우선순위

### Priority 1: 종합 심리 분석 (핵심)
- 50문항 질문 작성
- 5대 영역 점수 계산
- 레이더 차트 시각화
- 맞춤형 조언 생성

### Priority 2: 멘탈 케어 카테고리 (가장 중요)
- 번아웃 증후군 진단 (개선)
- 스트레스 대처 유형 (개선)
- 감정 조절 능력 (신규)
- 정신 건강 체크업 (신규)
- 회복 탄력성 (신규)

### Priority 3: 나머지 카테고리
- 라이프 밸런스 (5개)
- 자원 관리 (5개)
- 커리어 성장 (5개)
- 대인 관계 (5개)

---

## 📅 일정별 상세 계획

### Day 1: 설계 및 질문 작성
**목표:** 종합 심리 분석 테스트 완성

#### 오전 (4시간)
- [x] Egoegg 분석 완료
- [ ] 50문항 질문 작성
  - 멘탈 건강 (10문항)
  - 자원 관리 (10문항)
  - 라이프 밸런스 (10문항)
  - 커리어 성장 (10문항)
  - 대인 관계 (10문항)

#### 오후 (4시간)
- [ ] 점수 계산 로직 설계
- [ ] 결과 해석 매트릭스 작성
- [ ] 맞춤 조언 데이터베이스 구축
- [ ] UI 와이어프레임 제작

#### 산출물
- `comprehensive-analysis.md` 파일 (50문항 + 결과)
- `scoring-algorithm.js` 설계 문서

---

### Day 2-3: 종합 심리 분석 구현
**목표:** 메인 테스트 완성 및 배포

#### Day 2 (8시간)
**백엔드 로직**
- [ ] 테스트 데이터 파일 생성
  ```yaml
  # content/tests/comprehensive-psychology.md
  questions: 50개
  dimensions: 5개
  calculation_rules: 점수 계산 규칙
  ```

- [ ] 점수 계산 알고리즘
  ```javascript
  // static/js/psychology-calculator.js
  - calculateDimensionScores()
  - generateRadarChart()
  - createPersonalizedAdvice()
  - checkRiskFactors()
  ```

- [ ] 결과 페이지 템플릿
  ```html
  layouts/psychology/comprehensive-result.html
  - 레이더 차트
  - 영역별 점수
  - 강점/개선 영역
  - 맞춤 조언
  - 추천 테스트
  ```

#### Day 3 (8시간)
**프론트엔드 구현**
- [ ] 차트 라이브러리 통합 (Chart.js)
- [ ] 반응형 UI 구현
- [ ] 애니메이션 효과
- [ ] 공유 기능
- [ ] 로컬 스토리지 저장

**테스트 및 배포**
- [ ] 다양한 답변 패턴 테스트
- [ ] 모바일 테스트
- [ ] Cloudflare Pages 배포
- [ ] OG 태그 최적화

#### 산출물
- 종합 심리 분석 테스트 (완전 작동)
- 50개 유니크 결과 페이지

---

### Day 4-5: 멘탈 케어 카테고리
**목표:** 5개 테스트 구현

#### 테스트 목록
1. **번아웃 증후군 진단** (기존 개선)
   - 20문항 → 30문항으로 확대
   - MBI 척도 적용
   - 상세한 번아웃 단계 분석

2. **스트레스 대처 유형** (기존 개선)
   - PSS-10 척도 적용
   - 대처 유형 4가지 분류
   - 맞춤형 대처 전략

3. **감정 조절 능력** (신규)
   - 감정 인식 능력
   - 감정 표현 능력
   - 감정 조절 전략

4. **정신 건강 체크업** (신규)
   - 우울 수준
   - 불안 수준
   - 전반적 웰빙

5. **회복 탄력성** (신규)
   - 역경 극복 능력
   - 적응 유연성
   - 긍정성

#### 각 테스트당 작업 (1.5일 / 5개 = 3.2시간)
- [ ] 15-20문항 작성
- [ ] 결과 타입 6-8개 정의
- [ ] 점수 계산 로직
- [ ] 결과 페이지 생성
- [ ] 테스트

#### 산출물
- 5개 멘탈 케어 테스트
- 각 6-8개 결과 = 35-40개 결과 페이지

---

### Day 6-7: 라이프 밸런스 + 자원 관리
**목표:** 10개 테스트 구현

#### 라이프 밸런스 (5개)
1. **자존감 진단** (기존 개선)
   - Rosenberg 척도 적용
   - 세부 자존감 영역 분석

2. **라이프스타일 유형** (신규)
   - 생활 패턴 분석
   - 시간 활용도
   - 삶의 질

3. **워라밸 균형도** (신규)
   - 업무-생활 경계
   - 시간 배분
   - 만족도

4. **자기계발 성향** (신규)
   - 학습 동기
   - 성장 마인드셋
   - 투자 의지

5. **행복도 측정** (신규)
   - SWLS 척도
   - 행복 요소 분석
   - 웰빙 지수

#### 자원 관리 (5개)
1. **시간 관리 유형** (신규)
   - 계획성
   - 실행력
   - 우선순위

2. **에너지 관리 스타일** (신규)
   - 에너지 패턴
   - 충전 방법
   - 소진 요인

3. **소비 성향 분석** (기존 개선)
   - 지출 패턴
   - 저축 성향
   - 재정 관리

4. **미루기 습관 진단** (신규)
   - 미루기 유형
   - 원인 분석
   - 극복 전략

5. **목표 실행력** (신규)
   - 목표 설정
   - 계획 수립
   - 실행 지속성

#### Day 6: 라이프 밸런스 5개
#### Day 7: 자원 관리 5개

---

### Day 8-9: 커리어 성장 + 대인 관계
**목표:** 10개 테스트 구현

#### 커리어 성장 (5개)
1. **직업 적성 검사** (기존 개선)
   - Holland 코드
   - 강점 분석
   - 추천 직업

2. **커리어 성향** (신규)
   - 업무 스타일
   - 동기 요인
   - 성공 패턴

3. **문제 해결 유형** (신규)
   - 사고 방식
   - 접근 방법
   - 창의성

4. **목표 달성 스타일** (신규)
   - 목표 명확도
   - 전략 수립
   - 실행력

5. **적응력 진단** (신규)
   - 변화 대응
   - 유연성
   - 학습 속도

#### 대인 관계 (5개)
1. **사회성 진단** (기존 개선)
   - 외향성
   - 친화성
   - 네트워킹

2. **커뮤니케이션 스타일** (신규)
   - 표현 방식
   - 경청 능력
   - 갈등 해결

3. **리더십 유형** (신규)
   - 리더십 스타일
   - 영향력
   - 팀워크

4. **공감 능력** (기존 개선)
   - 감정 인식
   - 관점 수용
   - 공감 표현

5. **영향력 스타일** (신규)
   - 설득 방법
   - 관계 구축
   - 신뢰 형성

#### Day 8: 커리어 성장 5개
#### Day 9: 대인 관계 5개

---

### Day 10: 통합, 최적화, 배포
**목표:** 모든 기능 통합 및 최종 배포

#### 오전 (4시간): 통합 작업
- [ ] 메인 페이지 구축
  ```
  /psychology-center/
  - 종합 심리 분석 (메인)
  - 5개 카테고리
  - 25개 세부 테스트
  ```

- [ ] 네비게이션 통합
- [ ] 테스트 추천 시스템
- [ ] 결과 간 연계

#### 오후 (4시간): 최적화 및 배포
- [ ] 성능 최적화
  - Chart.js 번들 크기 최적화
  - 이미지 압축
  - 캐싱 전략

- [ ] 모바일 최적화
  - 터치 제스처
  - 작은 화면 레이아웃
  - 로딩 속도

- [ ] SEO 최적화
  - 메타 태그
  - 구조화 데이터
  - 사이트맵

- [ ] 최종 배포
  - Hugo 빌드
  - Cloudflare Pages 배포
  - 도메인 연결

#### 산출물
- **총 26개 테스트**
  - 1개 종합 분석
  - 25개 세부 테스트
- **약 200개 결과 페이지**
- **완전 작동하는 심리 분석 센터**

---

## 🛠️ 기술 스택

### 프론트엔드
- **HTML/CSS/JavaScript** (Hugo 템플릿)
- **Chart.js** (차트 시각화)
- **LocalStorage API** (결과 저장)

### 백엔드
- **Hugo Static Site Generator**
- **YAML** (테스트 데이터)
- **JavaScript** (점수 계산 로직)

### 배포
- **Cloudflare Pages**
- **GitHub** (버전 관리)

---

## 📁 파일 구조

```
test-hub/
├── content/
│   └── psychology-center/
│       ├── index.md                    # 메인 페이지
│       ├── comprehensive-analysis.md   # 종합 분석
│       │
│       ├── mental-care/
│       │   ├── burnout.md
│       │   ├── stress-coping.md
│       │   ├── emotion-regulation.md
│       │   ├── mental-checkup.md
│       │   └── resilience.md
│       │
│       ├── life-balance/
│       │   ├── self-esteem.md
│       │   ├── lifestyle.md
│       │   ├── work-life-balance.md
│       │   ├── self-development.md
│       │   └── happiness.md
│       │
│       ├── resource-management/
│       │   ├── time-management.md
│       │   ├── energy-management.md
│       │   ├── spending-style.md
│       │   ├── procrastination.md
│       │   └── goal-execution.md
│       │
│       ├── career-growth/
│       │   ├── career-aptitude.md
│       │   ├── career-style.md
│       │   ├── problem-solving.md
│       │   ├── goal-achievement.md
│       │   └── adaptability.md
│       │
│       └── social-relations/
│           ├── sociability.md
│           ├── communication.md
│           ├── leadership.md
│           ├── empathy.md
│           └── influence.md
│
├── layouts/
│   └── psychology/
│       ├── index.html              # 카테고리 메인
│       ├── single.html             # 테스트 페이지
│       ├── comprehensive.html      # 종합 분석 특별 레이아웃
│       └── partials/
│           ├── radar-chart.html
│           ├── score-display.html
│           └── recommendations.html
│
├── static/
│   ├── js/
│   │   ├── psychology-calculator.js
│   │   ├── chart-renderer.js
│   │   └── recommendation-engine.js
│   │
│   └── css/
│       └── psychology-center.css
│
└── docs/
    ├── EGOEGG_ANALYSIS.md          ✅ 완료
    ├── PSYCHOLOGY_CENTER_ROADMAP.md ✅ 완료
    └── PSYCHOLOGY_QUESTIONS/       (다음 단계)
        ├── comprehensive.md
        ├── mental-care/
        ├── life-balance/
        ├── resource-management/
        ├── career-growth/
        └── social-relations/
```

---

## 🎨 디자인 가이드라인

### 색상 팔레트
```css
/* 메인 */
--primary: #667eea;        /* 보라 */
--secondary: #764ba2;      /* 진보라 */

/* 카테고리별 */
--mental: #ff6b6b;         /* 빨강 - 멘탈 케어 */
--resource: #4ecdc4;       /* 청록 - 자원 관리 */
--life: #95e1d3;           /* 연두 - 라이프 밸런스 */
--career: #f38181;         /* 코랄 - 커리어 성장 */
--social: #aa96da;         /* 연보라 - 대인 관계 */

/* 점수 */
--excellent: #51cf66;      /* 우수 */
--good: #74c0fc;           /* 양호 */
--average: #ffd43b;        /* 보통 */
--poor: #ff8787;           /* 주의 */
--critical: #f03e3e;       /* 위험 */
```

### 타이포그래피
- **제목:** Noto Sans KR Bold
- **본문:** Noto Sans KR Regular
- **숫자:** Roboto

### 아이콘
- 멘탈 케어: 💭 🧠 💆
- 자원 관리: ⏰ 💰 ⚡
- 라이프 밸런스: 🌱 ⚖️ 😊
- 커리어 성장: 💼 📈 🎯
- 대인 관계: 🤝 💬 👥

---

## 📊 성공 지표 (KPI)

### 사용자 참여
- 종합 분석 완료율 > 70%
- 세부 테스트 완료율 > 50%
- 공유율 > 20%
- 재방문율 > 30%

### 기술 성능
- 로딩 속도 < 2초
- 모바일 사용성 점수 > 90점
- 접근성 점수 > 95점

### 사회적 영향
- 월간 사용자 > 10,000명
- 긍정적 피드백 > 80%
- 전문가 상담 연계 > 5%

---

## ⚠️ 리스크 및 대응

### Risk 1: 질문 품질
**위험:** 비과학적 질문으로 신뢰도 하락
**대응:** 검증된 심리 척도 사용, 전문가 검토

### Risk 2: 결과 오남용
**위험:** 자가 진단 결과를 진단으로 오인
**대응:** 명확한 안내 문구, 전문가 상담 권장

### Risk 3: 개발 지연
**위험:** 10일 내 완성 못할 수 있음
**대응:** MVP 먼저 출시, 점진적 확장

### Risk 4: 법적 문제
**위험:** 의료 행위로 오인될 수 있음
**대응:**
- "자가 진단 도구" 명시
- "전문 상담 대체 불가" 안내
- 면책 조항 명시

---

## 🎓 참고 자료

### 심리 척도 문서
- `docs/scales/rosenberg-self-esteem.md`
- `docs/scales/perceived-stress-scale.md`
- `docs/scales/maslach-burnout-inventory.md`
- `docs/scales/satisfaction-with-life.md`

### 질문 작성 가이드
- `docs/guides/question-writing.md`
- `docs/guides/scoring-methods.md`
- `docs/guides/result-interpretation.md`

---

## ✅ 체크리스트

### 시작 전 확인
- [ ] 심리 척도 자료 수집
- [ ] 질문 작성 가이드 숙지
- [ ] Chart.js 사용법 학습
- [ ] Hugo 레이아웃 시스템 이해

### 완료 기준
- [ ] 26개 테스트 모두 작동
- [ ] 모든 결과 페이지 생성
- [ ] 모바일 테스트 완료
- [ ] 배포 성공
- [ ] 문서화 완료

---

**마지막 업데이트:** 2025-01-22
**다음 액션:** Day 1 작업 시작 - 종합 심리 분석 질문 작성

**추정 작업량:**
- 총 26개 테스트
- 약 500문항 작성
- 약 200개 결과 페이지
- 10일 집중 개발

**예상 결과물 크기:**
- 콘텐츠: ~50MB
- 코드: ~500KB
- 이미지: ~10MB
- 총 페이지: ~250개
