// PDF Generation Utilities for Family Financial Shield
// Handles PDF generation and fallback text download functionality

export const generatePDF = (results) => {
  // Enhanced function to clean text for PDF compatibility
  const cleanTextForPDF = (text) => {
    if (!text) return '';
    
    return text
      // First handle the þ character specifically
      .replace(/þ/g, '')
      // Remove all emojis and special symbols - comprehensive ranges
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]/gu, '')
      // Additional emoji ranges
      .replace(/[\u{1F004}\u{1F0CF}\u{1F170}-\u{1F251}]/gu, '')
      // Remove shield emoji specifically (🛡️)
      .replace(/🛡️?/g, '')
      // Remove other problematic Unicode characters
      .replace(/[\u{2000}-\u{206F}]|[\u{2E00}-\u{2E7F}]|[\u{3000}-\u{303F}]/gu, ' ')
      // Remove variation selectors that can cause issues
      .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
      // Replace bullet points and special characters
      .replace(/[•·▪▫◦‣⁃]/g, '-')
      // Replace smart quotes with regular quotes
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      // Replace em/en dashes with regular hyphens
      .replace(/[–—]/g, '-')
      // Fix broken spacing by normalizing whitespace
      .replace(/\s+/g, ' ')
      // Remove any remaining non-ASCII characters that could cause issues
      .replace(/[^\x00-\x7F]/g, '')
      .trim();
  };

  // Generate PDF using jsPDF
  try {
    // Dynamic import of jsPDF to avoid bundle size issues
    import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js').then(() => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Set up document properties
      doc.setProperties({
        title: 'Family Financial Shield Assessment Results',
        creator: 'Family Financial Shield',
        author: 'Financial Assessment Tool'
      });
      
      // Set up PDF styling
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const lineHeight = 6;
      let currentY = margin;
      
      // Color palette
      const colors = {
        primary: [34, 139, 34],      // Forest Green
        secondary: [70, 130, 180],   // Steel Blue
        success: [46, 125, 50],      // Green
        warning: [255, 152, 0],      // Orange
        danger: [211, 47, 47],       // Red
        text: [33, 33, 33],          // Dark Gray
        lightGray: [245, 245, 245],  // Light Gray
        darkGray: [117, 117, 117]    // Medium Gray
      };
      
      // Helper function to add text with automatic wrapping and color
      const addWrappedText = (text, x, y, maxWidth, fontSize = 12, color = colors.text) => {
        doc.setFontSize(fontSize);
        doc.setTextColor(color[0], color[1], color[2]);
        const lines = doc.splitTextToSize(cleanTextForPDF(text), maxWidth);
        doc.text(lines, x, y);
        return y + (lines.length * lineHeight);
      };
      
      // Helper function to add colored background rectangle
      const addBackground = (x, y, width, height, color) => {
        doc.setFillColor(color[0], color[1], color[2]);
        doc.rect(x, y, width, height, 'F');
      };
      
      // Helper function to add section header with background
      const addSectionHeader = (title, y, color = colors.primary) => {
        const headerHeight = 12;
        addBackground(margin, y - 2, pageWidth - 2 * margin, headerHeight, colors.lightGray);
        
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(color[0], color[1], color[2]);
        doc.text(title, margin + 5, y + 7);
        
        return y + headerHeight + 5;
      };
      
      // Helper function to create status indicator
      const addStatusIndicator = (status, score, x, y) => {
        const indicatorSize = 8;
        let indicatorColor = colors.success;
        
        if (score < 30) indicatorColor = colors.danger;
        else if (score < 70) indicatorColor = colors.warning;
        
        // Draw status circle
        doc.setFillColor(indicatorColor[0], indicatorColor[1], indicatorColor[2]);
        doc.circle(x, y, indicatorSize / 2, 'F');
        
        // Add status text
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(indicatorColor[0], indicatorColor[1], indicatorColor[2]);
        doc.text(status, x + indicatorSize + 3, y + 2);
        
        return y;
      };
      
      // Helper function to check if we need a new page
      const checkNewPage = (nextContentHeight) => {
        if (currentY + nextContentHeight > pageHeight - margin) {
          doc.addPage();
          currentY = margin;
        }
      };
      
      // Title with colored header background
      addBackground(margin, currentY, pageWidth - 2 * margin, 25, colors.primary);
      
      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(255, 255, 255); // White text
      doc.text('FAMILY FINANCIAL SHIELD', margin + 10, currentY + 15);
      
      currentY += 30;
      
      doc.setFontSize(16);
      doc.setFont(undefined, 'normal');
      currentY = addWrappedText('Assessment Results', margin, currentY, pageWidth - 2 * margin, 16, colors.secondary);
      
      // Date and time
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      currentY = addWrappedText(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, margin, currentY + 10, pageWidth - 2 * margin, 10, colors.darkGray);
      
      currentY += 20;
      
      // Overall Status with visual indicator
      checkNewPage(50);
      currentY = addSectionHeader('OVERALL FINANCIAL PROTECTION STATUS', currentY);
      
      const overallScore = Math.round(results?.overallScore || 0);
      const statusText = results?.statusText || 'Not calculated';
      
      // Status text on its own line
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
      doc.text(`Status: ${statusText}`, margin + 10, currentY + 5);
      
      // Score on next line with color coding
      let statusColor = colors.success;
      if (overallScore < 30) statusColor = colors.danger;
      else if (overallScore < 70) statusColor = colors.warning;
      
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
      doc.text(`Protection Level: ${overallScore}%`, margin + 10, currentY + 20);
      
      currentY += 35;
      
      // Five Pillar Analysis with progress bars
      checkNewPage(100);
      currentY = addSectionHeader('FIVE PILLAR ANALYSIS', currentY);
      
      const pillars = [
        { name: 'Benefits (Life Insurance, Savings)', score: results?.benefitsScore || 0, icon: '[BANK]' },
        { name: 'Liabilities', score: results?.debtScore || 0, icon: '[DEBT]' },
        { name: 'Taxes', score: results?.taxScore || 0, icon: '[TAX]' },
        { name: 'Emergency Fund', score: results?.emergencyScore || 0, icon: '[EMERGENCY]' },
        { name: 'Legal Planning', score: results?.legalScore || 0, icon: '[LEGAL]' }
      ];
      
      pillars.forEach(pillar => {
        checkNewPage(20);
        
        // Pillar name with icon
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
        doc.text(`${pillar.icon} ${pillar.name}`, margin + 5, currentY + 5);
        
        // Progress bar background
        const barWidth = 80;
        const barHeight = 6;
        const barX = margin + 5;
        const barY = currentY + 10;
        
        doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
        doc.rect(barX, barY, barWidth, barHeight, 'F');
        
        // Progress bar fill
        const fillWidth = (barWidth * pillar.score) / 100;
        let barColor = colors.success;
        if (pillar.score < 30) barColor = colors.danger;
        else if (pillar.score < 70) barColor = colors.warning;
        
        doc.setFillColor(barColor[0], barColor[1], barColor[2]);
        doc.rect(barX, barY, fillWidth, barHeight, 'F');
        
        // Score percentage (positioned to avoid overlap)
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(barColor[0], barColor[1], barColor[2]);
        doc.text(`${pillar.score}%`, barX + barWidth + 10, barY + 4);
        
        currentY += 22;
      });
      
      currentY += 10;
      
      // Key Financial Numbers with formatted boxes
      checkNewPage(80);
      currentY = addSectionHeader('KEY FINANCIAL NUMBERS', currentY);
      
      const financialData = [
        { label: 'Current Protection', value: results?.currentProtection || 0, icon: '[SHIELD]', color: colors.secondary },
        { label: 'Total Protection Needed', value: results?.totalProtectionNeeded || 0, icon: '[TARGET]', color: colors.primary },
        { label: 'Protection Gap', value: results?.protectionGap || 0, icon: '[WARNING]', color: colors.warning },
        { label: 'Emergency Fund Gap', value: results?.emergencyGap || 0, icon: '[ALERT]', color: colors.danger }
      ];
      
      financialData.forEach(item => {
        checkNewPage(30);
        
        // Use a simple two-line format to avoid overlapping
        // Line 1: Label
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
        doc.text(`${item.icon} ${item.label}:`, margin + 10, currentY + 5);
        
        // Line 2: Value (indented and on next line)
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(item.color[0], item.color[1], item.color[2]);
        const formattedValue = `$${item.value.toLocaleString()}`;
        doc.text(formattedValue, margin + 20, currentY + 15);
        
        // Add a light separator line between items
        doc.setDrawColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
        doc.line(margin + 10, currentY + 20, pageWidth - margin - 10, currentY + 20);
        
        currentY += 25;
      });
      
      currentY += 10;
      
      // Summary Analysis with highlighted box
      if (results?.summaryAnalysis) {
        checkNewPage(80);
        currentY = addSectionHeader('COMPREHENSIVE ANALYSIS', currentY);
        
        // Calculate text height first
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        const textLines = doc.splitTextToSize(cleanTextForPDF(results.summaryAnalysis), pageWidth - 2 * margin - 20);
        const textHeight = textLines.length * 5 + 16; // 5 is line height, 16 is padding
        
        // Light blue background for analysis (adaptive height)
        addBackground(margin, currentY, pageWidth - 2 * margin, textHeight, [240, 248, 255]);
        
        // Add the text
        doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
        textLines.forEach((line, index) => {
          doc.text(line, margin + 10, currentY + 12 + (index * 5));
        });
        
        currentY += textHeight + 10;
      }
      
      // Action Items with numbered priority styling
      if (results?.actionItems && results.actionItems.length > 0) {
        checkNewPage(60);
        currentY = addSectionHeader('PRIORITIZED ACTION ITEMS', currentY);
        
        results.actionItems.forEach((item, index) => {
          checkNewPage(30);
          
          // Priority number circle
          const circleX = margin + 10;
          const circleY = currentY + 8;
          const priority = index + 1;
          
          let priorityColor = colors.success;
          if (priority <= 2) priorityColor = colors.danger;
          else if (priority <= 4) priorityColor = colors.warning;
          
          doc.setFillColor(priorityColor[0], priorityColor[1], priorityColor[2]);
          doc.circle(circleX, circleY, 8, 'F');
          
          // Priority number
          doc.setFontSize(10);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(255, 255, 255);
          const numberX = priority >= 10 ? circleX - 3 : circleX - 2;
          doc.text(priority.toString(), numberX, circleY + 2);
          
          // Action item text with proper wrapping
          doc.setFontSize(10);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
          const textWidth = pageWidth - 2 * margin - 40;
          const lines = doc.splitTextToSize(cleanTextForPDF(item), textWidth);
          
          lines.forEach((line, lineIndex) => {
            doc.text(line, circleX + 20, circleY + 2 + (lineIndex * 5));
          });
          
          currentY += Math.max(25, lines.length * 6 + 10);
        });
        
        currentY += 15;
      }
      
      // Disclaimer with warning styling
      checkNewPage(80);
      currentY = addSectionHeader('IMPORTANT DISCLAIMER', currentY, colors.warning);
      
      // Yellow warning background
      addBackground(margin, currentY, pageWidth - 2 * margin, 40, [255, 248, 220]);
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      const disclaimer = `WARNING: This assessment is for educational purposes only and is not financial advice. The calculations and recommendations provided are general guidelines and may not be suitable for your specific situation. Please consult with a licensed financial advisor, insurance professional, or qualified estate planning attorney for personalized recommendations based on your individual circumstances.`;
      currentY = addWrappedText(disclaimer, margin + 5, currentY + 8, pageWidth - 2 * margin - 10, 10, colors.text);
      
      currentY += 50;
      
      // Footer with brand colors
      addBackground(margin, currentY, pageWidth - 2 * margin, 20, colors.primary);
      
      doc.setFontSize(9);
      doc.setFont(undefined, 'italic');
      doc.setTextColor(255, 255, 255);
      doc.text('FAMILY FINANCIAL SHIELD | Financial Protection Assessment Tool', margin + 10, currentY + 10);
      if (currentY < pageHeight - margin - 20) {
        doc.text('Visit: https://delightful-ocean-0f14ce90f.1.azurestaticapps.net', margin + 10, currentY + 15);
      }
      
      // Generate and download PDF
      const filename = `Family-Financial-Assessment-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(filename);
      
    }).catch(error => {
      console.error('Error loading jsPDF:', error);
      // Fallback to simple text download
      fallbackTextDownload(results);
    });
    
  } catch (error) {
    console.error('PDF generation error:', error);
    fallbackTextDownload(results);
  }
};

export const fallbackTextDownload = (results) => {
  // Enhanced function to clean text for text file compatibility
  const cleanTextForPDF = (text) => {
    if (!text) return '';
    
    return text
      // First handle the þ character specifically
      .replace(/þ/g, '')
      // Remove all emojis and special symbols - comprehensive ranges
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]/gu, '')
      // Additional emoji ranges
      .replace(/[\u{1F004}\u{1F0CF}\u{1F170}-\u{1F251}]/gu, '')
      // Remove shield emoji specifically (🛡️)
      .replace(/🛡️?/g, '')
      // Remove other problematic Unicode characters
      .replace(/[\u{2000}-\u{206F}]|[\u{2E00}-\u{2E7F}]|[\u{3000}-\u{303F}]/gu, ' ')
      // Remove variation selectors that can cause issues
      .replace(/[\u{FE00}-\u{FE0F}]/gu, '')
      // Replace bullet points and special characters
      .replace(/[•·▪▫◦‣⁃]/g, '-')
      // Replace smart quotes with regular quotes
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      // Replace em/en dashes with regular hyphens
      .replace(/[–—]/g, '-')
      // Fix broken spacing by normalizing whitespace
      .replace(/\s+/g, ' ')
      // Remove any remaining non-ASCII characters that could cause issues
      .replace(/[^\x00-\x7F]/g, '')
      .trim();
  };

  // Fallback: Generate a text file with results
  const textContent = `
FAMILY FINANCIAL SHIELD ASSESSMENT RESULTS
Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}

OVERALL STATUS: ${results?.statusText || 'Not calculated'} - ${Math.round(results?.overallScore || 0)}% Protected

FIVE PILLAR ANALYSIS:
• Benefits: ${results?.benefitsScore || 0}%
• Liabilities: ${results?.debtScore || 0}%
• Taxes: ${results?.taxScore || 0}%
• Emergency Fund: ${results?.emergencyScore || 0}%
• Legal Planning: ${results?.legalScore || 0}%

KEY FINANCIAL NUMBERS:
• Current Protection: $${(results?.currentProtection || 0).toLocaleString()}
• Total Protection Needed: $${(results?.totalProtectionNeeded || 0).toLocaleString()}
• Protection Gap: $${(results?.protectionGap || 0).toLocaleString()}
• Emergency Fund Gap: $${(results?.emergencyGap || 0).toLocaleString()}

PRIORITIZED ACTION ITEMS:
${(results?.actionItems || []).map((item, index) => `${index + 1}. ${cleanTextForPDF(item)}`).join('\n')}

DISCLAIMER:
This assessment is for educational purposes only and is not financial advice.
Please consult with a licensed financial advisor for personalized recommendations.

Family Financial Shield | Financial Protection Assessment Tool
Visit: https://delightful-ocean-0f14ce90f.1.azurestaticapps.net
`;
  
  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Family-Financial-Assessment-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
