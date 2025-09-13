import React from 'react'
import { 
  getInstruments,
  getCurrentInstrumentData,
  getInstrumentCompletion,
  getOverallCompletion
} from '../utils/appUtils.js'
import { questions } from '../data/questions.js'

function AssessmentPage({
  styles,
  currentInstrument,
  formData,
  results,
  handleCancelAssessment,
  useAllNationalAverages,
  useNationalAverage,
  handleInputChange,
  handleBack,
  handleNext,
  isCurrentInstrumentComplete,
  setResults,
  setCurrentStep,
  calculateFinancialNeeds
}) {
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

export default AssessmentPage
