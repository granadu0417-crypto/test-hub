# Test-Hub 개발 노트

프로젝트 개발 중 발견한 문제점, 해결 방법, 그리고 향후 참고사항을 기록합니다.

## Hugo 레이아웃 시스템 이해

### 문제: Result 페이지에서 잘못된 템플릿 사용 (2025-01-22)

**증상:**
- 결과 페이지 URL은 정확함: `/tests/food-bti/steak/`
- 하지만 "테스트 시작하기" 버튼이 보임 (결과 페이지 대신 소개 페이지 템플릿 사용)
- 공유 버튼이 표시되지 않음

**원인:**
```yaml
# content/tests/food-bti/steak.md
---
layout: "result"
type: "result"  # ← 이것이 핵심!
---
```

Hugo는 front matter의 `type` 파라미터를 보고 레이아웃을 찾습니다:
- `type: "result"` → `layouts/result/single.html` 을 찾음
- 우리는 `layouts/tests/result.html`에 만들어서 Hugo가 찾지 못함

**해결 방법:**
```bash
mkdir -p layouts/result
cp layouts/tests/result.html layouts/result/single.html
```

**Hugo 레이아웃 우선순위:**
1. `layouts/[TYPE]/single.html` (type 파라미터 기반)
2. `layouts/[SECTION]/single.html` (section 기반)
3. `layouts/_default/single.html` (기본값)

**교훈:**
- Hugo에서 `type` 파라미터는 레이아웃 디렉토리 이름과 정확히 일치해야 함
- 커스텀 레이아웃 사용 시 `layouts/[type]/single.html` 구조 사용
- 배포 전 로컬에서 생성된 HTML 확인 (`public/` 디렉토리)

---

## 정적 결과 페이지 시스템

### 설계 결정 (2025-01-22)

**목적:**
소셜 미디어 공유 시 올바른 썸네일과 설명이 표시되도록 함

**선택한 방식: 정적 페이지 생성**
각 테스트 결과마다 개별 마크다운 파일 생성

**장점:**
- ✅ 완벽한 SEO/OG 태그 지원
- ✅ 크롤러가 JavaScript 실행 없이 메타 태그 읽을 수 있음
- ✅ 빠른 로딩 속도 (정적 파일)
- ✅ 각 결과마다 고유 URL (`/tests/testId/resultType/`)

**구조:**
```
content/tests/
  ├── love-style/
  │   ├── passionate-romantic.md
  │   ├── steady-realistic.md
  │   └── ...
  ├── food-bti/
  │   ├── pizza.md
  │   ├── steak.md
  │   └── ...
  └── ...
```

**자동화:**
`generate-result-pages.py` 스크립트로 135개 결과 페이지 자동 생성

---

## 파일 구조 규칙

### 레이아웃 (Layouts)

```
layouts/
├── _default/
│   ├── baseof.html      # 기본 베이스 템플릿
│   └── single.html      # 일반 페이지용
├── result/
│   └── single.html      # type: "result" 페이지용 ★
├── tests/
│   └── result.html      # (사용 안 됨 - 참고용)
└── partials/
    ├── header.html
    ├── test-intro.html
    ├── test-content.html
    └── share-buttons.html
```

### 콘텐츠 (Content)

```
content/
├── tests/
│   ├── love-style.md          # 테스트 소개 페이지
│   ├── love-style/            # 결과 페이지들
│   │   ├── passionate-romantic.md
│   │   └── ...
│   ├── food-bti.md
│   └── food-bti/
│       ├── pizza.md
│       └── ...
└── ...
```

---

## 배포 체크리스트

### 변경 사항 배포 시

1. **로컬 빌드 테스트:**
```bash
hugo --cleanDestinationDir
```

2. **생성된 HTML 확인:**
```bash
# 예시: 공유 버튼이 있는지 확인
grep -A 5 "share-section-inline" public/tests/food-bti/steak/index.html
```

3. **Git 커밋:**
```bash
git add .
git commit -m "설명"
git push origin master
```

4. **Cloudflare Pages 배포 대기:**
- 대시보드에서 배포 상태 확인
- 보통 1-2분 소요

5. **실제 사이트 테스트:**
- Playwright 또는 직접 방문
- 공유 기능 동작 확인
- OG 태그 확인 (소셜 미디어 공유 미리보기)

---

## 자주 발생하는 문제

### 1. 템플릿이 적용되지 않음

**체크 포인트:**
- [ ] Front matter에 `type` 파라미터 확인
- [ ] `layouts/[type]/single.html` 파일 존재 확인
- [ ] Hugo 재빌드 (`hugo --cleanDestinationDir`)
- [ ] 생성된 HTML 파일 직접 확인

### 2. 변경사항이 배포 안 됨

**체크 포인트:**
- [ ] Git push 성공 확인
- [ ] Cloudflare Pages 배포 상태 확인
- [ ] 브라우저 캐시 삭제 후 재확인
- [ ] 배포 로그 확인 (에러 없는지)

### 3. OG 태그가 표시 안 됨

**체크 포인트:**
- [ ] `layouts/result/single.html`에 OG 태그 정의되어 있는지
- [ ] Front matter에 `ogImage`, `ogDescription` 있는지
- [ ] HTML 소스에서 `<meta property="og:*"` 태그 확인
- [ ] 페이스북 디버거 사용: https://developers.facebook.com/tools/debug/

---

## 성능 최적화

### 생성된 페이지 수
- 현재: 156 페이지 (21 테스트 + 135 결과)
- Hugo 빌드 시간: ~2-27초 (캐시 상태에 따라)

### 정적 파일
- JavaScript: `test-engine.js` (테스트 엔진)
- CSS: `viral.css` (바이럴 기능)
- Service Worker: `sw.js` (PWA 오프라인 지원)

---

## 앞으로 개발 시 주의사항

1. **새로운 레이아웃 추가 시:**
   - `type` 파라미터 결정
   - `layouts/[type]/single.html` 생성
   - 로컬에서 빌드 후 HTML 확인

2. **새로운 테스트 추가 시:**
   - Python 스크립트 실행: `python generate-result-pages.py`
   - 생성된 페이지 확인
   - Hugo 빌드 및 배포

3. **템플릿 수정 시:**
   - 영향받는 모든 페이지 타입 확인
   - `baseof.html` 수정은 전체 사이트에 영향
   - 특정 타입만 수정하려면 해당 타입의 레이아웃 파일 수정

4. **Front Matter 작성 시:**
   - `type`: 레이아웃 디렉토리 이름과 정확히 일치
   - `layout`: 파일명 (확장자 제외)
   - 필수 파라미터 누락 방지

---

## 유용한 명령어

```bash
# Hugo 빌드 (개발용 - 빠른 빌드)
hugo

# Hugo 빌드 (배포용 - 깨끗한 빌드)
hugo --cleanDestinationDir

# 로컬 서버 실행
hugo server -D

# 특정 페이지 HTML 확인
cat public/tests/food-bti/steak/index.html

# 공유 버튼 검색
grep -r "share-section-inline" public/

# Python 스크립트 실행
python generate-result-pages.py

# Git 상태 확인
git status

# Cloudflare 배포 확인
# → https://dash.cloudflare.com/ 에서 수동 확인
```

---

## 참고 자료

- Hugo 레이아웃 문서: https://gohugo.io/templates/lookup-order/
- Hugo Front Matter: https://gohugo.io/content-management/front-matter/
- Open Graph 프로토콜: https://ogp.me/
- Cloudflare Pages 문서: https://developers.cloudflare.com/pages/

---

**마지막 업데이트:** 2025-01-22
**작성자:** Claude Code
