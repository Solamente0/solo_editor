/**
 * Sharing functionality for the Solamente Code Editor
 */

// Show share modal
function showShareModal() {
    const shareModal = document.getElementById('shareModal');
    const shareUrl = document.getElementById('shareUrl');
    
    if (!shareModal || !shareUrl) return;
    
    // Get current code and settings
    const editor = document.getElementById('editor');
    const languageSelect = document.getElementById('language');
    
    if (!editor || !languageSelect) return;
    
    const code = editor.textContent;
    const language = languageSelect.value;
    
    // Create a shareable URL with Base64 encoded content
    const encodedCode = btoa(encodeURIComponent(code));
    const url = `${window.location.href.split('?')[0]}?lang=${language}&code=${encodedCode}`;
    
    // Update share URL input
    shareUrl.value = url;
    
    // Show modal
    shareModal.classList.remove('hidden');
}

// Copy share URL to clipboard
function copyShareUrl() {
    const shareUrl = document.getElementById('shareUrl');
    
    if (!shareUrl) return;
    
    shareUrl.select();
    document.execCommand('copy');
    showToast('Share link copied to clipboard', 'fa-share-alt');
}

// Check for shared code in URL
function checkForSharedCode() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('code') && params.has('lang')) {
        try {
            const code = decodeURIComponent(atob(params.get('code')));
            const language = params.get('lang');
            
            const editor = document.getElementById('editor');
            const languageSelect = document.getElementById('language');
            
            if (!editor || !languageSelect) return;
            
            // Update editor
            editor.textContent = code;
            languageSelect.value = language;
            
            // Refresh editor
            updateHighlighting();
            updateLineNumbers();
            updateEditorStats();
            
            showToast('Shared code loaded', 'fa-link');
        } catch (e) {
            console.error('Error loading shared code:', e);
            showToast('Error loading shared code', 'fa-exclamation-triangle');
        }
    }
}

// Set up share modal event listeners
function setupShareModalListeners() {
    const shareBtn = document.getElementById('shareBtn');
    const closeShareBtn = document.getElementById('closeShareBtn');
    const confirmShareBtn = document.getElementById('confirmShareBtn');
    const copyShareUrlBtn = document.getElementById('copyShareUrl');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', showShareModal);
    }
    
    if (closeShareBtn) {
        closeShareBtn.addEventListener('click', function() {
            document.getElementById('shareModal').classList.add('hidden');
        });
    }
    
    if (confirmShareBtn) {
        confirmShareBtn.addEventListener('click', function() {
            copyShareUrl();
            document.getElementById('shareModal').classList.add('hidden');
        });
    }
    
    if (copyShareUrlBtn) {
        copyShareUrlBtn.addEventListener('click', copyShareUrl);
    }
}

// Initialize sharing functionality
function initializeSharing() {
    setupShareModalListeners();
    checkForSharedCode();
}

// Setup when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSharing);
