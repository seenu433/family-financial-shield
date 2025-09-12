import React from 'react'

function FormulaSection({ styles }) {
  return (
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
  )
}

export default FormulaSection
