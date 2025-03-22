/**
 * File operations functionality for the Solamente Code Editor
 */

// Create a new document
function newDocument() {
    const editor = document.getElementById('editor');
    
    if (!editor) return;
    
    if (confirm('Create a new document? Any unsaved changes will be lost.')) {
        editor.textContent = '';
        updateHighlighting();
        updateLineNumbers();
        updateEditorStats();
        showToast('New document created', 'fa-file');
    }
}

// Download code as a file
function downloadCode() {
    const editor = document.getElementById('editor');
    const languageSelect = document.getElementById('language');
    
    if (!editor || !languageSelect) return;
    
    const language = languageSelect.value;
    const code = editor.textContent;
    
    // Determine file extension based on language
    const extensions = {
        'javascript': 'js',
        'python': 'py',
        'java': 'java',
        'cpp': 'cpp',
        'csharp': 'cs',
        'php': 'php',
        'ruby': 'rb',
        'go': 'go',
        'swift': 'swift',
        'kotlin': 'kt',
        'rust': 'rs',
        'typescript': 'ts',
        'sql': 'sql',
        'bash': 'sh',
        'html': 'html',
        'css': 'css',
        'xml': 'xml',
        'json': 'json',
        'yaml': 'yml',
        'markdown': 'md'
    };
    
    const extension = extensions[language] || 'txt';
    const filename = `code.${extension}`;
    
    const blob = new Blob([code], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Code downloaded successfully', 'fa-download');
}

// Auto-save functionality
function setupAutoSave() {
    // Auto-save interval in milliseconds
    const autoSaveInterval = 10000; // 10 seconds
    
    setInterval(() => {
        const editor = document.getElementById('editor');
        const languageSelect = document.getElementById('language');
        
        if (editor && languageSelect) {
            const code = editor.textContent;
            const language = languageSelect.value;
            localStorage.setItem('savedCode', code);
            localStorage.setItem('savedLanguage', language);
        }
    }, autoSaveInterval);
}

// Load auto-saved content on startup (if available)
function loadSavedContent() {
    const editor = document.getElementById('editor');
    const languageSelect = document.getElementById('language');
    
    if (!editor || !languageSelect) return;
    
    const savedCode = localStorage.getItem('savedCode');
    const savedLanguage = localStorage.getItem('savedLanguage');
    
    if (savedCode && !window.location.search.includes('code=')) {
        editor.textContent = savedCode;
        if (savedLanguage) {
            languageSelect.value = savedLanguage;
        }
        updateHighlighting();
        updateLineNumbers();
        updateEditorStats();
    }
}

// Set up file operation button event listeners
function setupFileOperationButtons() {
    const newBtn = document.getElementById('newBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (newBtn) {
        newBtn.addEventListener('click', newDocument);
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadCode);
    }
}

// Initialize file operations
function initializeFileOperations() {
    setupFileOperationButtons();
    setupAutoSave();
    loadSavedContent();
    
    // Set up global keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+S = Save
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            downloadCode();
        }
        
        // Ctrl+N = New
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            newDocument();
        }
    });
}

// Setup when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeFileOperations);
