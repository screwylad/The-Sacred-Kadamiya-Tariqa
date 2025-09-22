/**
 * fix-language-switching.js - Script to ensure language switching works correctly across all pages
 * Add this before the closing body tag on all pages
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛠️ Running language switching fix...');
    
    // Check if the page was loaded with a language parameter
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    if (langParam && ['en', 'bn', 'hi'].includes(langParam)) {
        console.log(`Found language parameter in URL: ${langParam}`);
        
        // Force reapplying translations after a short delay
        // This helps with pages that might have dynamic content
        setTimeout(() => {
            if (window.i18n) {
                console.log('Reapplying translations from URL parameter...');
                
                // Force language and translations
                window.currentLanguage = langParam;
                
                // Check if translations have been loaded
                if (!window.translations || !window.translations[langParam]) {
                    console.log('Loading translations for', langParam);
                    if (typeof loadTranslations === 'function') {
                        loadTranslations().then(() => {
                            if (typeof applyTranslations === 'function') {
                                applyTranslations();
                            }
                        });
                    }
                } else if (typeof applyTranslations === 'function') {
                    applyTranslations();
                }
            }
        }, 300);
    } else {
        // No language parameter - check localStorage
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && ['en', 'bn', 'hi'].includes(savedLanguage)) {
            console.log(`Using saved language: ${savedLanguage}`);
            
            // Always update the URL to include language parameter
            const url = new URL(window.location.href);
            url.searchParams.delete('lang'); // Remove existing lang parameter if any
            url.searchParams.set('lang', savedLanguage);
            window.history.replaceState({}, document.title, url);
            
            // Force language to be the saved one
            window.currentLanguage = savedLanguage;
            
            // Check if translations need to be loaded
            if (!window.translations || !window.translations[savedLanguage]) {
                console.log('Loading translations for', savedLanguage);
                if (typeof loadTranslations === 'function') {
                    loadTranslations().then(() => {
                        if (typeof applyTranslations === 'function') {
                            applyTranslations();
                        }
                    });
                }
            } else if (typeof applyTranslations === 'function') {
                console.log('Reapplying translations from localStorage...');
                applyTranslations();
            }
        }
    }
    
    // Handle edge case where translations might not be fully loaded
    window.addEventListener('load', function() {
        const currentLang = window.currentLanguage || langParam || localStorage.getItem('language') || 'en';
        
        // Final check to ensure translations are properly applied
        console.log('Final language check - ensuring consistency...');
        
        // Force the language to be consistent
        window.currentLanguage = currentLang;
        document.documentElement.lang = currentLang;
        
        // Store language in all storage mechanisms
        localStorage.setItem('language', currentLang);
        document.cookie = `language=${currentLang};path=/;max-age=31536000`;
        
        // Make sure URL has language parameter
        const url = new URL(window.location.href);
        if (url.searchParams.get('lang') !== currentLang) {
            url.searchParams.delete('lang');
            url.searchParams.set('lang', currentLang);
            window.history.replaceState({}, document.title, url);
        }
        
        // Force apply translations one more time
        if (typeof applyTranslations === 'function') {
            setTimeout(() => {
                console.log('Final application of translations...');
                applyTranslations();
            }, 500);
        }
    });
    
    console.log('Language switching fix complete');
});