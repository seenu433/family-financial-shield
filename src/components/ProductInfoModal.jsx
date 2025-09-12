import React from 'react'

function ProductInfoModal({ productInfoModal, closeProductInfo, styles }) {
  if (!productInfoModal.isOpen) {
    return null
  }

  return (
    <div style={styles.modalOverlay} onClick={closeProductInfo}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>{productInfoModal.product.name}</h3>
          <button style={styles.closeButton} onClick={closeProductInfo}>×</button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.modalSection}>
            <h4 style={styles.sectionTitle}>What is it?</h4>
            <p style={styles.sectionText}>{productInfoModal.product.description}</p>
          </div>
          <div style={styles.modalSection}>
            <h4 style={styles.sectionTitle}>How it works</h4>
            <p style={styles.sectionText}>{productInfoModal.product.howItWorks}</p>
          </div>
          <div style={styles.modalSection}>
            <h4 style={styles.sectionTitle}>Pros</h4>
            <ul style={styles.proConsList}>
              {productInfoModal.product.pros.map((pro, index) => (
                <li key={index} style={styles.proItem}>✓ {pro}</li>
              ))}
            </ul>
          </div>
          <div style={styles.modalSection}>
            <h4 style={styles.sectionTitle}>Cons</h4>
            <ul style={styles.proConsList}>
              {productInfoModal.product.cons.map((con, index) => (
                <li key={index} style={styles.conItem}>✗ {con}</li>
              ))}
            </ul>
          </div>
          <div style={styles.modalSection}>
            <h4 style={styles.sectionTitle}>Best for</h4>
            <p style={styles.sectionText}>{productInfoModal.product.bestFor}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfoModal
