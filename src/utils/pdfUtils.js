// PDF generation utilities for the Family Financial Shield application
import jsPDF from 'jspdf';

/**
 * Enhanced text cleaning for PDF generation to handle Unicode and special characters
 * @param {string} text - Text to clean for PDF
 * @returns {string} Cleaned text safe for PDF generation
 */
export const cleanTextForPDF = (text) => {
  if (!text) return '';
  
  return text
    // Fix the þ character encoding issues
    .replace(/þ/g, ' ')
    // Fix common Unicode issues
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€\u009D/g, '"')
    .replace(/â€"/g, '—')
    .replace(/â€¢/g, '•')
    // Fix spacing issues
    .replace(/\s+/g, ' ')
    // Remove any remaining problematic characters
    .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, '')
    .trim();
};

/**
 * Generate and download PDF report of assessment results
 * @param {Object} results - Financial calculation results
 * @param {Object} formData - Assessment form data
 * @param {Object} summaryAnalysis - Summary analysis data
 */
export const generatePDF = (results, formData, summaryAnalysis) => {
  const pdf = new jsPDF();
  let yPosition = 20;
  
  // Helper function to add text with proper spacing and cleaning
  const addText = (text, x = 20, fontSize = 12, isBold = false) => {
    const cleanedText = cleanTextForPDF(text);
    pdf.setFontSize(fontSize);
    if (isBold) {
      pdf.setFont(undefined, 'bold');
    } else {
      pdf.setFont(undefined, 'normal');
    }
    
    // Handle text wrapping for long lines
    const maxWidth = 170;
    const splitText = pdf.splitTextToSize(cleanedText, maxWidth);
    
    splitText.forEach(line => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(line, x, yPosition);
      yPosition += fontSize * 0.4 + 2;
    });
    
    return yPosition;
  };
  
  // Header
  addText('Family Financial Shield Assessment Report', 20, 18, true);
  yPosition += 10;
  
  // Date
  addText(`Assessment Date: ${new Date().toLocaleDateString()}`, 20, 10);
  yPosition += 15;
  
  // Financial Health Summary Section
  addText('FINANCIAL HEALTH SUMMARY', 20, 14, true);
  yPosition += 5;
  
  addText(`Overall Score: ${results.healthScore}/100`, 20, 12, true);
  addText(`Status: ${results.status.toUpperCase()}`, 20, 12, true);
  yPosition += 5;
  
  // Summary Analysis
  addText(summaryAnalysis.title, 20, 12, true);
  addText(summaryAnalysis.text, 20, 10);
  yPosition += 5;
  
  // Context
  addText('Assessment Details:', 20, 12, true);
  addText(summaryAnalysis.context, 20, 10);
  yPosition += 10;
  
  // Key Recommendations
  addText('KEY RECOMMENDATIONS:', 20, 14, true);
  yPosition += 5;
  
  summaryAnalysis.recommendations.forEach((rec, index) => {
    addText(`${index + 1}. ${rec}`, 25, 10);
  });
  yPosition += 10;
  
  // Next Steps
  addText('NEXT STEPS:', 20, 12, true);
  addText(summaryAnalysis.nextSteps, 20, 10);
  yPosition += 15;
  
  // Assessment Results
  addText('DETAILED ASSESSMENT RESULTS', 20, 14, true);
  yPosition += 5;
  
  // Basic Info
  addText('Your Information:', 20, 12, true);
  addText(`Annual Income: $${(formData.annualIncome || 0).toLocaleString()}`, 25, 10);
  addText(`Monthly Expenses: $${(formData.monthlyExpenses || 0).toLocaleString()}`, 25, 10);
  addText(`Number of Dependents: ${formData.dependents || 0}`, 25, 10);
  yPosition += 10;
  
  // Current Coverage
  addText('Current Financial Protection:', 20, 12, true);
  addText(`Life Insurance Coverage: $${(formData.currentLifeInsurance || 0).toLocaleString()}`, 25, 10);
  addText(`Emergency Fund: $${(formData.emergencyFund || 0).toLocaleString()}`, 25, 10);
  addText(`Retirement Accounts: $${(formData.retirementAccounts || 0).toLocaleString()}`, 25, 10);
  addText(`Other Investments: $${(formData.otherInvestments || 0).toLocaleString()}`, 25, 10);
  
  if (formData.hsaAccounts) {
    addText(`HSA Accounts: $${(formData.hsaAccounts || 0).toLocaleString()}`, 25, 10);
  }
  
  if (formData.plan529Accounts) {
    addText(`529 Education Plans: $${(formData.plan529Accounts || 0).toLocaleString()}`, 25, 10);
  }
  
  addText(`Total Savings & Investments: $${results.savingsInvestmentsTotal.toLocaleString()}`, 25, 10);
  yPosition += 10;
  
  // Gaps Analysis
  addText('Protection Gaps:', 20, 12, true);
  if (results.lifeInsuranceGap > 0) {
    addText(`Life Insurance Gap: $${results.lifeInsuranceGap.toLocaleString()}`, 25, 10);
  } else {
    addText('Life Insurance Gap: $0 (Adequate Coverage)', 25, 10);
  }
  
  if (results.emergencyFundGap > 0) {
    addText(`Emergency Fund Gap: $${results.emergencyFundGap.toLocaleString()}`, 25, 10);
  } else {
    addText('Emergency Fund Gap: $0 (Adequate Savings)', 25, 10);
  }
  yPosition += 10;
  
  // Targets
  addText('Recommended Targets:', 20, 12, true);
  addText(`Life Insurance Target: $${results.basicLifeInsuranceNeed.toLocaleString()}`, 25, 10);
  addText(`Emergency Fund Target: $${results.emergencyFundGoal.toLocaleString()}`, 25, 10);
  yPosition += 15;
  
  // Action Items
  addText('PRIORITY ACTION ITEMS', 20, 14, true);
  yPosition += 5;
  
  results.actionItems.forEach((item, index) => {
    addText(`${index + 1}. ${item.title}`, 20, 11, true);
    addText(`${item.description}`, 25, 10);
    addText(`Action: ${item.action}`, 25, 10);
    addText(`Urgency: ${item.urgency.toUpperCase()}`, 25, 10);
    yPosition += 5;
  });
  
  yPosition += 15;
  
  // Disclaimer
  addText('IMPORTANT DISCLAIMER', 20, 12, true);
  yPosition += 5;
  
  const disclaimer = 'This assessment is for educational purposes only and should not be considered as personalized financial advice. The calculations are based on general guidelines and may not account for your specific circumstances, tax situation, or state laws. Please consult with licensed financial advisors, insurance professionals, and estate planning attorneys for advice tailored to your situation.';
  
  addText(disclaimer, 20, 9);
  yPosition += 10;
  
  addText('For more information about financial planning and protection strategies, consider consulting:', 20, 10);
  addText('• Fee-only financial planners (NAPFA.org)', 25, 9);
  addText('• Estate planning attorneys', 25, 9);
  addText('• Insurance professionals', 25, 9);
  addText('• Tax professionals', 25, 9);
  
  // Save the PDF
  const fileName = `Family_Financial_Assessment_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};
