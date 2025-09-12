import React from 'react'

export default function PillarCard({ 
  pillarKey, 
  pillarInfo, 
  flippedTiles, 
  expandedInstruments, 
  styles, 
  handleTileFlip, 
  handleInstrumentExpand, 
  handleProductInfo 
}) {
  const isFlipped = flippedTiles[pillarKey]

  return (
    <div key={pillarKey} style={styles.pillarCardContainer}>
      <div
        style={{
          ...styles.pillarCard,
          ...(isFlipped ? styles.pillarCardFlipped : {}),
          cursor: 'pointer'
        }}
        onClick={() => handleTileFlip(pillarKey)}
      >
        {!isFlipped ? (
          <>
            <div style={styles.pillarIcon}>{pillarInfo.icon}</div>
            <h4 style={styles.pillarTitle}>{pillarInfo.title}</h4>
            <div style={styles.pillarList}>
              {pillarInfo.summary.map((item, index) => (
                <div key={index} style={styles.pillarListItem}>
                  <span style={styles.pillarBullet}>•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p style={styles.flipHint}>Click to see details</p>
          </>
        ) : (
          <div style={styles.pillarDetailView}>
            <div style={styles.pillarDetailHeader}>
              <span style={styles.pillarIcon}>{pillarInfo.icon}</span>
              <h4 style={styles.pillarTitle}>{pillarInfo.title}</h4>
            </div>
            <div style={styles.instrumentsList}>
              {pillarInfo.instruments.map((instrument, index) => {
                const expandKey = `${pillarKey}-${index}`
                const isExpanded = expandedInstruments[expandKey]

                return (
                  <div key={index} style={styles.instrumentItem}>
                    <div
                      style={styles.instrumentHeader}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleInstrumentExpand(pillarKey, index)
                      }}
                    >
                      <span style={styles.instrumentName}>{instrument.name}</span>
                      <span style={styles.expandIcon}>
                        {isExpanded ? '−' : '+'}
                      </span>
                    </div>
                    {isExpanded && (
                      <div style={styles.instrumentDetails}>
                        <p style={styles.instrumentDescription}>
                          {instrument.description}
                        </p>
                        <div style={styles.relatedProducts}>
                          <strong style={styles.productsTitle}>Related Products:</strong>
                          <div style={styles.productsList}>
                            {instrument.relatedProducts.map((product, idx) => (
                              <div key={idx} style={styles.productItem}>
                                <span style={styles.bulletPoint}>•</span>
                                <span style={styles.productName}>{product}</span>
                                <button
                                  style={styles.infoIcon}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleProductInfo(product)
                                  }}
                                  title={`Learn more about ${product}`}
                                >
                                  ℹ️
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
