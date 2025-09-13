import React from 'react'
import { useAppLogic } from './hooks/useAppLogic.jsx'
import { generatePDF } from './utils/pdfGenerator.js'
import { getStyles } from './styles/appStyles.js'
import { getInstruments, getStatusColor } from './utils/appUtils.js'

// Page Components
import LandingPage from './pages/LandingPage.jsx'
import AssessmentPage from './pages/AssessmentPage.jsx' 
import ResultsPage from './pages/ResultsPage.jsx'

function App() {
  const {
    // State
    currentStep,
    setCurrentStep,
    currentInstrument,
    formData,
    setFormData,
    results,
    setResults,
    flippedTiles,
    flippedAnalysisTiles,
    flippedPillarTiles,
    expandedInstruments,
    productInfoModal,
    
    // Helper functions
    generateSummaryAnalysis,
    prepareAnalysisTileData,
    
    // Event handlers
    handleInputChange,
    useNationalAverage,
    toggleAnalysisTile,
    togglePillarTile,
    useAllNationalAverages,
    handleNext,
    handleBack,
    isCurrentInstrumentComplete,
    handleCancelAssessment,
    startAssessment,
    startOver,
    editAssessment,
    viewResults,
    handleTileFlip,
    handleInstrumentExpand,
    handleProductInfo,
    closeProductInfo
  } = useAppLogic()

  const styles = getStyles(currentStep)

  // Render landing page
  if (currentStep === 'landing') {
    return (
      <LandingPage
        styles={styles}
        startAssessment={startAssessment}
        flippedTiles={flippedTiles}
        handleTileFlip={handleTileFlip}
        expandedInstruments={expandedInstruments}
        handleInstrumentExpand={handleInstrumentExpand}
        productInfoModal={productInfoModal}
        handleProductInfo={handleProductInfo}
        closeProductInfo={closeProductInfo}
      />
    )
  }

  // Render assessment page
  if (currentStep === 'assessment') {
    return (
      <AssessmentPage
        styles={styles}
        currentInstrument={currentInstrument}
        formData={formData}
        results={results}
        handleInputChange={handleInputChange}
        useNationalAverage={useNationalAverage}
        useAllNationalAverages={useAllNationalAverages}
        handleNext={handleNext}
        handleBack={handleBack}
        isCurrentInstrumentComplete={isCurrentInstrumentComplete}
        handleCancelAssessment={handleCancelAssessment}
        setResults={setResults}
        setCurrentStep={setCurrentStep}
      />
    )
  }

  // Render results page
  if (currentStep === 'results' && results) {
    return (
      <ResultsPage
        styles={styles}
        results={results}
        formData={formData}
        getStatusColor={getStatusColor}
        flippedPillarTiles={flippedPillarTiles}
        togglePillarTile={togglePillarTile}
        flippedAnalysisTiles={flippedAnalysisTiles}
        toggleAnalysisTile={toggleAnalysisTile}
        prepareAnalysisTileData={prepareAnalysisTileData}
        generateSummaryAnalysis={generateSummaryAnalysis}
        generatePDF={generatePDF}
        editAssessment={editAssessment}
        startOver={startOver}
      />
    )
  }

  return null
}

export default App
