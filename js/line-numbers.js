/**
 * Line numbering functionality for the Solamente Code Editor
 */

// Update line numbers based on editor content
function updateLineNumbers() {
    const editor = document.getElementById('editor');
    const lineNumbers = document.querySelector('.line-numbers');
    
    if (!editor || !lineNumbers) return;
    
    const lines = editor.textContent.split('\n');
    
    lineNumbers.innerHTML = '';
    for (let i = 0; i < lines.length; i++) {
        const lineNumber = document.createElement('div');
        lineNumber.textContent = i + 1;
        lineNumbers.appendChild(lineNumber);
    }
}

// Synchronize scrolling of editor and line numbers
function syncLineNumbersScroll() {
    const editor = document.getElementById('editor');
    const lineNumbers = document.querySelector('.line-numbers');
    
    if (!editor || !lineNumbers) return;
    
    editor.addEventListener('scroll', function() {
        lineNumbers.scrollTop = editor.scrollTop;
    });
    
    // Make sure the editor and line numbers have the same font size
    const updateFontSize = () => {
        const fontSize = window.getComputedStyle(editor).fontSize;
        lineNumbers.style.fontSize = fontSize;
        lineNumbers.style.lineHeight = window.getComputedStyle(editor).lineHeight;
    };
    
    // Update on font size change
    document.getElementById('fontSize').addEventListener('change', updateFontSize);
    
    // Initial update
    updateFontSize();
}

// Initialize line numbers functionality
function initializeLineNumbers() {
    updateLineNumbers();
    syncLineNumbersScroll();
    
    // Add event listener to update line numbers when content changes
    const editor = document.getElementById('editor');
    if (editor) {
        editor.addEventListener('input', updateLineNumbers);
    }
}

// Setup when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLineNumbers);
