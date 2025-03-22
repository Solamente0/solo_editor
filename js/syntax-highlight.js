/**
 * Syntax highlighting functionality for the Solamente Code Editor
 */

// Apply syntax highlighting to editor content
function updateHighlighting() {
    const editor = document.getElementById('editor');
    const languageSelect = document.getElementById('language');
    
    if (!editor || !languageSelect) return;
    
    const language = languageSelect.value;
    const code = editor.textContent;
    
    // Save cursor position
    const cursorPosition = getCursorPosition(editor);
    
    // Apply highlighting
    editor.innerHTML = hljs.highlight(code, {language: language}).value;
    
    // Ensure text direction and alignment are maintained
    editor.style.direction = 'ltr';
    editor.style.textAlign = 'left';
    editor.style.unicodeBidi = 'embed';
    
    // Try to restore cursor position
    try {
        const selection = window.getSelection();
        const newPosition = Math.min(cursorPosition, editor.textContent.length);
        
        // Find where to place cursor
        const nodeStack = [editor];
        let currentNode;
        let charCount = 0;
        let foundNode = null;
        let foundOffset = 0;
        
        // Traverse the DOM tree to find the right text node and offset
        while (nodeStack.length > 0 && !foundNode) {
            currentNode = nodeStack.pop();
            
            if (currentNode.nodeType === Node.TEXT_NODE) {
                const nodeLength = currentNode.length;
                if (charCount + nodeLength >= newPosition) {
                    foundNode = currentNode;
                    foundOffset = newPosition - charCount;
                    break;
                }
                charCount += nodeLength;
            } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
                // Add children to stack in reverse order
                for (let i = currentNode.childNodes.length - 1; i >= 0; i--) {
                    nodeStack.push(currentNode.childNodes[i]);
                }
            }
        }
        
        // Set cursor position if we found the right node
        if (foundNode) {
            const range = document.createRange();
            range.setStart(foundNode, foundOffset);
            range.collapse(true);
            
            selection.removeAllRanges();
            selection.addRange(range);
        }
    } catch (e) {
        console.warn('Could not restore cursor position after syntax highlighting', e);
    }
}

// Setup language selector event listener
function setupLanguageSelector() {
    const languageSelect = document.getElementById('language');
    
    if (languageSelect) {
        languageSelect.addEventListener('change', updateHighlighting);
    }
}

// Initialize syntax highlighting
function initializeSyntaxHighlighting() {
    // Set up the language selector
    setupLanguageSelector();
    
    // Initial highlighting
    updateHighlighting();
    
    // Add event listener for content changes
    const editor = document.getElementById('editor');
    if (editor) {
        editor.addEventListener('input', updateHighlighting);
    }
}

// Setup when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSyntaxHighlighting);
