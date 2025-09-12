// Styles configuration for Family Financial Shield
// Contains all styling definitions for the application components

export const getStyles = (currentStep) => ({
  container: {
    maxWidth: currentStep === 'landing' ? '1000px' : '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    lineHeight: '1.5'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '30px',
    padding: '20px 0'
  },
  logo: {
    width: '60px',
    height: '60px',
    marginRight: '15px'
  },
  headerTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#2c3e50',
    margin: '0'
  },
  backButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  progressContainer: {
    marginBottom: '30px'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e9ecef',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '10px'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#28a745',
    transition: 'width 0.3s ease'
  },
  progressText: {
    fontSize: '14px',
    color: '#6c757d',
    textAlign: 'center'
  },
  hero: {
    textAlign: 'center',
    marginBottom: '50px',
    padding: '40px 30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '1px solid #e9ecef',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  heroTitle: {
    fontSize: '42px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '20px',
    lineHeight: '1.2'
  },
  heroSubtitle: {
    fontSize: '22px',
    color: '#007bff',
    marginBottom: '30px',
    lineHeight: '1.4'
  },
  heroDescription: {
    fontSize: '17px',
    color: '#555555',
    maxWidth: '800px',
    margin: '0 auto 40px',
    lineHeight: '1.6'
  },
  pillarsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '60px'
  },
  pillarCardContainer: {
    marginBottom: '20px'
  },
  pillarCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid #e9ecef',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    minHeight: '200px'
  },
  pillarCardFlipped: {
    backgroundColor: '#f8f9fa',
    border: '2px solid #007bff',
    boxShadow: '0 4px 12px rgba(0,123,255,0.15)'
  },
  pillarIcon: {
    fontSize: '32px',
    marginBottom: '15px',
    display: 'block',
    color: '#007bff'
  },
  pillarList: {
    textAlign: 'left'
  },
  pillarListItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '8px'
  },
  pillarBullet: {
    color: '#007bff',
    marginRight: '8px',
    fontWeight: 'bold'
  },
  flipHint: {
    fontSize: '12px',
    color: '#6c757d',
    fontStyle: 'italic',
    marginTop: '10px'
  },
  pillarDetailView: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px'
  },
  pillarDetailHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  },
  instrumentsList: {
    marginTop: '15px'
  },
  instrumentItem: {
    marginBottom: '15px',
    border: '1px solid #e9ecef',
    borderRadius: '6px'
  },
  instrumentHeader: {
    padding: '12px 15px',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  instrumentName: {
    fontWeight: '500',
    color: '#2c3e50'
  },
  expandIcon: {
    color: '#007bff'
  },
  instrumentDetails: {
    padding: '15px',
    borderTop: '1px solid #e9ecef'
  },
  instrumentDescription: {
    color: '#6c757d',
    fontSize: '14px',
    marginBottom: '10px'
  },
  pillarCardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  pillarTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  pillarDescription: {
    fontSize: '16px',
    color: '#34495e',
    lineHeight: '1.5',
    marginBottom: '20px'
  },
  expandButton: {
    backgroundColor: 'transparent',
    border: '1px solid #007bff',
    color: '#007bff',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  },
  expandButtonHover: {
    backgroundColor: '#007bff',
    color: 'white'
  },
  expandedContent: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  },
  formula: {
    textAlign: 'center',
    marginBottom: '60px',
    padding: '40px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '1px solid #e9ecef'
  },
  formulaSection: {
    textAlign: 'center',
    marginBottom: '60px',
    padding: '40px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '1px solid #e9ecef'
  },
  formulaBox: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #007bff',
    display: 'inline-block',
    marginBottom: '20px'
  },
  formulaText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#007bff',
    fontFamily: 'monospace'
  },
  formulaTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '20px'
  },
  formulaExpression: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#007bff',
    marginBottom: '20px',
    fontFamily: 'monospace'
  },
  formulaDescription: {
    fontSize: '16px',
    color: '#6c757d',
    lineHeight: '1.5'
  },
  callToAction: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'background-color 0.2s ease',
    minWidth: '200px'
  },
  buttonHover: {
    backgroundColor: '#0056b3'
  },
  buttonSecondary: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    transition: 'background-color 0.2s ease'
  },
  disclaimer: {
    textAlign: 'center',
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#856404'
  },
  questionCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid #e9ecef',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  questionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '20px',
    lineHeight: '1.4'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '16px',
    fontWeight: '500',
    color: '#495057',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box'
  },
  inputFocus: {
    borderColor: '#007bff',
    outline: 'none'
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box'
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '30px',
    gap: '15px'
  },
  navButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.2s ease'
  },
  navButtonDisabled: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed'
  },
  navButtonSecondary: {
    backgroundColor: '#6c757d',
    color: 'white'
  },
  resultsContainer: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  statusCard: {
    textAlign: 'center',
    padding: '40px',
    marginBottom: '40px',
    borderRadius: '12px',
    border: '2px solid'
  },
  statusCardGreen: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    color: '#155724'
  },
  statusCardYellow: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7',
    color: '#856404'
  },
  statusCardRed: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    color: '#721c24'
  },
  statusTitle: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '15px'
  },
  statusScore: {
    fontSize: '48px',
    fontWeight: '800',
    marginBottom: '20px'
  },
  statusDescription: {
    fontSize: '18px',
    lineHeight: '1.5',
    maxWidth: '600px',
    margin: '0 auto'
  },
  pillarsSection: {
    marginBottom: '60px'
  },
  pillarsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  pillarTile: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    border: '1px solid #e9ecef',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    position: 'relative',
    minHeight: '120px'
  },
  pillarTileHover: {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
  },
  pillarName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '10px'
  },
  pillarScore: {
    fontSize: '32px',
    fontWeight: '800',
    marginBottom: '10px'
  },
  pillarScoreGreen: {
    color: '#28a745'
  },
  pillarScoreYellow: {
    color: '#ffc107'
  },
  pillarScoreRed: {
    color: '#dc3545'
  },
  pillarStatus: {
    fontSize: '14px',
    fontWeight: '500'
  },
  flipCard: {
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s'
  },
  flipCardFlipped: {
    transform: 'rotateY(180deg)'
  },
  flipCardFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flipCardBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  explanationTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '10px'
  },
  explanationText: {
    fontSize: '12px',
    color: '#495057',
    lineHeight: '1.4'
  },
  flipHint: {
    position: 'absolute',
    bottom: '5px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '10px',
    color: '#6c757d',
    opacity: 0.7
  },
  summarySection: {
    backgroundColor: '#f8f9fa',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid #e9ecef',
    marginBottom: '40px'
  },
  summaryTitle: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '20px',
    textAlign: 'center'
  },
  summaryContent: {
    fontSize: '16px',
    color: '#495057',
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  ratioAnalysis: {
    backgroundColor: '#fff3cd',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ffeaa7',
    marginTop: '20px'
  },
  financialNumbers: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  numberCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #e9ecef',
    textAlign: 'center'
  },
  numberValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '5px'
  },
  numberLabel: {
    fontSize: '14px',
    color: '#6c757d',
    fontWeight: '500'
  },
  actionItems: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid #e9ecef',
    marginBottom: '40px'
  },
  actionItemsTitle: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '25px',
    textAlign: 'center'
  },
  actionItem: {
    backgroundColor: '#f8f9fa',
    padding: '15px 20px',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    marginBottom: '15px',
    fontSize: '16px',
    color: '#495057',
    lineHeight: '1.5'
  },
  expandedInstrument: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
    border: '1px solid #e9ecef'
  },
  instrumentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
    marginTop: '15px'
  },
  instrumentCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid #dee2e6',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  },
  instrumentCardHover: {
    backgroundColor: '#e9ecef'
  },
  productLink: {
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: '500'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '80vh',
    overflow: 'auto',
    position: 'relative'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '1px solid #e9ecef'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: 0
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#6c757d',
    padding: '0',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalSection: {
    marginBottom: '25px'
  },
  modalSectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '10px'
  },
  modalList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  modalListItem: {
    fontSize: '14px',
    color: '#495057',
    lineHeight: '1.5',
    marginBottom: '8px',
    paddingLeft: '20px',
    position: 'relative'
  },
  modalListItemBullet: {
    position: 'absolute',
    left: '0',
    color: '#007bff'
  },
  // Mobile responsive styles
  '@media (max-width: 768px)': {
    container: {
      padding: '15px'
    },
    heroTitle: {
      fontSize: '28px'
    },
    heroSubtitle: {
      fontSize: '18px'
    },
    heroDescription: {
      fontSize: '15px'
    },
    pillarsContainer: {
      gridTemplateColumns: '1fr'
    },
    pillarGrid: {
      gridTemplateColumns: '1fr'
    },
    financialNumbers: {
      gridTemplateColumns: '1fr'
    },
    navigation: {
      flexDirection: 'column',
      gap: '10px'
    },
    navButton: {
      width: '100%'
    },
    statusScore: {
      fontSize: '36px'
    },
    formulaExpression: {
      fontSize: '24px'
    },
    modalContent: {
      margin: '10px',
      padding: '20px'
    }
  }
});
