---
title: "종합 심리 분석"
date: 2025-01-22
type: "psychology"
description: "5분만에 알아보는 나의 심리 지도 - 정신 건강, 자원 관리, 생활 균형, 커리어 성장, 대인 관계를 종합 분석"
emoji: "🧠"
category: "심리 분석"
questionCount: 50
timeEstimate: "5-7분"
difficulty: "종합"

# 5대 차원 정의
dimensions:
  - id: "mental_health"
    name: "정신 건강"
    description: "스트레스, 번아웃, 감정 안정성"
    color: "#FF6B6B"
    
  - id: "resource_management"
    name: "자원 관리"
    description: "시간, 에너지, 재정 관리 능력"
    color: "#4ECDC4"
    
  - id: "life_balance"
    name: "생활 균형"
    description: "일과 삶의 균형, 자기돌봄, 삶의 만족도"
    color: "#45B7D1"
    
  - id: "career_growth"
    name: "커리어 성장"
    description: "목표 달성, 커리어 계획, 학습 발전"
    color: "#96CEB4"
    
  - id: "social_relations"
    name: "대인 관계"
    description: "인간관계 능력, 지원 네트워크, 의사소통"
    color: "#FFEAA7"

# 50개 질문 (각 차원당 10개, 7점 척도: 1=전혀 그렇지 않다 ~ 7=매우 그렇다)
questions:
  # ===== 정신 건강 (Mental Health) - 10문항 =====
  
  # 스트레스 수준 (Stress Level) - 4문항
  - dimension: "mental_health"
    subdimension: "stress_level"
    question: "최근 한 달간 스트레스로 인해 잠을 잘 못 잔 적이 있다"
    reverse: true
    
  - dimension: "mental_health"
    subdimension: "stress_level"
    question: "일상적인 문제들이 나를 압도하는 느낌이 든다"
    reverse: true
    
  - dimension: "mental_health"
    subdimension: "stress_level"
    question: "예상치 못한 일이 생겨도 차분하게 대처할 수 있다"
    reverse: false
    
  - dimension: "mental_health"
    subdimension: "stress_level"
    question: "나는 내 삶을 통제하고 있다는 느낌을 받는다"
    reverse: false
  
  # 번아웃 증후군 (Burnout) - 3문항
  - dimension: "mental_health"
    subdimension: "burnout"
    question: "아침에 일어나면 피곤하고 하루를 시작하기 힘들다"
    reverse: true
    
  - dimension: "mental_health"
    subdimension: "burnout"
    question: "내가 하는 일에 의미를 느끼지 못한다"
    reverse: true
    
  - dimension: "mental_health"
    subdimension: "burnout"
    question: "일이나 학업에 열정을 느낀다"
    reverse: false
  
  # 감정 안정성 (Emotional Stability) - 3문항
  - dimension: "mental_health"
    subdimension: "emotional_stability"
    question: "나의 기분은 하루에도 여러 번 변한다"
    reverse: true
    
  - dimension: "mental_health"
    subdimension: "emotional_stability"
    question: "부정적인 감정이 들어도 빨리 회복할 수 있다"
    reverse: false
    
  - dimension: "mental_health"
    subdimension: "emotional_stability"
    question: "나는 대체로 긍정적이고 안정된 기분을 유지한다"
    reverse: false

  # ===== 자원 관리 (Resource Management) - 10문항 =====
  
  # 시간 관리 (Time Management) - 4문항
  - dimension: "resource_management"
    subdimension: "time_management"
    question: "나는 우선순위를 정해서 일을 처리한다"
    reverse: false
    
  - dimension: "resource_management"
    subdimension: "time_management"
    question: "중요한 마감일을 자주 놓친다"
    reverse: true
    
  - dimension: "resource_management"
    subdimension: "time_management"
    question: "나는 계획한 일을 대부분 완수한다"
    reverse: false
    
  - dimension: "resource_management"
    subdimension: "time_management"
    question: "시간이 부족하다고 느낀 적이 거의 없다"
    reverse: false
  
  # 에너지 관리 (Energy Management) - 3문항
  - dimension: "resource_management"
    subdimension: "energy_management"
    question: "나는 충분한 휴식을 취하고 있다"
    reverse: false
    
  - dimension: "resource_management"
    subdimension: "energy_management"
    question: "에너지가 부족해서 하고 싶은 일을 못할 때가 많다"
    reverse: true
    
  - dimension: "resource_management"
    subdimension: "energy_management"
    question: "나는 내 에너지 수준을 잘 파악하고 관리한다"
    reverse: false
  
  # 재정 인식 (Financial Awareness) - 3문항
  - dimension: "resource_management"
    subdimension: "financial_awareness"
    question: "나는 돈을 계획적으로 사용한다"
    reverse: false
    
  - dimension: "resource_management"
    subdimension: "financial_awareness"
    question: "재정 문제로 스트레스를 받는 경우가 많다"
    reverse: true
    
  - dimension: "resource_management"
    subdimension: "financial_awareness"
    question: "나는 재정 목표를 가지고 있고 이를 달성하기 위해 노력한다"
    reverse: false

  # ===== 생활 균형 (Life Balance) - 10문항 =====
  
  # 일과 삶의 균형 (Work-Life Balance) - 4문항
  - dimension: "life_balance"
    subdimension: "work_life_balance"
    question: "일 때문에 개인 생활을 희생하는 경우가 많다"
    reverse: true
    
  - dimension: "life_balance"
    subdimension: "work_life_balance"
    question: "일과 개인 생활의 경계가 명확하다"
    reverse: false
    
  - dimension: "life_balance"
    subdimension: "work_life_balance"
    question: "퇴근 후나 주말에도 일 생각을 자주 한다"
    reverse: true
    
  - dimension: "life_balance"
    subdimension: "work_life_balance"
    question: "나는 일과 삶의 균형을 잘 유지하고 있다"
    reverse: false
  
  # 자기돌봄 (Self-Care) - 3문항
  - dimension: "life_balance"
    subdimension: "self_care"
    question: "나를 위한 시간을 정기적으로 갖는다"
    reverse: false
    
  - dimension: "life_balance"
    subdimension: "self_care"
    question: "내 건강과 웰빙을 우선순위에 두지 못한다"
    reverse: true
    
  - dimension: "life_balance"
    subdimension: "self_care"
    question: "규칙적인 운동이나 건강 관리를 하고 있다"
    reverse: false
  
  # 삶의 만족도 (Life Satisfaction) - 3문항
  - dimension: "life_balance"
    subdimension: "life_satisfaction"
    question: "전반적으로 내 삶에 만족한다"
    reverse: false
    
  - dimension: "life_balance"
    subdimension: "life_satisfaction"
    question: "내 삶이 내가 원하는 방향으로 가고 있다"
    reverse: false
    
  - dimension: "life_balance"
    subdimension: "life_satisfaction"
    question: "다시 태어나도 지금과 같은 삶을 살고 싶다"
    reverse: false

  # ===== 커리어 성장 (Career Growth) - 10문항 =====
  
  # 목표 달성 (Goal Achievement) - 4문항
  - dimension: "career_growth"
    subdimension: "goal_achievement"
    question: "나는 명확한 커리어 목표를 가지고 있다"
    reverse: false
    
  - dimension: "career_growth"
    subdimension: "goal_achievement"
    question: "목표를 세워도 중간에 포기하는 경우가 많다"
    reverse: true
    
  - dimension: "career_growth"
    subdimension: "goal_achievement"
    question: "나는 내 목표를 향해 꾸준히 나아가고 있다"
    reverse: false
    
  - dimension: "career_growth"
    subdimension: "goal_achievement"
    question: "성취감을 느낀 적이 거의 없다"
    reverse: true
  
  # 커리어 계획 (Career Planning) - 3문항
  - dimension: "career_growth"
    subdimension: "career_planning"
    question: "나는 5년 후 내 모습을 구체적으로 그릴 수 있다"
    reverse: false
    
  - dimension: "career_growth"
    subdimension: "career_planning"
    question: "커리어 발전을 위한 구체적인 계획이 있다"
    reverse: false
    
  - dimension: "career_growth"
    subdimension: "career_planning"
    question: "현재 하는 일이 내 커리어 목표와 맞지 않는다"
    reverse: true
  
  # 학습과 발전 (Learning & Development) - 3문항
  - dimension: "career_growth"
    subdimension: "learning_development"
    question: "새로운 기술이나 지식을 배우는 것을 즐긴다"
    reverse: false
    
  - dimension: "career_growth"
    subdimension: "learning_development"
    question: "나는 지속적으로 성장하고 발전하고 있다"
    reverse: false
    
  - dimension: "career_growth"
    subdimension: "learning_development"
    question: "배움에 투자할 시간이나 에너지가 없다"
    reverse: true


  # ===== 대인 관계 (Social Relations) - 10문항 =====
  
  # 인간관계 능력 (Interpersonal Skills) - 4문항
  - dimension: "social_relations"
    subdimension: "interpersonal_skills"
    question: "나는 다른 사람들과 쉽게 친해질 수 있다"
    reverse: false
    
  - dimension: "social_relations"
    subdimension: "interpersonal_skills"
    question: "갈등 상황에서 적절하게 대처하기 어렵다"
    reverse: true
    
  - dimension: "social_relations"
    subdimension: "interpersonal_skills"
    question: "다른 사람의 감정을 잘 이해하고 공감한다"
    reverse: false
    
  - dimension: "social_relations"
    subdimension: "interpersonal_skills"
    question: "사람들과의 관계에서 편안함을 느낀다"
    reverse: false
  
  # 지원 네트워크 (Support Network) - 3문항
  - dimension: "social_relations"
    subdimension: "support_network"
    question: "어려울 때 도움을 청할 수 있는 사람이 있다"
    reverse: false
    
  - dimension: "social_relations"
    subdimension: "support_network"
    question: "나를 진심으로 이해해주는 사람이 거의 없다"
    reverse: true
    
  - dimension: "social_relations"
    subdimension: "support_network"
    question: "나는 든든한 인간관계 네트워크를 가지고 있다"
    reverse: false
  
  # 의사소통 (Communication) - 3문항
  - dimension: "social_relations"
    subdimension: "communication"
    question: "나는 내 생각과 감정을 명확하게 표현한다"
    reverse: false
    
  - dimension: "social_relations"
    subdimension: "communication"
    question: "다른 사람의 말을 경청하는 편이다"
    reverse: false
    
  - dimension: "social_relations"
    subdimension: "communication"
    question: "의사소통에서 오해가 자주 발생한다"
    reverse: true

# 점수 범위별 결과 정의
results:
  - type: "thriving"
    title: "번영하는 삶"
    badge: "🌟"
    subtitle: "모든 영역에서 균형잡힌 성장"
    minScore: 80
    maxScore: 100
    description: "당신은 정신 건강, 자원 관리, 생활 균형, 커리어 성장, 대인 관계 모든 영역에서 뛰어난 역량을 보이고 있습니다."
    
  - type: "flourishing"
    title: "성장하는 삶"
    badge: "🌱"
    subtitle: "대부분의 영역에서 건강한 상태"
    minScore: 65
    maxScore: 79
    description: "당신은 대부분의 영역에서 건강하고 긍정적인 상태를 유지하고 있습니다. 일부 영역의 보완으로 더 나은 삶을 만들 수 있습니다."
    
  - type: "stable"
    title: "안정적인 삶"
    badge: "⚖️"
    subtitle: "평균적이고 안정적인 상태"
    minScore: 50
    maxScore: 64
    description: "당신은 전반적으로 안정적인 상태입니다. 몇 가지 영역에서 개선이 필요하지만, 기본적인 균형을 유지하고 있습니다."
    
  - type: "struggling"
    title: "도전받는 삶"
    badge: "🔄"
    subtitle: "여러 영역에서 어려움을 겪고 있음"
    minScore: 35
    maxScore: 49
    description: "당신은 현재 여러 영역에서 어려움을 겪고 있습니다. 작은 변화부터 시작해서 점진적인 개선이 필요합니다."
    
  - type: "critical"
    title: "위기의 삶"
    badge: "🆘"
    subtitle: "즉각적인 관심과 지원이 필요"
    minScore: 0
    maxScore: 34
    description: "당신은 현재 심각한 어려움을 겪고 있을 수 있습니다. 전문가의 도움을 받는 것을 강력히 권장합니다."
    crisis_alert: true

# 위험 요소 감지 임계값
risk_thresholds:
  mental_health:
    high_stress: 60  # 스트레스 점수가 60 이상이면 경고
    burnout: 65      # 번아웃 점수가 65 이상이면 경고
    low_emotional: 35  # 감정 안정성이 35 이하면 경고
  
  life_balance:
    poor_work_life: 35
    low_self_care: 40
    low_satisfaction: 35

---

## 🧠 종합 심리 분석 테스트

이 테스트는 당신의 전반적인 심리 상태를 5가지 주요 차원에서 종합적으로 분석합니다.

**📊 분석 영역:**
- **정신 건강**: 스트레스, 번아웃, 감정 안정성
- **자원 관리**: 시간, 에너지, 재정 관리
- **생활 균형**: 일과 삶의 균형, 자기돌봄, 삶의 만족도
- **커리어 성장**: 목표 달성, 커리어 계획, 학습과 발전
- **대인 관계**: 인간관계 능력, 지원 네트워크, 의사소통

**⏱️ 소요 시간**: 약 5-7분

**📈 결과**: 레이더 차트로 시각화된 5대 차원 분석과 개인화된 조언
