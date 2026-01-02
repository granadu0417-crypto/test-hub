// 뱃지 시스템
class BadgeSystem {
    constructor() {
        this.storageKey = 'user_badges';
        this.badges = {
            first_test: {
                id: 'first_test',
                name: '시작이 반',
                icon: '🎯',
                description: '첫 테스트 완료',
                condition: () => this.getCompletedTestsCount() >= 1,
                rarity: 'common'
            },
            test_runner: {
                id: 'test_runner',
                name: '테스트 러너',
                icon: '🏃',
                description: '5개 테스트 완료',
                condition: () => this.getCompletedTestsCount() >= 5,
                rarity: 'common'
            },
            test_master: {
                id: 'test_master',
                name: '테스트 마스터',
                icon: '🎓',
                description: '10개 테스트 완료',
                condition: () => this.getCompletedTestsCount() >= 10,
                rarity: 'rare'
            },
            test_expert: {
                id: 'test_expert',
                name: '테스트 전문가',
                icon: '🏆',
                description: '20개 테스트 완료',
                condition: () => this.getCompletedTestsCount() >= 20,
                rarity: 'epic'
            },
            all_rounder: {
                id: 'all_rounder',
                name: '올라운더',
                icon: '🌟',
                description: '모든 카테고리 테스트 완료',
                condition: () => this.hasAllCategories(),
                rarity: 'legendary'
            },
            passionate: {
                id: 'passionate',
                name: '열정 가득',
                icon: '🔥',
                description: '3일 연속 방문',
                condition: () => this.checkConsecutiveDays(3),
                rarity: 'rare'
            },
            persistent: {
                id: 'persistent',
                name: '끈기왕',
                icon: '💪',
                description: '7일 연속 방문',
                condition: () => this.checkConsecutiveDays(7),
                rarity: 'epic'
            },
            rechallenger: {
                id: 'rechallenger',
                name: '재도전자',
                icon: '🔄',
                description: '같은 테스트 3번 완료',
                condition: () => this.hasRepeatedTest(3),
                rarity: 'uncommon'
            },
            social_butterfly: {
                id: 'social_butterfly',
                name: '소셜 버터플라이',
                icon: '🤝',
                description: '친구와 결과 비교',
                condition: () => this.hasComparedResults(),
                rarity: 'uncommon'
            },
            fortune_teller: {
                id: 'fortune_teller',
                name: '운세 마니아',
                icon: '🔮',
                description: '운세 5회 확인',
                condition: () => this.getFortuneCount() >= 5,
                rarity: 'uncommon'
            },
            collector: {
                id: 'collector',
                name: '컬렉터',
                icon: '💾',
                description: '결과 10개 저장',
                condition: () => this.getCompletedTestsCount() >= 10,
                rarity: 'rare'
            },
            legendary_hunter: {
                id: 'legendary_hunter',
                name: '레전더리 헌터',
                icon: '💎',
                description: '희귀 결과 획득 (상위 10%)',
                condition: () => this.hasRareResult(),
                rarity: 'legendary'
            },
            early_bird: {
                id: 'early_bird',
                name: '얼리버드',
                icon: '🌅',
                description: '아침 6시-9시 사이 테스트 완료',
                condition: () => this.hasEarlyMorningTest(),
                rarity: 'uncommon'
            },
            night_owl: {
                id: 'night_owl',
                name: '올빼미',
                icon: '🦉',
                description: '밤 11시-새벽 3시 사이 테스트 완료',
                condition: () => this.hasLateNightTest(),
                rarity: 'uncommon'
            },
            quick_thinker: {
                id: 'quick_thinker',
                name: '번개처럼',
                icon: '⚡',
                description: '하루에 3개 이상 테스트 완료',
                condition: () => this.hasThreeTestsInDay(),
                rarity: 'rare'
            }
        };
    }

    // 획득한 뱃지 가져오기
    getUnlockedBadges() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }

    // 뱃지 저장
    saveUnlockedBadges(badges) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(badges));
        } catch (e) {
            console.error('Failed to save badges:', e);
        }
    }

    // 새로운 뱃지 체크
    checkNewBadges() {
        const unlocked = this.getUnlockedBadges();
        const newBadges = [];

        for (const [id, badge] of Object.entries(this.badges)) {
            // 이미 획득한 뱃지는 스킵
            if (unlocked.find(b => b.id === id)) continue;

            // 조건 체크
            if (badge.condition()) {
                const newBadge = {
                    id: badge.id,
                    name: badge.name,
                    icon: badge.icon,
                    description: badge.description,
                    rarity: badge.rarity,
                    unlockedAt: new Date().toISOString()
                };
                newBadges.push(newBadge);
                unlocked.push(newBadge);
            }
        }

        if (newBadges.length > 0) {
            this.saveUnlockedBadges(unlocked);
            this.showBadgeNotification(newBadges);
        }

        return newBadges;
    }

    // 뱃지 알림 표시
    showBadgeNotification(badges) {
        badges.forEach((badge, index) => {
            setTimeout(() => {
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: ${80 + index * 100}px;
                    right: 20px;
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    color: #1e293b;
                    padding: 20px 30px;
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(255, 215, 0, 0.4);
                    z-index: 10000;
                    font-weight: 800;
                    font-size: 1.1rem;
                    animation: slideInRight 0.5s ease-out, fadeOut 0.5s ease-in 3.5s;
                    min-width: 300px;
                    border: 3px solid #FFA500;
                `;
                notification.innerHTML = `
                    <div style="font-size: 2.5rem; text-align: center; margin-bottom: 8px;">${badge.icon}</div>
                    <div style="text-align: center; font-size: 1.3rem; margin-bottom: 4px;">🎊 새 뱃지 획득!</div>
                    <div style="text-align: center; font-size: 1.1rem; font-weight: 700;">${badge.name}</div>
                    <div style="text-align: center; font-size: 0.9rem; margin-top: 4px; opacity: 0.8;">${badge.description}</div>
                `;
                document.body.appendChild(notification);

                setTimeout(() => {
                    notification.remove();
                }, 4000);
            }, index * 500);
        });

        // CSS 애니메이션 추가
        if (!document.getElementById('badge-animations')) {
            const style = document.createElement('style');
            style.id = 'badge-animations';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // === 조건 체크 함수들 ===

    getCompletedTestsCount() {
        try {
            const results = JSON.parse(localStorage.getItem('test_results') || '{}');
            return Object.keys(results).length;
        } catch (e) {
            return 0;
        }
    }

    hasAllCategories() {
        try {
            const results = JSON.parse(localStorage.getItem('test_results') || '{}');
            const categories = new Set();
            Object.values(results).forEach(result => {
                if (result.category) categories.add(result.category);
            });
            // 최소 4개 카테고리 (연애, 성격, 힐링, 재미)
            return categories.size >= 4;
        } catch (e) {
            return false;
        }
    }

    checkConsecutiveDays(days) {
        try {
            const visits = JSON.parse(localStorage.getItem('daily_visits') || '[]');
            if (visits.length < days) return false;

            // 최근 방문일 정렬
            const sortedDates = visits.sort().reverse();
            let consecutive = 1;

            for (let i = 0; i < sortedDates.length - 1; i++) {
                const current = new Date(sortedDates[i]);
                const next = new Date(sortedDates[i + 1]);
                const diffDays = Math.floor((current - next) / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    consecutive++;
                    if (consecutive >= days) return true;
                } else if (diffDays > 1) {
                    consecutive = 1;
                }
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    hasRepeatedTest(count) {
        try {
            const results = JSON.parse(localStorage.getItem('test_results') || '{}');
            const testCounts = {};

            Object.values(results).forEach(result => {
                const testId = result.testId || result.title;
                testCounts[testId] = (testCounts[testId] || 0) + 1;
            });

            return Object.values(testCounts).some(c => c >= count);
        } catch (e) {
            return false;
        }
    }

    hasComparedResults() {
        try {
            return localStorage.getItem('has_compared_results') === 'true';
        } catch (e) {
            return false;
        }
    }

    getFortuneCount() {
        try {
            const count = parseInt(localStorage.getItem('fortune_check_count') || '0');
            return count;
        } catch (e) {
            return 0;
        }
    }

    hasRareResult() {
        try {
            const results = JSON.parse(localStorage.getItem('test_results') || '{}');
            return Object.values(results).some(result => result.rarity === 'rare' || result.rarity === 'legendary');
        } catch (e) {
            return false;
        }
    }

    hasEarlyMorningTest() {
        try {
            const results = JSON.parse(localStorage.getItem('test_results') || '{}');
            return Object.values(results).some(result => {
                const hour = new Date(result.date).getHours();
                return hour >= 6 && hour < 9;
            });
        } catch (e) {
            return false;
        }
    }

    hasLateNightTest() {
        try {
            const results = JSON.parse(localStorage.getItem('test_results') || '{}');
            return Object.values(results).some(result => {
                const hour = new Date(result.date).getHours();
                return hour >= 23 || hour < 3;
            });
        } catch (e) {
            return false;
        }
    }

    hasThreeTestsInDay() {
        try {
            const results = JSON.parse(localStorage.getItem('test_results') || '{}');
            const dateCounts = {};

            Object.values(results).forEach(result => {
                const dateStr = new Date(result.date).toDateString();
                dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
            });

            return Object.values(dateCounts).some(c => c >= 3);
        } catch (e) {
            return false;
        }
    }

    // 뱃지 희귀도별 색상
    getRarityColor(rarity) {
        const colors = {
            common: '#9CA3AF',
            uncommon: '#10B981',
            rare: '#3B82F6',
            epic: '#8B5CF6',
            legendary: '#F59E0B'
        };
        return colors[rarity] || colors.common;
    }

    // 뱃지 희귀도별 그라데이션
    getRarityGradient(rarity) {
        const gradients = {
            common: 'linear-gradient(135deg, #9CA3AF, #6B7280)',
            uncommon: 'linear-gradient(135deg, #10B981, #059669)',
            rare: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            epic: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
            legendary: 'linear-gradient(135deg, #FFD700, #FFA500)'
        };
        return gradients[rarity] || gradients.common;
    }

    // 방문 기록
    recordVisit() {
        try {
            const visits = JSON.parse(localStorage.getItem('daily_visits') || '[]');
            const today = new Date().toISOString().split('T')[0];

            if (!visits.includes(today)) {
                visits.push(today);
                localStorage.setItem('daily_visits', JSON.stringify(visits));
            }
        } catch (e) {
            console.error('Failed to record visit:', e);
        }
    }

    // 결과 비교 기록
    recordComparison() {
        localStorage.setItem('has_compared_results', 'true');
        this.checkNewBadges();
    }

    // 운세 확인 기록
    recordFortuneCheck() {
        try {
            const count = parseInt(localStorage.getItem('fortune_check_count') || '0');
            localStorage.setItem('fortune_check_count', (count + 1).toString());
            this.checkNewBadges();
        } catch (e) {
            console.error('Failed to record fortune check:', e);
        }
    }
}

// 전역에서 사용 가능하도록
window.BadgeSystem = BadgeSystem;

// 페이지 로드 시 자동 체크
document.addEventListener('DOMContentLoaded', () => {
    const badgeSystem = new BadgeSystem();
    badgeSystem.recordVisit();
    badgeSystem.checkNewBadges();
});
