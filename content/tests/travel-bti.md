---
title: "여행BTI 테스트"
date: 2025-01-21
description: "12가지 질문으로 알아보는 나의 여행 스타일! 나는 어떤 여행자일까?"
summary: "나의 여행 성향과 스타일을 알아보는 재미있는 테스트"
icon: "✈️"
category: "fun"
badge: "NEW"
featured: false
ogImage: "og-travel.jpg"
keywords: ["여행BTI", "여행테스트", "재미", "심리테스트", "여행스타일"]
questionCount: 12
duration: "2-3분"

questions:
  - question: "여행을 떠날 때 나는?"
    options:
      - text: "몇 달 전부터 계획을 세운다"
        scores: { planner: 3, luxury: 1 }
      - text: "일주일 전쯤 대략 계획한다"
        scores: { balanced: 2, culture: 1 }
      - text: "당일까지 즉흥적으로 결정한다"
        scores: { spontaneous: 3, adventure: 2 }
      - text: "패키지 투어를 예약한다"
        scores: { comfort: 3, group: 1 }

  - question: "여행 숙소는?"
    options:
      - text: "럭셔리한 호텔"
        scores: { luxury: 3, comfort: 2 }
      - text: "깔끔한 비즈니스 호텔"
        scores: { planner: 2, culture: 1 }
      - text: "현지 게스트하우스나 에어비앤비"
        scores: { local: 3, balanced: 1 }
      - text: "백패킹 호스텔이나 캠핑"
        scores: { adventure: 3, budget: 2 }

  - question: "여행 중 가장 중요한 건?"
    options:
      - text: "완벽한 일정과 계획"
        scores: { planner: 3, culture: 1 }
      - text: "편안함과 휴식"
        scores: { comfort: 3, luxury: 1 }
      - text: "새로운 경험과 모험"
        scores: { adventure: 3, spontaneous: 2 }
      - text: "현지 문화 체험"
        scores: { local: 3, culture: 2 }

  - question: "여행 예산은?"
    options:
      - text: "예산 제한 없이 최고의 경험"
        scores: { luxury: 3 }
      - text: "합리적인 선에서 알차게"
        scores: { balanced: 3, planner: 1 }
      - text: "최소 예산으로 효율적으로"
        scores: { budget: 3, local: 1 }
      - text: "특별한 순간엔 아낌없이"
        scores: { comfort: 2, culture: 2 }

  - question: "여행지에서 음식은?"
    options:
      - text: "유명 맛집과 미슐랭 레스토랑"
        scores: { luxury: 3, planner: 1 }
      - text: "현지 전통 음식과 길거리 음식"
        scores: { local: 3, adventure: 1 }
      - text: "검증된 맛집과 카페"
        scores: { balanced: 2, culture: 2 }
      - text: "편한 프랜차이즈나 호텔 뷔페"
        scores: { comfort: 3, group: 1 }

  - question: "관광 스타일은?"
    options:
      - text: "모든 명소를 빠짐없이 방문"
        scores: { planner: 3, culture: 1 }
      - text: "핵심 명소 + 여유로운 휴식"
        scores: { balanced: 3, comfort: 1 }
      - text: "현지인처럼 일상 체험"
        scores: { local: 3, spontaneous: 1 }
      - text: "숨겨진 장소와 모험 추구"
        scores: { adventure: 3, spontaneous: 2 }

  - question: "여행 동반자는?"
    options:
      - text: "혼자 자유롭게"
        scores: { solo: 3, spontaneous: 1 }
      - text: "가족과 편안하게"
        scores: { comfort: 2, group: 2 }
      - text: "친구들과 즐겁게"
        scores: { adventure: 2, local: 1 }
      - text: "여행 동호회나 단체"
        scores: { group: 3, culture: 1 }

  - question: "여행의 목적은?"
    options:
      - text: "완벽한 휴식과 힐링"
        scores: { comfort: 3, luxury: 1 }
      - text: "문화와 역사 탐방"
        scores: { culture: 3, planner: 1 }
      - text: "새로운 도전과 경험"
        scores: { adventure: 3, spontaneous: 1 }
      - text: "현지 생활 체험"
        scores: { local: 3, solo: 1 }

  - question: "여행 사진은?"
    options:
      - text: "인생샷 건지기 위해 완벽하게"
        scores: { planner: 2, luxury: 2 }
      - text: "자연스러운 순간 포착"
        scores: { spontaneous: 2, local: 1 }
      - text: "핵심 명소만 간단히"
        scores: { balanced: 2, comfort: 1 }
      - text: "모든 순간 기록"
        scores: { culture: 2, group: 1 }

  - question: "예상치 못한 일이 생기면?"
    options:
      - text: "당황하지만 빠르게 대안 찾기"
        scores: { planner: 2, balanced: 2 }
      - text: "오히려 더 재밌는 기회로 삼기"
        scores: { spontaneous: 3, adventure: 2 }
      - text: "현지인에게 도움 요청"
        scores: { local: 3, solo: 1 }
      - text: "가이드나 호텔에 의뢰"
        scores: { comfort: 3, group: 1 }

  - question: "여행 교통수단은?"
    options:
      - text: "택시나 렌터카로 편하게"
        scores: { luxury: 2, comfort: 2 }
      - text: "대중교통으로 현지 체험"
        scores: { local: 3, budget: 1 }
      - text: "걷기나 자전거로 자유롭게"
        scores: { spontaneous: 2, adventure: 2 }
      - text: "투어버스나 단체 이동"
        scores: { group: 3, planner: 1 }

  - question: "여행 후 가장 기억에 남는 건?"
    options:
      - text: "완벽했던 계획과 일정"
        scores: { planner: 3 }
      - text: "예상치 못한 특별한 경험"
        scores: { spontaneous: 3, adventure: 1 }
      - text: "현지 사람들과의 교류"
        scores: { local: 3, culture: 1 }
      - text: "편안했던 휴식과 힐링"
        scores: { comfort: 3, luxury: 1 }

results:
  - type: "planner"
    badge: "📋✨"
    title: "완벽 계획형"
    subtitle: "모든 것을 준비하는 당신"
    rarity: 11
    description: "당신은 철저한 계획으로 완벽한 여행을 만드는 플래너입니다. 사전 조사를 꼼꼼히 하고, 일정을 최적화하며, 모든 명소를 놓치지 않아요. 효율적이고 알찬 여행을 추구합니다."
    traits: ["📋 완벽한 계획", "⏰ 시간 관리", "🎯 효율성", "📚 사전 조사"]
    recommendation: "가끔은 즉흥적인 모험도 즐겨보세요. 계획에 없던 순간이 가장 특별할 수 있어요!"
    compatibility: "문화탐방형, 균형잡힌 여행자와 좋아요"

  - type: "spontaneous"
    badge: "🎲🌟"
    title: "즉흥 모험형"
    subtitle: "자유로운 영혼의 당신"
    rarity: 10
    description: "당신은 계획 없이 즉흥적으로 떠나는 자유로운 여행자입니다. 그때그때 기분에 따라 움직이고, 예상치 못한 경험을 즐깁니다. 틀에 박힌 여행은 절대 NO!"
    traits: ["🎲 즉흥성", "🆓 자유로움", "✨ 예측불가", "🌈 다양한 경험"]
    recommendation: "최소한의 안전장치는 준비하세요. 숙소 예약 정도는 해두는 게 좋아요!"
    compatibility: "모험추구형, 현지밀착형과 잘 맞아요"

  - type: "luxury"
    badge: "💎👑"
    title: "럭셔리 여행형"
    subtitle: "최고를 추구하는 당신"
    rarity: 7
    description: "당신은 최고의 경험을 추구하는 럭셔리 여행자입니다. 5성급 호텔, 미슐랭 레스토랑, 프라이빗 투어 등 품격 있는 여행을 선호해요. 편안함과 특별함을 동시에 추구합니다."
    traits: ["👑 프리미엄 추구", "💎 특별한 경험", "🏨 최고급 숙소", "🍽️ 고급 미식"]
    recommendation: "현지 시장이나 골목 음식도 특별한 경험이 될 수 있어요!"
    compatibility: "편안함추구형과 완벽한 조합"

  - type: "adventure"
    badge: "🏔️⚡"
    title: "모험 추구형"
    subtitle: "도전을 즐기는 당신"
    rarity: 9
    description: "당신은 스릴과 도전을 즐기는 모험가입니다. 트레킹, 다이빙, 패러글라이딩 등 액티비티를 즐기고, 위험을 무릅쓰고 새로운 경험을 추구해요. 안전한 여행은 지루해요!"
    traits: ["⚡ 도전정신", "🏔️ 액티비티", "💪 체력", "🌟 스릴 추구"]
    recommendation: "가끔은 휴식도 필요해요. 여유롭게 경치를 감상하는 시간도 가져보세요!"
    compatibility: "즉흥모험형, 백패킹형과 환상 조합"

  - type: "local"
    badge: "🏡🌏"
    title: "현지 밀착형"
    subtitle: "로컬처럼 여행하는 당신"
    rarity: 8
    description: "당신은 현지 문화에 깊이 몰입하는 여행자입니다. 관광지보다는 현지인들의 삶을 경험하고, 전통 시장과 골목길을 탐방해요. 진짜 현지의 맛과 멋을 느낍니다."
    traits: ["🏡 현지 체험", "🗣️ 문화 교류", "🍜 전통 음식", "🎭 깊은 이해"]
    recommendation: "유명 명소도 한 번쯤은 가보세요. 관광지도 나름의 이유가 있답니다!"
    compatibility: "문화탐방형, 즉흥모험형과 좋아요"

  - type: "comfort"
    badge: "☁️😌"
    title: "편안함 추구형"
    subtitle: "힐링이 최고인 당신"
    rarity: 13
    description: "당신은 편안한 휴식을 위한 여행자입니다. 좋은 호텔, 편한 교통, 검증된 맛집을 선호하며, 무리한 일정보다는 여유로운 휴식을 추구해요. 여행은 곧 힐링입니다."
    traits: ["😌 여유로움", "☁️ 힐링", "🏨 편안한 숙소", "🛌 충분한 휴식"]
    recommendation: "새로운 도전도 때로는 스트레스 해소가 될 수 있어요!"
    compatibility: "럭셔리형, 단체여행형과 잘 맞아요"

  - type: "culture"
    badge: "🏛️📚"
    title: "문화 탐방형"
    subtitle: "배움을 추구하는 당신"
    rarity: 9
    description: "당신은 역사와 문화를 배우는 여행자입니다. 박물관, 유적지, 전통 공연 등을 통해 그 나라의 역사와 문화를 깊이 이해하려 해요. 여행은 곧 학습입니다."
    traits: ["📚 역사 탐구", "🏛️ 문화 이해", "🎭 전통 체험", "🧠 지식 습득"]
    recommendation: "가끔은 그냥 즐기기만 해도 괜찮아요. 놀이도 여행의 일부랍니다!"
    compatibility: "완벽계획형, 현지밀착형과 좋아요"

  - type: "budget"
    badge: "💰🎒"
    title: "알뜰 백패킹형"
    subtitle: "효율적으로 여행하는 당신"
    rarity: 10
    description: "당신은 최소 예산으로 최대 경험을 하는 백패커입니다. 저렴한 호스텔, 현지 음식, 대중교통을 이용하며, 돈보다는 경험에 가치를 둡니다. 여행은 사치가 아니에요!"
    traits: ["💰 알뜰함", "🎒 효율성", "🚶 자유로움", "🌍 풍부한 경험"]
    recommendation: "가끔은 특별한 경험에 투자해보세요. 좋은 추억은 돈보다 가치 있어요!"
    compatibility: "모험추구형, 현지밀착형과 찰떡"

  - type: "group"
    badge: "👥🎉"
    title: "단체 여행형"
    subtitle: "함께 즐기는 당신"
    rarity: 11
    description: "당신은 가족이나 친구들과 함께하는 단체 여행을 선호합니다. 패키지 투어나 단체 일정을 좋아하고, 혼자보다는 여럿이 더 즐거워요. 함께하는 추억이 최고입니다."
    traits: ["👥 함께하기", "🎉 즐거움", "📸 단체 사진", "🤝 소통"]
    recommendation: "혼자 여행도 한 번 도전해보세요. 새로운 자신을 발견할 수 있어요!"
    compatibility: "편안함추구형, 완벽계획형과 좋아요"

  - type: "solo"
    badge: "🧳✨"
    title: "자유 솔로형"
    subtitle: "혼자가 편한 당신"
    rarity: 8
    description: "당신은 혼자 여행하는 것을 선호하는 솔로 여행자입니다. 자유롭게 일정을 조절하고, 자신만의 속도로 여행하며, 깊은 성찰과 자기 발견의 시간을 가져요."
    traits: ["🧳 독립성", "✨ 자유로움", "🧘 자기성찰", "📖 깊은 경험"]
    recommendation: "때로는 동행도 좋아요. 좋은 사람과의 여행은 배로 즐거울 수 있어요!"
    compatibility: "현지밀착형, 즉흥모험형과 잘 맞아요"

  - type: "balanced"
    badge: "⚖️🌟"
    title: "균형잡힌 여행자"
    subtitle: "조화를 추구하는 당신"
    rarity: 14
    description: "당신은 계획과 즉흥, 휴식과 활동의 균형을 잘 맞추는 여행자입니다. 상황에 맞게 유연하게 대응하고, 다양한 스타일을 적절히 섞어 즐깁니다. 완벽한 밸런스!"
    traits: ["⚖️ 균형감각", "🌟 유연성", "🎯 합리적", "😊 만족도 높음"]
    recommendation: "당신의 스타일이 완벽해요! 계속 즐기세요!"
    compatibility: "모든 유형과 잘 어울려요"
---

당신의 여행 스타일은 무엇일까요? 재미있는 여행BTI로 알아보세요!
