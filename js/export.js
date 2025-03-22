/**
 * Export functionality for the Solamente Code Editor
 */

// Take a screenshot of the code
function takeScreenshot() {
    const editor = document.getElementById('editor');
    const container = editor.closest('.editor-container');
    
    if (!editor || !container) return;
    
    html2canvas(container, {
        backgroundColor: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff'
    }).then(canvas => {
        // Convert to image and download
        const img = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = img;
        a.download = 'code-screenshot.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        showToast('Screenshot saved', 'fa-camera');
    }).catch(error => {
        console.error('Error generating screenshot:', error);
        showToast('Failed to generate screenshot', 'fa-exclamation-triangle');
    });
}

// Generate PDF from code
function generatePDF() {
    if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
        console.error('jsPDF library not loaded');
        showToast('PDF generation failed: Library not loaded', 'fa-exclamation-triangle');
        return;
    }

    const { jsPDF } = window.jspdf;
    const editor = document.getElementById('editor');
    const languageSelect = document.getElementById('language');
    
    if (!editor || !languageSelect) return;
    
    const code = editor.textContent;
    const language = languageSelect.value;
    
    // Create PDF
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    // Add metadata
    pdf.setProperties({
        title: `Code in ${language}`,
        subject: 'Code Export',
        creator: 'Solamente Elegant Code Editor'
    });
    
    // Add content
    pdf.setFontSize(10);
    const margin = 15;
    const pageWidth = pdf.internal.pageSize.getWidth() - (margin * 2);
    
    // Add header
    pdf.setFontSize(16);
    pdf.text(`${language.toUpperCase()} Code`, margin, margin);
    
    // Add date
    pdf.setFontSize(8);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, margin + 6);
    
    // Add horizontal line
    pdf.setLineWidth(0.2);
    pdf.line(margin, margin + 8, margin + pageWidth, margin + 8);
    
    // Add code
    pdf.setFontSize(10);
    const splitText = pdf.splitTextToSize(code, pageWidth);
    pdf.text(splitText, margin, margin + 15);
    
    // Save PDF
    pdf.save('code-export.pdf');
    
    showToast('PDF generated', 'fa-file-pdf');
}

// Set up export button event listeners
function setupExportButtons() {
    const screenshotBtn = document.getElementById('screenshotBtn');
    const pdfBtn = document.getElementById('pdfBtn');
    
    if (screenshotBtn) {
        screenshotBtn.addEventListener('click', takeScreenshot);
    }
    
    if (pdfBtn) {
        pdfBtn.addEventListener('click', generatePDF);
    }
}

// Initialize export functionality
function initializeExport() {
    setupExportButtons();
}

// Setup when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeExport);
