/**
 * Psychology Center - Comprehensive Analysis Calculator
 * Calculates scores for 5 dimensions and detects risk factors
 */

class PsychologyCalculator {
  constructor(testData) {
    this.testData = testData;
    this.dimensions = testData.dimensions;
    this.questions = testData.questions;
    this.riskThresholds = testData.risk_thresholds || {};
  }

  /**
   * Calculate comprehensive analysis results
   * @param {Object} answers - User answers {questionIndex: score}
   * @returns {Object} Analysis results with scores, risks, and result type
   */
  calculateResults(answers) {
    // 1. Calculate dimension scores
    const dimensionScores = this.calculateDimensionScores(answers);
    
    // 2. Calculate subdimension scores for detailed analysis
    const subdimensionScores = this.calculateSubdimensionScores(answers);
    
    // 3. Detect risk factors
    const risks = this.detectRisks(subdimensionScores);
    
    // 4. Calculate overall score
    const overallScore = this.calculateOverallScore(dimensionScores);
    
    // 5. Determine result type
    const resultType = this.determineResultType(overallScore);
    
    // 6. Get strengths and weaknesses
    const analysis = this.analyzeStrengthsWeaknesses(dimensionScores);
    
    return {
      overallScore,
      resultType,
      dimensionScores,
      subdimensionScores,
      risks,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      radarChartData: this.generateRadarChartData(dimensionScores)
    };
  }

  /**
   * Calculate scores for each of 5 main dimensions
   */
  calculateDimensionScores(answers) {
    const scores = {};
    
    this.dimensions.forEach(dimension => {
      const dimensionQuestions = this.questions.filter(
        q => q.dimension === dimension.id
      );
      
      let totalScore = 0;
      let questionCount = 0;
      
      dimensionQuestions.forEach((question, index) => {
        const questionIndex = this.questions.indexOf(question);
        let score = answers[questionIndex];
        
        if (score === undefined) return;
        
        // Handle reverse-scored questions
        if (question.reverse) {
          score = 8 - score; // Convert 7-point scale (1-7 becomes 7-1)
        }
        
        totalScore += score;
        questionCount++;
      });
      
      // Convert to 0-100 scale
      const percentage = questionCount > 0 
        ? (totalScore / (questionCount * 7)) * 100 
        : 0;
      
      scores[dimension.id] = {
        name: dimension.name,
        score: Math.round(percentage),
        color: dimension.color
      };
    });
    
    return scores;
  }

  /**
   * Calculate scores for subdimensions (e.g., stress_level, burnout, etc.)
   */
  calculateSubdimensionScores(answers) {
    const scores = {};
    
    // Get all unique subdimensions
    const subdimensions = [...new Set(
      this.questions.map(q => `${q.dimension}_${q.subdimension}`)
    )];
    
    subdimensions.forEach(subdimKey => {
      const [dimension, subdimension] = subdimKey.split('_').slice(0, 2);
      const fullSubdim = subdimKey.split('_').slice(1).join('_');
      
      const subdimQuestions = this.questions.filter(
        q => q.dimension === dimension && q.subdimension === fullSubdim
      );
      
      let totalScore = 0;
      let questionCount = 0;
      
      subdimQuestions.forEach(question => {
        const questionIndex = this.questions.indexOf(question);
        let score = answers[questionIndex];
        
        if (score === undefined) return;
        
        if (question.reverse) {
          score = 8 - score;
        }
        
        totalScore += score;
        questionCount++;
      });
      
      const percentage = questionCount > 0 
        ? (totalScore / (questionCount * 7)) * 100 
        : 0;
      
      scores[subdimKey] = Math.round(percentage);
    });
    
    return scores;
  }

  /**
   * Detect risk factors based on thresholds
   */
  detectRisks(subdimensionScores) {
    const risks = [];
    
    // Mental Health risks
    if (subdimensionScores['mental_health_stress_level'] >= 60) {
      risks.push({
        dimension: 'mental_health',
        type: 'high_stress',
        severity: 'high',
        message: '높은 스트레스 수준이 감지되었습니다. 스트레스 관리가 필요합니다.'
      });
    }
    
    if (subdimensionScores['mental_health_burnout'] >= 65) {
      risks.push({
        dimension: 'mental_health',
        type: 'burnout',
        severity: 'high',
        message: '번아웃 증후군 위험이 있습니다. 충분한 휴식과 회복이 필요합니다.'
      });
    }
    
    if (subdimensionScores['mental_health_emotional_stability'] <= 35) {
      risks.push({
        dimension: 'mental_health',
        type: 'low_emotional_stability',
        severity: 'medium',
        message: '감정 안정성이 낮습니다. 감정 조절 능력을 키우는 것이 도움이 될 수 있습니다.'
      });
    }
    
    // Life Balance risks
    if (subdimensionScores['life_balance_work_life_balance'] <= 35) {
      risks.push({
        dimension: 'life_balance',
        type: 'poor_work_life_balance',
        severity: 'medium',
        message: '일과 삶의 균형이 무너져 있습니다. 경계를 설정하는 것이 중요합니다.'
      });
    }
    
    if (subdimensionScores['life_balance_self_care'] <= 40) {
      risks.push({
        dimension: 'life_balance',
        type: 'low_self_care',
        severity: 'medium',
        message: '자기돌봄이 부족합니다. 자신을 위한 시간을 만드는 것이 중요합니다.'
      });
    }
    
    if (subdimensionScores['life_balance_life_satisfaction'] <= 35) {
      risks.push({
        dimension: 'life_balance',
        type: 'low_life_satisfaction',
        severity: 'high',
        message: '삶의 만족도가 낮습니다. 전문가 상담을 고려해보세요.'
      });
    }
    
    return risks;
  }

  /**
   * Calculate overall score (average of all dimensions)
   */
  calculateOverallScore(dimensionScores) {
    const scores = Object.values(dimensionScores).map(d => d.score);
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(average);
  }

  /**
   * Determine result type based on overall score
   */
  determineResultType(overallScore) {
    const results = this.testData.results;
    
    for (const result of results) {
      if (overallScore >= result.minScore && overallScore <= result.maxScore) {
        return result.type;
      }
    }
    
    return 'stable'; // default
  }

  /**
   * Analyze strengths and weaknesses
   */
  analyzeStrengthsWeaknesses(dimensionScores) {
    const dimensions = Object.entries(dimensionScores);
    const sorted = dimensions.sort((a, b) => b[1].score - a[1].score);
    
    // Top 2 are strengths, bottom 2 are weaknesses
    const strengths = sorted.slice(0, 2).map(([id, data]) => ({
      dimension: id,
      name: data.name,
      score: data.score
    }));
    
    const weaknesses = sorted.slice(-2).map(([id, data]) => ({
      dimension: id,
      name: data.name,
      score: data.score
    }));
    
    return { strengths, weaknesses };
  }

  /**
   * Generate data for Chart.js radar chart
   */
  generateRadarChartData(dimensionScores) {
    const labels = [];
    const data = [];
    const colors = [];
    
    this.dimensions.forEach(dimension => {
      const score = dimensionScores[dimension.id];
      labels.push(dimension.name);
      data.push(score.score);
      colors.push(dimension.color);
    });
    
    return {
      labels,
      datasets: [{
        label: '심리 분석 결과',
        data,
        backgroundColor: 'rgba(78, 205, 196, 0.2)',
        borderColor: 'rgba(78, 205, 196, 1)',
        borderWidth: 2,
        pointBackgroundColor: colors,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors
      }]
    };
  }

  /**
   * Get personalized recommendations based on results
   */
  getRecommendations(dimensionScores, risks) {
    const recommendations = [];
    
    // Risk-based recommendations
    risks.forEach(risk => {
      if (risk.severity === 'high') {
        recommendations.push({
          priority: 'high',
          area: risk.dimension,
          message: risk.message,
          action: this.getRiskAction(risk.type)
        });
      }
    });
    
    // Weakness-based recommendations
    Object.entries(dimensionScores).forEach(([id, data]) => {
      if (data.score < 50) {
        recommendations.push({
          priority: 'medium',
          area: id,
          message: `${data.name} 영역의 개선이 필요합니다.`,
          action: this.getDimensionAction(id)
        });
      }
    });
    
    return recommendations;
  }

  /**
   * Get action recommendations for specific risk types
   */
  getRiskAction(riskType) {
    const actions = {
      'high_stress': '스트레스 관리 기법(명상, 호흡법)을 시도해보세요.',
      'burnout': '업무량 조절과 충분한 휴식이 필요합니다.',
      'low_emotional_stability': '감정 일기 쓰기나 전문 상담을 고려해보세요.',
      'poor_work_life_balance': '명확한 업무 시간 경계를 설정하세요.',
      'low_self_care': '매일 30분씩 자신만을 위한 시간을 확보하세요.',
      'low_life_satisfaction': '전문가 상담을 통해 근본적인 원인을 탐색해보세요.'
    };
    
    return actions[riskType] || '전문가의 조언을 구하는 것을 고려해보세요.';
  }

  /**
   * Get improvement actions for dimensions
   */
  getDimensionAction(dimensionId) {
    const actions = {
      'mental_health': '규칙적인 운동과 충분한 수면을 통해 정신 건강을 관리하세요.',
      'resource_management': '우선순위 설정과 시간 관리 도구를 활용해보세요.',
      'life_balance': '일과 개인 생활의 명확한 경계를 만드세요.',
      'career_growth': '구체적인 목표를 설정하고 학습 계획을 세워보세요.',
      'social_relations': '의미있는 관계에 시간을 투자하고 소통을 늘려보세요.'
    };
    
    return actions[dimensionId] || '작은 변화부터 시작해보세요.';
  }
}

// Export for use in test pages
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PsychologyCalculator;
}
