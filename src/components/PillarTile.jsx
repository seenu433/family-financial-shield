import React from 'react'

function PillarTile({ 
  pillar, 
  title, 
  icon, 
  score, 
  flippedPillarTiles, 
  togglePillarTile, 
  getPillarExplanation, 
  results, 
  styles 
}) {
  const isFlipped = flippedPillarTiles[pillar]
  
  return (
    <div style={styles.pillarTileContainer}>
      <div 
        style={{
          ...styles.pillarTile,
          ...(isFlipped ? styles.pillarTileFlipped : {})
        }}
        onClick={() => togglePillarTile(pillar)}
      >
        {/* Front of tile */}
        <div style={styles.pillarTileFront}>
          <strong>{icon} {title}</strong>
          <div style={styles.scoreBar}>
            <div style={{ 
              ...styles.scoreFill, 
              width: `${score}%`, 
              backgroundColor: score >= 70 ? '#28a745' : score >= 40 ? '#ffc107' : '#dc3545' 
            }}></div>
          </div>
          <span>{score}%</span>
          <div style={styles.pillarFlipHint}>Click to see details</div>
        </div>
        {/* Back of tile */}
        <div style={styles.pillarTileBack}>
          {(() => {
            const explanation = getPillarExplanation(pillar, results)
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
  )
}

export default PillarTile
