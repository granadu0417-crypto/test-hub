---
title: "소비 성향 테스트"
date: 2025-01-21
description: "10가지 질문으로 나의 소비 습관 파악하기! 당신은 어떤 소비 스타일인가요?"
summary: "나의 소비 패턴을 분석하고 현명한 재테크 방법을 알아보세요"
icon: "💰"
ogImage: "og-spending.jpg"
keywords: ["소비성향", "재테크", "돈관리", "심리테스트", "절약"]
questionCount: 10
duration: "2분"

questions:
  - question: "월급을 받으면 가장 먼저 하는 일은?"
    options:
      - text: "저축이나 투자 계좌로 일정 금액을 이체한다"
        scores:
          saver: 3
      - text: "필요한 것을 먼저 사고 남은 돈을 저축한다"
        scores:
          spender: 3

  - question: "쇼핑을 할 때 나는?"
    options:
      - text: "계획한 것만 구매한다"
        scores:
          planner: 3
      - text: "마음에 드는 것을 즉흥적으로 산다"
        scores:
          impulsive: 3

  - question: "갖고 싶은 물건이 생겼을 때?"
    options:
      - text: "충분히 고민하고 비교한 후 구매한다"
        scores:
          planner: 2
      - text: "바로 구매하는 편이다"
        scores:
          impulsive: 2

  - question: "할인이나 세일 정보를 보면?"
    options:
      - text: "필요한 것이면 구매한다"
        scores:
          planner: 2
      - text: "일단 사고 본다"
        scores:
          spender: 2

  - question: "친구들과 외식할 때 나는?"
    options:
      - text: "비용을 고려해서 합리적인 곳을 선택한다"
        scores:
          saver: 2
      - text: "분위기나 맛을 우선으로 선택한다"
        scores:
          spender: 2

  - question: "돈을 쓰고 나서 드는 생각은?"
    options:
      - text: "가끔 후회하고 아쉬워한다"
        scores:
          impulsive: 2
      - text: "계획대로 써서 만족한다"
        scores:
          saver: 2

  - question: "저축이나 투자에 대한 생각은?"
    options:
      - text: "매우 중요하고 꾸준히 하고 있다"
        scores:
          saver: 3
      - text: "중요하지만 잘 실천하지 못한다"
        scores:
          spender: 3

  - question: "급하게 돈이 필요할 때?"
    options:
      - text: "비상금이 있어서 걱정없다"
        scores:
          planner: 3
      - text: "항상 빠듯해서 걱정이다"
        scores:
          impulsive: 3

  - question: "가계부를 쓰거나 지출을 기록하나요?"
    options:
      - text: "꾸준히 기록하고 관리한다"
        scores:
          planner: 2
      - text: "거의 하지 않는다"
        scores:
          impulsive: 2

  - question: "여유 자금이 생겼을 때?"
    options:
      - text: "저축하거나 투자한다"
        scores:
          saver: 2
      - text: "평소 사고 싶었던 것을 산다"
        scores:
          spender: 2

results:
  - type: "saver"
    badge: "🐷"
    title: "알뜰형 소비자"
    subtitle: "검소하고 계획적인 재테크 달인"
    description: "당신은 돈 관리를 매우 잘하는 편입니다. 저축과 투자를 우선시하며, 미래를 위한 준비를 철저히 합니다."
    traits:
      - "강한 저축 습관"
      - "계획적인 지출"
      - "합리적인 소비"
      - "미래 지향적"
    recommendation: "훌륭한 소비 습관을 가지고 있어요! 가끔은 자신을 위한 작은 선물도 괜찮습니다. 저축만큼 현재의 행복도 중요하니까요!"

  - type: "spender"
    badge: "💸"
    title: "여유형 소비자"
    subtitle: "현재를 즐기는 소비 스타일"
    description: "당신은 현재의 행복을 중요하게 생각하며, 돈을 쓰는 것을 즐깁니다. 삶의 질을 우선시하는 편입니다."
    traits:
      - "현재 지향적"
      - "경험 중시"
      - "삶의 질 우선"
      - "즉흥적 소비"
    recommendation: "현재를 즐기는 것도 좋지만, 미래를 위한 저축도 시작해보세요. 월급의 일정 부분을 자동이체로 저축하면 부담 없이 시작할 수 있어요!"

  - type: "planner"
    badge: "📊"
    title: "계획형 소비자"
    subtitle: "꼼꼼하고 체계적인 재테크 전문가"
    description: "당신은 매우 계획적이고 체계적으로 돈을 관리합니다. 지출을 기록하고 분석하는 것을 습관화하고 있습니다."
    traits:
      - "체계적인 관리"
      - "철저한 계획"
      - "분석적 소비"
      - "목표 지향적"
    recommendation: "완벽한 돈 관리 습관을 가지고 있어요! 너무 엄격하게 통제하지 말고, 가끔은 계획에 없던 즐거움도 허용해보세요!"

  - type: "impulsive"
    badge: "🎯"
    title: "즉흥형 소비자"
    subtitle: "감각적이고 즉흥적인 소비 스타일"
    description: "당신은 즉흥적으로 소비하는 경향이 있습니다. 순간의 감정과 욕구에 따라 지출하는 편입니다."
    traits:
      - "즉흥적 구매"
      - "감정적 소비"
      - "계획 부족"
      - "충동 구매 많음"
    recommendation: "소비 습관 개선이 필요해요! 가계부 앱을 사용하거나, 구매 전 24시간 고민하는 규칙을 만들어보세요. 작은 변화가 큰 차이를 만들어요!"
---

나의 소비 습관을 파악하고 더 나은 재테크를 시작하세요!
