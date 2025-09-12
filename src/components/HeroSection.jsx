import React from 'react'

function HeroSection({ styles }) {
  return (
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
  )
}

export default HeroSection
