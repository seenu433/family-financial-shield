// PDF generation utilities

export const generatePDF = async (results, formData) => {
  try {
    // Dynamic import of jsPDF
    const { jsPDF } = await import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
    
    const doc = new jsPDF()
    let yPosition = 20
    const pageWidth = doc.internal.pageSize.width
    const leftMargin = 15
    const rightMargin = 15
    const contentWidth = pageWidth - leftMargin - rightMargin
    
    // Enhanced text cleaning function for PDF
    const cleanTextForPDF = (text) => {
      if (!text) return ''
      
      return text
        // Remove or replace specific problematic characters
        .replace(/þ/g, 'th')
        .replace(/ð/g, 'd')
        .replace(/æ/g, 'ae')
        .replace(/œ/g, 'oe')
        .replace(/ß/g, 'ss')
        .replace(/[^\x20-\x7E]/g, '') // Remove non-ASCII characters
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()
    }
    
    // Helper function to add text with wrapping and proper spacing
    const addWrappedText = (text, x, y, maxWidth, fontSize = 12, lineHeight = 1.2) => {
      doc.setFontSize(fontSize)
      const cleanedText = cleanTextForPDF(text)
      const lines = doc.splitTextToSize(cleanedText, maxWidth)
      
      lines.forEach((line, index) => {
        if (y + (index * fontSize * lineHeight) > 280) {
          doc.addPage()
          y = 20
        }
        doc.text(line, x, y + (index * fontSize * lineHeight))
      })
      
      return y + (lines.length * fontSize * lineHeight) + 5
    }
    
    // Helper function to check if we need a new page
    const checkPageBreak = (currentY, requiredSpace = 30) => {
      if (currentY + requiredSpace > 280) {
        doc.addPage()
        return 20
      }
      return currentY
    }
    
    // Title
    doc.setFontSize(18)
    doc.setFont(undefined, 'bold')
    doc.text('Family Financial Shield Assessment Report', leftMargin, yPosition)
    yPosition += 15
    
    // Date
    doc.setFontSize(11)
    doc.setFont(undefined, 'normal')
    const currentDate = new Date().toLocaleDateString()
    doc.text(`Generated on: ${currentDate}`, leftMargin, yPosition)
    yPosition += 15
    
    // Assessment Inputs Section
    yPosition = checkPageBreak(yPosition, 50)
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('Assessment Inputs', leftMargin, yPosition)
    yPosition += 10
    
    doc.setFontSize(11)
    doc.setFont(undefined, 'normal')
    const inputs = [
      `Annual Household Income: $${Number(formData.income || 0).toLocaleString()}`,
      `Monthly Expenses: $${Number(formData.expenses || 0).toLocaleString()}`,
      `Number of Dependents: ${formData.dependents || 0}`,
      `Current Life Insurance: $${Number(formData.currentInsurance || 0).toLocaleString()}`,
      `Emergency Fund: $${Number(formData.emergencyFund || 0).toLocaleString()}`
    ]
    
    inputs.forEach(input => {
      yPosition = addWrappedText(input, leftMargin, yPosition, contentWidth, 11, 1.3)
    })
    
    yPosition += 5
    
    // Results Section
    yPosition = checkPageBreak(yPosition, 50)
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('Assessment Results', leftMargin, yPosition)
    yPosition += 10
    
    // Financial Health Status
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    yPosition = addWrappedText(`Overall Financial Health: ${results.overallStatus.toUpperCase()}`, leftMargin, yPosition, contentWidth, 12, 1.3)
    
    doc.setFont(undefined, 'normal')
    yPosition = addWrappedText(results.overallMessage, leftMargin, yPosition, contentWidth, 11, 1.3)
    yPosition += 5
    
    // Life Insurance Analysis
    yPosition = checkPageBreak(yPosition, 40)
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text('Life Insurance Analysis', leftMargin, yPosition)
    yPosition += 8
    
    doc.setFont(undefined, 'normal')
    yPosition = addWrappedText(`Recommended Coverage: $${results.recommendedInsurance.toLocaleString()}`, leftMargin, yPosition, contentWidth, 11, 1.3)
    yPosition = addWrappedText(`Current Coverage: $${results.currentInsurance.toLocaleString()}`, leftMargin, yPosition, contentWidth, 11, 1.3)
    yPosition = addWrappedText(`Coverage Gap: $${results.insuranceGap.toLocaleString()}`, leftMargin, yPosition, contentWidth, 11, 1.3)
    yPosition += 5
    
    // Emergency Fund Analysis
    yPosition = checkPageBreak(yPosition, 40)
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text('Emergency Fund Analysis', leftMargin, yPosition)
    yPosition += 8
    
    doc.setFont(undefined, 'normal')
    yPosition = addWrappedText(`Recommended Emergency Fund: $${results.recommendedEmergencyFund.toLocaleString()}`, leftMargin, yPosition, contentWidth, 11, 1.3)
    yPosition = addWrappedText(`Current Emergency Fund: $${results.currentEmergencyFund.toLocaleString()}`, leftMargin, yPosition, contentWidth, 11, 1.3)
    yPosition = addWrappedText(`Emergency Fund Gap: $${results.emergencyFundGap.toLocaleString()}`, leftMargin, yPosition, contentWidth, 11, 1.3)
    yPosition += 5
    
    // Financial Health Summary
    if (results.summary) {
      yPosition = checkPageBreak(yPosition, 60)
      doc.setFontSize(14)
      doc.setFont(undefined, 'bold')
      doc.text('Financial Health Summary', leftMargin, yPosition)
      yPosition += 10
      
      doc.setFont(undefined, 'normal')
      yPosition = addWrappedText(results.summary.overallAnalysis, leftMargin, yPosition, contentWidth, 11, 1.3)
      yPosition += 8
      
      // Key Financial Numbers
      doc.setFontSize(12)
      doc.setFont(undefined, 'bold')
      doc.text('Key Financial Numbers:', leftMargin, yPosition)
      yPosition += 8
      
      doc.setFont(undefined, 'normal')
      results.summary.keyNumbers.forEach(number => {
        yPosition = addWrappedText(`• ${number}`, leftMargin + 5, yPosition, contentWidth - 5, 11, 1.3)
      })
      yPosition += 5
      
      // Financial Strengths
      if (results.summary.strengths && results.summary.strengths.length > 0) {
        yPosition = checkPageBreak(yPosition, 40)
        doc.setFontSize(12)
        doc.setFont(undefined, 'bold')
        doc.text('Financial Strengths:', leftMargin, yPosition)
        yPosition += 8
        
        doc.setFont(undefined, 'normal')
        results.summary.strengths.forEach(strength => {
          yPosition = addWrappedText(`• ${strength}`, leftMargin + 5, yPosition, contentWidth - 5, 11, 1.3)
        })
        yPosition += 5
      }
      
      // Areas of Concern
      if (results.summary.concerns && results.summary.concerns.length > 0) {
        yPosition = checkPageBreak(yPosition, 40)
        doc.setFontSize(12)
        doc.setFont(undefined, 'bold')
        doc.text('Areas of Concern:', leftMargin, yPosition)
        yPosition += 8
        
        doc.setFont(undefined, 'normal')
        results.summary.concerns.forEach(concern => {
          yPosition = addWrappedText(`• ${concern}`, leftMargin + 5, yPosition, contentWidth - 5, 11, 1.3)
        })
        yPosition += 5
      }
      
      // Priority Focus
      if (results.summary.priorityFocus) {
        yPosition = checkPageBreak(yPosition, 30)
        doc.setFontSize(12)
        doc.setFont(undefined, 'bold')
        doc.text('Priority Focus:', leftMargin, yPosition)
        yPosition += 8
        
        doc.setFont(undefined, 'normal')
        yPosition = addWrappedText(results.summary.priorityFocus, leftMargin, yPosition, contentWidth, 11, 1.3)
        yPosition += 8
      }
    }
    
    // Action Items
    yPosition = checkPageBreak(yPosition, 50)
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('Recommended Action Items', leftMargin, yPosition)
    yPosition += 10
    
    doc.setFont(undefined, 'normal')
    results.actionItems.forEach((item, index) => {
      yPosition = checkPageBreak(yPosition, 25)
      
      // Priority indicator
      const priorityText = `${item.priority.toUpperCase()} PRIORITY:`
      doc.setFont(undefined, 'bold')
      yPosition = addWrappedText(`${index + 1}. ${priorityText}`, leftMargin, yPosition, contentWidth, 11, 1.3)
      
      // Action item text
      doc.setFont(undefined, 'normal')
      yPosition = addWrappedText(item.text, leftMargin + 10, yPosition, contentWidth - 10, 11, 1.3)
      yPosition += 3
    })
    
    // Disclaimer
    yPosition = checkPageBreak(yPosition, 40)
    yPosition += 10
    doc.setFontSize(10)
    doc.setFont(undefined, 'italic')
    const disclaimer = "IMPORTANT DISCLAIMER: This assessment is for educational purposes only and does not constitute financial advice. Please consult with a qualified financial advisor or insurance professional for personalized recommendations based on your specific situation."
    yPosition = addWrappedText(disclaimer, leftMargin, yPosition, contentWidth, 10, 1.4)
    
    // Save the PDF
    doc.save('family-financial-shield-assessment.pdf')
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF. Please try again.')
  }
}
