import React from 'react'

function NavigationButtons({ 
  results, 
  generateSummaryAnalysis, 
  generatePDF, 
  editAssessment, 
  startOver, 
  styles 
}) {
  return (
    <div style={{ marginTop: '40px', textAlign: 'center' }}>
      <button style={styles.button} onClick={() => {
        const summary = generateSummaryAnalysis(results);
        const resultsWithSummary = {
          ...results,
          summaryAnalysis: `${summary.mainAnalysis}\n\n${summary.priority ? `Priority: ${summary.priority}` : ''}${summary.ratioAnalysis ? `\n\nFinancial Ratios: ${summary.ratioAnalysis}` : ''}`
        };
        generatePDF(resultsWithSummary);
      }}>
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
  )
}

export default NavigationButtons
