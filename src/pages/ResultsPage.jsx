import React from 'react'
import Header from '../components/Header.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import PillarTile from '../components/PillarTile.jsx'
import AnalysisTile from '../components/AnalysisTile.jsx'
import FinancialSummary from '../components/FinancialSummary.jsx'
import ActionPlan from '../components/ActionPlan.jsx'
import NavigationButtons from '../components/NavigationButtons.jsx'
import { getPillarExplanation } from '../utils/appUtils.js'

function ResultsPage({
  styles,
  results,
  formData,
  getStatusColor,
  flippedPillarTiles,
  togglePillarTile,
  flippedAnalysisTiles,
  toggleAnalysisTile,
  prepareAnalysisTileData,
  generateSummaryAnalysis,
  generatePDF,
  editAssessment,
  startOver
}) {
  return (
    <div style={styles.container}>
      <Header styles={styles} currentStep="results" />
      <h2>Your Family Financial Protection Assessment</h2>

      <StatusBadge results={results} styles={styles} getStatusColor={getStatusColor} />

      {/* Five Pillar Score Breakdown */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h3>Five Pillar Analysis (A - B - C ≥ D × Years):</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '15px',
          marginTop: '15px',
          alignItems: 'start'
        }}>
          <PillarTile
            pillar="benefits"
            title="Benefits (A)"
            icon="💰"
            score={results.benefitsScore}
            flippedPillarTiles={flippedPillarTiles}
            togglePillarTile={togglePillarTile}
            getPillarExplanation={(pillar) => getPillarExplanation(pillar, formData, results)}
            results={results}
            styles={styles}
          />
          <PillarTile
            pillar="debt"
            title="Liabilities (B)"
            icon="💳"
            score={results.debtScore}
            flippedPillarTiles={flippedPillarTiles}
            togglePillarTile={togglePillarTile}
            getPillarExplanation={(pillar) => getPillarExplanation(pillar, formData, results)}
            results={results}
            styles={styles}
          />
          <PillarTile
            pillar="tax"
            title="Taxes (C)"
            icon="🏛️"
            score={results.taxScore}
            flippedPillarTiles={flippedPillarTiles}
            togglePillarTile={togglePillarTile}
            getPillarExplanation={(pillar) => getPillarExplanation(pillar, formData, results)}
            results={results}
            styles={styles}
          />
          <PillarTile
            pillar="emergency"
            title="Emergency Fund"
            icon="🏠"
            score={results.emergencyScore}
            flippedPillarTiles={flippedPillarTiles}
            togglePillarTile={togglePillarTile}
            getPillarExplanation={(pillar) => getPillarExplanation(pillar, formData, results)}
            results={results}
            styles={styles}
          />
          <PillarTile
            pillar="legal"
            title="Legal Planning"
            icon="📋"
            score={results.legalScore}
            flippedPillarTiles={flippedPillarTiles}
            togglePillarTile={togglePillarTile}
            getPillarExplanation={(pillar) => getPillarExplanation(pillar, formData, results)}
            results={results}
            styles={styles}
          />
        </div>
      </div>

      {/* Detailed Financial Summary */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h3>Detailed Financial Protection Summary:</h3>
        <div style={{
          textAlign: 'center',
          marginBottom: '15px',
          padding: '10px',
          backgroundColor: '#e7f3ff',
          borderRadius: '6px',
          border: '1px solid #007bff20'
        }}>
          <div style={{ fontSize: '14px', color: '#007bff', fontWeight: 'bold' }}>
            💡 Click any section below to expand and see detailed calculations
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {(() => {
            const tileData = prepareAnalysisTileData()
            return (
              <>
                <AnalysisTile {...tileData.benefits} flippedAnalysisTiles={flippedAnalysisTiles} toggleAnalysisTile={toggleAnalysisTile} />
                <AnalysisTile {...tileData.debts} flippedAnalysisTiles={flippedAnalysisTiles} toggleAnalysisTile={toggleAnalysisTile} />
                <AnalysisTile {...tileData.taxes} flippedAnalysisTiles={flippedAnalysisTiles} toggleAnalysisTile={toggleAnalysisTile} />
                <AnalysisTile {...tileData.expenses} flippedAnalysisTiles={flippedAnalysisTiles} toggleAnalysisTile={toggleAnalysisTile} />
                <AnalysisTile {...tileData.protection} flippedAnalysisTiles={flippedAnalysisTiles} toggleAnalysisTile={toggleAnalysisTile} />
              </>
            )
          })()}
        </div>
      </div>

      <FinancialSummary results={results} generateSummaryAnalysis={generateSummaryAnalysis} />

      <ActionPlan results={results} styles={styles} />

      <NavigationButtons
        results={results}
        generateSummaryAnalysis={generateSummaryAnalysis}
        generatePDF={generatePDF}
        editAssessment={editAssessment}
        startOver={startOver}
        styles={styles}
      />

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '6px' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#0066cc' }}>
          💡 <strong>Next Steps:</strong> This assessment covers all five pillars of family financial protection.
          Consider speaking with a financial advisor to implement these recommendations and review annually.
        </p>
        <p style={{ margin: 0, fontSize: '14px', color: '#0066cc' }}>
          ✏️ <strong>Need to adjust something?</strong> Use the "Edit Assessment" button above to modify any values and see updated results instantly.
        </p>
      </div>
    </div>
  )
}

export default ResultsPage
