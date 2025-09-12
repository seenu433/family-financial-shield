import React from 'react'
import PillarCard from './PillarCard.jsx'
import { pillarData } from '../data/pillarData.js'

function PillarsGrid({ 
  styles, 
  flippedTiles, 
  expandedInstruments, 
  handleTileFlip, 
  handleInstrumentExpand, 
  handleProductInfo 
}) {
  return (
    <div style={styles.pillarsSection}>
      <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        What We Assess
      </h3>
      <div style={styles.pillarsGrid}>
        <PillarCard 
          pillarKey="benefits" 
          pillarInfo={pillarData.benefits} 
          flippedTiles={flippedTiles} 
          expandedInstruments={expandedInstruments} 
          styles={styles} 
          handleTileFlip={handleTileFlip} 
          handleInstrumentExpand={handleInstrumentExpand} 
          handleProductInfo={handleProductInfo} 
        />
        <PillarCard 
          pillarKey="liabilities" 
          pillarInfo={pillarData.liabilities} 
          flippedTiles={flippedTiles} 
          expandedInstruments={expandedInstruments} 
          styles={styles} 
          handleTileFlip={handleTileFlip} 
          handleInstrumentExpand={handleInstrumentExpand} 
          handleProductInfo={handleProductInfo} 
        />
        <PillarCard 
          pillarKey="taxes" 
          pillarInfo={pillarData.taxes} 
          flippedTiles={flippedTiles} 
          expandedInstruments={expandedInstruments} 
          styles={styles} 
          handleTileFlip={handleTileFlip} 
          handleInstrumentExpand={handleInstrumentExpand} 
          handleProductInfo={handleProductInfo} 
        />
        <PillarCard 
          pillarKey="legal" 
          pillarInfo={pillarData.legal} 
          flippedTiles={flippedTiles} 
          expandedInstruments={expandedInstruments} 
          styles={styles} 
          handleTileFlip={handleTileFlip} 
          handleInstrumentExpand={handleInstrumentExpand} 
          handleProductInfo={handleProductInfo} 
        />
        <PillarCard 
          pillarKey="expenses" 
          pillarInfo={pillarData.expenses} 
          flippedTiles={flippedTiles} 
          expandedInstruments={expandedInstruments} 
          styles={styles} 
          handleTileFlip={handleTileFlip} 
          handleInstrumentExpand={handleInstrumentExpand} 
          handleProductInfo={handleProductInfo} 
        />
        <PillarCard 
          pillarKey="documentation" 
          pillarInfo={pillarData.documentation} 
          flippedTiles={flippedTiles} 
          expandedInstruments={expandedInstruments} 
          styles={styles} 
          handleTileFlip={handleTileFlip} 
          handleInstrumentExpand={handleInstrumentExpand} 
          handleProductInfo={handleProductInfo} 
        />
      </div>
    </div>
  )
}

export default PillarsGrid
