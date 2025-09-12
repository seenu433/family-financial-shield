import React from 'react'

function ProcessSteps({ styles, startAssessment }) {
  return (
    <>
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
    </>
  )
}

export default ProcessSteps
