// 공통 테스트 엔진
class TestEngine {
    constructor(testData) {
        this.testData = testData;
        this.currentQuestion = 0;
        this.answers = {};
        this.scores = {};

        // 결과 타입별 점수 초기화
        testData.results.forEach(result => {
            this.scores[result.type] = 0;
        });
    }

    // 테스트 시작
    start() {
        this.showQuestion(0);
        this.updateProgress();
    }

    // 질문 표시
    showQuestion(index) {
        const question = this.testData.questions[index];
        const container = document.getElementById('question-container');

        container.innerHTML = `
            <div class="question-card">
                <div class="question-number">질문 ${index + 1} / ${this.testData.questions.length}</div>
                <h2 class="question-text">${question.question}</h2>
                <div class="options">
                    ${question.options.map((option, i) => `
                        <button class="option-btn" onclick="testEngine.selectAnswer(${i})">
                            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                            <span class="option-text">${option.text}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // 답변 선택
    selectAnswer(optionIndex) {
        const question = this.testData.questions[this.currentQuestion];
        const option = question.options[optionIndex];

        // 답변 저장
        this.answers[this.currentQuestion] = optionIndex;

        // 점수 계산 (점수 타입이 있으면)
        if (option.scores) {
            Object.keys(option.scores).forEach(type => {
                this.scores[type] = (this.scores[type] || 0) + option.scores[type];
            });
        }

        // 다음 질문으로
        this.currentQuestion++;

        if (this.currentQuestion < this.testData.questions.length) {
            this.showQuestion(this.currentQuestion);
            this.updateProgress();
        } else {
            this.showResult();
        }
    }

    // 진행 상황 업데이트
    updateProgress() {
        const progress = ((this.currentQuestion) / this.testData.questions.length) * 100;
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }

        const progressText = document.getElementById('progress-text');
        if (progressText) {
            progressText.textContent = `${this.currentQuestion} / ${this.testData.questions.length}`;
        }
    }

    // 결과 계산
    calculateResult() {
        // MBTI 테스트 감지: 결과 타입이 4글자 MBTI 코드인지 확인
        const firstResult = this.testData.results[0];
        const isMBTI = firstResult && firstResult.type &&
                      firstResult.type.length === 4 &&
                      /^[EI][SN][TF][JP]$/.test(firstResult.type);

        if (isMBTI) {
            // MBTI: 각 차원에서 높은 쪽 선택하여 4글자 조합
            const e_i = (this.scores.E || 0) >= (this.scores.I || 0) ? 'E' : 'I';
            const s_n = (this.scores.S || 0) >= (this.scores.N || 0) ? 'S' : 'N';
            const t_f = (this.scores.T || 0) >= (this.scores.F || 0) ? 'T' : 'F';
            const j_p = (this.scores.J || 0) >= (this.scores.P || 0) ? 'J' : 'P';
            const resultType = e_i + s_n + t_f + j_p;

            return this.testData.results.find(r => r.type === resultType);
        } else {
            // 일반 테스트: 가장 높은 점수의 타입 찾기
            let maxScore = -1;
            let resultType = null;

            Object.keys(this.scores).forEach(type => {
                if (this.scores[type] > maxScore) {
                    maxScore = this.scores[type];
                    resultType = type;
                }
            });

            return this.testData.results.find(r => r.type === resultType);
        }
    }

    // 결과 표시
    showResult() {
        const result = this.calculateResult();
        const container = document.getElementById('question-container');
        const progressBar = document.getElementById('progress-bar-container');

        if (progressBar) {
            progressBar.style.display = 'none';
        }

        container.innerHTML = `
            <div class="result-card">
                <div class="result-badge">${result.badge || '🎯'}</div>
                <h1 class="result-title">${result.title}</h1>
                <p class="result-subtitle">${result.subtitle || ''}</p>
                <div class="result-description">
                    ${result.description}
                </div>
                ${result.traits ? `
                    <div class="result-traits">
                        <h3>주요 특징</h3>
                        <ul>
                            ${result.traits.map(trait => `<li>${trait}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${result.recommendation ? `
                    <div class="result-recommendation">
                        <h3>💡 추천</h3>
                        <p>${result.recommendation}</p>
                    </div>
                ` : ''}
            </div>
        `;

        // URL에 결과 파라미터 추가 (공유용)
        const resultUrl = new URL(window.location.href);
        resultUrl.searchParams.set('result', result.type);
        window.history.pushState({}, '', resultUrl);

        // 결과 후 공유 섹션 표시
        const shareSection = document.getElementById('share-section');
        if (shareSection) {
            shareSection.style.display = 'block';
            // 공유 버튼 업데이트
            this.updateShareButtons(result, resultUrl.href);
        }

        // 다른 테스트 추천 표시
        const moreTests = document.getElementById('more-tests');
        if (moreTests) {
            moreTests.style.display = 'block';
        }

        // 결과를 localStorage에 저장
        this.saveResult(result);

        // 페이지 맨 위로 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 공유 버튼 업데이트
    updateShareButtons(result, resultUrl) {
        const shareText = `나는 ${result.badge} ${result.title}! 당신도 테스트해보세요`;

        // 링크 복사 버튼
        const copyButton = document.querySelector('.share-button[data-action="copy"]');
        if (copyButton) {
            copyButton.onclick = () => {
                navigator.clipboard.writeText(`${shareText}\n${resultUrl}`).then(() => {
                    alert('결과 링크가 복사되었습니다! 친구들과 공유해보세요 ✨');
                });
            };
        }

        // Facebook 공유 버튼
        const fbButton = document.querySelector('.share-button[data-action="facebook"]');
        if (fbButton) {
            const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(resultUrl)}&quote=${encodeURIComponent(shareText)}`;
            fbButton.onclick = () => window.open(fbUrl, '_blank', 'width=600,height=400');
        }
    }

    // 결과 저장
    saveResult(result) {
        const testId = this.testData.id;
        const savedResults = JSON.parse(localStorage.getItem('test_results') || '{}');

        savedResults[testId] = {
            type: result.type,
            title: result.title,
            date: new Date().toISOString(),
            answers: this.answers
        };

        localStorage.setItem('test_results', JSON.stringify(savedResults));
    }

    // 테스트 다시하기
    restart() {
        this.currentQuestion = 0;
        this.answers = {};

        // 점수 초기화
        this.testData.results.forEach(result => {
            this.scores[result.type] = 0;
        });

        // 공유 섹션 숨기기
        const shareSection = document.getElementById('share-section');
        if (shareSection) {
            shareSection.style.display = 'none';
        }

        const moreTests = document.getElementById('more-tests');
        if (moreTests) {
            moreTests.style.display = 'none';
        }

        // 진행 바 표시
        const progressBar = document.getElementById('progress-bar-container');
        if (progressBar) {
            progressBar.style.display = 'block';
        }

        // 테스트 시작
        this.start();

        // 페이지 맨 위로 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 글로벌 테스트 엔진 인스턴스
let testEngine = null;

// 테스트 초기화 함수
function initTest(testData) {
    testEngine = new TestEngine(testData);

    // URL 파라미터 확인 (공유된 결과 링크인 경우)
    const urlParams = new URLSearchParams(window.location.search);
    const sharedResult = urlParams.get('result');

    if (sharedResult) {
        // 공유된 결과가 있으면 바로 결과 표시
        const result = testData.results.find(r => r.type === sharedResult);
        if (result) {
            document.getElementById('test-intro').style.display = 'none';
            document.getElementById('test-content').style.display = 'block';

            const container = document.getElementById('question-container');
            const progressBar = document.getElementById('progress-bar-container');
            if (progressBar) progressBar.style.display = 'none';

            container.innerHTML = `
                <div class="result-card">
                    <div class="result-badge">${result.badge || '🎯'}</div>
                    <h1 class="result-title">${result.title}</h1>
                    <p class="result-subtitle">${result.subtitle || ''}</p>
                    <div class="result-description">
                        ${result.description}
                    </div>
                    ${result.traits ? `
                        <div class="result-traits">
                            <h3>주요 특징</h3>
                            <ul>
                                ${result.traits.map(trait => `<li>${trait}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${result.recommendation ? `
                        <div class="result-recommendation">
                            <h3>💡 추천</h3>
                            <p>${result.recommendation}</p>
                        </div>
                    ` : ''}
                    <div style="margin-top: 30px; text-align: center;">
                        <button class="restart-test-btn" style="padding: 15px 40px; font-size: 18px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 25px; cursor: pointer; font-weight: bold;">
                            나도 테스트하기 ▶
                        </button>
                    </div>
                </div>
            `;

            const shareSection = document.getElementById('share-section');
            if (shareSection) {
                shareSection.style.display = 'block';
                testEngine.updateShareButtons(result, window.location.href);
            }

            const moreTests = document.getElementById('more-tests');
            if (moreTests) moreTests.style.display = 'block';
        }
    }

    // 시작 버튼 이벤트
    const startBtn = document.getElementById('start-test-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            document.getElementById('test-intro').style.display = 'none';
            document.getElementById('test-content').style.display = 'block';
            testEngine.start();
        });
    }

    // 다시하기 버튼 이벤트
    const restartBtns = document.querySelectorAll('.restart-test-btn');
    restartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // URL 파라미터 제거
            const cleanUrl = window.location.origin + window.location.pathname;
            window.history.pushState({}, '', cleanUrl);
            testEngine.restart();
        });
    });
}

// 페이지 로드 시 테스트 카운터 증가
function incrementTestCounter(testId) {
    const counterKey = `${testId}_test_count`;
    const baseCount = 10000; // 기본 카운트
    let currentCount = parseInt(localStorage.getItem(counterKey)) || baseCount;

    currentCount++;
    localStorage.setItem(counterKey, currentCount);

    const countElement = document.getElementById('testCount');
    if (countElement) {
        // 애니메이션 효과
        let displayCount = currentCount - 50;
        const increment = Math.ceil(50 / 20);

        const timer = setInterval(() => {
            displayCount += increment;
            if (displayCount >= currentCount) {
                displayCount = currentCount;
                clearInterval(timer);
            }
            countElement.textContent = displayCount.toLocaleString();
        }, 30);
    }
}
