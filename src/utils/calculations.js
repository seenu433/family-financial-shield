export const calculateFinancialNeeds = (formData) => {
  const lifeInsuranceTotal = (
    parseFloat(formData.termLifeInsurance) || 0) +
    (parseFloat(formData.wholeLifeInsurance) || 0) +
    (parseFloat(formData.groupLifeInsurance) || 0
  )
  
  const retirementAccountsTotal = (
    parseFloat(formData.traditional401k) || 0) +
    (parseFloat(formData.roth401k) || 0) +
    (parseFloat(formData.traditionalIRA) || 0) +
    (parseFloat(formData.rothIRA) || 0
  )
  
  const savingsInvestmentsTotal = (
    parseFloat(formData.savingsAccounts) || 0) +
    (parseFloat(formData.investmentAccounts) || 0) +
    (parseFloat(formData.hsaAccounts) || 0) +
    (parseFloat(formData.educationSavings529) || 0
  )
  
  const realEstateValue = parseFloat(formData.homeValue) || 0
  const annualIncome = parseFloat(formData.annualIncome) || 0
  
  const totalBenefits = lifeInsuranceTotal + retirementAccountsTotal + savingsInvestmentsTotal + realEstateValue
  
  const mortgageDebtTotal = (
    parseFloat(formData.primaryMortgage) || 0) +
    (parseFloat(formData.homeEquityLoans) || 0
  )
  
  const creditCardDebt = parseFloat(formData.creditCardDebt) || 0
  
  const studentLoansTotal = (
    parseFloat(formData.federalStudentLoans) || 0) +
    (parseFloat(formData.privateStudentLoans) || 0
  )
  
  const autoLoans = parseFloat(formData.autoLoans) || 0
  const personalLoans = parseFloat(formData.personalLoans) || 0
  const businessDebts = parseFloat(formData.businessDebts) || 0
  const medicalDebt = parseFloat(formData.medicalDebt) || 0
  
  const totalDebts = mortgageDebtTotal + creditCardDebt + studentLoansTotal + autoLoans + personalLoans + businessDebts + medicalDebt

  const traditionalAccountTaxImpact = (
    (parseFloat(formData.traditional401k) || 0) +
    (parseFloat(formData.traditionalIRA) || 0)
  ) * 0.25
  
  const realEstateTaxImpact = realEstateValue * 0.06
  const taxImplications = traditionalAccountTaxImpact + realEstateTaxImpact
  
  const monthlyExpensesTotal = (
    parseFloat(formData.housingCosts) || 0) +
    (parseFloat(formData.foodExpenses) || 0) +
    (parseFloat(formData.transportationCosts) || 0) +
    (parseFloat(formData.healthcareCosts) || 0) +
    (parseFloat(formData.childcareEducation) || 0
  )
  
  // PLANNING VARIABLES
  const dependents = parseFloat(formData.dependents) || 0
  const yearsToProtect = parseFloat(formData.yearsToProtect) || 18
  
  const legalDocuments = [
    formData.hasWill === 'yes' ? 25 : formData.hasWill === 'outdated' ? 15 : 0,
    formData.hasTrust === 'yes' ? 25 : 0,
    formData.hasPowerOfAttorney === 'yes' ? 25 : 0,
    formData.hasHealthcareDirectives === 'yes' ? 25 : 0
  ]
  const legalScore = legalDocuments.reduce((sum, score) => sum + score, 0)
  
  const educationCosts = dependents * 100000
  
  const totalExpenseNeed = (monthlyExpensesTotal * 12) * yearsToProtect
  
  // Total protection needed: A + B + C ≥ D × Years + Education
  const totalProtectionNeeded = totalDebts + taxImplications + totalExpenseNeed + educationCosts
  const currentProtection = totalBenefits
  const protectionGap = Math.max(0, totalProtectionNeeded - currentProtection)
  
  // Emergency fund calculation (6 months of expenses)
  const targetEmergencyFund = monthlyExpensesTotal * 6
  const currentEmergencyFund = parseFloat(formData.savingsAccounts) || 0
  const emergencyGap = Math.max(0, targetEmergencyFund - currentEmergencyFund)
  
  // DETAILED PILLAR SCORING WITH SAFEGUARDS
  const benefitsScore = totalProtectionNeeded === 0 ? 100 : 
    Math.min(100, Math.max(0, (currentProtection / totalProtectionNeeded) * 100))
  
  const emergencyScore = targetEmergencyFund === 0 ? 100 : 
    Math.min(100, Math.max(0, (currentEmergencyFund / targetEmergencyFund) * 100))
  
  const debtScore = totalDebts === 0 ? 100 : 
    annualIncome === 0 ? 0 : Math.max(0, 100 - (totalDebts / annualIncome) * 15)
  
  const taxScore = annualIncome === 0 ? 0 : 
    Math.min(90, Math.max(0, (retirementAccountsTotal / annualIncome) * 90))
  
  const overallScore = (benefitsScore + emergencyScore + debtScore + legalScore + taxScore) / 5

  // Status determination
  let status = 'green'
  let statusText = 'Well Protected'
  if (overallScore < 40) {
    status = 'red'
    statusText = 'Critical Gaps'
  } else if (overallScore < 70) {
    status = 'yellow'
    statusText = 'Some Gaps'
  }

  // Generate comprehensive action items based on detailed instrument analysis
  const actionItems = []
  
  // Benefits & Protection gaps - detailed recommendations
  if (protectionGap > 0) {
    if (lifeInsuranceTotal < protectionGap * 0.7) {
      const additionalNeeded = Math.round(protectionGap * 0.7 - lifeInsuranceTotal)
      actionItems.push(`🛡️ Critical: Increase life insurance by $${additionalNeeded.toLocaleString()} (currently have $${lifeInsuranceTotal.toLocaleString()}, need $${Math.round(protectionGap * 0.7).toLocaleString()})`)
    } else if (lifeInsuranceTotal < protectionGap) {
      const additionalNeeded = Math.round(protectionGap - lifeInsuranceTotal)
      actionItems.push(`🛡️ Consider additional life insurance: $${additionalNeeded.toLocaleString()} to fully cover protection gap`)
    }
  }
  
  // Emergency fund gaps - specific to savings
  if (emergencyGap > 0) {
    const currentMonths = Math.floor(currentEmergencyFund / (monthlyExpensesTotal || 1))
    const targetMonths = Math.ceil(targetEmergencyFund / (monthlyExpensesTotal || 1))
    const monthlyContribution = Math.round(emergencyGap / 12)
    
    actionItems.push(`💰 Priority: Build emergency fund from ${currentMonths} to ${targetMonths} months of expenses. Save $${monthlyContribution.toLocaleString()}/month for 1 year to reach goal.`)
  }
  
  // Liabilities - specific debt type recommendations
  const debtRecommendations = []
  if (creditCardDebt > annualIncome * 0.1) {
    debtRecommendations.push(`Credit cards: $${creditCardDebt.toLocaleString()} (${Math.round(creditCardDebt/annualIncome*100)}% of income)`)
  }
  if ((parseFloat(formData.personalLoans) || 0) > 0) {
    debtRecommendations.push(`Personal loans: $${(parseFloat(formData.personalLoans) || 0).toLocaleString()}`)
  }
  if ((parseFloat(formData.studentLoans) || 0) > annualIncome * 0.5) {
    debtRecommendations.push(`Student loans: $${(parseFloat(formData.studentLoans) || 0).toLocaleString()} (consider income-driven repayment)`)
  }
  
  if (debtRecommendations.length > 0) {
    actionItems.push(`💳 Pay down high-interest debt: ${debtRecommendations.join(', ')}`)
  }
  
  if (totalDebts > annualIncome * 3) {
    const debtToIncomeRatio = (totalDebts/annualIncome).toFixed(1)
    actionItems.push(`📉 Your debt-to-income ratio is ${debtToIncomeRatio}x (above recommended 3x) - consider debt consolidation or credit counseling`)
  }
  
  // Legal planning gaps - specific document recommendations
  const missingDocs = []
  if (formData.hasWill !== 'yes') missingDocs.push('Will')
  if (formData.hasTrust !== 'yes') missingDocs.push('Trust')
  if (formData.hasPowerOfAttorney !== 'yes') missingDocs.push('Power of Attorney')
  if (formData.hasHealthcareDirectives !== 'yes') missingDocs.push('Healthcare Directives')
  
  if (missingDocs.length > 0) {
    actionItems.push(`📋 Complete missing legal documents: ${missingDocs.join(', ')} - essential for family protection`)
  }
  
  // Tax optimization - specific account recommendations
  if (retirementAccountsTotal < annualIncome) {
    actionItems.push(`🏦 Maximize employer 401(k) match and increase retirement contributions`)
  }
  if ((parseFloat(formData.rothIRA) || 0) + (parseFloat(formData.roth401k) || 0) < retirementAccountsTotal * 0.3 && retirementAccountsTotal > 0) {
    actionItems.push(`🔄 Consider increasing Roth account allocation for tax diversification (currently ${Math.round(((parseFloat(formData.rothIRA) || 0) + (parseFloat(formData.roth401k) || 0))/retirementAccountsTotal*100)}% Roth)`)
  }
  
  // Specific expense optimization
  if (monthlyExpensesTotal > annualIncome / 12 * 0.8) {
    actionItems.push(`💡 Review monthly expenses ($${monthlyExpensesTotal.toLocaleString()}) - they're ${Math.round(monthlyExpensesTotal / (annualIncome/12) * 100)}% of monthly income, target 70-80%`)
  }
  
  // Children-specific recommendations
  if (dependents > 0) {
    const educationSavings = (parseFloat(formData.educationSavings529) || 0)
    const targetEducation = dependents * 100000 // $100k per child estimate
    
    if (educationSavings < targetEducation * 0.5) {
      const monthlyEducation = Math.round((targetEducation - educationSavings) / (18 * 12))
      actionItems.push(`🎓 Start/increase 529 education savings: $${monthlyEducation.toLocaleString()}/month for ${dependents} ${dependents === 1 ? 'child' : 'children'} (currently: $${educationSavings.toLocaleString()})`)
    }
  }
  
  // HSA recommendations
  const hsaBalance = (parseFloat(formData.hsaAccounts) || 0)
  const annualHealthcareCosts = (parseFloat(formData.healthcareCosts) || 0) * 12
  const hsaMaxContribution = 4300 // 2024 individual HSA contribution limit
  
  if (hsaBalance < annualHealthcareCosts * 2) {
    const recommendedHSA = Math.min(hsaMaxContribution, annualHealthcareCosts * 0.5)
    actionItems.push(`🏥 Maximize HSA contributions: $${recommendedHSA.toLocaleString()}/year (triple tax advantage + investment growth potential after age 65)`)
  }
  
  if (hsaBalance > 10000) {
    actionItems.push('💊 Consider investing HSA funds beyond immediate healthcare needs - HSA becomes retirement account after 65')
  }

  // Income replacement analysis
  const monthlyIncome = annualIncome / 12
  const incomeReplacementNeeded = monthlyIncome * 0.7 // 70% replacement ratio
  const currentMonthlyProtection = (lifeInsuranceTotal + retirementAccountsTotal) / 240 // 20-year payout assumption
  
  if (currentMonthlyProtection < incomeReplacementNeeded && lifeInsuranceTotal > 0) {
    actionItems.push(`📊 Income replacement gap: Current protection provides $${Math.round(currentMonthlyProtection).toLocaleString()}/month, need $${Math.round(incomeReplacementNeeded).toLocaleString()}/month`)
  }
  
  // Additional recommendations for well-protected families
  if (actionItems.length === 0) {
    actionItems.push('🎉 Excellent! Your family is well-protected across all financial pillars')
    actionItems.push('📊 Consider annual review with a fee-only financial advisor to optimize strategy')
    
    if (retirementAccountsTotal > annualIncome * 3) {
      actionItems.push('💎 Consider tax-loss harvesting and asset allocation optimization in taxable accounts')
    }
    
    if (dependents > 0 && (parseFloat(formData.educationSavings529) || 0) > 50000) {
      actionItems.push('🎓 Well-funded education savings - consider age-based investment allocation adjustments')
    }
  }
  
  // Professional guidance for complex situations
  if (annualIncome > 150000 || totalDebts > 500000 || realEstateValue > 1000000) {
    actionItems.push(`💼 Consider comprehensive financial planning with a certified financial planner`)
  }

  return {
    // Current protection analysis
    totalProtectionNeeded,
    currentProtection: totalBenefits,
    protectionGap,
    
    // Emergency fund analysis  
    targetEmergencyFund,
    currentEmergencyValue: currentEmergencyFund,
    emergencyGap,
    
    // Detailed breakdowns
    lifeInsuranceTotal,
    retirementAccountsTotal,
    totalDebts,
    monthlyExpensesTotal,
    taxImplications,
    
    // Pillar scores
    benefitsScore: Math.round(benefitsScore),
    emergencyScore: Math.round(emergencyScore), 
    debtScore: Math.round(debtScore),
    legalScore: Math.round(legalScore),
    taxScore: Math.round(taxScore),
    
    // Overall assessment
    status,
    statusText,
    overallScore: Math.round(overallScore),
    actionItems: actionItems.slice(0, 8) // Show top 8 priorities for detailed analysis
  }
}
