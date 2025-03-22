/**
 * Utility functions for the Solamente Code Editor
 */

// Show toast notification
function showToast(message, icon = 'fa-check') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');
    
    // Update toast content
    toastMessage.textContent = message;
    toastIcon.className = `fas ${icon} mr-2`;
    
    // Show toast
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0');
    }, 3000);
}

// Get cursor position (character offset)
function getCursorPosition(element) {
    let caretOffset = 0;
    const selection = window.getSelection();
    
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
    }
    
    return caretOffset;
}

// Get line and column from cursor position
function getLineAndColumn(text, position) {
    const textBeforeCursor = text.substring(0, position);
    const lines = textBeforeCursor.split('\n');
    const lineCount = lines.length;
    const columnCount = lines[lines.length - 1].length + 1;
    
    return { line: lineCount, column: columnCount };
}

// Count words in text
function countWords(text) {
    return text.split(/\s+/).filter(w => w.length > 0).length;
}

// Sanitize code (for security)
function sanitizeCode(code) {
    // Remove any potentially harmful script execution methods
    return code.replace(/javascript:[\s\S]*?/gi, '')
              .replace(/eval\(/gi, 'disabled_eval(')
              .replace(/new Function/gi, 'disabled_Function');
}