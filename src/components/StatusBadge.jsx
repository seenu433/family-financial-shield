import React from 'react'

function StatusBadge({ results, styles, getStatusColor }) {
  return (
    <div style={{ ...styles.statusBadge, ...getStatusColor(results.status) }}>
      {results.statusText} - {Math.round(results.overallScore)}% Protected
    </div>
  )
}

export default StatusBadge
