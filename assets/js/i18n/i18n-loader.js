// i18n-loader.js - This file is responsible for loading the i18n scripts and CSS on all pages

// Function to dynamically load a script
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.onerror = (error) => {
        console.error('Error loading script:', src, error);
    };
    document.head.appendChild(script);
}

// Function to dynamically load a stylesheet
function loadStylesheet(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

// Determine the correct path based on the current page location
function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/') && !path.endsWith('/')) {
        // If we're in a subdirectory (not the root)
        return path.includes('.html') ? '' : '../';
    }
    return '';
}

// Load the i18n CSS and JS files
const basePath = getBasePath();
console.log('i18n-loader: Base path is', basePath);

// First load CSS
loadStylesheet(`${basePath}assets/css/i18n.css`);
console.log('i18n-loader: Loaded CSS from', `${basePath}assets/css/i18n.css`);

// Make sure i18n.js is loaded directly from HTML
// This loader is just for supplementary files
console.log('i18n-loader initialized');

// Now load any additional i18n files if needed
document.addEventListener('DOMContentLoaded', () => {
    console.log('i18n-loader: DOM loaded, checking language settings');
    setTimeout(() => {
        const savedLanguage = localStorage.getItem('language');
        console.log('i18n-loader: Detected saved language:', savedLanguage);
    }, 500);
});