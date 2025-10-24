# Hugo 패턴 가이드

Test-Hub 프로젝트에서 사용하는 Hugo 패턴과 규칙입니다.

## 레이아웃 시스템

### 기본 원칙

Hugo는 다음 순서로 레이아웃을 찾습니다:

```
1. layouts/[TYPE]/[LAYOUT].html          # type + layout 지정
2. layouts/[TYPE]/single.html            # type만 지정
3. layouts/[SECTION]/[LAYOUT].html       # section + layout
4. layouts/[SECTION]/single.html         # section만
5. layouts/_default/single.html          # 기본값
```

### 실제 예시

**잘못된 방법 ❌:**
```yaml
# content/tests/food-bti/steak.md
---
type: "result"
---
```
```
# 파일 위치
layouts/tests/result.html  # ← Hugo가 찾지 못함!
```

**올바른 방법 ✅:**
```yaml
# content/tests/food-bti/steak.md
---
type: "result"
---
```
```
# 파일 위치
layouts/result/single.html  # ← type="result"와 일치!
```

---

## Front Matter 패턴

### 테스트 소개 페이지

```yaml
---
title: "음식BTI 테스트"
date: 2025-01-22
description: "12가지 질문으로 알아보는 나의 음식 성격!"
emoji: "🍕"
category: "재미"
questionCount: 12
timeEstimate: "2-3분"

questions:
  - question: "친구들과의 약속에서 나는?"
    options:
      - text: "분위기를 주도하고 모두를 즐겁게 한다"
        score:
          outgoing: 3
          energetic: 2

results:
  - type: "pizza"
    title: "인싸 피자"
    badge: "🍕"
    # ... 결과 정보
---
```

**핵심:**
- `type` 파라미터 **없음** → `_default/single.html` 사용
- `questions`와 `results` 배열 필수

### 결과 페이지

```yaml
---
title: "프리미엄 스테이크 🥩✨ | 음식BTI 테스트 결과"
date: 2025-01-22
layout: "result"     # 레이아웃 파일명
type: "result"       # ★ 레이아웃 디렉토리명

# Test Info
testId: "food-bti"
testTitle: "음식BTI 테스트"
testUrl: "/tests/food-bti/"

# Result Info
resultType: "steak"
badge: "🥩✨"
resultTitle: "프리미엄 스테이크"
subtitle: "고급스럽고 완벽주의적인 당신"
rarity: 8

# OG Tags
ogImage: "og-food-bti-steak.jpg"
ogDescription: "나는 프리미엄 스테이크! 🥩✨ ..."

# Content
description: "당신은 최고의 품질과..."
traits:
  - "🥩 최고 품질 추구"
  - "✨ 세련된 취향"
recommendation: "가끔은 완벽함을 내려놓고..."
compatibility: "와인, 초밥과 잘 어울려요"
---
```

**핵심:**
- `type: "result"` → `layouts/result/single.html` 사용
- `layout`, `type` 모두 지정
- OG 태그용 메타데이터 포함

---

## 템플릿 패턴

### baseof.html 확장

모든 레이아웃은 `baseof.html`을 확장합니다:

```html
<!-- layouts/result/single.html -->
{{ define "head" }}
<!-- 추가 CSS, meta 태그 -->
<style>
  .result-card { ... }
</style>
{{ end }}

{{ define "main" }}
<!-- 페이지 본문 -->
<div class="result-container">
  <h1>{{ .Params.resultTitle }}</h1>
  ...
</div>
{{ end }}

{{ define "scripts" }}
<!-- 추가 JavaScript -->
<script>
  // 결과 페이지용 스크립트
</script>
{{ end }}
```

### 파라미터 접근

```html
<!-- Title -->
{{ .Title }}

<!-- Front Matter 파라미터 -->
{{ .Params.badge }}
{{ .Params.resultTitle }}
{{ .Params.testId }}

<!-- 사이트 설정 -->
{{ .Site.Title }}
{{ .Site.BaseURL }}

<!-- URL -->
{{ .Permalink }}
{{ .RelPermalink }}

<!-- 섹션 -->
{{ .Section }}        <!-- "tests" -->
{{ .Type }}           <!-- "result" -->

<!-- 파일 정보 -->
{{ .File.BaseFileName }}  <!-- "steak" -->
{{ .File.Dir }}           <!-- "tests/food-bti/" -->
```

### 조건문

```html
<!-- 파라미터 존재 확인 -->
{{ if .Params.traits }}
<div class="traits">
  {{ range .Params.traits }}
  <li>{{ . }}</li>
  {{ end }}
</div>
{{ end }}

<!-- 비교 -->
{{ if eq .Type "result" }}
<!-- 결과 페이지만 -->
{{ end }}

{{ if ne .Params.rarity 0 }}
<span>희소성: {{ .Params.rarity }}%</span>
{{ end }}
```

### 반복문

```html
<!-- 배열 반복 -->
{{ range .Params.traits }}
  <li>{{ . }}</li>
{{ end }}

<!-- 인덱스 포함 -->
{{ range $index, $trait := .Params.traits }}
  <li>{{ $index }}: {{ $trait }}</li>
{{ end }}

<!-- 객체 배열 -->
{{ range .Params.questions }}
  <h3>{{ .question }}</h3>
  {{ range .options }}
    <button>{{ .text }}</button>
  {{ end }}
{{ end }}
```

---

## Partial 패턴

### Partial 사용

```html
<!-- 기본 사용 -->
{{ partial "header.html" . }}

<!-- 파라미터 전달 -->
{{ partial "share-buttons.html" (dict "url" .Permalink "title" .Title) }}

<!-- 조건부 포함 -->
{{ if eq .Type "result" }}
  {{ partial "share-buttons.html" . }}
{{ end }}
```

### Partial 내부에서

```html
<!-- partials/share-buttons.html -->
<div class="share-buttons">
  <button onclick="shareFacebook('{{ .Permalink }}', '{{ .Title }}')">
    페이스북
  </button>
  <button onclick="copyLink('{{ .Permalink }}')">
    링크 복사
  </button>
</div>
```

---

## 데이터 전달 패턴

### JavaScript로 데이터 전달

```html
{{ define "scripts" }}
<script>
  // Front Matter를 JSON으로 변환
  const testData = {{ dict
    "id" .File.BaseFileName
    "title" .Title
    "questions" .Params.questions
    "results" .Params.results
    | jsonify | safeJS }};

  // 사용
  console.log(testData.questions);
</script>
{{ end }}
```

**주의사항:**
- `jsonify`: 객체를 JSON 문자열로 변환
- `safeJS`: XSS 공격 방지용 이스케이프 처리
- 항상 두 필터 함께 사용

---

## 디렉토리 구조 규칙

### 권장 구조

```
test-hub/
├── content/
│   └── tests/                    # 섹션: tests
│       ├── love-style.md         # 소개 페이지 (type 없음)
│       └── love-style/           # 결과 페이지들
│           ├── passionate.md     # (type: result)
│           └── romantic.md       # (type: result)
│
├── layouts/
│   ├── _default/
│   │   ├── baseof.html          # 기본 베이스
│   │   └── single.html          # 기본 단일 페이지
│   │
│   ├── result/                  # type: "result"용
│   │   └── single.html          # 결과 페이지 템플릿
│   │
│   └── partials/
│       ├── header.html
│       └── share-buttons.html
│
├── static/
│   ├── js/
│   │   └── test-engine.js
│   ├── css/
│   │   └── viral.css
│   └── images/
│       └── og-*.jpg
│
└── public/                      # Hugo 생성 결과
    └── tests/
        └── love-style/
            └── passionate/
                └── index.html
```

---

## 빌드 프로세스

### 로컬 개발

```bash
# 1. 빠른 빌드 (개발용)
hugo

# 2. 서버 실행 (자동 리로드)
hugo server -D

# 3. 깨끗한 빌드 (배포 전)
hugo --cleanDestinationDir
```

### 배포 플로우

```bash
# 1. 로컬 빌드 테스트
hugo --cleanDestinationDir

# 2. 생성된 파일 확인
ls -la public/tests/food-bti/steak/

# 3. Git 커밋
git add .
git commit -m "..."

# 4. GitHub 푸시
git push origin master

# 5. Cloudflare Pages가 자동 배포
# → https://dash.cloudflare.com/ 에서 확인
```

---

## 디버깅 팁

### 1. 레이아웃 확인

생성된 HTML에서 사용된 레이아웃 확인:

```bash
# HTML 파일 확인
cat public/tests/food-bti/steak/index.html | head -50

# 특정 요소 검색
grep -n "share-section-inline" public/tests/food-bti/steak/index.html
```

### 2. Front Matter 검증

```bash
# Python으로 YAML 파싱 테스트
python -c "
import yaml
with open('content/tests/food-bti/steak.md') as f:
    content = f.read()
    match = __import__('re').match(r'^---\s*\n(.*?)\n---', content, __import__('re').DOTALL)
    if match:
        data = yaml.safe_load(match.group(1))
        print(data['type'])  # 'result' 출력되어야 함
"
```

### 3. 레이아웃 탐색 순서 확인

Hugo가 찾는 레이아웃 경로를 확인:

```bash
hugo --debug | grep -i layout
```

---

## 일반적인 실수 방지

### ❌ 하지 말아야 할 것

1. **잘못된 레이아웃 위치:**
```
layouts/tests/result.html  # type="result"인 경우 사용 안 됨
```

2. **type 없이 커스텀 레이아웃 사용:**
```yaml
---
layout: "result"  # type이 없으면 section 기반으로 찾음
---
```

3. **Front Matter에 오타:**
```yaml
---
Type: "result"     # ❌ 대문자 T
types: "result"    # ❌ 복수형
---
```

4. **잘못된 JSON 변환:**
```html
<script>
  const data = {{ .Params.questions }};
  <!-- ❌ jsonify 없음 -->
</script>
```

### ✅ 올바른 방법

1. **올바른 레이아웃 위치:**
```
layouts/result/single.html  # type="result"와 일치
```

2. **type과 layout 모두 지정:**
```yaml
---
type: "result"
layout: "result"  # 또는 "single"
---
```

3. **정확한 Front Matter:**
```yaml
---
type: "result"    # ✅ 소문자, 단수형
---
```

4. **안전한 JSON 변환:**
```html
<script>
  const data = {{ .Params.questions | jsonify | safeJS }};
  <!-- ✅ jsonify + safeJS -->
</script>
```

---

## 성능 최적화

### 빌드 시간 단축

```yaml
# hugo.toml
[build]
  writeStats = false        # 통계 생성 비활성화

[caches]
  [caches.assets]
    dir = ":resourceDir/_gen"
    maxAge = "24h"
```

### 파일 크기 최적화

1. **CSS 인라인 vs 외부:**
   - 페이지별 스타일 → 인라인 (`<style>`)
   - 공통 스타일 → 외부 파일 (`/css/viral.css`)

2. **JavaScript 번들링:**
   - 테스트 엔진 → 단일 파일 (`test-engine.js`)
   - 페이지별 스크립트 → `{{ define "scripts" }}`

---

**마지막 업데이트:** 2025-01-22
