import React from 'react'

function FinancialSummary({ results, generateSummaryAnalysis }) {
  const summary = generateSummaryAnalysis(results)
  
  return (
    <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '8px', margin: '25px 0', border: '2px solid #e9ecef', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '22px' }}>📊 Your Financial Health Summary</h3>
      
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
    </div>
  )
}

export default FinancialSummary
