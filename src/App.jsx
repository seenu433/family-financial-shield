import React, { useState } from 'react'
import { questions } from './data/questions.js'
import { pillarData } from './data/pillarData.js'
import { productInfo } from './data/productInfo.js'
import { calculateFinancialNeeds } from './utils/calculations.js'
import { generatePDF } from './utils/pdfGenerator.js'
import { getStyles } from './styles/appStyles.js'
import {
  getInstruments,
  getCurrentInstrumentData,
  getInstrumentCompletion,
  getOverallCompletion,
  getStatusColor,
  getPillarExplanation,
  getTileData,
  getCalculationDetails
} from './utils/appUtils.js'
import PillarCard from './components/PillarCard.jsx'
import ProductInfoModal from './components/ProductInfoModal.jsx'
import ProcessSteps from './components/ProcessSteps.jsx'
import Header from './components/Header.jsx'
import HeroSection from './components/HeroSection.jsx'
import FormulaSection from './components/FormulaSection.jsx'
import PillarsGrid from './components/PillarsGrid.jsx'
import StatusBadge from './components/StatusBadge.jsx'
import PillarTile from './components/PillarTile.jsx'
import AnalysisTile from './components/AnalysisTile.jsx'
import FinancialSummary from './components/FinancialSummary.jsx'
import ActionPlan from './components/ActionPlan.jsx'
import NavigationButtons from './components/NavigationButtons.jsx'
import PrivacyDisclaimer from './components/PrivacyDisclaimer.jsx'

export default function App() {
  // Form state
  const [currentStep, setCurrentStep] = useState('landing') // landing, assessment, results
  const [currentInstrument, setCurrentInstrument] = useState(0) // Track current subpillar instrument
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0) // Track current question within instrument
  
  // Initialize formData with all question IDs from questions array
  const [formData, setFormData] = useState(() => {
    const initialData = {}
    questions.forEach(question => {
      initialData[question.id] = ''
    })
    return initialData
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
            <strong>Emergency Fund Target:</strong> ${(results.monthlyExpensesTotal * 6).toLocaleString()} (6 months of expenses)
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

  // Get styles with current step
  const styles = getStyles(currentStep)

  // Render landing page
  if (currentStep === 'landing') {
    return (
      <div style={styles.container}>
        <Header styles={styles} currentStep={currentStep} />

        <HeroSection styles={styles} />

        <FormulaSection styles={styles} />

        <PillarsGrid
          styles={styles}
          flippedTiles={flippedTiles}
          expandedInstruments={expandedInstruments}
          handleTileFlip={handleTileFlip}
          handleInstrumentExpand={handleInstrumentExpand}
          handleProductInfo={handleProductInfo}
        />

        <ProcessSteps styles={styles} startAssessment={startAssessment} />

        {/* Disclaimer */}
        <div style={styles.disclaimer}>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
            <strong>Disclaimer:</strong> The content discussed above is for education only. This is not a comprehensive list and completely depends on your individual situation. You should always consult with a licensed financial advisor.
          </p>
          <PrivacyDisclaimer styles={styles} />
        </div>

        {/* Product Info Modal */}
        <ProductInfoModal
          productInfoModal={productInfoModal}
          closeProductInfo={closeProductInfo}
          styles={styles}
        />
      </div>
    )
  }

  // Render assessment form
  if (currentStep === 'assessment') {
    const instruments = getInstruments(questions)
    const instrumentData = getCurrentInstrumentData(questions, currentInstrument)
    const overallProgress = getOverallCompletion(questions, formData)
    const instrumentCompletion = instrumentData ? getInstrumentCompletion(instrumentData.questions, formData) : 0

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
                          ...(question.label === 'years' ? {
                            right: '12px',
                            top: '22px'
                          } : {
                            left: '12px',
                            top: '22px'
                          }),
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
                          paddingLeft: question.label && question.label !== 'years' ? '30px' : '12px',
                          paddingRight: question.label === 'years' ? '50px' : '12px',
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
        <Header styles={styles} currentStep={currentStep} />
        <h2>Your Family Financial Protection Assessment</h2>

        <StatusBadge results={results} styles={styles} getStatusColor={getStatusColor} />

        {/* Five Pillar Score Breakdown */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h3>Five Pillar Analysis (A - B - C ≥ D × Years):</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '15px',
            marginTop: '15px',
            alignItems: 'start'
          }}>
            <PillarTile
              pillar="benefits"
              title="Benefits (A)"
              icon="💰"
              score={results.benefitsScore}
              flippedPillarTiles={flippedPillarTiles}
              togglePillarTile={togglePillarTile}
              getPillarExplanation={(pillar) => getPillarExplanation(pillar, formData, results)}
              results={results}
              styles={styles}
            />
            <PillarTile
              pillar="debt"
              title="Liabilities (B)"
              icon="💳"
              score={results.debtScore}
              flippedPillarTiles={flippedPillarTiles}
              togglePillarTile={togglePillarTile}
              getPillarExplanation={(pillar) => getPillarExplanation(pillar, formData, results)}
              results={results}
              styles={styles}
            />
            <PillarTile
              pillar="tax"
              title="Taxes (C)"
              icon="🏛️"
              score={results.taxScore}
              flippedPillarTiles={flippedPillarTiles}
              togglePillarTile={togglePillarTile}
              getPillarExplanation={(pillar) => getPillarExplanation(pillar, formData, results)}
              results={results}
              styles={styles}
            />
            <PillarTile
              pillar="emergency"
              title="Emergency Fund"
              icon="🏠"
              score={results.emergencyScore}
              flippedPillarTiles={flippedPillarTiles}
              togglePillarTile={togglePillarTile}
              getPillarExplanation={(pillar) => getPillarExplanation(pillar, formData, results)}
              results={results}
              styles={styles}
            />
            <PillarTile
              pillar="legal"
              title="Legal Planning"
              icon="📋"
              score={results.legalScore}
              flippedPillarTiles={flippedPillarTiles}
              togglePillarTile={togglePillarTile}
              getPillarExplanation={(pillar) => getPillarExplanation(pillar, formData, results)}
              results={results}
              styles={styles}
            />
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
            {(() => {
              const tileData = prepareAnalysisTileData()
              return (
                <>
                  <AnalysisTile {...tileData.benefits} flippedAnalysisTiles={flippedAnalysisTiles} toggleAnalysisTile={toggleAnalysisTile} />
                  <AnalysisTile {...tileData.debts} flippedAnalysisTiles={flippedAnalysisTiles} toggleAnalysisTile={toggleAnalysisTile} />
                  <AnalysisTile {...tileData.taxes} flippedAnalysisTiles={flippedAnalysisTiles} toggleAnalysisTile={toggleAnalysisTile} />
                  <AnalysisTile {...tileData.expenses} flippedAnalysisTiles={flippedAnalysisTiles} toggleAnalysisTile={toggleAnalysisTile} />
                  <AnalysisTile {...tileData.protection} flippedAnalysisTiles={flippedAnalysisTiles} toggleAnalysisTile={toggleAnalysisTile} />
                </>
              )
            })()}
          </div>
        </div>

        <FinancialSummary results={results} generateSummaryAnalysis={generateSummaryAnalysis} />

        <ActionPlan results={results} styles={styles} />

        <NavigationButtons
          results={results}
          generateSummaryAnalysis={generateSummaryAnalysis}
          generatePDF={generatePDF}
          editAssessment={editAssessment}
          startOver={startOver}
          styles={styles}
        />

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
