/**
 * Core editor functionality for the Solamente Code Editor
 */

// Update editor statistics (line, column, character count)
function updateEditorStats() {
    const editor = document.getElementById('editor');
    const lineColIndicator = document.getElementById('lineCol');
    const charCountIndicator = document.getElementById('charCount');
    const wordCountIndicator = document.getElementById('wordCount');
    
    if (!editor || !lineColIndicator || !charCountIndicator || !wordCountIndicator) return;
    
    const text = editor.textContent;
    const selection = window.getSelection();
    
    // Character and word count
    charCountIndicator.textContent = `Characters: ${text.length}`;
    wordCountIndicator.textContent = `Words: ${countWords(text)}`;
    
    // Get caret position (line and column)
    if (selection.rangeCount > 0) {
        const position = getCursorPosition(editor);
        const { line, column } = getLineAndColumn(text, position);
        
        lineColIndicator.textContent = `Line: ${line}, Column: ${column}`;
    }
}

// Handle special key presses in the editor
function handleEditorKeydown(e) {
    const editor = document.getElementById('editor');
    
    // Tab key
    if (e.key === 'Tab') {
        e.preventDefault();
        document.execCommand('insertText', false, '    ');
    }
    
    // Force correct text direction on input
    setTimeout(() => {
        editor.style.direction = 'ltr';
        editor.style.textAlign = 'left';
    }, 0);
}

// Set up font size selector
function setupFontSizeSelector() {
    const fontSizeSelect = document.getElementById('fontSize');
    const editor = document.getElementById('editor');
    
    if (fontSizeSelect && editor) {
        // Set initial font size
        editor.style.fontSize = fontSizeSelect.value + 'px';
        
        // Handle changes
        fontSizeSelect.addEventListener('change', function() {
            editor.style.fontSize = this.value + 'px';
        });
    }
}

// Setup all editor event listeners
function setupEditorEventListeners() {
    const editor = document.getElementById('editor');
    
    if (editor) {
        // Ensure correct text direction initially
        editor.setAttribute('dir', 'ltr');
        editor.style.direction = 'ltr';
        editor.style.textAlign = 'left';
        
        // Event listeners for editor
        editor.addEventListener('input', function() {
            // Force correct text direction on every input
            editor.style.direction = 'ltr';
            editor.style.textAlign = 'left';
            
            updateHighlighting();
            updateLineNumbers();
            updateEditorStats();
        });

        editor.addEventListener('keydown', function(e) {
            handleEditorKeydown(e);
            setTimeout(updateEditorStats, 0);
        });

        editor.addEventListener('click', updateEditorStats);
        editor.addEventListener('keyup', updateEditorStats);
        
        // Listen for paste events to ensure text direction
        editor.addEventListener('paste', function() {
            setTimeout(() => {
                editor.style.direction = 'ltr';
                editor.style.textAlign = 'left';
                updateHighlighting();
            }, 0);
        });
    }
}

// Set default content for the editor
function setDefaultEditorContent() {
    const editor = document.getElementById('editor');
    
    if (editor && editor.textContent.trim() === '') {
        editor.textContent = '// Welcome to Solamente Elegant Code Editor\n// Select a language and start coding!\n\nfunction helloWorld() {\n    console.log("Hello, World!");\n    return "Welcome to coding";\n}\n';
    }
}

// Initialize editor functionality
function initializeEditor() {
    setDefaultEditorContent();
    setupFontSizeSelector();
    setupEditorEventListeners();
    updateEditorStats();
}

// Setup when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeEditor);
