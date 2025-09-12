import React from 'react'

function ActionPlan({ results, styles }) {
  return (
    <div>
      <h3>Your Prioritized Action Plan:</h3>
      {results.actionItems.map((item, index) => (
        <div key={index} style={styles.actionItem}>
          <strong>{index + 1}.</strong> {item}
        </div>
      ))}
    </div>
  )
}

export default ActionPlan
