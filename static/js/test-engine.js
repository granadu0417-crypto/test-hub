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
        // GA4 이벤트: 테스트 시작
        if (typeof gtag !== 'undefined') {
            gtag('event', 'test_start', {
                test_id: this.testData.id,
                test_name: this.testData.title || 'Unknown Test'
            });
        }

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

        const progressPercentage = document.getElementById('progress-percentage');
        if (progressPercentage) {
            progressPercentage.textContent = Math.round(progress) + '%';
        }
    }

    // 2D 점수 시스템 매핑 정의
    get2DMapping() {
        const mappings = {
            'energy-emotional': {
                types: {
                    'high-high': 'passionate-romantic',
                    'high-low': 'passionate-realistic',
                    'low-high': 'steady-romantic',
                    'low-low': 'steady-realistic',
                    'high-neutral': 'passionate',
                    'low-neutral': 'steady',
                    'neutral-high': 'romantic',
                    'neutral-low': 'realistic'
                }
            },
            'emotional-cognitive': {
                types: {
                    'high-high': 'empathic-master',
                    'high-neutral': 'emotional-intuitive',
                    'high-low': 'emotional-dominant',
                    'low-high': 'cognitive-analytical',
                    'neutral-neutral': 'balanced',
                    'low-neutral': 'cognitive-focused',
                    'neutral-low': 'developing',
                    'low-low': 'detached'
                }
            },
            'energy-breadth': {
                types: {
                    'high-high': 'social-butterfly',
                    'high-neutral': 'warm-connector',
                    'high-low': 'selective-social',
                    'neutral-neutral': 'balanced',
                    'low-high': 'quiet-networker',
                    'low-neutral': 'intimate-friend',
                    'neutral-low': 'independent-soul',
                    'low-low': 'solitary-observer'
                }
            },
            'saving-planning': {
                types: {
                    'high-high': 'master-saver',
                    'high-neutral': 'strategic-investor',
                    'neutral-high': 'mindful-budgeter',
                    'neutral-neutral': 'balanced-budgeter',
                    'low-neutral': 'flexible-spender',
                    'neutral-low': 'planned-enjoyer',
                    'low-low': 'impulsive-spender',
                    'reformed': 'reformed-spender'
                }
            },
            'people-structure': {
                types: {
                    'high-high': 'compassionate-leader',
                    'high-neutral': 'caring-helper',
                    'high-low': 'creative-collaborator',
                    'neutral-low': 'innovative-creator',
                    'low-high': 'analytical-thinker',
                    'neutral-high': 'strategic-organizer',
                    'neutral-neutral': 'balanced-professional',
                    'versatile': 'versatile-adapter'
                }
            }
        };
        return mappings;
    }

    // 2D 점수를 결과 타입으로 매핑
    map2DScoreToType(axis1Name, axis1Score, axis2Name, axis2Score) {
        const threshold = 5;  // 중립 범위
        const mappings = this.get2DMapping();
        const mapKey = `${axis1Name}-${axis2Name}`;
        const mapping = mappings[mapKey];

        if (!mapping) {
            console.warn(`No 2D mapping found for ${mapKey}`);
            return null;
        }

        // 각 축의 레벨 결정
        const getLevel = (score) => {
            if (score > threshold) return 'high';
            if (score < -threshold) return 'low';
            return 'neutral';
        };

        const level1 = getLevel(axis1Score);
        const level2 = getLevel(axis2Score);
        const positionKey = `${level1}-${level2}`;

        // 매핑에서 결과 타입 찾기
        let resultType = mapping.types[positionKey];

        // 특수 케이스 처리
        if (!resultType && mapKey === 'saving-planning') {
            // reformed-spender: 낮은 저축 + 중립 계획에서 개선 의지 있는 경우
            if (level1 === 'low' && level2 === 'neutral' && axis2Score > 0) {
                resultType = mapping.types['reformed'];
            }
        }

        if (!resultType && mapKey === 'people-structure') {
            // versatile-adapter: 균형잡힌 낮은 수준 (유연한 적응형)
            if ((level1 === 'neutral' || level1 === 'low') && (level2 === 'neutral' || level2 === 'low')) {
                resultType = mapping.types['versatile'];
            }
        }

        return resultType;
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
        }

        // 2D 점수 시스템 감지: 결과 타입이 아닌 축 점수 찾기
        const resultTypes = this.testData.results.map(r => r.type);
        const axisScores = Object.keys(this.scores).filter(key => !resultTypes.includes(key));

        if (axisScores.length === 2) {
            // 2D 점수 시스템
            const [axis1, axis2] = axisScores;
            const score1 = this.scores[axis1] || 0;
            const score2 = this.scores[axis2] || 0;

            const resultType = this.map2DScoreToType(axis1, score1, axis2, score2);
            if (resultType) {
                return this.testData.results.find(r => r.type === resultType);
            }
        }

        // 일반 테스트: 가장 높은 점수의 타입 찾기
        let maxScore = -Infinity;
        let resultType = null;

        resultTypes.forEach(type => {
            const score = this.scores[type] || 0;
            if (score > maxScore) {
                maxScore = score;
                resultType = type;
            }
        });

        return this.testData.results.find(r => r.type === resultType);
    }

    // 결과 표시
    showResult() {
        const container = document.getElementById('question-container');
        const progressBar = document.getElementById('progress-bar-container');

        if (progressBar) {
            progressBar.style.display = 'none';
        }

        // 로딩 애니메이션 표시
        container.innerHTML = `
            <div class="loading-animation" style="text-align: center; padding: 60px 20px; animation: fadeIn 0.5s ease;">
                <div class="loading-spinner" style="width: 80px; height: 80px; margin: 0 auto 30px; border: 5px solid #f3f3f3; border-top: 5px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <h2 style="font-size: 1.8rem; color: #333; margin-bottom: 15px; animation: pulse 1.5s ease-in-out infinite;">결과 분석 중...</h2>
                <p style="font-size: 1.1rem; color: #666; animation: pulse 1.5s ease-in-out infinite;">당신의 성격을 정확하게 분석하고 있어요 🧠</p>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
        `;

        // 1.5초 후 실제 결과 표시
        setTimeout(() => {
            this.displayResult();
        }, 1500);
    }

    // 실제 결과 표시
    displayResult() {
        const result = this.calculateResult();
        const container = document.getElementById('question-container');

        // 결과 통계 HTML 생성 (result-stats.js가 로드되어 있으면)
        let statsHTML = '';
        if (typeof ResultStats !== 'undefined') {
            const resultStats = new ResultStats();
            statsHTML = resultStats.generateStatsHTML(this.testData.id, result.type);
        }

        container.innerHTML = `
            <div class="result-card">
                <div class="result-badge">${result.badge || '🎯'}</div>
                <h1 class="result-title">${result.title}</h1>
                <p class="result-subtitle">${result.subtitle || ''}</p>
                ${result.rarity ? `
                    <div class="result-rarity" style="margin: 20px 0; padding: 20px 30px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 20px; display: inline-block; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); animation: rarityPulse 2s ease-in-out infinite;">
                        ${parseFloat(result.rarity) <= 10 ?
                            `<div style="font-size: 1.3rem; color: #fff; font-weight: 800; margin-bottom: 5px;">🏆 상위 ${result.rarity}%의 초희귀 유형!</div>
                             <div style="font-size: 0.95rem; color: #fff; opacity: 0.9;">100명 중 ${Math.round(parseFloat(result.rarity) / 10)}명만 가진 특별한 성격이에요!</div>` :
                         parseFloat(result.rarity) <= 20 ?
                            `<div style="font-size: 1.2rem; color: #fff; font-weight: 800; margin-bottom: 5px;">✨ 상위 ${result.rarity}%의 희귀한 유형!</div>
                             <div style="font-size: 0.95rem; color: #fff; opacity: 0.9;">5명 중 1명만 가진 특별한 당신!</div>` :
                            `<div style="font-size: 1.1rem; color: #fff; font-weight: 700;">✨ 전체의 ${result.rarity}%</div>
                             <div style="font-size: 0.9rem; color: #fff; opacity: 0.9;">당신만의 독특한 매력이 있어요!</div>`
                        }
                    </div>
                    <style>
                        @keyframes rarityPulse {
                            0%, 100% { transform: scale(1); box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); }
                            50% { transform: scale(1.05); box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5); }
                        }
                    </style>
                ` : ''}
                ${statsHTML}
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
                ${result.loveLanguage ? `
                    <div class="result-love-language" style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 15px; border-left: 4px solid #667eea;">
                        <h3 style="margin-bottom: 10px;">💕 나의 사랑의 언어</h3>
                        <p style="color: #666;">${result.loveLanguage}</p>
                    </div>
                ` : ''}
                ${result.compatibility ? `
                    <div class="result-compatibility" style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 15px; border-left: 4px solid #764ba2;">
                        <h3 style="margin-bottom: 10px;">💑 잘 맞는 유형</h3>
                        <p style="color: #666;">${result.compatibility}</p>
                    </div>
                ` : ''}
                ${result.recommendation ? `
                    <div class="result-recommendation">
                        <h3>💡 추천</h3>
                        <p>${result.recommendation}</p>
                    </div>
                ` : ''}

                <!-- 공유 버튼을 결과 카드 안에 포함 -->
                <div class="share-section-inline" style="margin-top: 40px; padding-top: 30px; border-top: 2px solid #f0f0f0;">
                    <h4 style="text-align: center; font-size: 1.3rem; color: #333; margin-bottom: 20px;">
                        💬 결과를 친구에게 공유하기
                    </h4>
                    <div class="share-buttons" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <button class="btn-share btn-download" onclick="testEngine.downloadResultImage()" style="flex: 1; min-width: 200px; max-width: 250px; padding: 15px 25px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(245, 87, 108, 0.3);">
                            <span style="font-size: 1.3rem;">📸</span> <span class="download-text">이미지 저장</span>
                        </button>
                        <button class="btn-share btn-facebook" onclick="testEngine.shareFacebook()" style="flex: 1; min-width: 200px; max-width: 250px; padding: 15px 25px; background: #1877f2; color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.3s ease;">
                            <span style="font-size: 1.3rem;">📘</span> 페이스북
                        </button>
                        <button class="btn-share btn-copy" onclick="testEngine.copyLink()" style="flex: 1; min-width: 200px; max-width: 250px; padding: 15px 25px; background: #667eea; color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.3s ease;">
                            <span style="font-size: 1.3rem;">🔗</span> <span class="copy-text">링크 복사</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // GA4 이벤트: 테스트 완료
        if (typeof gtag !== 'undefined') {
            gtag('event', 'test_complete', {
                test_id: this.testData.id,
                test_name: this.testData.title || 'Unknown Test',
                result_type: result.type,
                result_title: result.title
            });
        }

        // 현재 결과 저장 (공유 기능용)
        this.currentResult = result;

        // URL에 결과 파라미터 추가 (페이지 리로드 없이)
        const newUrl = window.location.origin + window.location.pathname + '?result=' + result.type;
        this.currentResultUrl = newUrl;
        window.history.pushState({ result: result.type }, '', newUrl);

        // 다른 테스트 추천 표시
        const moreTests = document.getElementById('more-tests');
        if (moreTests) {
            moreTests.style.display = 'block';
        }

        // 결과를 localStorage에 저장
        this.saveResult(result);

        // 뱃지 체크 (badge-system.js가 로드되어 있으면)
        if (typeof BadgeSystem !== 'undefined') {
            const badgeSystem = new BadgeSystem();
            badgeSystem.checkNewBadges();
        }

        // 결과 통계 기록 (result-stats.js가 로드되어 있으면)
        if (typeof ResultStats !== 'undefined') {
            const resultStats = new ResultStats();
            resultStats.recordResult(this.testData.id, result.type);
        }

        // 참여자 수 증가 (test-stats.js가 로드되어 있으면)
        if (typeof TestStats !== 'undefined') {
            const stats = new TestStats(this.testData.id);
            stats.incrementCount();
        }

        // 페이지 맨 위로 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 공유 버튼 업데이트
    updateShareButtons(result, resultUrl) {
        // 매력적인 공유 텍스트 생성
        const shareText = `🎯 나는 "${result.title}" ${result.badge}

${result.subtitle || ''}
당신의 결과는? 👉`;

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
            const fbShareText = `나는 ${result.badge} ${result.title}! 당신도 테스트해보세요`;
            const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(resultUrl)}&quote=${encodeURIComponent(fbShareText)}`;
            fbButton.onclick = () => window.open(fbUrl, '_blank', 'width=600,height=400');
        }
    }

    // 결과 저장
    saveResult(result) {
        const testId = this.testData.id;
        const savedResults = JSON.parse(localStorage.getItem('test_results') || '{}');

        savedResults[testId] = {
            testId: testId,
            type: result.type,
            title: this.testData.title || result.title,
            resultType: result.title,
            category: this.testData.category || 'test',
            badge: result.badge,
            rarity: result.rarity,
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

    // 페이스북 공유
    shareFacebook() {
        // GA4 이벤트: 공유 클릭
        if (typeof gtag !== 'undefined') {
            gtag('event', 'share', {
                method: 'Facebook',
                content_type: 'test_result',
                item_id: this.testData.id
            });
        }

        const url = encodeURIComponent(this.currentResultUrl || window.location.href);
        const result = this.currentResult;
        const text = result ? encodeURIComponent(`나는 ${result.badge} ${result.title}! 당신도 테스트해보세요`) : '';
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    // 링크 복사
    copyLink() {
        // GA4 이벤트: 링크 복사
        if (typeof gtag !== 'undefined') {
            gtag('event', 'share', {
                method: 'Copy Link',
                content_type: 'test_result',
                item_id: this.testData.id
            });
        }

        const url = this.currentResultUrl || window.location.href;
        const result = this.currentResult;
        const shareText = result ? `🎯 나는 "${result.title}" ${result.badge}\n\n${result.subtitle || ''}\n당신의 결과는? 👉\n${url}` : url;

        // Clipboard API 사용
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(shareText).then(() => {
                // 버튼 텍스트 변경
                const copyBtn = document.querySelector('.copy-text');
                if (copyBtn) {
                    copyBtn.textContent = '복사 완료!';
                    setTimeout(() => {
                        copyBtn.textContent = '링크 복사';
                    }, 2000);
                }
            }).catch(err => {
                console.error('복사 실패:', err);
                this.fallbackCopyLink(shareText);
            });
        } else {
            // 폴백: execCommand 사용
            this.fallbackCopyLink(shareText);
        }
    }

    // 폴백 복사 함수
    fallbackCopyLink(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            const copyBtn = document.querySelector('.copy-text');
            if (copyBtn) {
                copyBtn.textContent = '복사 완료!';
                setTimeout(() => {
                    copyBtn.textContent = '링크 복사';
                }, 2000);
            }
        } catch (err) {
            console.error('복사 실패:', err);
            alert('링크 복사에 실패했습니다.');
        }

        document.body.removeChild(textArea);
    }

    // 결과 이미지 다운로드 (인스타 스토리용)
    async downloadResultImage() {
        // GA4 이벤트: 이미지 다운로드
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download_image', {
                test_id: this.testData.id,
                result_type: this.currentResult ? this.currentResult.type : 'unknown'
            });
        }

        const downloadBtn = document.querySelector('.download-text');
        if (downloadBtn) {
            downloadBtn.textContent = '생성 중...';
        }

        try {
            // html2canvas가 로드되었는지 확인
            if (typeof html2canvas === 'undefined') {
                throw new Error('html2canvas가 로드되지 않았습니다.');
            }

            const resultCard = document.querySelector('.result-card');
            if (!resultCard) {
                throw new Error('결과 카드를 찾을 수 없습니다.');
            }

            // 공유 버튼 섹션 숨기기 (캡처에서 제외)
            const shareSection = document.querySelector('.share-section-inline');
            const originalDisplay = shareSection ? shareSection.style.display : '';
            if (shareSection) shareSection.style.display = 'none';

            // 배경색 임시 추가 (투명 배경 방지)
            resultCard.style.background = '#ffffff';
            resultCard.style.padding = '40px';

            // 브랜드 워터마크 추가
            const watermark = document.createElement('div');
            watermark.style.cssText = 'text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0; font-size: 14px; color: #999; font-weight: 600;';
            watermark.innerHTML = '🎯 natest.kr에서 더 많은 테스트를 만나보세요!';
            resultCard.appendChild(watermark);

            // html2canvas로 캡처
            const canvas = await html2canvas(resultCard, {
                backgroundColor: '#ffffff',
                scale: 2, // 고해상도
                logging: false,
                useCORS: true,
                allowTaint: true,
                width: resultCard.scrollWidth,
                height: resultCard.scrollHeight
            });

            // 워터마크 제거
            resultCard.removeChild(watermark);

            // 공유 버튼 섹션 복원
            if (shareSection) shareSection.style.display = originalDisplay;

            // Canvas를 Blob으로 변환
            canvas.toBlob((blob) => {
                if (!blob) {
                    throw new Error('이미지 생성에 실패했습니다.');
                }

                // 파일명 생성
                const fileName = `${this.testData.title}_결과_${this.currentResult ? this.currentResult.type : 'result'}.png`;

                // 다운로드
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                // 버튼 텍스트 변경
                if (downloadBtn) {
                    downloadBtn.textContent = '저장 완료!';
                    setTimeout(() => {
                        downloadBtn.textContent = '이미지 저장';
                    }, 2000);
                }
            }, 'image/png');

        } catch (error) {
            console.error('이미지 다운로드 실패:', error);
            alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');

            // 버튼 텍스트 복원
            if (downloadBtn) {
                downloadBtn.textContent = '이미지 저장';
            }
        }
    }
}

// 글로벌 테스트 엔진 인스턴스
let testEngine = null;

// 테스트 초기화 함수
function initTest(testData) {
    testEngine = new TestEngine(testData);

    // URL 파라미터 확인 (공유 링크)
    const urlParams = new URLSearchParams(window.location.search);
    const sharedResult = urlParams.get('result');

    if (sharedResult) {
        // 공유된 결과 표시
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
                    ${result.rarity ? `
                        <div class="result-rarity" style="margin: 15px 0; padding: 10px 20px; background: linear-gradient(135deg, #667eea33, #764ba233); border-radius: 15px; display: inline-block;">
                            <span style="font-size: 14px; color: #667eea; font-weight: bold;">✨ 희소성: 전체의 ${result.rarity}%</span>
                        </div>
                    ` : ''}
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

            // 현재 결과 저장 (공유 기능용)
            testEngine.currentResult = result;
            testEngine.currentResultUrl = window.location.href;

            const moreTests = document.getElementById('more-tests');
            if (moreTests) moreTests.style.display = 'block';

            // 페이지 맨 위로 스크롤
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return; // 초기화 완료
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
