import { useState } from 'react'
import { questions } from '../data/questions.js'
import { productInfo } from '../data/productInfo.js'
import { calculateFinancialNeeds } from '../utils/calculations.js'
import { getCurrentInstrumentData, getInstruments, getCalculationDetails } from '../utils/appUtils.js'

export const useAppLogic = () => {
  // Form state
  const [currentStep, setCurrentStep] = useState('landing')
  const [currentInstrument, setCurrentInstrument] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  
  // Initialize formData with all question IDs from questions array
  const [formData, setFormData] = useState(() => {
    const initialData = {}
    questions.forEach(question => {
      initialData[question.id] = ''
    })
    return initialData
  })
  const [results, setResults] = useState(null)

  // UI interaction state
  const [flippedTiles, setFlippedTiles] = useState({})
  const [flippedAnalysisTiles, setFlippedAnalysisTiles] = useState({})
  const [flippedPillarTiles, setFlippedPillarTiles] = useState({})
  const [expandedInstruments, setExpandedInstruments] = useState({})
  const [productInfoModal, setProductInfoModal] = useState({ isOpen: false, product: null })

  // Helper function to get instrument progress info
  const getInstrumentProgress = (currentQuestionIndex) => {
    const currentQuestion = questions[currentQuestionIndex]
    const currentInstrument = currentQuestion?.instrument

    // Find all questions for current instrument
    const instrumentQuestions = questions.filter(q => q.instrument === currentInstrument)
    const currentInstrumentIndex = instrumentQuestions.findIndex(q => q.id === currentQuestion.id)

    // Check if this is the first question of a new instrument
    const prevQuestion = currentQuestionIndex > 0 ? questions[currentQuestionIndex - 1] : null
    const isNewInstrument = !prevQuestion || prevQuestion.instrument !== currentInstrument

    return {
      currentInstrument,
      instrumentQuestions: instrumentQuestions.length,
      currentInstrumentIndex: currentInstrumentIndex + 1,
      isNewInstrument,
      isLastInstrumentQuestion: currentInstrumentIndex === instrumentQuestions.length - 1
    }
  }

  // Event handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Extract numerical value from national average text
  const extractNationalAverageValue = (nationalAverageText) => {
    if (!nationalAverageText) return 0

    // Handle special cases with multiple values or calculations
    if (nationalAverageText.includes('personal loans, $429 medical debt')) {
      return 6194 // Use the personal loans amount as primary debt
    }

    // Extract the first dollar amount from the text
    const match = nationalAverageText.match(/\$([0-9,]+)/)
    if (match) {
      return parseInt(match[1].replace(/,/g, ''))
    }

    // Handle monthly amounts (convert to annual if needed)
    const monthlyMatch = nationalAverageText.match(/\$([0-9,]+)\/month/)
    if (monthlyMatch) {
      return parseInt(monthlyMatch[1].replace(/,/g, ''))
    }

    return 0
  }

  // Handle "Use National Average" button click
  const useNationalAverage = (questionId) => {
    const question = questions.find(q => q.id === questionId)
    if (question && question.nationalAverage) {
      const value = extractNationalAverageValue(question.nationalAverage)
      handleInputChange(questionId, value.toString())
    }
  }

  // Toggle functions
  const toggleAnalysisTile = (tileId) => {
    setFlippedAnalysisTiles(prev => ({
      ...prev,
      [tileId]: !prev[tileId]
    }))
  }

  const togglePillarTile = (pillarId) => {
    setFlippedPillarTiles(prev => ({
      ...prev,
      [pillarId]: !prev[pillarId]
    }))
  }

  // Generate comprehensive summary analysis
  const generateSummaryAnalysis = (results) => {
    const { overallScore, status, benefitsScore, debtScore, taxScore, emergencyScore, legalScore } = results
    const totalAssets = results.currentProtection
    const totalDebts = results.totalDebts
    const monthlyIncome = (parseFloat(formData.annualIncome) || 0) / 12
    const monthlyExpenses = results.monthlyExpensesTotal
    const dependents = parseFloat(formData.dependents) || 0

    let analysis = ""
    let strengths = []
    let concerns = []
    let priority = ""

    // Overall status interpretation
    if (overallScore >= 80) {
      analysis = `Excellent financial protection! Your family is well-positioned to weather financial storms. With ${Math.round(overallScore)}% protection coverage, you've built a strong financial foundation that would support your family for ${parseFloat(formData.yearsToProtect) || 18} years if needed.`
      priority = "Focus on optimization and tax-efficient strategies."
    } else if (overallScore >= 60) {
      analysis = `Good financial foundation with room for improvement. Your ${Math.round(overallScore)}% protection score indicates solid planning, but there are important gaps to address to fully secure your family's financial future.`
      priority = "Address the highest-impact gaps first, particularly emergency fund and life insurance."
    } else if (overallScore >= 40) {
      analysis = `Moderate financial protection with significant gaps. Your ${Math.round(overallScore)}% protection score suggests you've started planning, but your family faces substantial financial risk if income is lost.`
      priority = "Focus immediately on emergency fund and basic life insurance coverage."
    } else {
      analysis = `Critical financial protection gaps exist. With only ${Math.round(overallScore)}% protection, your family would face severe financial hardship if your income were lost. Immediate action is essential.`
      priority = "Start with basic emergency fund and term life insurance as top priorities."
    }

    // Analyze strengths
    if (benefitsScore >= 70) strengths.push(`Strong asset base ($${totalAssets.toLocaleString()})`)
    if (debtScore >= 70) strengths.push("Well-managed debt levels")
    if (emergencyScore >= 70) strengths.push("Adequate emergency savings")
    if (legalScore >= 70) strengths.push("Good legal documentation")
    if (monthlyIncome > 0 && monthlyExpenses / monthlyIncome < 0.8) strengths.push("Reasonable spending relative to income")

    // Analyze concerns
    if (benefitsScore < 50) concerns.push("Insufficient life insurance and savings")
    if (debtScore < 50) concerns.push("High debt burden relative to assets")
    if (emergencyScore < 50) concerns.push("Inadequate emergency fund")
    if (legalScore < 50) concerns.push("Missing essential legal documents")
    if (results.protectionGap > totalAssets * 0.5) concerns.push("Large protection gap vs. current assets")

    // Financial ratio analysis
    const debtToAssetRatio = totalAssets > 0 ? (totalDebts / totalAssets) : 0
    const expenseToIncomeRatio = monthlyIncome > 0 ? (monthlyExpenses / monthlyIncome) : 0

    let ratioAnalysis = ""
    if (debtToAssetRatio > 0.8) {
      ratioAnalysis += `Your debt represents ${Math.round(debtToAssetRatio * 100)}% of your assets - this is high and limits financial flexibility. `
    } else if (debtToAssetRatio > 0.5) {
      ratioAnalysis += `Your debt-to-asset ratio of ${Math.round(debtToAssetRatio * 100)}% is manageable but could be improved. `
    }

    if (expenseToIncomeRatio > 0.9) {
      ratioAnalysis += `Your expenses consume ${Math.round(expenseToIncomeRatio * 100)}% of income, leaving little room for savings or emergencies.`
    } else if (expenseToIncomeRatio > 0.8) {
      ratioAnalysis += `Your expenses are ${Math.round(expenseToIncomeRatio * 100)}% of income - consider reducing to build more financial cushion.`
    } else if (expenseToIncomeRatio < 0.7) {
      ratioAnalysis += `Great spending discipline! Your expenses are only ${Math.round(expenseToIncomeRatio * 100)}% of income, creating room for savings.`
    }

    return {
      mainAnalysis: analysis,
      strengths: strengths,
      concerns: concerns,
      priority: priority,
      ratioAnalysis: ratioAnalysis,
      keyNumbers: {
        totalAssets: totalAssets,
        totalDebts: totalDebts,
        netWorth: totalAssets - totalDebts,
        monthlyIncome: monthlyIncome,
        monthlyExpenses: monthlyExpenses,
        protectionGap: results.protectionGap
      }
    }
  }

  // Use national averages for all questions in current instrument
  const useAllNationalAverages = () => {
    const instrumentData = getCurrentInstrumentData(questions, currentInstrument)
    if (instrumentData) {
      instrumentData.questions.forEach(question => {
        if (question.nationalAverage) {
          const value = extractNationalAverageValue(question.nationalAverage)
          handleInputChange(question.id, value.toString())
        }
      })
      // Advance to next section after filling all values
      handleNext()
    }
  }

  const handleNext = () => {
    const instruments = getInstruments(questions)
    if (currentInstrument < instruments.length - 1) {
      setCurrentInstrument(currentInstrument + 1)
    } else {
      // All instruments completed, calculate results
      const calculatedResults = calculateFinancialNeeds(formData)
      setResults(calculatedResults)
      setCurrentStep('results')
    }
  }

  const handleBack = () => {
    if (currentInstrument > 0) {
      setCurrentInstrument(currentInstrument - 1)
    }
  }

  const isCurrentInstrumentComplete = () => {
    const instrumentData = getCurrentInstrumentData(questions, currentInstrument)
    if (!instrumentData) return false

    return instrumentData.questions.every(q => formData[q.id])
  }

  const handleCancelAssessment = () => {
    // Show confirmation dialog before canceling
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel the assessment? All progress will be lost.'
    )

    if (confirmCancel) {
      // Reset form data and return to home
      setFormData({})
      setCurrentInstrument(0)
      setCurrentStep('landing')
      setResults(null)
    }
  }

  const startAssessment = () => {
    setCurrentStep('assessment')
    setCurrentInstrument(0)
  }

  const startOver = () => {
    setCurrentStep('landing')
    setCurrentInstrument(0)
    setFormData({
      income: '',
      expenses: '',
      dependents: '',
      currentInsurance: '',
      emergencyFund: ''
    })
    setResults(null)
  }

  const editAssessment = () => {
    // Go back to assessment mode while preserving all current data
    setCurrentStep('assessment')
    setCurrentInstrument(0) // Start from the first instrument
    setCurrentQuestionIndex(0) // Start from the first question
    // Keep formData and results intact so user can modify and recalculate
  }

  const viewResults = () => {
    // Go to results view while preserving all current data
    setCurrentStep('results')
  }

  // Helper function to prepare analysis tile data
  const prepareAnalysisTileData = () => {
    return {
      benefits: {
        tileKey: 'benefits',
        title: '💰 Benefits (A)',
        color: '#007bff',
        mainValue: `$${results.currentProtection.toLocaleString()}`,
        summaryItems: [
          `Life Insurance: $${results.lifeInsuranceTotal.toLocaleString()}`,
          `Retirement Accounts: $${results.retirementAccountsTotal.toLocaleString()}`,
          `Savings & Investments: $${(results.currentProtection - results.lifeInsuranceTotal - results.retirementAccountsTotal).toLocaleString()}`
        ],
        detailItems: (() => {
          const details = getCalculationDetails('benefits', results, formData)
          const benefitsScoreCalc = [
            ``,
            `BENEFITS SCORE CALCULATION (${results.benefitsScore}%):`,
            `Formula: (Current Protection ÷ Total Protection Needed) × 100`,
            `Calculation: ($${results.currentProtection.toLocaleString()} ÷ $${results.totalProtectionNeeded.toLocaleString()}) × 100`,
            `Protection Coverage Ratio: ${((results.currentProtection / (results.totalProtectionNeeded || 1)) * 100).toFixed(1)}%`,
            `Result: ${results.benefitsScore}% (${results.benefitsScore >= 90 ? 'Excellent' : results.benefitsScore >= 70 ? 'Good' : results.benefitsScore >= 50 ? 'Fair' : 'Needs Attention'})`,
            `Total Protection Needed = Debts + Taxes + Living Expenses + Education Costs`,
            ``
          ]
          return [...details.items.map(item => `${item.label}: ${item.value}`), ...benefitsScoreCalc]
        })()
      },
      debts: {
        tileKey: 'debts',
        title: '💳 Debts (B)',
        color: '#dc3545',
        mainValue: `$${results.totalDebts.toLocaleString()}`,
        summaryItems: [
          `Mortgage & Home Equity: $${((parseFloat(formData.primaryMortgage) || 0) + (parseFloat(formData.homeEquityLoans) || 0)).toLocaleString()}`,
          `Credit Cards: $${(parseFloat(formData.creditCardDebt) || 0).toLocaleString()}`,
          `Student & Auto Loans: $${((parseFloat(formData.federalStudentLoans) || 0) + (parseFloat(formData.privateStudentLoans) || 0) + (parseFloat(formData.autoLoans) || 0) + (parseFloat(formData.personalLoans) || 0)).toLocaleString()}`
        ],
        detailItems: (() => {
          const details = getCalculationDetails('debts', results, formData)
          const debtScoreCalc = [
            ``,
            `DEBT SCORE CALCULATION (${results.debtScore}%):`,
            `Formula: 100 - (Total Debts ÷ Annual Income) × 15`,
            `Calculation: 100 - ($${results.totalDebts.toLocaleString()} ÷ $${(parseFloat(formData.annualIncome) || 0).toLocaleString()}) × 15`,
            `Debt-to-Income Ratio: ${((results.totalDebts / (parseFloat(formData.annualIncome) || 1)) * 100).toFixed(1)}%`,
            `Result: ${results.debtScore}% (${results.debtScore >= 90 ? 'Excellent' : results.debtScore >= 70 ? 'Good' : results.debtScore >= 50 ? 'Fair' : 'Needs Attention'})`,
            ``
          ]
          return [...details.items.map(item => `${item.label}: ${item.value}`), ...debtScoreCalc]
        })()
      },
      expenses: {
        tileKey: 'expenses',
        title: '🏠 Monthly Expenses (D)',
        color: '#28a745',
        mainValue: `$${results.monthlyExpensesTotal.toLocaleString()}`,
        summaryItems: [
          `Housing: $${(parseFloat(formData.housingCosts) || 0).toLocaleString()}`,
          `Food & Transportation: $${((parseFloat(formData.foodExpenses) || 0) + (parseFloat(formData.transportationCosts) || 0)).toLocaleString()}`,
          `Healthcare & Childcare: $${((parseFloat(formData.healthcareCosts) || 0) + (parseFloat(formData.childcareEducation) || 0)).toLocaleString()}`
        ],
        detailItems: [
          `• Housing Costs: $${(parseFloat(formData.housingCosts) || 0).toLocaleString()}/month`,
          `• Food Expenses: $${(parseFloat(formData.foodExpenses) || 0).toLocaleString()}/month`,
          `• Transportation: $${(parseFloat(formData.transportationCosts) || 0).toLocaleString()}/month`,
          `• Healthcare Costs: $${(parseFloat(formData.healthcareCosts) || 0).toLocaleString()}/month`,
          `• Childcare/Education: $${(parseFloat(formData.childcareEducation) || 0).toLocaleString()}/month`
        ],
        extraContent: (
          <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
            <div><strong>Emergency Fund Calculation:</strong></div>
            <div style={{ marginTop: '5px', fontSize: '14px' }}>
              <div>• Target: ${(results.monthlyExpensesTotal * 6).toLocaleString()} (6 months of expenses)</div>
              <div>• Current: ${(parseFloat(formData.savingsAccounts) || 0).toLocaleString()} (from savings accounts)</div>
              <div>• Coverage: {results.monthlyExpensesTotal > 0 ? Math.round(((parseFloat(formData.savingsAccounts) || 0) / results.monthlyExpensesTotal) * 10) / 10 : 0} months</div>
              <div>• Emergency Score: <span style={{ fontWeight: 'bold', color: results.emergencyScore >= 70 ? '#28a745' : results.emergencyScore >= 40 ? '#ffc107' : '#dc3545' }}>{results.emergencyScore}%</span></div>
              {results.emergencyGap > 0 && (
                <div style={{ color: '#dc3545', fontWeight: 'bold' }}>• Gap: ${results.emergencyGap.toLocaleString()}</div>
              )}
            </div>
          </div>
        )
      },
      protection: {
        tileKey: 'protection',
        title: '🛡️ Protection Analysis',
        color: '#6f42c1',
        mainValue: `${Math.round(results.overallScore)}% Protected`,
        summaryItems: [
          `Total Protection Needed: $${results.totalProtectionNeeded.toLocaleString()}`,
          `Current Protection: $${results.currentProtection.toLocaleString()}`,
          results.protectionGap > 0 ? (
            <span style={{ color: '#dc3545', fontWeight: 'bold' }}>
              Protection Gap: ${results.protectionGap.toLocaleString()}
            </span>
          ) : (
            <span style={{ color: '#28a745', fontWeight: 'bold' }}>
              ✅ Fully Protected!
            </span>
          )
        ],
        detailItems: (() => {
          const details = getCalculationDetails('protection', results, formData)
          const overallScoreCalc = [
            ``,
            `OVERALL PROTECTION SCORE CALCULATION (${Math.round(results.overallScore)}%):`,
            `Formula: (Benefits Score + Debt Score + Tax Score + Legal Score + Emergency Score) ÷ 5`,
            `Calculation: (${results.benefitsScore}% + ${results.debtScore}% + ${results.taxScore}% + ${results.legalScore}% + ${results.emergencyScore}%) ÷ 5`,
            `Individual Scores:`,
            `  • Benefits Coverage: ${results.benefitsScore}%`,
            `  • Liabilities: ${results.debtScore}%`, 
            `  • Taxes: ${results.taxScore}%`,
            `  • Legal Documentation: ${results.legalScore}%`,
            `  • Emergency Fund: ${results.emergencyScore}%`,
            `Average Score: ${Math.round(results.overallScore)}%`,
            `Status: ${results.statusText} (${Math.round(results.overallScore) >= 80 ? 'Excellent' : Math.round(results.overallScore) >= 60 ? 'Good' : Math.round(results.overallScore) >= 40 ? 'Fair' : 'Critical Gaps'})`,
            ``
          ]
          return [...details.items.map(item => `${item.label}: ${item.value}`), ...overallScoreCalc]
        })(),
        extraContent: (
          <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
            <strong>Formula:</strong> A (Benefits) - B (Debts) - C (Taxes) ≥ D (Monthly Expenses) × Years
          </div>
        )
      },
      taxes: {
        tileKey: 'taxes',
        title: '🏛️ Taxes (C)',
        color: '#fd7e14',
        mainValue: `${results.taxScore}% Tax Efficiency`,
        summaryItems: [
          `Traditional 401(k): $${(parseFloat(formData.traditional401k) || 0).toLocaleString()}`,
          `Traditional IRA: $${(parseFloat(formData.traditionalIRA) || 0).toLocaleString()}`,
          `Tax Impact: $${((parseFloat(formData.traditional401k) || 0) + (parseFloat(formData.traditionalIRA) || 0)) * 0.25}` 
        ],
        detailItems: (() => {
          const traditionalTotal = (parseFloat(formData.traditional401k) || 0) + (parseFloat(formData.traditionalIRA) || 0)
          const annualIncome = parseFloat(formData.annualIncome) || 0
          const taxScoreCalc = [
            `Traditional 401(k): $${(parseFloat(formData.traditional401k) || 0).toLocaleString()}`,
            `Traditional IRA: $${(parseFloat(formData.traditionalIRA) || 0).toLocaleString()}`,
            `Total Traditional Accounts: $${traditionalTotal.toLocaleString()}`,
            `Estimated Tax Impact (25%): $${(traditionalTotal * 0.25).toLocaleString()}`,
            ``,
            `TAX SCORE CALCULATION (${results.taxScore}%):`,
            `Formula: (Traditional Retirement Accounts ÷ Annual Income) × 90`,
            `Calculation: ($${traditionalTotal.toLocaleString()} ÷ $${annualIncome.toLocaleString()}) × 90`,
            `Retirement-to-Income Ratio: ${annualIncome > 0 ? ((traditionalTotal / annualIncome) * 100).toFixed(1) : 0}%`,
            `Result: ${results.taxScore}% (${results.taxScore >= 70 ? 'Excellent' : results.taxScore >= 50 ? 'Good' : results.taxScore >= 30 ? 'Fair' : 'Needs Attention'})`,
            `Note: Higher traditional retirement savings relative to income indicates better tax-deferred growth potential.`,
            ``
          ]
          return taxScoreCalc
        })()
      }
    }
  }

  // Tile interaction handlers
  const handleTileFlip = (pillarKey) => {
    setFlippedTiles(prev => ({
      ...prev,
      [pillarKey]: !prev[pillarKey]
    }))
  }

  const handleInstrumentExpand = (pillarKey, instrumentIndex) => {
    const key = `${pillarKey}-${instrumentIndex}`
    setExpandedInstruments(prev => {
      // Close all other expanded instruments and only open the clicked one
      const isCurrentlyExpanded = prev[key]
      return isCurrentlyExpanded ? {} : { [key]: true }
    })
  }

  const handleProductInfo = (productName) => {
    const product = productInfo[productName]
    if (product) {
      setProductInfoModal({ isOpen: true, product })
    } else {
      // Show generic information for products without detailed info
      const genericProduct = {
        name: productName,
        description: `${productName} is an important financial product for family protection.`,
        howItWorks: 'Detailed information about this product is coming soon. Please consult with a financial advisor for specific guidance.',
        pros: ['Important for financial planning', 'Can provide family protection'],
        cons: ['Detailed information not yet available'],
        bestFor: 'Families looking to enhance their financial security'
      }
      setProductInfoModal({ isOpen: true, product: genericProduct })
    }
  }

  const closeProductInfo = () => {
    setProductInfoModal({ isOpen: false, product: null })
  }

  return {
    // State
    currentStep,
    setCurrentStep,
    currentInstrument,
    setCurrentInstrument,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    formData,
    setFormData,
    results,
    setResults,
    flippedTiles,
    flippedAnalysisTiles,
    flippedPillarTiles,
    expandedInstruments,
    productInfoModal,
    
    // Helper functions
    getInstrumentProgress,
    extractNationalAverageValue,
    prepareAnalysisTileData,
    generateSummaryAnalysis,
    
    // Event handlers
    handleInputChange,
    useNationalAverage,
    toggleAnalysisTile,
    togglePillarTile,
    useAllNationalAverages,
    handleNext,
    handleBack,
    isCurrentInstrumentComplete,
    handleCancelAssessment,
    startAssessment,
    startOver,
    editAssessment,
    viewResults,
    handleTileFlip,
    handleInstrumentExpand,
    handleProductInfo,
    closeProductInfo
  }
}
