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
        // 가장 높은 점수의 타입 찾기
        let maxScore = -1;
        let resultType = null;

        Object.keys(this.scores).forEach(type => {
            if (this.scores[type] > maxScore) {
                maxScore = this.scores[type];
                resultType = type;
            }
        });

        // 해당 타입의 결과 찾기
        return this.testData.results.find(r => r.type === resultType);
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

        // 결과 후 공유 섹션 표시
        const shareSection = document.getElementById('share-section');
        if (shareSection) {
            shareSection.style.display = 'block';
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
