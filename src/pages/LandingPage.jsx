import React from 'react'
import Header from '../components/Header.jsx'
import HeroSection from '../components/HeroSection.jsx'
import FormulaSection from '../components/FormulaSection.jsx'
import PillarsGrid from '../components/PillarsGrid.jsx'
import ProcessSteps from '../components/ProcessSteps.jsx'
import PrivacyDisclaimer from '../components/PrivacyDisclaimer.jsx'
import ProductInfoModal from '../components/ProductInfoModal.jsx'

function LandingPage({
  styles,
  flippedTiles,
  expandedInstruments,
  handleTileFlip,
  handleInstrumentExpand,
  handleProductInfo,
  startAssessment,
  productInfoModal,
  closeProductInfo
}) {
  return (
    <div style={styles.container}>
      <Header styles={styles} currentStep="landing" />

      <HeroSection styles={styles} />

      <FormulaSection styles={styles} />

      <PillarsGrid
        styles={styles}
        flippedTiles={flippedTiles}
        expandedInstruments={expandedInstruments}
        handleTileFlip={handleTileFlip}
        handleInstrumentExpand={handleInstrumentExpand}
        handleProductInfo={handleProductInfo}
      />

      <ProcessSteps styles={styles} startAssessment={startAssessment} />

      {/* Disclaimer */}
      <div style={styles.disclaimer}>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
          <strong>Disclaimer:</strong> The content discussed above is for education only. This is not a comprehensive list and completely depends on your individual situation. You should always consult with a licensed financial advisor.
        </p>
        <PrivacyDisclaimer styles={styles} />
      </div>

      {/* Product Info Modal */}
      <ProductInfoModal
        productInfoModal={productInfoModal}
        closeProductInfo={closeProductInfo}
        styles={styles}
      />
    </div>
  )
}

export default LandingPage
