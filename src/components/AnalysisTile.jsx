import React from 'react'

function AnalysisTile({ 
  tileKey, 
  title, 
  color, 
  mainValue, 
  summaryItems, 
  detailItems, 
  extraContent, 
  flippedAnalysisTiles, 
  toggleAnalysisTile 
}) {
  const isFlipped = flippedAnalysisTiles[tileKey]
  
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #dee2e6' }}>
      <div 
        style={{ 
          padding: '15px', 
          cursor: 'pointer',
          borderBottom: isFlipped ? '1px solid #dee2e6' : 'none',
          transition: 'background-color 0.2s ease'
        }}
        onClick={() => toggleAnalysisTile(tileKey)}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
      >
        <h4 style={{ 
          color: color, 
          margin: '0 0 10px 0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          {title} - {mainValue}
          <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
            {isFlipped ? '▼' : '▶'}
          </span>
        </h4>
        {summaryItems.map((item, index) => (
          <p key={index} style={{ margin: '5px 0', fontSize: '14px' }}>{item}</p>
        ))}
      </div>
      {isFlipped && (
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
          <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>Detailed Breakdown:</h5>
          <div style={{ fontSize: '13px', color: '#666' }}>
            {detailItems.map((item, index) => (
              <p key={index} style={{ margin: '3px 0' }}>{item}</p>
            ))}
          </div>
          {extraContent}
        </div>
      )}
    </div>
  )
}

export default AnalysisTile
