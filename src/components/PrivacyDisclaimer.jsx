import React from 'react'

function PrivacyDisclaimer({ styles }) {
  return (
    <div style={styles.privacyDisclaimer}>
      <span style={{ fontSize: '16px' }}>🔒</span>
      <span>
        <strong>Your privacy is protected:</strong> All information entered remains on your device only. 
        No data is stored, transmitted, or shared with any external systems.
      </span>
    </div>
  )
}

export default PrivacyDisclaimer
