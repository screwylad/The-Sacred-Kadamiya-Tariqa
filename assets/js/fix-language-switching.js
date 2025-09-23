/**
 * fix-language-switching.js - Script to ensure language switching works correctly across all pages
 * Add this before the closing body tag on all pages
 * Enhanced version to fix cross-page language persistence issues
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛠️ Running enhanced language switching fix...');
    
    // Priority order for language determination:
    // 1. URL parameter (highest priority)
    // 2. localStorage
    // 3. Cookie
    // 4. Default (en)
    
    // Check if the page was loaded with a language parameter
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const supportedLanguages = ['en', 'bn', 'hi'];
    
    // Determine which language to use
    let selectedLanguage;
    
    if (langParam && supportedLanguages.includes(langParam)) {
        console.log(`Found language parameter in URL: ${langParam}`);
        selectedLanguage = langParam;
    } else {
        // No URL parameter - check localStorage
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
            console.log(`Using saved language from localStorage: ${savedLanguage}`);
            selectedLanguage = savedLanguage;
        } else {
            // Try to get from cookie
            const cookieMatch = document.cookie.match(/(?:^|;)\s*language\s*=\s*([^;]+)/);
            if (cookieMatch && supportedLanguages.includes(cookieMatch[1])) {
                console.log(`Using saved language from cookie: ${cookieMatch[1]}`);
                selectedLanguage = cookieMatch[1];
            } else {
                // Default to English
                console.log('No language preference found, using default: en');
                selectedLanguage = 'en';
            }
        }
        
        // Always update the URL to include language parameter
        const url = new URL(window.location.href);
        url.searchParams.delete('lang'); // Remove existing lang parameter if any
        url.searchParams.set('lang', selectedLanguage);
        window.history.replaceState({}, document.title, url);
    }
    
    // Ensure language is consistently set everywhere
    window.currentLanguage = selectedLanguage;
    document.documentElement.lang = selectedLanguage;
    
    // Store consistently in all storage mechanisms
    localStorage.setItem('language', selectedLanguage);
    document.cookie = `language=${selectedLanguage};path=/;max-age=31536000`; // 1 year
    
    console.log(`✅ Language set consistently to: ${selectedLanguage}`);
    
    // Apply translations with a small delay to ensure the DOM is fully loaded
    setTimeout(() => {
        forceApplyTranslations(selectedLanguage);
    }, 100);
    
    // Handle edge case where translations might not be fully loaded
    window.addEventListener('load', function() {
        // Final check to ensure translations are properly applied after all resources load
        console.log('🔍 Final language check - ensuring consistency...');
        
        const finalLang = window.currentLanguage || localStorage.getItem('language') || 'en';
        forceApplyTranslations(finalLang);
    });
    
    /**
     * Function to force apply translations even if the normal i18n initialization fails
     * This is our "safety net" to ensure translations always work across page navigation
     */
    function forceApplyTranslations(language) {
        console.log(`🔄 Force applying translations for language: ${language}`);
        
        // First make sure we have the translations loaded
        if (!window.translations || !window.translations[language]) {
            console.log('📚 Need to load translations first...');
            
            // Try to load translations directly
            if (typeof loadTranslations === 'function') {
                loadTranslations().then(() => {
                    console.log('✅ Translations loaded, now applying...');
                    actuallyApplyTranslations(language);
                }).catch(error => {
                    console.error('❌ Failed to load translations:', error);
                });
            } else {
                // No loadTranslations function available, try to load translations manually
                console.log('⚠️ No loadTranslations function available, trying manual loading...');
                loadTranslationsManually(language).then(() => {
                    actuallyApplyTranslations(language);
                });
            }
        } else {
            // Translations already loaded, just apply them
            console.log('✅ Translations already loaded, applying directly...');
            actuallyApplyTranslations(language);
        }
    }
    
    /**
     * Manual translation loading as a fallback
     */
    function loadTranslationsManually(language) {
        return new Promise((resolve, reject) => {
            if (!window.translations) {
                window.translations = {};
            }
            
            if (window.translations[language]) {
                resolve();
                return;
            }
            
            // Determine the base path for asset loading
            const basePath = window.location.pathname.includes('/') && !window.location.pathname.endsWith('/') ? 
                (window.location.pathname.includes('.html') ? '' : '../') : '';
                
            fetch(`${basePath}assets/js/i18n/${language}.json`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load ${language} translations`);
                    }
                    return response.json();
                })
                .then(data => {
                    window.translations[language] = data;
                    console.log(`✅ Manually loaded ${language} translations`);
                    resolve();
                })
                .catch(error => {
                    console.error(`❌ Failed to manually load ${language} translations:`, error);
                    reject(error);
                });
        });
    }
    
    /**
     * Actually apply the translations to the page
     */
    function actuallyApplyTranslations(language) {
        // Ensure the language is set correctly
        window.currentLanguage = language;
        document.documentElement.lang = language;
        
        // If the standard applyTranslations function exists, use it
        if (typeof applyTranslations === 'function') {
            console.log('📝 Using standard applyTranslations function...');
            applyTranslations();
        } else {
            // Otherwise use our own implementation
            console.log('📝 Using fallback translation application...');
            applyTranslationsFallback(language);
        }
        
        // Make sure language switcher UI is updated
        updateLanguageUI(language);
        
        console.log('✅ Translations have been applied for: ' + language);
    }
    
    /**
     * Update the language UI elements to match the current language
     */
    function updateLanguageUI(language) {
        // Update language selector dropdown
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = language;
        }
        
        // Update any language indicator classes
        const languageSelector = document.querySelector('.language-selector');
        if (languageSelector) {
            languageSelector.setAttribute('data-current-lang', language);
        }
        
        // Notify any custom components that might be listening
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: language } 
        }));
    }
    
    /**
     * Fallback implementation of applyTranslations in case the main one isn't available
     */
    function applyTranslationsFallback(language) {
        if (!window.translations || !window.translations[language]) {
            console.error('❌ No translations available for:', language);
            return;
        }
        
        // Process elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (!key) return;
            
            const value = getNestedValue(window.translations[language], key);
            if (value) {
                // Handle different element types
                if (element.tagName === 'INPUT' && element.type !== 'submit') {
                    if (element.placeholder) {
                        element.placeholder = value;
                    } else {
                        element.value = value;
                    }
                } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = value;
                } else {
                    element.innerHTML = value;
                }
                element.classList.add('i18n-translated');
            }
        });
        
        // Process elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (!key) return;
            
            const value = getNestedValue(window.translations[language], key);
            if (value) {
                element.placeholder = value;
            }
        });
        
        // Process elements with data-i18n-title attribute
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            if (!key) return;
            
            const value = getNestedValue(window.translations[language], key);
            if (value) {
                element.title = value;
            }
        });
    }
    
    /**
     * Helper function to get nested object values by dot notation
     */
    function getNestedValue(obj, path) {
        if (!obj || !path) return undefined;
        const keys = path.split('.');
        return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : undefined), obj);
    }
    
    console.log('✅ Enhanced language switching fix initialized');
});