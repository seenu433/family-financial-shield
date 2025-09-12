// Styles
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
      padding: '10px 0'
    },
    logo: {
      height: '48px',
      width: 'auto',
      marginRight: '15px'
    },
    headerTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
      margin: 0
    },
    hero: {
      textAlign: 'center',
      marginBottom: '50px',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      borderRadius: '12px',
      border: '1px solid #dee2e6'
    },
    heroTitle: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '16px',
      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
    },
    heroSubtitle: {
      fontSize: '20px',
      color: '#34495e',
      marginBottom: '24px',
      fontWeight: '500'
    },
    heroDescription: {
      fontSize: '16px',
      color: '#5a6c7d',
      lineHeight: '1.7',
      marginBottom: '0',
      maxWidth: '700px',
      margin: '0 auto'
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
      marginRight: '10px'
    },
    secondaryButton: {
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
      marginRight: '10px'
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '2px solid #ddd',
      borderRadius: '6px',
      marginTop: '10px',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '2px solid #ddd',
      borderRadius: '6px',
      marginTop: '10px',
      boxSizing: 'border-box',
      backgroundColor: 'white',
      cursor: 'pointer'
    },
    progress: {
      marginBottom: '30px',
      textAlign: 'center'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e9ecef',
      borderRadius: '4px',
      overflow: 'hidden',
      margin: '10px 0'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#007bff',
      transition: 'width 0.3s ease'
    },
    statusBadge: {
      padding: '10px 20px',
      borderRadius: '20px',
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '20px 0'
    },
    actionItem: {
      padding: '10px',
      backgroundColor: '#f8f9fa',
      borderLeft: '4px solid #007bff',
      margin: '10px 0',
      borderRadius: '4px'
    },
    formulaSection: {
      margin: '40px 0',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      textAlign: 'center'
    },
    formulaBox: {
      padding: '15px',
      backgroundColor: 'white',
      borderRadius: '6px',
      border: '2px solid #007bff',
      display: 'inline-block'
    },
    formulaText: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#007bff',
      fontFamily: 'monospace'
    },
    pillarsSection: {
      margin: '40px 0'
    },
    pillarsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    pillarCard: {
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef',
      textAlign: 'center'
    },
    pillarIcon: {
      fontSize: '32px',
      marginBottom: '15px'
    },
    pillarTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '15px',
      margin: '0 0 15px 0'
    },
    pillarList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      fontSize: '14px',
      color: '#666'
    },
    pillarListItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '6px',
      paddingLeft: '0'
    },
    pillarBullet: {
      color: '#007bff',
      marginRight: '8px',
      fontSize: '12px'
    },
    processSection: {
      margin: '40px 0',
      padding: '30px',
      backgroundColor: '#e7f3ff',
      borderRadius: '8px'
    },
    processSteps: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    processStep: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      fontSize: '16px'
    },
    stepNumber: {
      backgroundColor: '#007bff',
      color: 'white',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      flexShrink: 0
    },
    disclaimer: {
      margin: '30px 0',
      padding: '15px',
      backgroundColor: '#fff3cd',
      borderRadius: '6px',
      border: '1px solid #ffeaa7'
    },
    pillarCardContainer: {
      perspective: '1000px'
    },
    pillarCardFlipped: {
      backgroundColor: '#f8f9fa',
      minHeight: '400px',
      maxHeight: '500px',
      overflow: 'auto'
    },
    flipHint: {
      fontSize: '12px',
      color: '#6c757d',
      fontStyle: 'italic',
      marginTop: '10px',
      margin: '10px 0 0 0'
    },
    pillarDetailView: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    pillarDetailHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '15px',
      borderBottom: '2px solid #007bff',
      paddingBottom: '10px'
    },
    instrumentsList: {
      flex: 1,
      overflow: 'auto'
    },
    instrumentItem: {
      marginBottom: '10px',
      border: '1px solid #dee2e6',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    instrumentHeader: {
      padding: '10px',
      backgroundColor: '#e9ecef',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: 'bold'
    },
    instrumentName: {
      color: '#333'
    },
    expandIcon: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#007bff'
    },
    instrumentDetails: {
      padding: '15px',
      backgroundColor: 'white'
    },
    instrumentDescription: {
      fontSize: '13px',
      color: '#666',
      marginBottom: '10px',
      lineHeight: '1.4',
      margin: '0 0 10px 0'
    },
    relatedProducts: {
      fontSize: '12px'
    },
    productsList: {
      margin: '8px 0 0 0'
    },
    productItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '4px',
      color: '#666',
      fontSize: '12px',
      textAlign: 'left'
    },
    productName: {
      flex: 1,
      marginLeft: '0'
    },
    bulletPoint: {
      color: '#007bff',
      fontWeight: 'bold',
      marginRight: '8px',
      width: '12px',
      textAlign: 'center',
      fontSize: '14px',
      lineHeight: '1'
    },
    infoIcon: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      marginLeft: '6px',
      padding: '2px',
      fontSize: '12px',
      opacity: 0.7,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '18px',
      height: '18px'
    },
    modalOverlay: {
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
      borderRadius: '8px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '80vh',
      overflow: 'auto',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
    },
    modalHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 20px 10px 20px',
      borderBottom: '2px solid #007bff'
    },
    modalTitle: {
      margin: 0,
      color: '#333',
      fontSize: '20px'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#666',
      padding: '0',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalBody: {
      padding: '20px'
    },
    modalSection: {
      marginBottom: '20px'
    },
    sectionTitle: {
      margin: '0 0 8px 0',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#007bff'
    },
    sectionText: {
      margin: '0',
      lineHeight: '1.5',
      color: '#333'
    },
    proConsList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    proItem: {
      color: '#28a745',
      marginBottom: '4px',
      fontSize: '14px'
    },
    conItem: {
      color: '#dc3545',
      marginBottom: '4px',
      fontSize: '14px'
    },
    pillarScore: {
      textAlign: 'center',
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '6px',
      border: '1px solid #ddd'
    },
    scoreBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e9ecef',
      borderRadius: '4px',
      margin: '8px 0',
      overflow: 'hidden'
    },
    scoreFill: {
      height: '100%',
      transition: 'width 0.3s ease',
      borderRadius: '4px'
    },
    questionContext: {
      display: 'flex',
      gap: '10px',
      marginBottom: '15px',
      alignItems: 'center'
    },
    pillarBadge: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    instrumentBadge: {
      backgroundColor: '#f8f9fa',
      color: '#666',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      border: '1px solid #ddd'
    },
    instrumentIntro: {
      backgroundColor: '#e7f3ff',
      padding: '15px',
      borderRadius: '8px',
      margin: '20px 0',
      border: '1px solid #007bff20'
    },
    cancelButton: {
      backgroundColor: 'transparent',
      color: '#dc3545',
      border: '1px solid #dc3545',
      padding: '8px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      cursor: 'pointer',
      fontWeight: 'normal',
      transition: 'all 0.2s ease'
    },
    headerCancelButton: {
      backgroundColor: 'transparent',
      color: '#666',
      border: '1px solid #ddd',
      padding: '6px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      fontWeight: 'normal',
      transition: 'all 0.2s ease'
    },
    privacyDisclaimer: {
      backgroundColor: '#e8f5e8',
      border: '1px solid #c3e6c3',
      borderRadius: '6px',
      padding: '12px 16px',
      marginBottom: '20px',
      fontSize: '13px',
      color: '#2d5016',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    questionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      marginBottom: '30px'
    },
    questionCard: {
      backgroundColor: 'white',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '20px',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    questionHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '15px',
      marginBottom: '15px'
    },
    questionNumber: {
      minWidth: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: '#007bff',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      flexShrink: 0
    },
    questionTitle: {
      margin: 0,
      fontSize: '16px',
      fontWeight: '600',
      color: '#333',
      lineHeight: '1.4'
    },
    instrumentProgress: {
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '25px',
      border: '1px solid #dee2e6'
    },
    completionFeedback: {
      marginTop: '8px',
      fontSize: '14px',
      color: '#28a745',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    nationalAverage: {
      fontSize: '13px',
      color: '#007bff',
      margin: '5px 0 2px 0',
      fontWeight: '500',
      lineHeight: '1.3'
    },
    helpText: {
      fontSize: '12px',
      color: '#666',
      margin: '2px 0 0 0',
      lineHeight: '1.4',
      fontStyle: 'italic'
    },
    // Analysis tile flip styles
    analysisTileContainer: {
      perspective: '1000px',
      height: 'auto',
      minHeight: '120px'
    },
    analysisTile: {
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '120px',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.6s ease',
      cursor: 'pointer'
    },
    analysisTileFlipped: {
      transform: 'rotateY(180deg)'
    },
    analysisTileFront: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    analysisTileBack: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      backgroundColor: '#f8f9fa',
      padding: '15px',
      borderRadius: '6px',
      transform: 'rotateY(180deg)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      overflow: 'auto'
    },
    flipHintText: {
      fontSize: '11px',
      color: '#6c757d',
      fontStyle: 'italic',
      marginTop: '8px',
      textAlign: 'center'
    },
    calculationHeader: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
      borderBottom: '1px solid #dee2e6',
      paddingBottom: '5px'
    },
    calculationItem: {
      fontSize: '12px',
      color: '#666',
      marginBottom: '4px',
      display: 'flex',
      justifyContent: 'space-between'
    },
    // Pillar tile flip styles
    pillarTileContainer: {
      perspective: '1000px',
      height: '180px',
      minHeight: '180px'
    },
    pillarTile: {
      position: 'relative',
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.6s ease',
      cursor: 'pointer'
    },
    pillarTileFlipped: {
      transform: 'rotateY(180deg)'
    },
    pillarTileFront: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      boxSizing: 'border-box'
    },
    pillarTileBack: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      backgroundColor: '#f8f9fa',
      padding: '12px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef',
      transform: 'rotateY(180deg)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      overflow: 'auto',
      boxSizing: 'border-box'
    },
    pillarFlipHint: {
      fontSize: '10px',
      color: '#6c757d',
      fontStyle: 'italic',
      marginTop: '8px',
      textAlign: 'center'
    },
    pillarExplanationTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px',
      textAlign: 'center'
    },
    pillarCalculation: {
      fontSize: '12px',
      color: '#007bff',
      marginBottom: '10px',
      textAlign: 'center',
      fontWeight: '500'
    },
    pillarBreakdownList: {
      fontSize: '11px',
      color: '#666',
      lineHeight: '1.4',
      margin: '0',
      padding: '0',
      listStyle: 'none'
    },
    pillarBreakdownItem: {
      marginBottom: '3px',
      paddingLeft: '8px',
      borderLeft: '2px solid #dee2e6'
    },
    pillarExplanationText: {
      fontSize: '11px',
      color: '#495057',
      marginTop: '8px',
      fontStyle: 'italic',
      lineHeight: '1.3'
    }
  })
