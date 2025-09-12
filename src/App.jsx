import React, { useState } from 'react'
import { questions } from './data/questions.js'
import { pillarData } from './data/pillarData.js'
import { productInfo } from './data/productInfo.js'
import { calculateFinancialNeeds } from './utils/calculations.js'

export default function App() {
  // Form state
  const [currentStep, setCurrentStep] = useState('landing') // landing, assessment, results
  const [currentInstrument, setCurrentInstrument] = useState(0) // Track current subpillar instrument
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0) // Track current question within instrument
  const [formData, setFormData] = useState({
    income: '',
    expenses: '',
    dependents: '',
    currentInsurance: '',
    emergencyFund: ''
  })
  const [results, setResults] = useState(null)
  
  // Home page interaction state
  const [flippedTiles, setFlippedTiles] = useState({})
  const [flippedAnalysisTiles, setFlippedAnalysisTiles] = useState({})
  const [flippedPillarTiles, setFlippedPillarTiles] = useState({})
  const [expandedInstruments, setExpandedInstruments] = useState({})
  const [productInfoModal, setProductInfoModal] = useState({ isOpen: false, product: null })

  // Enhanced assessment questions grouped by instrument (subpillar)

  // Detailed pillar data with instruments

  // Detailed product information database

  // Enhanced financial calculations using instrument-level detail

  // Get unique instruments in order
  const getInstruments = () => {
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

  // Get current instrument data
  const getCurrentInstrumentData = () => {
    const instruments = getInstruments()
    return instruments[currentInstrument] || null
  }

  // Calculate completion percentage for current instrument
  const getInstrumentCompletion = (instrumentQuestions) => {
    const completed = instrumentQuestions.filter(q => formData[q.id]).length
    return (completed / instrumentQuestions.length) * 100
  }

  // Calculate overall completion percentage
  const getOverallCompletion = () => {
    const completed = questions.filter(q => formData[q.id]).length
    return (completed / questions.length) * 100
  }

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

  // Toggle analysis tile flip
  const toggleAnalysisTile = (tileId) => {
    setFlippedAnalysisTiles(prev => ({
      ...prev,
      [tileId]: !prev[tileId]
    }))
  }

  // Toggle pillar tile flip
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

  // Get pillar percentage explanations
  const getPillarExplanation = (pillarId, results) => {
    switch (pillarId) {
      case 'benefits':
        return {
          title: '💰 Benefits Score Explanation',
          calculation: `Your benefits coverage is ${results.benefitsScore}% of optimal protection`,
          breakdown: [
            `Life Insurance: $${(parseFloat(formData.termLifeInsurance) || 0) + (parseFloat(formData.wholeLifeInsurance) || 0) + (parseFloat(formData.groupLifeInsurance) || 0)}`,
            `Retirement Accounts: $${(parseFloat(formData.traditional401k) || 0) + (parseFloat(formData.roth401k) || 0) + (parseFloat(formData.traditionalIRA) || 0) + (parseFloat(formData.rothIRA) || 0)}`,
            `Savings & Investments: $${(parseFloat(formData.savingsAccounts) || 0) + (parseFloat(formData.investmentAccounts) || 0) + (parseFloat(formData.hsaAccounts) || 0) + (parseFloat(formData.educationSavings529) || 0)}`,
            `Real Estate Value: $${parseFloat(formData.homeValue) || 0}`
          ],
          explanation: 'This score measures how well your current assets would protect your family. Higher scores mean better protection coverage.'
        }
      case 'debt':
        return {
          title: '💳 Debt Management Score Explanation',
          calculation: `Your debt management is ${results.debtScore}% optimized`,
          breakdown: [
            `Mortgage Debt: $${(parseFloat(formData.primaryMortgage) || 0) + (parseFloat(formData.homeEquityLoans) || 0)}`,
            `Credit Card Debt: $${parseFloat(formData.creditCardDebt) || 0}`,
            `Student Loans: $${(parseFloat(formData.federalStudentLoans) || 0) + (parseFloat(formData.privateStudentLoans) || 0)}`,
            `Auto & Personal Loans: $${(parseFloat(formData.autoLoans) || 0) + (parseFloat(formData.personalLoans) || 0)}`
          ],
          explanation: 'Lower debt levels mean more resources available for family protection. Focus on paying down high-interest debt first.'
        }
      case 'tax':
        return {
          title: '🏛️ Tax Planning Score Explanation',
          calculation: `Your tax efficiency is ${results.taxScore}% optimized`,
          breakdown: [
            'Tax-advantaged accounts reduce family tax burden',
            'Estate planning minimizes transfer taxes',
            'Strategic asset location improves after-tax returns',
            'Roth accounts provide tax-free income for survivors'
          ],
          explanation: 'Effective tax planning preserves more wealth for your family by minimizing unnecessary tax obligations.'
        }
      case 'emergency':
        return {
          title: '🏠 Emergency Fund Score Explanation',
          calculation: `Your emergency fund covers ${results.emergencyScore}% of recommended 6-month expenses`,
          breakdown: [
            `Monthly Expenses: $${results.monthlyExpensesTotal.toLocaleString()}`,
            `6-Month Target: $${(results.monthlyExpensesTotal * 6).toLocaleString()}`,
            `Current Emergency Fund: $${parseFloat(formData.emergencyFund) || 0}`,
            `Gap: $${Math.max(0, (results.monthlyExpensesTotal * 6) - (parseFloat(formData.emergencyFund) || 0)).toLocaleString()}`
          ],
          explanation: 'Emergency funds provide immediate financial stability when income is disrupted, preventing debt accumulation.'
        }
      case 'legal':
        return {
          title: '📋 Legal Planning Score Explanation',
          calculation: `Your legal documents are ${results.legalScore}% complete`,
          breakdown: [
            `Will: ${formData.hasWill === 'yes' ? '✅ Complete (25%)' : formData.hasWill === 'outdated' ? '⚠️ Outdated (15%)' : '❌ Missing (0%)'}`,
            `Trust: ${formData.hasTrust === 'yes' ? '✅ Complete (25%)' : '❌ Missing (0%)'}`,
            `Power of Attorney: ${formData.hasPowerOfAttorney === 'yes' ? '✅ Complete (25%)' : '❌ Missing (0%)'}`,
            `Healthcare Directives: ${formData.hasHealthcareDirectives === 'yes' ? '✅ Complete (25%)' : '❌ Missing (0%)'}`
          ],
          explanation: 'Proper legal documents ensure your wishes are followed and reduce administrative costs for your family.'
        }
      case 'documentation':
        return {
          title: '📋 Documentation Score Explanation',
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
      default:
        return null
    }
  }

  // Get calculation details for each tile
  const getCalculationDetails = (tileId, results) => {
    switch (tileId) {
      case 'benefits':
        return {
          title: 'Benefits Calculation (A)',
          items: [
            { label: 'Term Life Insurance', value: `$${(parseFloat(formData.termLifeInsurance) || 0).toLocaleString()}` },
            { label: 'Whole Life Insurance', value: `$${(parseFloat(formData.wholeLifeInsurance) || 0).toLocaleString()}` },
            { label: 'Group Life Insurance', value: `$${(parseFloat(formData.groupLifeInsurance) || 0).toLocaleString()}` },
            { label: '401(k) Balance', value: `$${(parseFloat(formData.employerRetirement) || 0).toLocaleString()}` },
            { label: 'HSA Balance', value: `$${(parseFloat(formData.healthSavingsAccount) || 0).toLocaleString()}` },
            { label: 'IRA Balance', value: `$${(parseFloat(formData.traditionalIRA) || 0).toLocaleString()}` },
            { label: 'Roth IRA Balance', value: `$${(parseFloat(formData.rothIRA) || 0).toLocaleString()}` },
            { label: 'Savings Accounts', value: `$${(parseFloat(formData.savingsAccounts) || 0).toLocaleString()}` },
            { label: 'Investment Accounts', value: `$${(parseFloat(formData.investmentAccounts) || 0).toLocaleString()}` },
            { label: 'Home Value', value: `$${(parseFloat(formData.primaryResidence) || 0).toLocaleString()}` }
          ]
        }
      case 'debts':
        return {
          title: 'Debts Calculation (B)',
          items: [
            { label: 'Primary Mortgage', value: `$${(parseFloat(formData.primaryMortgage) || 0).toLocaleString()}` },
            { label: 'Home Equity Loans', value: `$${(parseFloat(formData.homeEquityLoans) || 0).toLocaleString()}` },
            { label: 'Credit Card Debt', value: `$${(parseFloat(formData.creditCardDebt) || 0).toLocaleString()}` },
            { label: 'Federal Student Loans', value: `$${(parseFloat(formData.federalStudentLoans) || 0).toLocaleString()}` },
            { label: 'Private Student Loans', value: `$${(parseFloat(formData.privateStudentLoans) || 0).toLocaleString()}` },
            { label: 'Auto Loans', value: `$${(parseFloat(formData.autoLoans) || 0).toLocaleString()}` },
            { label: 'Other Debts', value: `$${(parseFloat(formData.otherDebts) || 0).toLocaleString()}` }
          ]
        }
      case 'expenses':
        return {
          title: 'Monthly Expenses Calculation (D)',
          items: [
            { label: 'Housing Costs', value: `$${(parseFloat(formData.housingCosts) || 0).toLocaleString()}/month` },
            { label: 'Food Expenses', value: `$${(parseFloat(formData.foodExpenses) || 0).toLocaleString()}/month` },
            { label: 'Transportation', value: `$${(parseFloat(formData.transportationCosts) || 0).toLocaleString()}/month` },
            { label: 'Healthcare Costs', value: `$${(parseFloat(formData.healthcareCosts) || 0).toLocaleString()}/month` },
            { label: 'Childcare/Education', value: `$${(parseFloat(formData.childcareEducation) || 0).toLocaleString()}/month` },
            { label: 'Total Monthly', value: `$${results.monthlyExpensesTotal.toLocaleString()}/month` },
            { label: 'Annual Expenses', value: `$${(results.monthlyExpensesTotal * 12).toLocaleString()}/year` }
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

  // Use national averages for all questions in current instrument
  const useAllNationalAverages = () => {
    const instrumentData = getCurrentInstrumentData()
    if (instrumentData) {
      instrumentData.questions.forEach(question => {
        if (question.nationalAverage) {
          const value = extractNationalAverageValue(question.nationalAverage)
          handleInputChange(question.id, value.toString())
        }
      })
    }
  }

  const handleNext = () => {
    const instruments = getInstruments()
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
    const instrumentData = getCurrentInstrumentData()
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

  // Render pillar card with flip functionality
  const renderPillarCard = (pillarKey, pillarInfo) => {
    const isFlipped = flippedTiles[pillarKey]
    
    return (
      <div key={pillarKey} style={styles.pillarCardContainer}>
        <div 
          style={{
            ...styles.pillarCard,
            ...(isFlipped ? styles.pillarCardFlipped : {}),
            cursor: 'pointer'
          }}
          onClick={() => handleTileFlip(pillarKey)}
        >
          {!isFlipped ? (
            // Front side - summary view
            <>
              <div style={styles.pillarIcon}>{pillarInfo.icon}</div>
              <h4 style={styles.pillarTitle}>{pillarInfo.title}</h4>
              <div style={styles.pillarList}>
                {pillarInfo.summary.map((item, index) => (
                  <div key={index} style={styles.pillarListItem}>
                    <span style={styles.pillarBullet}>•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p style={styles.flipHint}>Click to see details</p>
            </>
          ) : (
            // Back side - detailed instruments
            <div style={styles.pillarDetailView}>
              <div style={styles.pillarDetailHeader}>
                <span style={styles.pillarIcon}>{pillarInfo.icon}</span>
                <h4 style={styles.pillarTitle}>{pillarInfo.title}</h4>
              </div>
              <div style={styles.instrumentsList}>
                {pillarInfo.instruments.map((instrument, index) => {
                  const expandKey = `${pillarKey}-${index}`
                  const isExpanded = expandedInstruments[expandKey]
                  
                  return (
                    <div key={index} style={styles.instrumentItem}>
                      <div 
                        style={styles.instrumentHeader}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleInstrumentExpand(pillarKey, index)
                        }}
                      >
                        <span style={styles.instrumentName}>{instrument.name}</span>
                        <span style={styles.expandIcon}>
                          {isExpanded ? '−' : '+'}
                        </span>
                      </div>
                      {isExpanded && (
                        <div style={styles.instrumentDetails}>
                          <p style={styles.instrumentDescription}>
                            {instrument.description}
                          </p>
                          <div style={styles.relatedProducts}>
                            <strong>Related Products:</strong>
                            <div style={styles.productsList}>
                              {instrument.relatedProducts.map((product, idx) => (
                                <div key={idx} style={styles.productItem}>
                                  <span style={styles.bulletPoint}>•</span>
                                  <span style={styles.productName}>{product}</span>
                                  <button
                                    style={styles.infoIcon}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleProductInfo(product)
                                    }}
                                    title={`Learn more about ${product}`}
                                  >
                                    ℹ️
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              <p style={styles.flipHint}>Click anywhere to go back</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const printResults = () => {
    // Enhanced function to clean text for PDF compatibility
    const cleanTextForPDF = (text) => {
      if (!text) return '';
      
      return text
        // First handle the þ character specifically
        .replace(/þ/g, '')
        // Remove all emojis and special symbols - comprehensive ranges
        .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]/gu, '')
        // Additional emoji ranges
        .replace(/[\u{1F004}\u{1F0CF}\u{1F170}-\u{1F251}]/gu, '')
        // Remove shield emoji specifically (🛡️)
        .replace(/🛡️?/g, '')
        // Remove other problematic Unicode characters
        .replace(/[\u{2000}-\u{206F}]|[\u{2E00}-\u{2E7F}]|[\u{3000}-\u{303F}]/gu, ' ')
        // Remove variation selectors that can cause issues
        .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
        // Replace bullet points and special characters
        .replace(/[•·▪▫◦‣⁃]/g, '-')
        // Replace smart quotes with regular quotes
        .replace(/[""]/g, '"')
        .replace(/['']/g, "'")
        // Replace em/en dashes with regular hyphens
        .replace(/[–—]/g, '-')
        // Fix broken spacing by normalizing whitespace
        .replace(/\s+/g, ' ')
        // Remove any remaining non-ASCII characters that could cause issues
        .replace(/[^\x00-\x7F]/g, '')
        .trim();
    };

    // Generate PDF using jsPDF
    try {
      // Dynamic import of jsPDF to avoid bundle size issues
      import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js').then(() => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Set up document properties
        doc.setProperties({
          title: 'Family Financial Shield Assessment Results',
          creator: 'Family Financial Shield',
          author: 'Financial Assessment Tool'
        });
        
        // Title and header with proper spacing
        doc.setFontSize(22);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 123, 255); // Blue color
        doc.text('Family Financial Shield', 20, 25);
        
        doc.setFontSize(16);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0); // Black color
        doc.text('Your Family Financial Protection Assessment', 20, 40);
        
        doc.setFontSize(10);
        doc.setTextColor(102, 102, 102); // Gray color
        doc.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 20, 50);
        
        // Status Badge
        let yPosition = 65;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        const statusColor = results?.status === 'green' ? [40, 167, 69] : results?.status === 'yellow' ? [255, 193, 7] : [220, 53, 69];
        doc.setFillColor(...statusColor);
        doc.rect(20, yPosition - 5, 170, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text(`${results?.statusText || 'Not calculated'} - ${Math.round(results?.overallScore || 0)}% Protected`, 25, yPosition + 5);
        
        // Five Pillar Analysis
        yPosition += 25;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.text('Five Pillar Analysis', 20, yPosition);
        
        yPosition += 10;
        doc.setFontSize(10);
        
        const pillars = [
          { name: 'Benefits', score: results?.benefitsScore || 0 },
          { name: 'Debt Management', score: results?.debtScore || 0 },
          { name: 'Tax Planning', score: results?.taxScore || 0 },
          { name: 'Emergency Fund', score: results?.emergencyScore || 0 },
          { name: 'Legal Planning', score: results?.legalScore || 0 }
        ];
        
        pillars.forEach((pillar, index) => {
          const xPos = 20 + (index % 3) * 60;
          const yPos = yPosition + Math.floor(index / 3) * 20;
          
          doc.text(pillar.name, xPos, yPos);
          doc.text(`${pillar.score}%`, xPos, yPos + 8);
          
          // Score bar
          const barWidth = 40;
          const fillWidth = (pillar.score / 100) * barWidth;
          const barColor = pillar.score >= 70 ? [40, 167, 69] : pillar.score >= 40 ? [255, 193, 7] : [220, 53, 69];
          
          doc.setDrawColor(200, 200, 200);
          doc.rect(xPos, yPos + 10, barWidth, 3);
          doc.setFillColor(...barColor);
          doc.rect(xPos, yPos + 10, fillWidth, 3, 'F');
        });
        
        // Key Financial Numbers
        yPosition += 60;
        doc.setFontSize(14);
        doc.text('Key Financial Numbers', 20, yPosition);
        
        yPosition += 10;
        doc.setFontSize(10);
        
        const financialData = [
          ['Current Protection:', `$${(results?.currentProtection || 0).toLocaleString()}`],
          ['Total Protection Needed:', `$${(results?.totalProtectionNeeded || 0).toLocaleString()}`],
          ['Protection Gap:', `$${(results?.protectionGap || 0).toLocaleString()}`],
          ['Emergency Fund Gap:', `$${(results?.emergencyGap || 0).toLocaleString()}`]
        ];
        
        financialData.forEach((item, index) => {
          const yPos = yPosition + (index * 8);
          doc.text(item[0], 20, yPos);
          doc.text(item[1], 120, yPos);
        });

        // Summary Analysis Section
        yPosition += 50;
        doc.setFontSize(14);
        doc.text('Financial Health Summary', 20, yPosition);
        
        yPosition += 10;
        doc.setFontSize(10);
        
        // Generate summary for PDF
        const summary = generateSummaryAnalysis(results);
        
        // Main analysis paragraph
        const mainAnalysisLines = doc.splitTextToSize(cleanTextForPDF(summary.mainAnalysis), 170);
        mainAnalysisLines.forEach((line, index) => {
          doc.text(line, 20, yPosition + (index * 6));
        });
        yPosition += (mainAnalysisLines.length * 6) + 10;
        
        // Check for page break
        if (yPosition > 240) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Strengths section
        if (summary.strengths.length > 0) {
          doc.setFont(undefined, 'bold');
          doc.text('Financial Strengths:', 20, yPosition);
          doc.setFont(undefined, 'normal');
          yPosition += 8;
          
          summary.strengths.forEach((strength, index) => {
            const strengthLines = doc.splitTextToSize(`• ${cleanTextForPDF(strength)}`, 170);
            strengthLines.forEach((line, lineIndex) => {
              doc.text(line, 25, yPosition + (lineIndex * 5));
            });
            yPosition += (strengthLines.length * 5) + 2;
          });
          yPosition += 5;
        }
        
        // Check for page break
        if (yPosition > 240) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Concerns section
        if (summary.concerns.length > 0) {
          doc.setFont(undefined, 'bold');
          doc.text('Areas of Concern:', 20, yPosition);
          doc.setFont(undefined, 'normal');
          yPosition += 8;
          
          summary.concerns.forEach((concern, index) => {
            const concernLines = doc.splitTextToSize(`• ${cleanTextForPDF(concern)}`, 170);
            concernLines.forEach((line, lineIndex) => {
              doc.text(line, 25, yPosition + (lineIndex * 5));
            });
            yPosition += (concernLines.length * 5) + 2;
          });
          yPosition += 5;
        }
        
        // Check for page break
        if (yPosition > 240) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Ratio analysis
        if (summary.ratioAnalysis) {
          doc.setFont(undefined, 'bold');
          doc.text('Financial Ratio Analysis:', 20, yPosition);
          doc.setFont(undefined, 'normal');
          yPosition += 8;
          
          const ratioLines = doc.splitTextToSize(cleanTextForPDF(summary.ratioAnalysis), 170);
          ratioLines.forEach((line, index) => {
            doc.text(line, 20, yPosition + (index * 5));
          });
          yPosition += (ratioLines.length * 5) + 8;
        }
        
        // Priority focus
        doc.setFont(undefined, 'bold');
        doc.text('Priority Focus:', 20, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 8;
        
        const priorityLines = doc.splitTextToSize(cleanTextForPDF(summary.priority), 170);
        priorityLines.forEach((line, index) => {
          doc.text(line, 20, yPosition + (index * 5));
        });
        yPosition += (priorityLines.length * 5) + 15;

        // Action Items
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Prioritized Action Items', 20, yPosition);
        
        yPosition += 10;
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        
        results?.actionItems?.slice(0, 8).forEach((item, index) => {
          const yPos = yPosition + (index * 12);
          const cleanItem = cleanTextForPDF(item);
          
          // Check if we need a new page
          if (yPos > 270) {
            doc.addPage();
            yPosition = 20;
            const newYPos = yPosition + (index * 12);
            
            // Wrap long text
            const lines = doc.splitTextToSize(`${index + 1}. ${cleanItem}`, 170);
            lines.forEach((line, lineIndex) => {
              doc.text(line, 20, newYPos + (lineIndex * 6));
            });
          } else {
            // Wrap long text
            const lines = doc.splitTextToSize(`${index + 1}. ${cleanItem}`, 170);
            lines.forEach((line, lineIndex) => {
              doc.text(line, 20, yPos + (lineIndex * 6));
            });
          }
        });
        
        // Footer
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setTextColor(102, 102, 102);
          doc.text('Disclaimer: This assessment is for educational purposes only and is not financial advice.', 20, 285);
          doc.text('Please consult with a licensed financial advisor for personalized recommendations.', 20, 290);
          doc.text(`Family Financial Shield | Page ${i} of ${pageCount}`, 20, 295);
        }
        
        // Generate and download PDF
        const filename = `Family-Financial-Assessment-${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(filename);
        
      }).catch(error => {
        console.error('Error loading jsPDF:', error);
        // Fallback to simple text download
        fallbackTextDownload();
      });
      
    } catch (error) {
      console.error('PDF generation error:', error);
      fallbackTextDownload();
    }
  };
  
  const fallbackTextDownload = () => {
    // Function to remove emojis for better compatibility
    // Fallback: Generate a text file with results
    const textContent = `
FAMILY FINANCIAL SHIELD ASSESSMENT RESULTS
Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}

OVERALL STATUS: ${results?.statusText || 'Not calculated'} - ${Math.round(results?.overallScore || 0)}% Protected

FIVE PILLAR ANALYSIS:
• Benefits: ${results?.benefitsScore || 0}%
• Debt Management: ${results?.debtScore || 0}%
• Tax Planning: ${results?.taxScore || 0}%
• Emergency Fund: ${results?.emergencyScore || 0}%
• Legal Planning: ${results?.legalScore || 0}%

KEY FINANCIAL NUMBERS:
• Current Protection: $${(results?.currentProtection || 0).toLocaleString()}
• Total Protection Needed: $${(results?.totalProtectionNeeded || 0).toLocaleString()}
• Protection Gap: $${(results?.protectionGap || 0).toLocaleString()}
• Emergency Fund Gap: $${(results?.emergencyGap || 0).toLocaleString()}

PRIORITIZED ACTION ITEMS:
${(results?.actionItems || []).map((item, index) => `${index + 1}. ${cleanTextForPDF(item)}`).join('\n')}

DISCLAIMER:
This assessment is for educational purposes only and is not financial advice.
Please consult with a licensed financial advisor for personalized recommendations.

Family Financial Shield | Financial Protection Assessment Tool
Visit: https://delightful-ocean-0f14ce90f.1.azurestaticapps.net
`;
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Family-Financial-Assessment-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Styles
  const styles = {
    container: {
      maxWidth: currentStep === 'landing' ? '1000px' : '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.5'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '30px',
      padding: '10px 0'
    },
    logo: {
      height: '48px',
      width: 'auto',
      marginRight: '15px'
    },
    headerTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
      margin: 0
    },
    hero: {
      textAlign: 'center',
      marginBottom: '50px',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      borderRadius: '12px',
      border: '1px solid #dee2e6'
    },
    heroTitle: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '16px',
      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
    },
    heroSubtitle: {
      fontSize: '20px',
      color: '#34495e',
      marginBottom: '24px',
      fontWeight: '500'
    },
    heroDescription: {
      fontSize: '16px',
      color: '#5a6c7d',
      lineHeight: '1.7',
      marginBottom: '0',
      maxWidth: '700px',
      margin: '0 auto'
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
      marginRight: '10px'
    },
    secondaryButton: {
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
      marginRight: '10px'
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '2px solid #ddd',
      borderRadius: '6px',
      marginTop: '10px',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '2px solid #ddd',
      borderRadius: '6px',
      marginTop: '10px',
      boxSizing: 'border-box',
      backgroundColor: 'white',
      cursor: 'pointer'
    },
    progress: {
      marginBottom: '30px',
      textAlign: 'center'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e9ecef',
      borderRadius: '4px',
      overflow: 'hidden',
      margin: '10px 0'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#007bff',
      transition: 'width 0.3s ease'
    },
    statusBadge: {
      padding: '10px 20px',
      borderRadius: '20px',
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '20px 0'
    },
    actionItem: {
      padding: '10px',
      backgroundColor: '#f8f9fa',
      borderLeft: '4px solid #007bff',
      margin: '10px 0',
      borderRadius: '4px'
    },
    formulaSection: {
      margin: '40px 0',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      textAlign: 'center'
    },
    formulaBox: {
      padding: '15px',
      backgroundColor: 'white',
      borderRadius: '6px',
      border: '2px solid #007bff',
      display: 'inline-block'
    },
    formulaText: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#007bff',
      fontFamily: 'monospace'
    },
    pillarsSection: {
      margin: '40px 0'
    },
    pillarsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    pillarCard: {
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef',
      textAlign: 'center'
    },
    pillarIcon: {
      fontSize: '32px',
      marginBottom: '15px'
    },
    pillarTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '15px',
      margin: '0 0 15px 0'
    },
    pillarList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      fontSize: '14px',
      color: '#666'
    },
    pillarListItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '6px',
      paddingLeft: '0'
    },
    pillarBullet: {
      color: '#007bff',
      marginRight: '8px',
      fontSize: '12px'
    },
    processSection: {
      margin: '40px 0',
      padding: '30px',
      backgroundColor: '#e7f3ff',
      borderRadius: '8px'
    },
    processSteps: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    processStep: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      fontSize: '16px'
    },
    stepNumber: {
      backgroundColor: '#007bff',
      color: 'white',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      flexShrink: 0
    },
    disclaimer: {
      margin: '30px 0',
      padding: '15px',
      backgroundColor: '#fff3cd',
      borderRadius: '6px',
      border: '1px solid #ffeaa7'
    },
    pillarCardContainer: {
      perspective: '1000px'
    },
    pillarCardFlipped: {
      backgroundColor: '#f8f9fa',
      minHeight: '400px',
      maxHeight: '500px',
      overflow: 'auto'
    },
    flipHint: {
      fontSize: '12px',
      color: '#6c757d',
      fontStyle: 'italic',
      marginTop: '10px',
      margin: '10px 0 0 0'
    },
    pillarDetailView: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    pillarDetailHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '15px',
      borderBottom: '2px solid #007bff',
      paddingBottom: '10px'
    },
    instrumentsList: {
      flex: 1,
      overflow: 'auto'
    },
    instrumentItem: {
      marginBottom: '10px',
      border: '1px solid #dee2e6',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    instrumentHeader: {
      padding: '10px',
      backgroundColor: '#e9ecef',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: 'bold'
    },
    instrumentName: {
      color: '#333'
    },
    expandIcon: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#007bff'
    },
    instrumentDetails: {
      padding: '15px',
      backgroundColor: 'white'
    },
    instrumentDescription: {
      fontSize: '13px',
      color: '#666',
      marginBottom: '10px',
      lineHeight: '1.4',
      margin: '0 0 10px 0'
    },
    relatedProducts: {
      fontSize: '12px'
    },
    productsList: {
      margin: '8px 0 0 0'
    },
    productItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '4px',
      color: '#666',
      fontSize: '12px',
      textAlign: 'left'
    },
    productName: {
      flex: 1,
      marginLeft: '0'
    },
    bulletPoint: {
      color: '#007bff',
      fontWeight: 'bold',
      marginRight: '8px',
      width: '12px',
      textAlign: 'center',
      fontSize: '14px',
      lineHeight: '1'
    },
    infoIcon: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      marginLeft: '6px',
      padding: '2px',
      fontSize: '12px',
      opacity: 0.7,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '18px',
      height: '18px'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '8px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '80vh',
      overflow: 'auto',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
    },
    modalHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 20px 10px 20px',
      borderBottom: '2px solid #007bff'
    },
    modalTitle: {
      margin: 0,
      color: '#333',
      fontSize: '20px'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#666',
      padding: '0',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalBody: {
      padding: '20px'
    },
    modalSection: {
      marginBottom: '20px'
    },
    sectionTitle: {
      margin: '0 0 8px 0',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#007bff'
    },
    sectionText: {
      margin: '0',
      lineHeight: '1.5',
      color: '#333'
    },
    proConsList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    proItem: {
      color: '#28a745',
      marginBottom: '4px',
      fontSize: '14px'
    },
    conItem: {
      color: '#dc3545',
      marginBottom: '4px',
      fontSize: '14px'
    },
    pillarScore: {
      textAlign: 'center',
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '6px',
      border: '1px solid #ddd'
    },
    scoreBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e9ecef',
      borderRadius: '4px',
      margin: '8px 0',
      overflow: 'hidden'
    },
    scoreFill: {
      height: '100%',
      transition: 'width 0.3s ease',
      borderRadius: '4px'
    },
    questionContext: {
      display: 'flex',
      gap: '10px',
      marginBottom: '15px',
      alignItems: 'center'
    },
    pillarBadge: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    instrumentBadge: {
      backgroundColor: '#f8f9fa',
      color: '#666',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      border: '1px solid #ddd'
    },
    instrumentIntro: {
      backgroundColor: '#e7f3ff',
      padding: '15px',
      borderRadius: '8px',
      margin: '20px 0',
      border: '1px solid #007bff20'
    },
    cancelButton: {
      backgroundColor: 'transparent',
      color: '#dc3545',
      border: '1px solid #dc3545',
      padding: '8px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      cursor: 'pointer',
      fontWeight: 'normal',
      transition: 'all 0.2s ease'
    },
    headerCancelButton: {
      backgroundColor: 'transparent',
      color: '#666',
      border: '1px solid #ddd',
      padding: '6px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      fontWeight: 'normal',
      transition: 'all 0.2s ease'
    },
    privacyDisclaimer: {
      backgroundColor: '#e8f5e8',
      border: '1px solid #c3e6c3',
      borderRadius: '6px',
      padding: '12px 16px',
      marginBottom: '20px',
      fontSize: '13px',
      color: '#2d5016',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    questionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      marginBottom: '30px'
    },
    questionCard: {
      backgroundColor: 'white',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '20px',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    questionHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '15px',
      marginBottom: '15px'
    },
    questionNumber: {
      minWidth: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: '#007bff',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      flexShrink: 0
    },
    questionTitle: {
      margin: 0,
      fontSize: '16px',
      fontWeight: '600',
      color: '#333',
      lineHeight: '1.4'
    },
    instrumentProgress: {
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '25px',
      border: '1px solid #dee2e6'
    },
    completionFeedback: {
      marginTop: '8px',
      fontSize: '14px',
      color: '#28a745',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    nationalAverage: {
      fontSize: '13px',
      color: '#007bff',
      margin: '5px 0 2px 0',
      fontWeight: '500',
      lineHeight: '1.3'
    },
    helpText: {
      fontSize: '12px',
      color: '#666',
      margin: '2px 0 0 0',
      lineHeight: '1.4',
      fontStyle: 'italic'
    },
    // Analysis tile flip styles
    analysisTileContainer: {
      perspective: '1000px',
      height: 'auto',
      minHeight: '120px'
    },
    analysisTile: {
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '120px',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.6s ease',
      cursor: 'pointer'
    },
    analysisTileFlipped: {
      transform: 'rotateY(180deg)'
    },
    analysisTileFront: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    analysisTileBack: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      backgroundColor: '#f8f9fa',
      padding: '15px',
      borderRadius: '6px',
      transform: 'rotateY(180deg)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      overflow: 'auto'
    },
    flipHintText: {
      fontSize: '11px',
      color: '#6c757d',
      fontStyle: 'italic',
      marginTop: '8px',
      textAlign: 'center'
    },
    calculationHeader: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
      borderBottom: '1px solid #dee2e6',
      paddingBottom: '5px'
    },
    calculationItem: {
      fontSize: '12px',
      color: '#666',
      marginBottom: '4px',
      display: 'flex',
      justifyContent: 'space-between'
    },
    // Pillar tile flip styles
    pillarTileContainer: {
      perspective: '1000px',
      height: '180px',
      minHeight: '180px'
    },
    pillarTile: {
      position: 'relative',
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.6s ease',
      cursor: 'pointer'
    },
    pillarTileFlipped: {
      transform: 'rotateY(180deg)'
    },
    pillarTileFront: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      boxSizing: 'border-box'
    },
    pillarTileBack: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      backgroundColor: '#f8f9fa',
      padding: '12px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef',
      transform: 'rotateY(180deg)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      overflow: 'auto',
      boxSizing: 'border-box'
    },
    pillarFlipHint: {
      fontSize: '10px',
      color: '#6c757d',
      fontStyle: 'italic',
      marginTop: '8px',
      textAlign: 'center'
    },
    pillarExplanationTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px',
      textAlign: 'center'
    },
    pillarCalculation: {
      fontSize: '12px',
      color: '#007bff',
      marginBottom: '10px',
      textAlign: 'center',
      fontWeight: '500'
    },
    pillarBreakdownList: {
      fontSize: '11px',
      color: '#666',
      lineHeight: '1.4',
      margin: '0',
      padding: '0',
      listStyle: 'none'
    },
    pillarBreakdownItem: {
      marginBottom: '3px',
      paddingLeft: '8px',
      borderLeft: '2px solid #dee2e6'
    },
    pillarExplanationText: {
      fontSize: '11px',
      color: '#495057',
      marginTop: '8px',
      fontStyle: 'italic',
      lineHeight: '1.3'
    }
  }

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'red': return { backgroundColor: '#f8d7da', color: '#721c24' }
      case 'yellow': return { backgroundColor: '#fff3cd', color: '#856404' }
      case 'green': return { backgroundColor: '#d4edda', color: '#155724' }
      default: return { backgroundColor: '#e9ecef', color: '#495057' }
    }
  }

  // Render landing page
  if (currentStep === 'landing') {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Family Financial Shield Logo" style={styles.logo} />
            <h1 style={styles.headerTitle}>Family Financial Shield</h1>
          </div>
        </div>
        
        {/* Hero Section */}
        <div style={styles.hero}>
          <h2 style={styles.heroTitle}>
            How secure is my family?
          </h2>
          <p style={styles.heroSubtitle}>
            Protect your family's financial future in just 3 minutes
          </p>
          <p style={styles.heroDescription}>
            Financial planning after loss is one of life's most important considerations. Taking time to prepare helps you come to terms with mortality while ensuring your family's security. Our comprehensive assessment evaluates your family's financial protection across five critical areas: benefits, liabilities, taxes, legal planning, and ongoing expenses.
          </p>
        </div>

        {/* Assessment Formula */}
        <div style={styles.formulaSection}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
            Financial Security Formula
          </h3>
          <div style={styles.formulaBox}>
            <span style={styles.formulaText}>
              Benefits (A) - Liabilities (B) - Taxes (C) ≥ Monthly Expenses (D) × Years
            </span>
          </div>
          <p style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
            Our assessment evaluates whether your current financial protection can cover your family's needs,
            plus the legal documentation required to ensure the protection is accessible
          </p>
        </div>

        {/* Six Pillars Section */}
        <div style={styles.pillarsSection}>
          <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
            What We Assess
          </h3>
          <div style={styles.pillarsGrid}>
            {renderPillarCard('benefits', pillarData.benefits)}
            {renderPillarCard('liabilities', pillarData.liabilities)}
            {renderPillarCard('taxes', pillarData.taxes)}
            {renderPillarCard('legal', pillarData.legal)}
            {renderPillarCard('expenses', pillarData.expenses)}
            {renderPillarCard('documentation', pillarData.documentation)}
          </div>
        </div>

        {/* Process Overview */}
        <div style={styles.processSection}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
            Your Assessment Process
          </h3>
          <div style={styles.processSteps}>
            <div style={styles.processStep}>
              <span style={styles.stepNumber}>1</span>
              <span>Answer questions about your finances (use national averages if unsure)</span>
            </div>
            <div style={styles.processStep}>
              <span style={styles.stepNumber}>2</span>
              <span>Get instant analysis of your financial gaps</span>
            </div>
            <div style={styles.processStep}>
              <span style={styles.stepNumber}>3</span>
              <span>Receive personalized action plan</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <button style={styles.button} onClick={startAssessment}>
            Start Your 3-Minute Assessment
          </button>
          
          {/* Helpful Tip */}
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e8f5e8',
            borderRadius: '8px',
            border: '1px solid #28a745',
            maxWidth: '500px',
            margin: '20px auto 0',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '16px' }}>💡</span>
              <strong style={{ color: '#28a745' }}>Pro Tip:</strong>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#2d5a32', lineHeight: '1.4' }}>
              Don't know your exact numbers? No problem! Each question includes US national averages 
              that you can use with one click. This gives you a starting point for your assessment.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={styles.disclaimer}>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
            <strong>Disclaimer:</strong> The content discussed above is for education only. This is not a comprehensive list and completely depends on your individual situation. You should always consult with a licensed financial advisor.
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: '#28a745', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <span>🔒</span>
            <strong>Privacy Protected:</strong> All information stays on your device. No data is stored or shared.
          </p>
        </div>

        {/* Product Info Modal */}
        {productInfoModal.isOpen && (
          <div style={styles.modalOverlay} onClick={closeProductInfo}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>{productInfoModal.product.name}</h3>
                <button style={styles.closeButton} onClick={closeProductInfo}>×</button>
              </div>
              <div style={styles.modalBody}>
                <div style={styles.modalSection}>
                  <h4 style={styles.sectionTitle}>What is it?</h4>
                  <p style={styles.sectionText}>{productInfoModal.product.description}</p>
                </div>
                <div style={styles.modalSection}>
                  <h4 style={styles.sectionTitle}>How it works</h4>
                  <p style={styles.sectionText}>{productInfoModal.product.howItWorks}</p>
                </div>
                <div style={styles.modalSection}>
                  <h4 style={styles.sectionTitle}>Pros</h4>
                  <ul style={styles.proConsList}>
                    {productInfoModal.product.pros.map((pro, index) => (
                      <li key={index} style={styles.proItem}>✓ {pro}</li>
                    ))}
                  </ul>
                </div>
                <div style={styles.modalSection}>
                  <h4 style={styles.sectionTitle}>Cons</h4>
                  <ul style={styles.proConsList}>
                    {productInfoModal.product.cons.map((con, index) => (
                      <li key={index} style={styles.conItem}>✗ {con}</li>
                    ))}
                  </ul>
                </div>
                <div style={styles.modalSection}>
                  <h4 style={styles.sectionTitle}>Best for</h4>
                  <p style={styles.sectionText}>{productInfoModal.product.bestFor}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Render assessment form
  if (currentStep === 'assessment') {
    const instruments = getInstruments()
    const instrumentData = getCurrentInstrumentData()
    const overallProgress = getOverallCompletion()
    const instrumentCompletion = instrumentData ? getInstrumentCompletion(instrumentData.questions) : 0

    if (!instrumentData) {
      return <div>Loading...</div>
    }

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <img src="/logo.png" alt="Family Financial Shield Logo" style={styles.logo} />
            <h1 style={styles.headerTitle}>Family Financial Shield</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              {Math.round(overallProgress)}% Complete
            </span>
            <button
              style={styles.headerCancelButton}
              onClick={handleCancelAssessment}
              title="Cancel assessment and return to home"
            >
              ✕ Exit
            </button>
          </div>
        </div>

        {/* Edit Mode Indicator */}
        {results && (
          <div style={{ 
            backgroundColor: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '6px', 
            padding: '12px 20px', 
            margin: '15px 0',
            textAlign: 'center'
          }}>
            <span style={{ color: '#856404', fontSize: '14px', fontWeight: '500' }}>
              ✏️ <strong>Edit Mode:</strong> You're modifying your assessment. Changes will update your results automatically.
            </span>
          </div>
        )}

        {/* Privacy Disclaimer */}
        <div style={styles.privacyDisclaimer}>
          <span style={{ fontSize: '16px' }}>🔒</span>
          <span>
            <strong>Your privacy is protected:</strong> All information entered remains on your device only. 
            No data is stored, transmitted, or shared with any external systems.
          </span>
        </div>

        {/* Overall Progress Bar */}
        <div style={styles.progress}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <p style={{ margin: 0 }}>Instrument {currentInstrument + 1} of {instruments.length}: {instrumentData.name}</p>
            <button
              onClick={useAllNationalAverages}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              title="Fill all fields with US national averages"
            >
              📊 Use All Averages
            </button>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${overallProgress}%` }}></div>
          </div>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            Overall Progress: {Math.round(overallProgress)}% • This Section: {Math.round(instrumentCompletion)}%
          </p>
        </div>

        {/* Pillar and Instrument Context */}
        <div style={styles.questionContext}>
          <span style={styles.pillarBadge}>
            {instrumentData.pillar === 'benefits' && '💰 Benefits (A)'}
            {instrumentData.pillar === 'debts' && '💳 Debts (B)'}
            {instrumentData.pillar === 'taxes' && '🏛️ Taxes (C)'}
            {instrumentData.pillar === 'expenses' && '🏠 Expenses (D)'}
            {instrumentData.pillar === 'legal' && '📋 Legal Planning'}
            {instrumentData.pillar === 'general' && '👨‍👩‍👧‍👦 Family Planning'}
          </span>
          <span style={styles.instrumentBadge}>{instrumentData.name}</span>
        </div>

        {/* Instrument Progress Visualization */}
        <div style={styles.instrumentProgress}>
          <h3 style={{ margin: '0 0 15px 0', color: '#007bff' }}>
            📋 {instrumentData.name}
          </h3>
          <div style={styles.progressBar}>
            <div style={{ 
              ...styles.progressFill, 
              width: `${instrumentCompletion}%`,
              backgroundColor: instrumentCompletion === 100 ? '#28a745' : '#007bff'
            }}></div>
          </div>
          <p style={{ fontSize: '14px', color: '#666', margin: '5px 0 20px 0' }}>
            {instrumentData.questions.filter(q => formData[q.id]).length} of {instrumentData.questions.length} questions completed
          </p>
        </div>

        {/* All Questions for Current Instrument */}
        <div style={styles.questionsContainer}>
          {instrumentData.questions.map((question, index) => {
            const isCompleted = !!formData[question.id]
            return (
              <div key={question.id} style={{
                ...styles.questionCard,
                borderLeft: isCompleted ? '4px solid #28a745' : '4px solid #dee2e6'
              }}>
                <div style={styles.questionHeader}>
                  <div style={styles.questionNumber}>
                    {isCompleted ? '✅' : `${index + 1}`}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={styles.questionTitle}>{question.question}</h4>
                    {/* National averages and help text */}
                    {question.nationalAverage && (
                      <div style={styles.nationalAverage}>
                        📊 {question.nationalAverage}
                        <button
                          onClick={() => useNationalAverage(question.id)}
                          style={{
                            marginLeft: '10px',
                            padding: '4px 8px',
                            fontSize: '12px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                        >
                          Use This Value
                        </button>
                      </div>
                    )}
                    {question.helpText && (
                      <div style={styles.helpText}>
                        💡 {question.helpText}
                      </div>
                    )}
                  </div>
                </div>
                
                <div style={{ position: 'relative' }}>
                  {question.type === 'select' ? (
                    <select
                      value={formData[question.id] || ''}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                      style={{
                        ...styles.select,
                        backgroundColor: isCompleted ? '#f8f9fa' : 'white'
                      }}
                    >
                      <option value="">Select an option...</option>
                      {question.options.map((option, idx) => (
                        <option key={idx} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <>
                      {question.label && (
                        <span style={{ 
                          position: 'absolute', 
                          left: '12px', 
                          top: '22px', 
                          color: '#666', 
                          fontSize: '16px' 
                        }}>
                          {question.label}
                        </span>
                      )}
                      <input
                        type={question.type}
                        placeholder={question.placeholder}
                        value={formData[question.id] || ''}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        style={{
                          ...styles.input,
                          paddingLeft: question.label ? '30px' : '12px',
                          backgroundColor: isCompleted ? '#f8f9fa' : 'white'
                        }}
                        min="0"
                      />
                    </>
                  )}
                </div>

                {/* Real-time validation feedback */}
                {isCompleted && (
                  <div style={styles.completionFeedback}>
                    ✓ Complete
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Navigation Buttons */}
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {currentInstrument > 0 && (
            <button
              style={styles.secondaryButton}
              onClick={handleBack}
            >
              ← Back
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: currentInstrument === 0 ? 'auto' : '0' }}>
            {/* View Results button when in edit mode */}
            {results && (
              <button
                style={{
                  ...styles.button,
                  backgroundColor: '#28a745',
                  marginRight: '10px'
                }}
                onClick={() => {
                  const calculatedResults = calculateFinancialNeeds(formData)
                  setResults(calculatedResults)
                  setCurrentStep('results')
                }}
              >
                📊 View Updated Results
              </button>
            )}
            {instrumentCompletion < 100 && (
              <span style={{ fontSize: '14px', color: '#dc3545' }}>
                Complete all questions to proceed
              </span>
            )}
            <button
              style={{
                ...styles.button,
                opacity: isCurrentInstrumentComplete() ? 1 : 0.6
              }}
              onClick={handleNext}
              disabled={!isCurrentInstrumentComplete()}
            >
              {currentInstrument === instruments.length - 1 ? 'Get Results' : 'Next Section →'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render results page
  if (currentStep === 'results' && results) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Family Financial Shield Logo" style={styles.logo} />
            <h1 style={styles.headerTitle}>Family Financial Shield</h1>
          </div>
        </div>
        <h2>Your Family Financial Protection Assessment</h2>

        <div style={{ ...styles.statusBadge, ...getStatusColor(results.status) }}>
          {results.statusText} - {Math.round(results.overallScore)}% Protected
        </div>

        {/* Five Pillar Score Breakdown */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h3>Five Pillar Analysis (A + B + C ≥ D × Years):</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '15px', 
            marginTop: '15px',
            alignItems: 'start'
          }}>
            {/* Benefits Pillar */}
            <div style={styles.pillarTileContainer}>
              <div 
                style={{
                  ...styles.pillarTile,
                  ...(flippedPillarTiles.benefits ? styles.pillarTileFlipped : {})
                }}
                onClick={() => togglePillarTile('benefits')}
              >
                {/* Front of tile */}
                <div style={styles.pillarTileFront}>
                  <strong>💰 Benefits (A)</strong>
                  <div style={styles.scoreBar}>
                    <div style={{ ...styles.scoreFill, width: `${results.benefitsScore}%`, backgroundColor: results.benefitsScore >= 70 ? '#28a745' : results.benefitsScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
                  </div>
                  <span>{results.benefitsScore}%</span>
                  <div style={styles.pillarFlipHint}>Click to see details</div>
                </div>
                {/* Back of tile */}
                <div style={styles.pillarTileBack}>
                  {(() => {
                    const explanation = getPillarExplanation('benefits', results)
                    return explanation ? (
                      <>
                        <div style={styles.pillarExplanationTitle}>{explanation.title}</div>
                        <div style={styles.pillarCalculation}>{explanation.calculation}</div>
                        <ul style={styles.pillarBreakdownList}>
                          {explanation.breakdown.map((item, idx) => (
                            <li key={idx} style={styles.pillarBreakdownItem}>{item}</li>
                          ))}
                        </ul>
                        <div style={styles.pillarExplanationText}>{explanation.explanation}</div>
                      </>
                    ) : null
                  })()}
                </div>
              </div>
            </div>

            {/* Debt Management Pillar */}
            <div style={styles.pillarTileContainer}>
              <div 
                style={{
                  ...styles.pillarTile,
                  ...(flippedPillarTiles.debt ? styles.pillarTileFlipped : {})
                }}
                onClick={() => togglePillarTile('debt')}
              >
                {/* Front of tile */}
                <div style={styles.pillarTileFront}>
                  <strong>💳 Debt Management (B)</strong>
                  <div style={styles.scoreBar}>
                    <div style={{ ...styles.scoreFill, width: `${results.debtScore}%`, backgroundColor: results.debtScore >= 70 ? '#28a745' : results.debtScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
                  </div>
                  <span>{results.debtScore}%</span>
                  <div style={styles.pillarFlipHint}>Click to see details</div>
                </div>
                {/* Back of tile */}
                <div style={styles.pillarTileBack}>
                  {(() => {
                    const explanation = getPillarExplanation('debt', results)
                    return explanation ? (
                      <>
                        <div style={styles.pillarExplanationTitle}>{explanation.title}</div>
                        <div style={styles.pillarCalculation}>{explanation.calculation}</div>
                        <ul style={styles.pillarBreakdownList}>
                          {explanation.breakdown.map((item, idx) => (
                            <li key={idx} style={styles.pillarBreakdownItem}>{item}</li>
                          ))}
                        </ul>
                        <div style={styles.pillarExplanationText}>{explanation.explanation}</div>
                      </>
                    ) : null
                  })()}
                </div>
              </div>
            </div>

            {/* Tax Planning Pillar */}
            <div style={styles.pillarTileContainer}>
              <div 
                style={{
                  ...styles.pillarTile,
                  ...(flippedPillarTiles.tax ? styles.pillarTileFlipped : {})
                }}
                onClick={() => togglePillarTile('tax')}
              >
                {/* Front of tile */}
                <div style={styles.pillarTileFront}>
                  <strong>🏛️ Tax Planning (C)</strong>
                  <div style={styles.scoreBar}>
                    <div style={{ ...styles.scoreFill, width: `${results.taxScore}%`, backgroundColor: results.taxScore >= 70 ? '#28a745' : results.taxScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
                  </div>
                  <span>{results.taxScore}%</span>
                  <div style={styles.pillarFlipHint}>Click to see details</div>
                </div>
                {/* Back of tile */}
                <div style={styles.pillarTileBack}>
                  {(() => {
                    const explanation = getPillarExplanation('tax', results)
                    return explanation ? (
                      <>
                        <div style={styles.pillarExplanationTitle}>{explanation.title}</div>
                        <div style={styles.pillarCalculation}>{explanation.calculation}</div>
                        <ul style={styles.pillarBreakdownList}>
                          {explanation.breakdown.map((item, idx) => (
                            <li key={idx} style={styles.pillarBreakdownItem}>{item}</li>
                          ))}
                        </ul>
                        <div style={styles.pillarExplanationText}>{explanation.explanation}</div>
                      </>
                    ) : null
                  })()}
                </div>
              </div>
            </div>

            {/* Emergency Fund Pillar */}
            <div style={styles.pillarTileContainer}>
              <div 
                style={{
                  ...styles.pillarTile,
                  ...(flippedPillarTiles.emergency ? styles.pillarTileFlipped : {})
                }}
                onClick={() => togglePillarTile('emergency')}
              >
                {/* Front of tile */}
                <div style={styles.pillarTileFront}>
                  <strong>🏠 Emergency Fund</strong>
                  <div style={styles.scoreBar}>
                    <div style={{ ...styles.scoreFill, width: `${results.emergencyScore}%`, backgroundColor: results.emergencyScore >= 70 ? '#28a745' : results.emergencyScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
                  </div>
                  <span>{results.emergencyScore}%</span>
                  <div style={styles.pillarFlipHint}>Click to see details</div>
                </div>
                {/* Back of tile */}
                <div style={styles.pillarTileBack}>
                  {(() => {
                    const explanation = getPillarExplanation('emergency', results)
                    return explanation ? (
                      <>
                        <div style={styles.pillarExplanationTitle}>{explanation.title}</div>
                        <div style={styles.pillarCalculation}>{explanation.calculation}</div>
                        <ul style={styles.pillarBreakdownList}>
                          {explanation.breakdown.map((item, idx) => (
                            <li key={idx} style={styles.pillarBreakdownItem}>{item}</li>
                          ))}
                        </ul>
                        <div style={styles.pillarExplanationText}>{explanation.explanation}</div>
                      </>
                    ) : null
                  })()}
                </div>
              </div>
            </div>

            {/* Legal Planning Pillar */}
            <div style={styles.pillarTileContainer}>
              <div 
                style={{
                  ...styles.pillarTile,
                  ...(flippedPillarTiles.legal ? styles.pillarTileFlipped : {})
                }}
                onClick={() => togglePillarTile('legal')}
              >
                {/* Front of tile */}
                <div style={styles.pillarTileFront}>
                  <strong>📋 Legal Planning</strong>
                  <div style={styles.scoreBar}>
                    <div style={{ ...styles.scoreFill, width: `${results.legalScore}%`, backgroundColor: results.legalScore >= 70 ? '#28a745' : results.legalScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
                  </div>
                  <span>{results.legalScore}%</span>
                  <div style={styles.pillarFlipHint}>Click to see details</div>
                </div>
                {/* Back of tile */}
                <div style={styles.pillarTileBack}>
                  {(() => {
                    const explanation = getPillarExplanation('legal', results)
                    return explanation ? (
                      <>
                        <div style={styles.pillarExplanationTitle}>{explanation.title}</div>
                        <div style={styles.pillarCalculation}>{explanation.calculation}</div>
                        <ul style={styles.pillarBreakdownList}>
                          {explanation.breakdown.map((item, idx) => (
                            <li key={idx} style={styles.pillarBreakdownItem}>{item}</li>
                          ))}
                        </ul>
                        <div style={styles.pillarExplanationText}>{explanation.explanation}</div>
                      </>
                    ) : null
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Financial Summary */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h3>Detailed Financial Protection Summary:</h3>
          <div style={{
            textAlign: 'center',
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: '#e7f3ff',
            borderRadius: '6px',
            border: '1px solid #007bff20'
          }}>
            <div style={{ fontSize: '14px', color: '#007bff', fontWeight: 'bold' }}>
              💡 Click any section below to expand and see detailed calculations
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            {/* Benefits Breakdown */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #dee2e6' }}>
              <div 
                style={{ 
                  padding: '15px', 
                  cursor: 'pointer',
                  borderBottom: flippedAnalysisTiles.benefits ? '1px solid #dee2e6' : 'none',
                  transition: 'background-color 0.2s ease'
                }}
                onClick={() => toggleAnalysisTile('benefits')}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <h4 style={{ color: '#007bff', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  💰 Benefits (A) - ${results.currentProtection.toLocaleString()}
                  <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
                    {flippedAnalysisTiles.benefits ? '▼' : '▶'}
                  </span>
                </h4>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Life Insurance: ${results.lifeInsuranceTotal.toLocaleString()}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Retirement Accounts: ${results.retirementAccountsTotal.toLocaleString()}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Savings & Investments: ${(results.currentProtection - results.lifeInsuranceTotal - results.retirementAccountsTotal).toLocaleString()}</p>
              </div>
              {flippedAnalysisTiles.benefits && (
                <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
                  <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>Detailed Breakdown:</h5>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    <p style={{ margin: '3px 0' }}>• Term Life Insurance: ${(parseFloat(formData.termLifeInsurance) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Whole Life Insurance: ${(parseFloat(formData.wholeLifeInsurance) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Group Life Insurance: ${(parseFloat(formData.groupLifeInsurance) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Traditional 401(k): ${(parseFloat(formData.traditional401k) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Roth 401(k): ${(parseFloat(formData.roth401k) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Traditional IRA: ${(parseFloat(formData.traditionalIRA) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Roth IRA: ${(parseFloat(formData.rothIRA) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Savings Accounts: ${(parseFloat(formData.savingsAccounts) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Investment Accounts: ${(parseFloat(formData.investmentAccounts) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Real Estate Value: ${(parseFloat(formData.homeValue) || 0).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Debts Breakdown */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #dee2e6' }}>
              <div 
                style={{ 
                  padding: '15px', 
                  cursor: 'pointer',
                  borderBottom: flippedAnalysisTiles.debts ? '1px solid #dee2e6' : 'none',
                  transition: 'background-color 0.2s ease'
                }}
                onClick={() => toggleAnalysisTile('debts')}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <h4 style={{ color: '#dc3545', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  💳 Debts (B) - ${results.totalDebts.toLocaleString()}
                  <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
                    {flippedAnalysisTiles.debts ? '▼' : '▶'}
                  </span>
                </h4>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Mortgage & Home Equity: ${((parseFloat(formData.primaryMortgage) || 0) + (parseFloat(formData.homeEquityLoans) || 0)).toLocaleString()}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Credit Cards: ${(parseFloat(formData.creditCardDebt) || 0).toLocaleString()}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Student & Auto Loans: ${((parseFloat(formData.federalStudentLoans) || 0) + (parseFloat(formData.privateStudentLoans) || 0) + (parseFloat(formData.autoLoans) || 0) + (parseFloat(formData.personalLoans) || 0)).toLocaleString()}</p>
              </div>
              {flippedAnalysisTiles.debts && (
                <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
                  <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>Detailed Breakdown:</h5>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    <p style={{ margin: '3px 0' }}>• Primary Mortgage: ${(parseFloat(formData.primaryMortgage) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Home Equity Loans: ${(parseFloat(formData.homeEquityLoans) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Credit Card Debt: ${(parseFloat(formData.creditCardDebt) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Federal Student Loans: ${(parseFloat(formData.federalStudentLoans) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Private Student Loans: ${(parseFloat(formData.privateStudentLoans) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Auto Loans: ${(parseFloat(formData.autoLoans) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Personal Loans: ${(parseFloat(formData.personalLoans) || 0).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Monthly Expenses Breakdown */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #dee2e6' }}>
              <div 
                style={{ 
                  padding: '15px', 
                  cursor: 'pointer',
                  borderBottom: flippedAnalysisTiles.expenses ? '1px solid #dee2e6' : 'none',
                  transition: 'background-color 0.2s ease'
                }}
                onClick={() => toggleAnalysisTile('expenses')}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <h4 style={{ color: '#28a745', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  🏠 Monthly Expenses (D) - ${results.monthlyExpensesTotal.toLocaleString()}
                  <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
                    {flippedAnalysisTiles.expenses ? '▼' : '▶'}
                  </span>
                </h4>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Housing: ${(parseFloat(formData.housingCosts) || 0).toLocaleString()}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Food & Transportation: ${((parseFloat(formData.foodExpenses) || 0) + (parseFloat(formData.transportationCosts) || 0)).toLocaleString()}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Healthcare & Childcare: ${((parseFloat(formData.healthcareCosts) || 0) + (parseFloat(formData.childcareEducation) || 0)).toLocaleString()}</p>
              </div>
              {flippedAnalysisTiles.expenses && (
                <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
                  <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>Detailed Breakdown:</h5>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    <p style={{ margin: '3px 0' }}>• Housing Costs: ${(parseFloat(formData.housingCosts) || 0).toLocaleString()}/month</p>
                    <p style={{ margin: '3px 0' }}>• Food Expenses: ${(parseFloat(formData.foodExpenses) || 0).toLocaleString()}/month</p>
                    <p style={{ margin: '3px 0' }}>• Transportation: ${(parseFloat(formData.transportationCosts) || 0).toLocaleString()}/month</p>
                    <p style={{ margin: '3px 0' }}>• Healthcare Costs: ${(parseFloat(formData.healthcareCosts) || 0).toLocaleString()}/month</p>
                    <p style={{ margin: '3px 0' }}>• Childcare/Education: ${(parseFloat(formData.childcareEducation) || 0).toLocaleString()}/month</p>
                  </div>
                  <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                    <strong>Emergency Fund Target:</strong> ${(results.monthlyExpensesTotal * 6).toLocaleString()} (6 months of expenses)
                  </div>
                </div>
              )}
            </div>

            {/* Protection Summary */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #dee2e6' }}>
              <div 
                style={{ 
                  padding: '15px', 
                  cursor: 'pointer',
                  borderBottom: flippedAnalysisTiles.protection ? '1px solid #dee2e6' : 'none',
                  transition: 'background-color 0.2s ease',
                  backgroundColor: 'white'
                }}
                onClick={() => toggleAnalysisTile('protection')}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <h4 style={{ color: '#6f42c1', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  🛡️ Protection Analysis
                  <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
                    {flippedAnalysisTiles.protection ? '▼' : '▶'}
                  </span>
                </h4>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Total Protection Needed: ${results.totalProtectionNeeded.toLocaleString()}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Current Protection: ${results.currentProtection.toLocaleString()}</p>
                {results.protectionGap > 0 ? (
                  <p style={{ margin: '5px 0', fontSize: '14px', color: '#dc3545', fontWeight: 'bold' }}>
                    Protection Gap: ${results.protectionGap.toLocaleString()}
                  </p>
                ) : (
                  <p style={{ margin: '5px 0', fontSize: '14px', color: '#28a745', fontWeight: 'bold' }}>
                    ✅ Fully Protected!
                  </p>
                )}
              </div>
              {flippedAnalysisTiles.protection && (
                <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
                  {(() => {
                    const details = getCalculationDetails('protection', results)
                    return (
                      <>
                        <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>{details.title}:</h5>
                        <div style={{ fontSize: '13px', color: '#666' }}>
                          {details.items.map((item, idx) => (
                            <p key={idx} style={{ margin: '3px 0', display: 'flex', justifyContent: 'space-between' }}>
                              <span>{item.label}:</span>
                              <span style={{ fontWeight: 'bold' }}>{item.value}</span>
                            </p>
                          ))}
                        </div>
                        <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                          <strong>Formula:</strong> A (Benefits) - B (Debts) - C (Taxes) ≥ D (Monthly Expenses) × Years
                        </div>
                      </>
                    )
                  })()}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Summary Analysis Section */}
        <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '8px', margin: '25px 0', border: '2px solid #e9ecef', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '22px' }}>📊 Your Financial Health Summary</h3>
          {(() => {
            const summary = generateSummaryAnalysis(results)
            return (
              <>
                <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px', lineHeight: '1.6' }}>
                  <p style={{ margin: 0, fontSize: '16px', color: '#2c3e50' }}>
                    {summary.mainAnalysis}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  {/* Strengths */}
                  {summary.strengths.length > 0 && (
                    <div style={{ padding: '15px', backgroundColor: '#d4edda', borderRadius: '6px', border: '1px solid #c3e6cb' }}>
                      <h4 style={{ color: '#155724', margin: '0 0 10px 0', fontSize: '16px' }}>✅ Financial Strengths</h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#155724' }}>
                        {summary.strengths.map((strength, idx) => (
                          <li key={idx} style={{ marginBottom: '5px' }}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Concerns */}
                  {summary.concerns.length > 0 && (
                    <div style={{ padding: '15px', backgroundColor: '#f8d7da', borderRadius: '6px', border: '1px solid #f5c6cb' }}>
                      <h4 style={{ color: '#721c24', margin: '0 0 10px 0', fontSize: '16px' }}>⚠️ Areas of Concern</h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#721c24' }}>
                        {summary.concerns.map((concern, idx) => (
                          <li key={idx} style={{ marginBottom: '5px' }}>{concern}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Key Financial Numbers */}
                <div style={{ padding: '15px', backgroundColor: '#e9ecef', borderRadius: '6px', marginBottom: '15px' }}>
                  <h4 style={{ color: '#495057', margin: '0 0 15px 0', fontSize: '16px' }}>💰 Key Financial Numbers</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    <div><strong>Total Assets:</strong> ${summary.keyNumbers.totalAssets.toLocaleString()}</div>
                    <div><strong>Total Debts:</strong> ${summary.keyNumbers.totalDebts.toLocaleString()}</div>
                    <div><strong>Net Worth:</strong> ${summary.keyNumbers.netWorth.toLocaleString()}</div>
                    <div><strong>Monthly Income:</strong> ${summary.keyNumbers.monthlyIncome.toLocaleString()}</div>
                    <div><strong>Monthly Expenses:</strong> ${summary.keyNumbers.monthlyExpenses.toLocaleString()}</div>
                    <div><strong>Protection Gap:</strong> ${summary.keyNumbers.protectionGap.toLocaleString()}</div>
                  </div>
                </div>

                {/* Ratio Analysis */}
                {summary.ratioAnalysis && (
                  <div style={{ padding: '15px', backgroundColor: '#fff3cd', borderRadius: '6px', border: '1px solid #ffeaa7', marginBottom: '15px' }}>
                    <h4 style={{ color: '#856404', margin: '0 0 10px 0', fontSize: '16px' }}>📈 Financial Ratio Analysis</h4>
                    <p style={{ margin: 0, color: '#856404', lineHeight: '1.5' }}>{summary.ratioAnalysis}</p>
                  </div>
                )}

                {/* Priority Focus */}
                <div style={{ padding: '15px', backgroundColor: '#cce5ff', borderRadius: '6px', border: '1px solid #99ccff' }}>
                  <h4 style={{ color: '#0066cc', margin: '0 0 10px 0', fontSize: '16px' }}>🎯 Priority Focus</h4>
                  <p style={{ margin: 0, color: '#0066cc', fontWeight: '500' }}>{summary.priority}</p>
                </div>
              </>
            )
          })()}
        </div>

        <h3>Your Prioritized Action Plan:</h3>
        {results.actionItems.map((item, index) => (
          <div key={index} style={styles.actionItem}>
            <strong>{index + 1}.</strong> {item}
          </div>
        ))}

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <button style={styles.button} onClick={printResults}>
            📄 Export to PDF
          </button>
          <button style={{ 
            ...styles.button, 
            backgroundColor: '#6c757d',
            marginLeft: '10px',
            marginRight: '10px'
          }} onClick={editAssessment}>
            ✏️ Edit Assessment
          </button>
          <button style={styles.secondaryButton} onClick={startOver}>
            Start Over
          </button>
        </div>

        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '6px' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#0066cc' }}>
            💡 <strong>Next Steps:</strong> This assessment covers all five pillars of family financial protection. 
            Consider speaking with a financial advisor to implement these recommendations and review annually.
          </p>
          <p style={{ margin: 0, fontSize: '14px', color: '#0066cc' }}>
            ✏️ <strong>Need to adjust something?</strong> Use the "Edit Assessment" button above to modify any values and see updated results instantly.
          </p>
        </div>
      </div>
    )
  }

  return null
}
