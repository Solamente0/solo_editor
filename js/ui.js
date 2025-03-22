/**
 * UI interactions for the Solamente Code Editor
 */

// Set up help modal event listeners
function setupHelpModal() {
    const helpBtn = document.getElementById('helpBtn');
    const closeHelpBtn = document.getElementById('closeHelpBtn');
    const helpModal = document.getElementById('helpModal');
    
    if (helpBtn && closeHelpBtn && helpModal) {
        // Show help modal
        helpBtn.addEventListener('click', function() {
            helpModal.classList.remove('hidden');
        });
        
        // Close help modal
        closeHelpBtn.addEventListener('click', function() {
            helpModal.classList.add('hidden');
        });
    }
}

// Set up Escape key functionality to close modals
function setupEscapeKeyForModals() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const helpModal = document.getElementById('helpModal');
            const shareModal = document.getElementById('shareModal');
            
            if (helpModal) {
                helpModal.classList.add('hidden');
            }
            
            if (shareModal) {
                shareModal.classList.add('hidden');
            }
        }
    });
}

// Initialize UI interactions
function initializeUI() {
    setupHelpModal();
    setupEscapeKeyForModals();
}

// Setup when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeUI);
