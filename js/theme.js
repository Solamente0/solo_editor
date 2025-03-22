/**
 * Theme functionality for the Solamente Code Editor
 */

// Initialize theme from user preference or system preference
function initializeTheme() {
    // Check for dark mode preference
    if (localStorage.getItem('darkMode') === 'true' || 
        (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
}

// Toggle between light and dark mode
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

// Add event listener for theme toggle button
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    setupThemeToggle();
});
