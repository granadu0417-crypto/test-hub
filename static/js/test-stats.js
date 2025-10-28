// 실시간 테스트 통계 시스템
class TestStats {
    constructor(testId) {
        this.testId = testId;
        this.storageKey = `test_stats_${testId}`;
    }

    // 초기 참여자 수 생성 (테스트별로 다름)
    generateInitialCount() {
        // 테스트 ID 해시값으로 시드 생성 (일관된 초기값)
        let hash = 0;
        for (let i = 0; i < this.testId.length; i++) {
            hash = ((hash << 5) - hash) + this.testId.charCodeAt(i);
            hash = hash & hash;
        }

        // 20,000 ~ 100,000 사이의 숫자
        const min = 20000;
        const max = 100000;
        return min + Math.abs(hash % (max - min));
    }

    // 저장된 통계 가져오기
    getStats() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const data = JSON.parse(stored);
                // 마지막 업데이트가 오늘이 아니면 증가
                const today = new Date().toDateString();
                if (data.lastUpdate !== today) {
                    data.count += this.getDailyIncrease();
                    data.lastUpdate = today;
                    this.saveStats(data);
                }
                return data.count;
            }
        } catch (e) {
            console.error('Failed to load stats:', e);
        }

        // 저장된 데이터 없으면 초기 생성
        const initialCount = this.generateInitialCount();
        this.saveStats({
            count: initialCount,
            lastUpdate: new Date().toDateString()
        });
        return initialCount;
    }

    // 하루 증가량 (랜덤 50~300명)
    getDailyIncrease() {
        return Math.floor(Math.random() * 250) + 50;
    }

    // 세션 증가량 (랜덤 1~8명) - 페이지 방문할 때마다
    getSessionIncrease() {
        return Math.floor(Math.random() * 8) + 1;
    }

    // 통계 저장
    saveStats(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (e) {
            console.error('Failed to save stats:', e);
        }
    }

    // 참여자 수 증가 (테스트 완료 시)
    incrementCount() {
        try {
            const stats = {
                count: this.getStats() + 1,
                lastUpdate: new Date().toDateString()
            };
            this.saveStats(stats);
            return stats.count;
        } catch (e) {
            console.error('Failed to increment count:', e);
            return this.getStats();
        }
    }

    // 숫자 카운트업 애니메이션
    animateCount(elementId, targetNumber, duration = 1000) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const start = 0;
        const increment = targetNumber / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                current = targetNumber;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString('ko-KR');
        }, 16);
    }

    // 표시 (초기 로드)
    display(elementId) {
        const count = this.getStats();
        const sessionIncrease = this.getSessionIncrease();
        const displayCount = count + sessionIncrease;

        // 저장 (다음에는 이 숫자부터 시작)
        this.saveStats({
            count: displayCount,
            lastUpdate: new Date().toDateString()
        });

        // 애니메이션으로 표시
        this.animateCount(elementId, displayCount, 800);
    }

    // 실시간 업데이트 (선택사항: 5초마다 1~3명 증가하는 효과)
    startRealtimeUpdate(elementId, interval = 5000) {
        setInterval(() => {
            const element = document.getElementById(elementId);
            if (!element) return;

            const currentCount = parseInt(element.textContent.replace(/,/g, ''));
            const newCount = currentCount + Math.floor(Math.random() * 3) + 1;

            element.textContent = newCount.toLocaleString('ko-KR');

            // 실제 값도 저장
            this.saveStats({
                count: newCount,
                lastUpdate: new Date().toDateString()
            });
        }, interval);
    }
}

// 전역에서 사용 가능하도록
window.TestStats = TestStats;
