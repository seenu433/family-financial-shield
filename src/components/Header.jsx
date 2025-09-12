import React from 'react'

function Header({ 
  styles, 
  currentStep, 
  overallProgress, 
  handleCancelAssessment, 
  showProgress = false, 
  showCancel = false 
}) {
  return (
    <div style={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <img src="/logo.png" alt="Family Financial Shield Logo" style={styles.logo} />
        <h1 style={styles.headerTitle}>Family Financial Shield</h1>
      </div>
      {showProgress && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>
            {Math.round(overallProgress)}% Complete
          </span>
          {showCancel && (
            <button
              style={styles.headerCancelButton}
              onClick={handleCancelAssessment}
              title="Cancel assessment and return to home"
            >
              ✕ Exit
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Header
