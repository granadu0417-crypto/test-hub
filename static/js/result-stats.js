// 결과 통계 시스템
class ResultStats {
    constructor() {
        this.storageKey = 'global_result_stats';
    }

    // 전역 통계 가져오기
    getGlobalStats() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            return {};
        }
    }

    // 전역 통계 저장
    saveGlobalStats(stats) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(stats));
        } catch (e) {
            console.error('Failed to save global stats:', e);
        }
    }

    // 결과 기록
    recordResult(testId, resultType) {
        const stats = this.getGlobalStats();

        if (!stats[testId]) {
            stats[testId] = {
                total: 0,
                results: {}
            };
        }

        stats[testId].total++;

        if (!stats[testId].results[resultType]) {
            stats[testId].results[resultType] = 0;
        }
        stats[testId].results[resultType]++;

        this.saveGlobalStats(stats);
    }

    // 백분위 계산
    calculatePercentile(testId, resultType) {
        const stats = this.getGlobalStats();

        if (!stats[testId] || !stats[testId].results) {
            return null;
        }

        const testStats = stats[testId];
        const resultCount = testStats.results[resultType] || 0;
        const total = testStats.total || 0;

        if (total === 0) return null;

        // 이 결과를 가진 사람의 비율
        const percentage = (resultCount / total) * 100;

        // 상위 몇 % 계산 (희소성)
        // 예: 10명 중 1명이면 상위 10%
        const percentile = Math.round(percentage);

        return {
            percentage: percentile,
            count: resultCount,
            total: total,
            // 희소성 등급 계산
            rarity: this.getRarityGrade(percentile)
        };
    }

    // 희소성 등급
    getRarityGrade(percentage) {
        if (percentage <= 5) return { grade: 'legendary', label: '전설', emoji: '💎', color: '#FFD700' };
        if (percentage <= 10) return { grade: 'epic', label: '영웅', emoji: '🏆', color: '#8B5CF6' };
        if (percentage <= 20) return { grade: 'rare', label: '희귀', emoji: '✨', color: '#3B82F6' };
        if (percentage <= 35) return { grade: 'uncommon', label: '특별', emoji: '⭐', color: '#10B981' };
        return { grade: 'common', label: '일반', emoji: '📊', color: '#9CA3AF' };
    }

    // 통계 표시용 HTML 생성
    generateStatsHTML(testId, resultType) {
        const stats = this.calculatePercentile(testId, resultType);

        if (!stats) {
            return ''; // 통계 데이터가 충분하지 않음
        }

        const rarity = stats.rarity;

        return `
            <div class="result-stats-box" style="
                margin: 24px 0;
                padding: 24px;
                background: linear-gradient(135deg, ${rarity.color}15, ${rarity.color}25);
                border-radius: 20px;
                border: 3px solid ${rarity.color}50;
                text-align: center;
                animation: statsAppear 0.8s ease-out;
            ">
                <div style="font-size: 3rem; margin-bottom: 8px;">${rarity.emoji}</div>
                <div style="font-size: 1.5rem; font-weight: 800; color: ${rarity.color}; margin-bottom: 12px;">
                    ${rarity.label} 등급
                </div>
                <div style="font-size: 2.5rem; font-weight: 900; color: #2d3748; margin-bottom: 8px;">
                    상위 ${stats.percentage}%
                </div>
                <div style="font-size: 1.1rem; color: #6B7280; margin-bottom: 16px;">
                    ${this.getPercentileMessage(stats.percentage)}
                </div>
                <div style="
                    padding: 12px;
                    background: rgba(255,255,255,0.8);
                    border-radius: 12px;
                    font-size: 0.95rem;
                    color: #4B5563;
                ">
                    📊 ${stats.total.toLocaleString()}명 중 ${stats.count.toLocaleString()}명이 이 결과를 받았어요
                </div>
            </div>
            <style>
                @keyframes statsAppear {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
            </style>
        `;
    }

    // 백분위 메시지
    getPercentileMessage(percentage) {
        if (percentage <= 5) {
            return '🎉 매우 희귀한 결과예요! 당신은 정말 특별한 사람이에요!';
        } else if (percentage <= 10) {
            return '✨ 10명 중 1명만 가진 희귀한 결과예요!';
        } else if (percentage <= 20) {
            return '⭐ 5명 중 1명이 받은 특별한 결과예요!';
        } else if (percentage <= 35) {
            return '💫 흔하지 않은 독특한 성향이에요!';
        } else {
            return '🙂 많은 사람들과 공감할 수 있는 성향이에요!';
        }
    }

    // 테스트별 결과 분포 가져오기
    getResultDistribution(testId) {
        const stats = this.getGlobalStats();

        if (!stats[testId]) {
            return [];
        }

        const testStats = stats[testId];
        const distribution = [];

        for (const [resultType, count] of Object.entries(testStats.results)) {
            const percentage = (count / testStats.total) * 100;
            distribution.push({
                resultType,
                count,
                percentage: Math.round(percentage * 10) / 10
            });
        }

        // 비율 내림차순 정렬
        distribution.sort((a, b) => b.percentage - a.percentage);

        return distribution;
    }

    // 통계 리셋 (개발/테스트용)
    resetStats() {
        localStorage.removeItem(this.storageKey);
    }
}

// 전역에서 사용 가능하도록
window.ResultStats = ResultStats;
