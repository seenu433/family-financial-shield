export const getInstruments = (questions) => {
  const uniqueInstruments = []
  const seen = new Set()
  
  questions.forEach(question => {
    if (!seen.has(question.instrument)) {
      uniqueInstruments.push({
        name: question.instrument,
        pillar: question.pillar,
        questions: questions.filter(q => q.instrument === question.instrument)
      })
      seen.add(question.instrument)
    }
  })
  
  return uniqueInstruments
}

export const getCurrentInstrumentData = (questions, currentInstrument) => {
  const instruments = getInstruments(questions)
  return instruments[currentInstrument] || null
}

export const getInstrumentCompletion = (instrumentQuestions, formData) => {
  const completed = instrumentQuestions.filter(q => formData[q.id]).length
  return (completed / instrumentQuestions.length) * 100
}

export const getOverallCompletion = (questions, formData) => {
  const totalQuestions = questions.length
  const completedQuestions = questions.filter(q => formData[q.id]).length
  return (completedQuestions / totalQuestions) * 100
}

export const getStatusColor = (status) => {
  switch (status) {
    case 'red': return { backgroundColor: '#f8d7da', color: '#721c24' }
    case 'yellow': return { backgroundColor: '#fff3cd', color: '#856404' }
    case 'green': return { backgroundColor: '#d4edda', color: '#155724' }
    default: return { backgroundColor: '#e9ecef', color: '#495057' }
  }
}

export const getPillarExplanation = (pillar, formData, results) => {
  switch (pillar) {
    case 'benefits':
      return {
        title: 'Benefits (A) - Total Protection Available',
        calculation: `$${results?.currentProtection?.toLocaleString() || '0'}`,
        breakdown: [
          `Term Life Insurance: $${(parseFloat(formData.termLifeInsurance) || 0).toLocaleString()}`,
          `Whole Life Insurance: $${(parseFloat(formData.wholeLifeInsurance) || 0).toLocaleString()}`,
          `Group Life Insurance: $${(parseFloat(formData.groupLifeInsurance) || 0).toLocaleString()}`,
          `Traditional 401(k): $${(parseFloat(formData.traditional401k) || 0).toLocaleString()}`,
          `Roth 401(k): $${(parseFloat(formData.roth401k) || 0).toLocaleString()}`,
          `Traditional IRA: $${(parseFloat(formData.traditionalIRA) || 0).toLocaleString()}`,
          `Roth IRA: $${(parseFloat(formData.rothIRA) || 0).toLocaleString()}`,
          `Savings Accounts: $${(parseFloat(formData.savingsAccounts) || 0).toLocaleString()}`,
          `Investment Accounts: $${(parseFloat(formData.investmentAccounts) || 0).toLocaleString()}`,
          `HSA Accounts: $${(parseFloat(formData.hsaAccounts) || 0).toLocaleString()}`,
          `529 Education Savings: $${(parseFloat(formData.educationSavings529) || 0).toLocaleString()}`,
          `Home Value: $${(parseFloat(formData.homeValue) || 0).toLocaleString()}`
        ],
        explanation: 'These are all sources of financial protection available to your family, including insurance payouts, retirement accounts, and other assets that could provide financial support.'
      }
    case 'debt':
      return {
        title: 'Liabilities (B) - Outstanding Obligations',
        calculation: `$${results?.totalDebts?.toLocaleString() || '0'}`,
        breakdown: [
          `Primary Mortgage: $${(parseFloat(formData.primaryMortgage) || 0).toLocaleString()}`,
          `Home Equity Loans: $${(parseFloat(formData.homeEquityLoans) || 0).toLocaleString()}`,
          `Federal Student Loans: $${(parseFloat(formData.federalStudentLoans) || 0).toLocaleString()}`,
          `Private Student Loans: $${(parseFloat(formData.privateStudentLoans) || 0).toLocaleString()}`,
          `Credit Card Debt: $${(parseFloat(formData.creditCardDebt) || 0).toLocaleString()}`,
          `Auto Loans: $${(parseFloat(formData.autoLoans) || 0).toLocaleString()}`,
          `Personal Loans: $${(parseFloat(formData.personalLoans) || 0).toLocaleString()}`
        ],
        explanation: 'Outstanding debts that would need to be paid off to protect your family from financial obligations. Proper planning ensures these don\'t become a burden.'
      }
    case 'tax':
      return {
        title: 'Taxes (C) - Tax Implications',
        calculation: `$${results?.taxImplications?.toLocaleString() || '0'}`,
        breakdown: [
          `Estate Tax (Federal): Estimated based on total estate value`,
          `State Estate Tax: Varies by state of residence`,
          `Income Tax on Benefits: Some life insurance may be taxable`,
          `Retirement Account Taxes: Traditional accounts subject to income tax`,
          `Capital Gains: On investment and real estate sales`
        ],
        explanation: 'Tax implications that could reduce the actual benefit your family receives. Strategic planning can minimize these impacts through proper beneficiary designations and account types.'
      }
    case 'expenses':
      return {
        title: 'Expenses (D) - Monthly Living Costs',
        calculation: `$${results?.monthlyExpensesTotal?.toLocaleString() || '0'} per month`,
        breakdown: [
          `Housing Costs: $${(parseFloat(formData.housingCosts) || 0).toLocaleString()}`,
          `Food & Groceries: $${(parseFloat(formData.foodCosts) || 0).toLocaleString()}`,
          `Transportation: $${(parseFloat(formData.transportationCosts) || 0).toLocaleString()}`,
          `Healthcare: $${(parseFloat(formData.healthcareCosts) || 0).toLocaleString()}`,
          `Education: $${(parseFloat(formData.educationCosts) || 0).toLocaleString()}`,
          `Insurance Premiums: $${(parseFloat(formData.insuranceCosts) || 0).toLocaleString()}`,
          `Utilities: $${(parseFloat(formData.utilitiesCosts) || 0).toLocaleString()}`,
          `Childcare: $${(parseFloat(formData.childcareCosts) || 0).toLocaleString()}`,
          `Entertainment: $${(parseFloat(formData.entertainmentCosts) || 0).toLocaleString()}`,
          `Emergency Fund: $${(parseFloat(formData.emergencyFundContribution) || 0).toLocaleString()}`
        ],
        explanation: 'Monthly expenses that your family would need to continue covering. The protection formula multiplies this by the number of years to determine total funding needed.'
      }
    case 'legal':
      return {
        title: 'Legal Documentation (E) - Estate Planning',
        calculation: `Your legal documents are ${results?.legalScore || 0}% complete`,
        breakdown: [
          `Will & Testament: ${formData.hasWill === 'yes' ? '✅ Current' : formData.hasWill === 'outdated' ? '⚠️ Needs Update' : '❌ Missing'}`,
          `Trust Documents: ${formData.hasTrust === 'yes' ? '✅ Established' : '❌ Not Created'}`,
          `Power of Attorney: ${formData.hasPowerOfAttorney === 'yes' ? '✅ Signed' : '❌ Missing'}`,
          `Healthcare Directives: ${formData.hasHealthcareDirectives === 'yes' ? '✅ Complete' : '❌ Missing'}`,
          'Beneficiary Designations: Review annually for all accounts'
        ],
        explanation: 'Complete documentation protects your family by ensuring your wishes are legally enforceable and reduces administrative burden during difficult times.'
      }
    case 'emergency':
      return {
        title: 'Emergency Fund - Financial Safety Net',
        calculation: `Target: $${((results?.monthlyExpensesTotal || 0) * 6).toLocaleString()} (6 months)`,
        breakdown: [
          `Current Emergency Fund: $${(parseFloat(formData.savingsAccounts) || 0).toLocaleString()}`,
          `Monthly Expenses: $${(results?.monthlyExpensesTotal || 0).toLocaleString()}`,
          `Months Covered: ${results?.monthlyExpensesTotal ? Math.round((parseFloat(formData.savingsAccounts) || 0) / results.monthlyExpensesTotal * 10) / 10 : 0} months`,
          `Recommended: 6 months of expenses`,
          `Gap: $${Math.max(0, ((results?.monthlyExpensesTotal || 0) * 6) - (parseFloat(formData.savingsAccounts) || 0)).toLocaleString()}`
        ],
        explanation: 'An emergency fund provides financial stability during unexpected events like job loss, medical emergencies, or major repairs. This separate safety net ensures your family can maintain their lifestyle without touching life insurance or retirement funds.'
      }
    default:
      return null
  }
}

export const getTileData = (tileId, results, formData) => {
  switch (tileId) {
    case 'summary':
      const protectionStatus = results.protectionGap > 0 ? 'underprotected' : 'protected'
      return {
        title: '📊 Financial Protection Summary',
        mainData: [
          protectionStatus === 'underprotected' ? (
            `Protection Gap: $${results.protectionGap.toLocaleString()}`
          ) : (
            '✅ Fully Protected!'
          )
        ],
        detailItems: (() => {
          const details = getCalculationDetails('protection', results, formData)
          return details.items.map(item => `${item.label}: ${item.value}`)
        })(),
        extraContent: (
          `Formula: A (Benefits) - B (Debts) - C (Taxes) ≥ D (Monthly Expenses) × Years`
        )
      }
    default:
      return null
  }
}

export const getCalculationDetails = (tileId, results, formData) => {
  switch (tileId) {
    case 'benefits':
      const socialSecurityEligible = formData.socialSecurityEligible || 'no'
      const monthlySSBenefit = parseFloat(formData.estimatedSocialSecurityBenefit) || 0
      const ssYearsOfCoverage = parseFloat(formData.socialSecurityYearsOfCoverage) || 0
      const socialSecurityPresentValue = (socialSecurityEligible === 'yes' || socialSecurityEligible === 'spouse') 
        ? monthlySSBenefit * 12 * ssYearsOfCoverage : 0

      return {
        title: 'Benefits Calculation (A)',
        items: [
          { label: 'Term Life Insurance', value: `$${(parseFloat(formData.termLifeInsurance) || 0).toLocaleString()}` },
          { label: 'Whole Life Insurance', value: `$${(parseFloat(formData.wholeLifeInsurance) || 0).toLocaleString()}` },
          { label: 'Group Life Insurance', value: `$${(parseFloat(formData.groupLifeInsurance) || 0).toLocaleString()}` },
          { label: 'Traditional 401(k)', value: `$${(parseFloat(formData.traditional401k) || 0).toLocaleString()}` },
          { label: 'Roth 401(k)', value: `$${(parseFloat(formData.roth401k) || 0).toLocaleString()}` },
          { label: 'HSA Balance', value: `$${(parseFloat(formData.hsaAccounts) || 0).toLocaleString()}` },
          { label: 'Traditional IRA', value: `$${(parseFloat(formData.traditionalIRA) || 0).toLocaleString()}` },
          { label: 'Roth IRA', value: `$${(parseFloat(formData.rothIRA) || 0).toLocaleString()}` },
          { label: 'Investment Accounts', value: `$${(parseFloat(formData.investmentAccounts) || 0).toLocaleString()}` },
          { label: 'Savings Accounts', value: `$${(parseFloat(formData.savingsAccounts) || 0).toLocaleString()}` },
          { label: 'Education Savings 529', value: `$${(parseFloat(formData.educationSavings529) || 0).toLocaleString()}` },
          { label: 'Real Estate Value', value: `$${(parseFloat(formData.homeValue) || 0).toLocaleString()}` },
          { label: 'Social Security Benefits (PV)', value: `$${socialSecurityPresentValue.toLocaleString()}` },
          { label: 'TOTAL BENEFITS (A)', value: `$${results.currentProtection.toLocaleString()}` }
        ]
      }
    case 'debts':
      return {
        title: 'Liabilities Calculation (B)',
        items: [
          { label: 'Primary Mortgage', value: `$${(parseFloat(formData.primaryMortgage) || 0).toLocaleString()}` },
          { label: 'Home Equity Loans', value: `$${(parseFloat(formData.homeEquityLoans) || 0).toLocaleString()}` },
          { label: 'Federal Student Loans', value: `$${(parseFloat(formData.federalStudentLoans) || 0).toLocaleString()}` },
          { label: 'Private Student Loans', value: `$${(parseFloat(formData.privateStudentLoans) || 0).toLocaleString()}` },
          { label: 'Credit Card Debt', value: `$${(parseFloat(formData.creditCardDebt) || 0).toLocaleString()}` },
          { label: 'Auto Loans', value: `$${(parseFloat(formData.autoLoans) || 0).toLocaleString()}` },
          { label: 'Personal Loans', value: `$${(parseFloat(formData.personalLoans) || 0).toLocaleString()}` },
          { label: 'TOTAL DEBTS (B)', value: `$${results.totalDebts.toLocaleString()}` }
        ]
      }
    case 'protection':
      return {
        title: 'Protection Analysis Calculation',
        items: [
          { label: 'Total Debts (B)', value: `$${results.totalDebts.toLocaleString()}` },
          { label: 'Tax Implications (C)', value: `$${results.taxImplications.toLocaleString()}` },
          { label: 'Living Expenses (D × Years)', value: `$${(results.monthlyExpensesTotal * 12 * (parseFloat(formData.yearsToProtect) || 18)).toLocaleString()}` },
          { label: 'Education Costs', value: `$${((parseFloat(formData.dependents) || 0) * 100000).toLocaleString()}` },
          { label: 'Total Protection Needed', value: `$${results.totalProtectionNeeded.toLocaleString()}` },
          { label: 'Current Protection (A)', value: `$${results.currentProtection.toLocaleString()}` },
          { label: 'Protection Gap', value: `$${results.protectionGap.toLocaleString()}` }
        ]
      }
    default:
      return { title: 'Calculation', items: [] }
  }
}
