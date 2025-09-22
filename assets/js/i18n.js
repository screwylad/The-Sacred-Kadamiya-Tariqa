/**
 * Internationalization (i18n) for The Sacred Kadamiya Tariqa Website
 * Supports English (en), Bengali (bn), and Hindi (hi)
 */

// Global variables - defined in global scope for direct access
window.currentLanguage = 'en';
window.translations = {};

// Initialize i18n system immediately to prevent flash of untranslated content
(function immediateInit() {
    console.log('🌐 Immediate i18n initialization');
    
    // Check URL parameters first for language setting (highest priority)
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    if (langParam && ['en', 'bn', 'hi'].includes(langParam)) {
        window.currentLanguage = langParam;
        console.log('✅ Using language from URL parameter:', window.currentLanguage);
    } else {
        // Try to load saved language preference from localStorage
        const savedLanguage = localStorage.getItem('language');
        console.log('🔍 Saved language from localStorage:', savedLanguage);
        
        if (savedLanguage && ['en', 'bn', 'hi'].includes(savedLanguage)) {
            window.currentLanguage = savedLanguage;
            console.log('✅ Using saved language from localStorage:', window.currentLanguage);
        } else {
            // Try to get from cookie
            const cookieMatch = document.cookie.match(/(?:^|;)\s*language\s*=\s*([^;]+)/);
            if (cookieMatch && ['en', 'bn', 'hi'].includes(cookieMatch[1])) {
                window.currentLanguage = cookieMatch[1];
                console.log('✅ Using saved language from cookie:', window.currentLanguage);
            } else {
                // Try to get language from browser settings
                const userLang = navigator.language || navigator.userLanguage;
                if (userLang && userLang.startsWith('bn')) {
                    window.currentLanguage = 'bn';
                    console.log('✅ Using language from browser settings (Bengali):', window.currentLanguage);
                } else if (userLang && userLang.startsWith('hi')) {
                    window.currentLanguage = 'hi';
                    console.log('✅ Using language from browser settings (Hindi):', window.currentLanguage);
                } else {
                    console.log('ℹ️ Using default language:', window.currentLanguage);
                }
            }
        }
    }
    
    // Set HTML lang attribute immediately
    document.documentElement.lang = window.currentLanguage;
    console.log('✅ Set HTML lang attribute to:', window.currentLanguage);
    
    // Store it in localStorage and cookie for persistence
    localStorage.setItem('language', window.currentLanguage);
    document.cookie = `language=${window.currentLanguage};path=/;max-age=31536000`; // 1 year
})();

// Initialize i18n system when DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Initializing i18n system on DOM ready...');

    try {
        // Check if we have URL parameters for language (highest priority)
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        
        // Determine which language to use with clear priority order:
        // 1. URL parameter
        // 2. localStorage
        // 3. Cookie
        // 4. Browser preference
        // 5. Default (en)
        
        if (langParam && ['en', 'bn', 'hi'].includes(langParam)) {
            console.log(`📌 Found language parameter in URL: ${langParam}`);
            window.currentLanguage = langParam;
            // Save to both localStorage and cookie for persistence
            localStorage.setItem('language', langParam);
            document.cookie = `language=${langParam};path=/;max-age=31536000`;
        } else {
            // If no URL parameter, check other sources in order
            const savedLanguage = localStorage.getItem('language');
            if (savedLanguage && ['en', 'bn', 'hi'].includes(savedLanguage)) {
                window.currentLanguage = savedLanguage;
                console.log(`📌 Using language from localStorage: ${savedLanguage}`);
                
                // Add the language parameter to current URL without page reload
                const url = new URL(window.location.href);
                url.searchParams.set('lang', window.currentLanguage);
                window.history.replaceState({}, document.title, url);
            }
        }
        
        // Load translation files first
        await loadTranslations();
        console.log('✅ Translations loaded successfully');
        
        // Create language selector in header
        createLanguageSelector();
        console.log('✅ Language selector created');
        
        // Apply translations based on current language
        applyTranslations();
        console.log('✅ Translations applied');
        
        // Force select element to match current language
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = window.currentLanguage;
            console.log('✅ Set language selector to:', window.currentLanguage);
            
            // Add event listener again to ensure it's properly attached
            languageSelect.addEventListener('change', (event) => {
                changeLanguage(event.target.value);
            });
        }
        
        console.log('✅ i18n system fully initialized with language:', window.currentLanguage);
        
        // Track page navigation to maintain language across pages
        document.querySelectorAll('a').forEach(link => {
            if (link.href && link.href.includes(window.location.hostname)) {
                link.addEventListener('click', (e) => {
                    // Don't modify external links
                    if (!link.href.startsWith('http') || link.href.includes(window.location.hostname)) {
                        // Only modify internal links
                        const url = new URL(link.href);
                        
                        // Don't add language parameter to special files
                        if (!url.pathname.endsWith('.pdf') && !url.pathname.endsWith('.zip') && 
                            !url.pathname.endsWith('.mp3') && !url.pathname.endsWith('.mp4')) {
                            
                            // Remove any existing lang parameter
                            url.searchParams.delete('lang');
                            // Add current language parameter
                            url.searchParams.set('lang', window.currentLanguage);
                            link.href = url.toString();
                            
                            // Make sure we record this in localStorage and cookie too
                            // This helps with cross-page navigation
                            localStorage.setItem('language', window.currentLanguage);
                            document.cookie = `language=${window.currentLanguage};path=/;max-age=31536000`;
                        }
                    }
                });
            }
        });
    } catch (error) {
        console.error('❌ Error during i18n initialization:', error);
    }
});

/**
 * Load translations for all supported languages
 */
async function loadTranslations() {
    try {
        // Determine the base path for asset loading
        const basePath = window.location.pathname.includes('/') && !window.location.pathname.endsWith('/') ? 
            (window.location.pathname.includes('.html') ? '' : '../') : '';
        
        console.log('🔍 Loading translations from base path:', basePath);
            
        // Load English translations (default)
        console.log('📂 Fetching English translations...');
        const enResponse = await fetch(`${basePath}assets/js/i18n/en.json`);
        if (!enResponse.ok) throw new Error(`Failed to load English translations: ${enResponse.status} ${enResponse.statusText}`);
        window.translations.en = await enResponse.json();
        console.log('✅ English translations loaded');

        // Load Bengali translations
        console.log('📂 Fetching Bengali translations...');
        const bnResponse = await fetch(`${basePath}assets/js/i18n/bn.json`);
        if (!bnResponse.ok) throw new Error(`Failed to load Bengali translations: ${bnResponse.status} ${bnResponse.statusText}`);
        window.translations.bn = await bnResponse.json();
        console.log('✅ Bengali translations loaded');

        // Load Hindi translations
        console.log('📂 Fetching Hindi translations...');
        const hiResponse = await fetch(`${basePath}assets/js/i18n/hi.json`);
        if (!hiResponse.ok) throw new Error(`Failed to load Hindi translations: ${hiResponse.status} ${hiResponse.statusText}`);
        window.translations.hi = await hiResponse.json();
        console.log('✅ Hindi translations loaded');

        console.log('✅ All translations loaded successfully');
        return true;
    } catch (error) {
        console.error('❌ Error loading translations:', error);
        // Fallback to English if there's an error
        window.currentLanguage = 'en';
        return false;
    }
}

/**
 * Create language selector dropdown in the header
 */
function createLanguageSelector() {
    // Get language names from translations
    const languageNames = {
        en: window.translations.en?.general?.languageName || 'English',
        bn: window.translations.bn?.general?.languageName || 'বাংলা',
        hi: window.translations.hi?.general?.languageName || 'हिन्दी'
    };

    // Create container for language selector
    const languageSelectorContainer = document.createElement('div');
    languageSelectorContainer.className = 'language-selector';
    languageSelectorContainer.setAttribute('data-current-lang', window.currentLanguage);

    // Create dropdown
    const selectElement = document.createElement('select');
    selectElement.id = 'language-select';

    // Add options for each language
    for (const lang of ['en', 'bn', 'hi']) {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = languageNames[lang];
        option.selected = lang === window.currentLanguage;
        // Add data attributes to help with styling
        option.setAttribute('data-lang', lang);
        option.classList.add(`lang-${lang}`);
        selectElement.appendChild(option);
    }

    // Add event listener for language change
    selectElement.addEventListener('change', (event) => {
        changeLanguage(event.target.value);
    });

    // Create label for accessibility
    const label = document.createElement('label');
    label.htmlFor = 'language-select';
    label.className = 'language-label';
    label.textContent = window.translations[window.currentLanguage]?.general?.selectLanguage || 'Select Language';
    // Add data-i18n attribute for future translations
    label.setAttribute('data-i18n', 'general.selectLanguage');

    // Append elements to container
    languageSelectorContainer.appendChild(label);
    languageSelectorContainer.appendChild(selectElement);

    // Check if language selector already exists in the HTML
    const existingSelector = document.getElementById('language-select');
    
    // Only create selector if it doesn't exist
    if (!existingSelector) {
        // Find the header navigation
        const headerNav = document.querySelector('header nav ul');
        if (headerNav) {
            // Create a list item to hold the language selector
            const listItem = document.createElement('li');
            listItem.className = 'nav-item language-selector-item';
            listItem.appendChild(languageSelectorContainer);
            
            // Add the language selector to the navigation
            headerNav.appendChild(listItem);
        } else {
            // Fallback: append to header
            const header = document.querySelector('header');
            if (header) {
                // Find the navbar if it exists
                const navbar = header.querySelector('.navbar');
                if (navbar) {
                    navbar.appendChild(languageSelectorContainer);
                } else {
                    header.appendChild(languageSelectorContainer);
                }
            }
        }
    } else {
        // Update the existing selector to match current language
        existingSelector.value = window.currentLanguage;
        
        // Also update the language indicator on the parent container
        const existingContainer = existingSelector.closest('.language-selector');
        if (existingContainer) {
            existingContainer.setAttribute('data-current-lang', window.currentLanguage);
        }
        
        // Ensure the event listener is attached
        if (!existingSelector.hasAttribute('data-i18n-initialized')) {
            existingSelector.addEventListener('change', (event) => {
                changeLanguage(event.target.value);
            });
            existingSelector.setAttribute('data-i18n-initialized', 'true');
        }
    }
}

/**
 * Change the current language and update the UI
 */
function changeLanguage(newLanguage) {
    if (!['en', 'bn', 'hi'].includes(newLanguage)) {
        console.error('❌ Unsupported language:', newLanguage);
        return;
    }

    console.log(`🔄 Changing language from ${window.currentLanguage} to ${newLanguage}`);

    // Update current language
    window.currentLanguage = newLanguage;

    // Save preference to localStorage
    localStorage.setItem('language', window.currentLanguage);
    console.log(`✅ Saved language preference to localStorage: ${window.currentLanguage}`);
    
    // Also set as a cookie for server-side detection
    document.cookie = `language=${window.currentLanguage};path=/;max-age=31536000`; // 1 year
    console.log(`✅ Saved language cookie: ${window.currentLanguage}`);

    // Option: Reload the page to ensure all content is properly translated
    // This is more reliable than trying to update all elements dynamically
    if (window.location.search.includes('reload=false')) {
        // Skip reload if explicitly requested (for debugging)
        console.log('Skipping page reload due to reload=false parameter');
        applyTranslations();
    } else {
        console.log('Reloading page to apply language changes...');
        // Preserve any existing query parameters except lang
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        params.set('lang', newLanguage); // Update or add lang parameter
        
        // Construct new URL with updated parameters
        url.search = params.toString();
        window.location.href = url.toString();
        return; // Stop execution as page will reload
    }
    
    // Only reached when not reloading
    // Force load translations if they haven't been loaded yet
    if (!window.translations[window.currentLanguage]) {
        console.log('📌 Translations not loaded yet, loading them now...');
        loadTranslations().then(() => {
            // Apply translations after loading
            applyTranslations();
            updateLanguageUI();
        });
    } else {
        // Apply translations immediately if they're already loaded
        applyTranslations();
        updateLanguageUI();
    }
}

/**
 * Update the language UI elements
 */
function updateLanguageUI() {
    // Update language selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = window.currentLanguage;
        console.log(`✅ Updated language selector dropdown to: ${window.currentLanguage}`);
    }

    // Also update the language label
    const languageLabel = document.querySelector('.language-label');
    if (languageLabel) {
        languageLabel.textContent = window.translations[window.currentLanguage]?.general?.selectLanguage || 'Select Language';
        console.log(`✅ Updated language label`);
    }

    // Dispatch a custom event to notify other scripts of language change
    document.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: window.currentLanguage } 
    }));
    console.log(`✅ Dispatched languageChanged event with language: ${window.currentLanguage}`);
    
    // Update HTML lang attribute
    document.documentElement.lang = window.currentLanguage;
    console.log(`✅ Updated HTML lang attribute to: ${window.currentLanguage}`);

    console.log(`✅ Language successfully changed to: ${window.currentLanguage}`);
    
    // Instead of just reloading, rebuild the current URL with language parameter
    // First, ensure we're working with the absolute URL of the current page
    const currentUrl = new URL(window.location.href);
    
    // Clear any existing lang parameter before setting it to avoid duplicates
    currentUrl.searchParams.delete('lang');
    // Set the new language parameter
    currentUrl.searchParams.set('lang', window.currentLanguage);
    
    // Force reload the page to ensure all scripts pick up the language change
    // This is a more reliable approach than trying to update everything dynamically
    console.log(`🔄 Reloading page with language parameter: ${currentUrl.toString()}`);
    
    // Store language in localStorage to ensure it persists
    localStorage.setItem('language', window.currentLanguage);
    document.cookie = `language=${window.currentLanguage};path=/;max-age=31536000`;
    
    // Small delay before reload to ensure storage operations complete
    setTimeout(() => {
        window.location.href = currentUrl.toString();
    }, 100);
}

/**
 * Apply translations to all elements with data-i18n attribute
 */
function applyTranslations() {
    if (!window.translations[window.currentLanguage]) {
        console.error('❌ Translations not loaded for:', window.currentLanguage);
        return;
    }

    console.log(`🔄 Applying translations for language: ${window.currentLanguage}`);
    
    // Ensure language is set in all storage mechanisms for consistency
    localStorage.setItem('language', window.currentLanguage);
    document.cookie = `language=${window.currentLanguage};path=/;max-age=31536000`;
    
    // Update HTML lang attribute
    document.documentElement.lang = window.currentLanguage;
    
    // Get all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    console.log(`🔍 Found ${elements.length} elements with data-i18n attribute`);

    let translatedCount = 0;
    let missingCount = 0;
    let keysWithIssues = [];

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (!key) return;

        // Handle nested keys (e.g., "header.home")
        const value = getNestedTranslation(window.translations[window.currentLanguage], key);
        const originalText = element.textContent.trim();

        if (value) {
            translatedCount++;
            
            // Store original text as data attribute for reference
            if (!element.hasAttribute('data-i18n-original')) {
                element.setAttribute('data-i18n-original', originalText);
            }
            
            // Special handling for specific element types
            if (element.tagName === 'INPUT' && element.type !== 'submit') {
                // For input fields, update placeholder or value
                if (element.placeholder) {
                    element.placeholder = value;
                } else {
                    element.value = value;
                }
            } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                // For submit buttons
                element.value = value;
            } else if (element.tagName === 'A' || element.tagName === 'BUTTON') {
                // For links and buttons, preserve any HTML/child elements they might have
                if (element.childElementCount === 0 || (element.childElementCount === 1 && element.firstElementChild.tagName === 'I')) {
                    // Simple text or text with a single icon
                    let iconHTML = '';
                    if (element.childElementCount === 1) {
                        iconHTML = element.innerHTML.match(/<i[^>]*>.*?<\/i>/i)[0];
                    }
                    element.innerHTML = iconHTML ? `${iconHTML} ${value}` : value;
                } else {
                    // More complex content, try to find and replace only text nodes
                    let textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
                    if (textNode) {
                        textNode.textContent = value;
                    } else {
                        console.warn(`⚠️ Complex element with key ${key} - setting innerHTML directly`);
                        element.innerHTML = value;
                    }
                }
            } else {
                // For regular elements
                element.innerHTML = value;
            }
            
            // Add a special class to show this element was translated
            element.classList.add('i18n-translated');
        } else {
            missingCount++;
            keysWithIssues.push(key);
            console.warn(`⚠️ No translation found for key: ${key} (current text: "${originalText.substring(0, 30)}${originalText.length > 30 ? '...' : ''}")`);
            
            // Add a special class to highlight untranslated elements in debug mode
            element.classList.add('i18n-missing');
        }
    });
    
    // Handle elements with data-i18n-placeholder attribute (for placeholders)
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    console.log(`🔍 Found ${placeholderElements.length} elements with data-i18n-placeholder attribute`);
    
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (!key) return;
        
        const value = getNestedTranslation(window.translations[window.currentLanguage], key);
        if (value) {
            element.placeholder = value;
            translatedCount++;
        } else {
            keysWithIssues.push(`placeholder:${key}`);
            console.warn(`⚠️ No translation found for placeholder key: ${key}`);
            missingCount++;
        }
    });
    
    // Handle elements with data-i18n-title attribute (for tooltips)
    const titleElements = document.querySelectorAll('[data-i18n-title]');
    console.log(`🔍 Found ${titleElements.length} elements with data-i18n-title attribute`);
    
    titleElements.forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (!key) return;
        
        const value = getNestedTranslation(window.translations[window.currentLanguage], key);
        if (value) {
            element.title = value;
            translatedCount++;
        } else {
            keysWithIssues.push(`title:${key}`);
            console.warn(`⚠️ No translation found for title key: ${key}`);
            missingCount++;
        }
    });

    // Set the HTML lang attribute
    document.documentElement.lang = window.currentLanguage;
    
    console.log(`✅ Translations applied: ${translatedCount} translated, ${missingCount} missing`);
    if (keysWithIssues.length > 0) {
        console.warn('Keys with missing translations:', keysWithIssues);
    }
    
    // Dispatch a custom event to notify other scripts that translations have been applied
    document.dispatchEvent(new CustomEvent('translationsApplied', { 
        detail: { 
            language: window.currentLanguage,
            translatedCount,
            missingCount,
            keysWithIssues
        } 
    }));
    
    // Update the page title based on the current language
    if (window.translations[window.currentLanguage]?.general?.pageTitle) {
        document.title = window.translations[window.currentLanguage].general.pageTitle;
    }
    
    // Trigger translation update for chatbot if available
    if (typeof updateChatbotLanguage === 'function') {
        try {
            updateChatbotLanguage();
            console.log('✅ Chatbot language updated');
        } catch (e) {
            console.error('❌ Error updating chatbot language:', e);
        }
    }
}

/**
 * Get a nested translation value by key path (e.g., "header.home")
 */
function getNestedTranslation(obj, path) {
    const keys = path.split('.');
    let result = obj;

    for (const key of keys) {
        if (result && result[key] !== undefined) {
            result = result[key];
        } else {
            return undefined;
        }
    }

    return result;
}

/**
 * Manually get a translation by key
 * Useful for dynamic content or JavaScript-generated elements
 */
function getTranslation(key, fallback = '') {
    if (!translations[currentLanguage]) {
        return fallback;
    }
    
    const value = getNestedTranslation(translations[currentLanguage], key);
    return value !== undefined ? value : fallback;
}

// Expose functions to global scope for use in other scripts
window.i18n = {
    changeLanguage,
    getTranslation,
    getCurrentLanguage: () => currentLanguage
};