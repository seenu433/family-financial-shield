// Financial calculation utilities for the Family Financial Shield application

/**
 * Calculate comprehensive financial needs and generate recommendations
 * @param {Object} formData - The assessment form data
 * @returns {Object} Complete financial analysis with action items
 */
export const calculateFinancialNeeds = (formData) => {
  // Calculate total savings including new HSA and 529 accounts
  const savingsInvestmentsTotal = 
    (formData.emergencyFund || 0) + 
    (formData.retirementAccounts || 0) + 
    (formData.otherInvestments || 0) +
    (formData.hsaAccounts || 0) +
    (formData.plan529Accounts || 0);

  // Basic life insurance calculation (10x income + education costs)
  const educationCosts = formData.dependents ? formData.dependents * 100000 : 0; // $100k per child
  const basicLifeInsuranceNeed = (formData.annualIncome * 10) + educationCosts;
  
  // Life insurance gap
  const currentLifeInsurance = formData.currentLifeInsurance || 0;
  const lifeInsuranceGap = Math.max(0, basicLifeInsuranceNeed - currentLifeInsurance);
  
  // Emergency fund goal (6 months of expenses)
  const emergencyFundGoal = formData.monthlyExpenses * 6;
  const emergencyFundGap = Math.max(0, emergencyFundGoal - (formData.emergencyFund || 0));
  
  // Financial health score (0-100)
  let healthScore = 0;
  
  // Life insurance coverage (40 points max)
  const lifeInsuranceCoverage = Math.min(currentLifeInsurance / basicLifeInsuranceNeed, 1);
  healthScore += lifeInsuranceCoverage * 40;
  
  // Emergency fund coverage (30 points max)
  const emergencyFundCoverage = Math.min((formData.emergencyFund || 0) / emergencyFundGoal, 1);
  healthScore += emergencyFundCoverage * 30;
  
  // Debt-to-income ratio (20 points max) - assume healthy if not provided
  const monthlyDebtPayments = 0; // Could be added to form
  const debtToIncomeRatio = monthlyDebtPayments / (formData.annualIncome / 12);
  const debtScore = Math.max(0, 20 - (debtToIncomeRatio * 100)); // Penalty for high debt
  healthScore += Math.min(debtScore, 20);
  
  // Savings rate (10 points max)
  const monthlySavings = (savingsInvestmentsTotal) / 12; // Rough estimate
  const savingsRate = monthlySavings / (formData.annualIncome / 12);
  healthScore += Math.min(savingsRate * 100, 10);
  
  healthScore = Math.round(healthScore);
  
  // Determine status
  let status = 'red';
  if (healthScore >= 70) status = 'green';
  else if (healthScore >= 50) status = 'yellow';
  
  // Generate action items
  const actionItems = generateActionItems({
    lifeInsuranceGap,
    emergencyFundGap,
    healthScore,
    formData,
    savingsInvestmentsTotal,
    emergencyFundGoal,
    basicLifeInsuranceNeed
  });
  
  return {
    healthScore,
    status,
    lifeInsuranceGap,
    emergencyFundGap,
    basicLifeInsuranceNeed,
    emergencyFundGoal,
    savingsInvestmentsTotal,
    actionItems
  };
};

/**
 * Generate prioritized action items based on financial analysis
 * @param {Object} analysisData - Results from financial analysis
 * @returns {Array} Prioritized list of action items
 */
const generateActionItems = ({
  lifeInsuranceGap,
  emergencyFundGap,
  healthScore,
  formData,
  savingsInvestmentsTotal,
  emergencyFundGoal,
  basicLifeInsuranceNeed
}) => {
  const actionItems = [];
  
  // Life Insurance Gap (Priority 1)
  if (lifeInsuranceGap > 0) {
    const monthlyTermCost = Math.round((lifeInsuranceGap / 1000) * 0.50); // Rough estimate: $0.50 per $1000
    actionItems.push({
      priority: 1,
      title: 'Get Life Insurance Coverage',
      description: `You need $${lifeInsuranceGap.toLocaleString()} more in life insurance coverage.`,
      action: `Consider a ${Math.round(lifeInsuranceGap / 50000) * 50000 / 1000}K term life policy (estimated $${monthlyTermCost}/month).`,
      urgency: 'high'
    });
  }
  
  // Emergency Fund (Priority 2)
  if (emergencyFundGap > 0) {
    const monthsToSave = Math.ceil(emergencyFundGap / (formData.annualIncome * 0.1 / 12)); // Assume 10% savings rate
    actionItems.push({
      priority: 2,
      title: 'Build Emergency Fund',
      description: `You need $${emergencyFundGap.toLocaleString()} more in emergency savings.`,
      action: `Save $${Math.round(emergencyFundGap / monthsToSave).toLocaleString()}/month to reach your goal in ${monthsToSave} months.`,
      urgency: emergencyFundGap > formData.monthlyExpenses * 3 ? 'high' : 'medium'
    });
  }
  
  // Estate Planning (Priority 3)
  if (formData.dependents > 0) {
    actionItems.push({
      priority: 3,
      title: 'Create/Update Estate Planning Documents',
      description: 'With dependents, you need proper estate planning documents.',
      action: 'Meet with an estate planning attorney to create a will, consider a trust, and update beneficiaries.',
      urgency: 'medium'
    });
  }
  
  // HSA Optimization (if applicable)
  if (formData.hsaAccounts > 0) {
    actionItems.push({
      priority: 4,
      title: 'Maximize HSA Contributions',
      description: 'HSAs offer triple tax benefits and can serve as retirement accounts.',
      action: 'Consider maxing out HSA contributions ($4,300 individual/$8,550 family for 2024) and investing funds for long-term growth.',
      urgency: 'low'
    });
  }
  
  // 529 Plan Enhancement (if applicable)
  if (formData.plan529Accounts > 0 && formData.dependents > 0) {
    const educationGoal = formData.dependents * 100000; // $100k per child
    if (formData.plan529Accounts < educationGoal) {
      actionItems.push({
        priority: 5,
        title: 'Increase Education Savings',
        description: `Consider increasing 529 plan contributions for children's education.`,
        action: `Target $${educationGoal.toLocaleString()} total across all children. Consider automatic monthly contributions.`,
        urgency: 'low'
      });
    }
  }
  
  // Disability Insurance
  if (formData.annualIncome > 50000) {
    actionItems.push({
      priority: 6,
      title: 'Consider Disability Insurance',
      description: 'Protect your income if you become unable to work.',
      action: 'Review employer disability benefits and consider supplemental coverage for 60-70% income replacement.',
      urgency: 'medium'
    });
  }
  
  // Professional Review
  if (healthScore < 70) {
    actionItems.push({
      priority: 7,
      title: 'Consult a Financial Advisor',
      description: 'Your financial protection has gaps that need professional attention.',
      action: 'Meet with a fee-only financial planner to create a comprehensive financial plan.',
      urgency: 'medium'
    });
  }
  
  return actionItems.slice(0, 5); // Return top 5 priorities
};

/**
 * Generate comprehensive financial health summary analysis
 * @param {Object} results - Financial calculation results
 * @param {Object} formData - Assessment form data
 * @returns {Object} Summary analysis with status and recommendations
 */
export const generateSummaryAnalysis = (results, formData) => {
  const { healthScore, status, lifeInsuranceGap, emergencyFundGap } = results;
  
  let summaryTitle = '';
  let summaryText = '';
  let recommendations = [];
  
  if (status === 'green') {
    summaryTitle = 'Strong Financial Protection 💚';
    summaryText = `Great job! Your family has solid financial protection with a health score of ${healthScore}/100. You have adequate life insurance coverage and a good emergency fund. Your family would be financially secure if something unexpected happened.`;
    
    recommendations = [
      'Review and update your coverage annually',
      'Continue building your emergency fund and investments',
      'Ensure all estate planning documents are current',
      'Consider increasing coverage as income grows'
    ];
  } else if (status === 'yellow') {
    summaryTitle = 'Moderate Financial Protection ⚠️';
    summaryText = `Your family has some financial protection, but there are important gaps to address. With a health score of ${healthScore}/100, you've made a good start, but your family could face financial hardship without improvements.`;
    
    recommendations = [
      lifeInsuranceGap > 0 ? `Increase life insurance by $${lifeInsuranceGap.toLocaleString()}` : '',
      emergencyFundGap > 0 ? `Build emergency fund by $${emergencyFundGap.toLocaleString()}` : '',
      'Create or update your will and estate plan',
      'Consider disability insurance to protect your income'
    ].filter(Boolean);
  } else {
    summaryTitle = 'Critical Financial Protection Gaps 🚨';
    summaryText = `Your family faces significant financial risk with a health score of ${healthScore}/100. If something happened to you tomorrow, your family could face serious financial hardship. The good news is these gaps can be addressed with focused action.`;
    
    recommendations = [
      lifeInsuranceGap > 0 ? `URGENT: Get $${lifeInsuranceGap.toLocaleString()} in life insurance coverage` : '',
      emergencyFundGap > 0 ? `URGENT: Start building an emergency fund (target: $${results.emergencyFundGoal.toLocaleString()})` : '',
      'Meet with a financial advisor immediately',
      'Create basic estate planning documents (will, beneficiaries)'
    ].filter(Boolean);
  }
  
  // Add context about what the assessment reveals
  const contextText = `
    Based on your assessment, here's what we found:
    • Annual Income: $${formData.annualIncome?.toLocaleString() || 'Not provided'}
    • Monthly Expenses: $${formData.monthlyExpenses?.toLocaleString() || 'Not provided'}
    • Dependents: ${formData.dependents || 0}
    • Current Life Insurance: $${formData.currentLifeInsurance?.toLocaleString() || '0'}
    • Emergency Fund: $${formData.emergencyFund?.toLocaleString() || '0'}
    • Total Savings/Investments: $${results.savingsInvestmentsTotal?.toLocaleString() || '0'}
    
    The key question this assessment answers is: "If something happened to the primary income earner, would the family be financially secure?" Your score indicates ${status === 'green' ? 'yes, with strong protection' : status === 'yellow' ? 'partial protection with important gaps' : 'significant financial vulnerability'}.
  `;
  
  return {
    title: summaryTitle,
    text: summaryText,
    context: contextText,
    recommendations,
    nextSteps: status === 'green' ? 
      'Focus on optimizing and maintaining your excellent financial foundation.' :
      status === 'yellow' ?
      'Prioritize closing the gaps identified above within the next 6 months.' :
      'Take immediate action on the urgent items - your family\'s financial security depends on it.'
  };
};
