/**
 * Main application initialization for the Solamente Code Editor
 * This file orchestrates the initialization of all editor components
 */

// Global initialization function
function initializeCodeEditor() {
    // Make sure external dependencies are loaded
    ensureDependenciesLoaded();
    
    // Initialize editor components in the correct order
    initializeTheme();
    initializeLineNumbers();
    initializeSyntaxHighlighting();
    initializeEditor();
    initializeFileOperations();
    initializeExport();
    initializeSharing();
    initializeUI();
    
    console.log('Solamente Elegant Code Editor initialized');
}

// Check if external dependencies are loaded
function ensureDependenciesLoaded() {
    // Check for hljs (highlight.js)
    if (typeof hljs === 'undefined') {
        console.error('highlight.js not loaded');
        showErrorMessage('Could not load syntax highlighting library');
    }
    
    // Check for html2canvas
    if (typeof html2canvas === 'undefined') {
        console.warn('html2canvas not loaded - screenshot functionality will be disabled');
        
        // Disable screenshot button if library not available
        const screenshotBtn = document.getElementById('screenshotBtn');
        if (screenshotBtn) {
            screenshotBtn.disabled = true;
            screenshotBtn.classList.add('opacity-50', 'cursor-not-allowed');
            screenshotBtn.title = 'Screenshot library not loaded';
        }
    }
    
    // Check for jsPDF
    if (typeof window.jspdf === 'undefined') {
        console.warn('jsPDF not loaded - PDF export functionality will be disabled');
        
        // Disable PDF button if library not available
        const pdfBtn = document.getElementById('pdfBtn');
        if (pdfBtn) {
            pdfBtn.disabled = true;
            pdfBtn.classList.add('opacity-50', 'cursor-not-allowed');
            pdfBtn.title = 'PDF library not loaded';
        }
    }
}

// Show error message to user
function showErrorMessage(message) {
    showToast(message, 'fa-exclamation-triangle');
}

// Loading screen functionality
function simulateLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.getElementById('loadingText');
    
    if (!loadingScreen || !loadingBar || !loadingText) {
        // If loading elements don't exist, just initialize directly
        initializeCodeEditor();
        return;
    }
    
    // Loading messages to display
    const loadingMessages = [
        'Loading resources...',
        'Initializing syntax highlighting...',
        'Setting up workspace...',
        'Preparing editor features...',
        'Almost ready...'
    ];
    
    let progress = 0;
    const totalDuration = 2000; // Total loading time in ms
    const interval = totalDuration / 100; // Update interval
    const messageInterval = totalDuration / loadingMessages.length;
    
    // Update loading bar and messages
    const loadingTimer = setInterval(() => {
        progress += 1;
        loadingBar.style.width = `${progress}%`;
        
        // Update loading message
        const messageIndex = Math.min(
            Math.floor(progress / (100 / loadingMessages.length)),
            loadingMessages.length - 1
        );
        loadingText.textContent = loadingMessages[messageIndex];
        
        if (progress >= 100) {
            clearInterval(loadingTimer);
            
            // Fade out loading screen
            loadingScreen.style.transition = 'opacity 0.5s ease-out';
            loadingScreen.style.opacity = '0';
            
            // Remove loading screen after fade
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
            
            // Initialize the editor
            initializeCodeEditor();
        }
    }, interval);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', simulateLoading);
