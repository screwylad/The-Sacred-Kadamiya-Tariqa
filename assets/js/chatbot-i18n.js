/**
 * Multi-language support for the Kadamiya Tariqa Chatbot
 * This extension adds language support to the main chatbot.js
 */

// Translations for chatbot interface elements
const chatbotTranslations = {
    en: {
        chatHeader: "Chat with Us",
        placeholder: "Type your message here...",
        sendButton: "Send",
        greetingMessage: "Hello! I'm the Kadamiya Tariqa virtual assistant. How can I help you today?",
        loadingMessage: "Thinking...",
        errorMessage: "Sorry, I couldn't process your request. Please try again.",
        noAnswerMessage: "I'm sorry, I don't have information about that topic yet. Please contact us for more details.",
        suggestedQuestions: {
            title: "You might want to ask:",
            questions: [
                "What is Kadamiya Tariqa?",
                "Who is the founder?",
                "Where is Darbar-e-Shahe Kadami?",
                "How can I join the Tariqa?"
            ]
        }
    },
    bn: {
        chatHeader: "আমাদের সাথে চ্যাট করুন",
        placeholder: "আপনার বার্তা এখানে লিখুন...",
        sendButton: "পাঠান",
        greetingMessage: "আসসালামু আলাইকুম! আমি কাদামিয়া তরিকার ভার্চুয়াল সহায়ক। আমি আপনাকে কিভাবে সাহায্য করতে পারি?",
        loadingMessage: "চিন্তা করছি...",
        errorMessage: "দুঃখিত, আমি আপনার অনুরোধ প্রক্রিয়া করতে পারিনি। অনুগ্রহ করে আবার চেষ্টা করুন।",
        noAnswerMessage: "দুঃখিত, আমার কাছে এই বিষয়ে এখনও তথ্য নেই। আরও বিবরণের জন্য অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন।",
        suggestedQuestions: {
            title: "আপনি জিজ্ঞাসা করতে পারেন:",
            questions: [
                "কাদামিয়া তরিকা কি?",
                "প্রতিষ্ঠাতা কে?",
                "দরবার-এ-শাহে কাদামি কোথায়?",
                "আমি কিভাবে তরিকাতে যোগদান করতে পারি?"
            ]
        }
    },
    hi: {
        chatHeader: "हमसे चैट करें",
        placeholder: "यहां अपना संदेश लिखें...",
        sendButton: "भेजें",
        greetingMessage: "असलामु अलैकुम! मैं कादमिया तरीका का वर्चुअल सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं?",
        loadingMessage: "विचार कर रहा हूं...",
        errorMessage: "क्षमा करें, मैं आपके अनुरोध को संसाधित नहीं कर सका। कृपया पुनः प्रयास करें।",
        noAnswerMessage: "क्षमा करें, मेरे पास इस विषय के बारे में अभी तक जानकारी नहीं है। अधिक जानकारी के लिए कृपया हमसे संपर्क करें।",
        suggestedQuestions: {
            title: "आप पूछ सकते हैं:",
            questions: [
                "कादमिया तरीका क्या है?",
                "संस्थापक कौन हैं?",
                "दरबार-ए-शाहे कादमी कहां है?",
                "मैं तरीका में कैसे शामिल हो सकता हूं?"
            ]
        }
    }
};

// Make updateChatbotLanguage available globally
window.updateChatbotLanguage = function() {
    // Get current language from i18n system
    const currentLang = window.currentLanguage || 'en';
    console.log('🤖 Updating chatbot language to:', currentLang);
    
    const translations = chatbotTranslations[currentLang] || chatbotTranslations.en;
    
    // Update UI elements
    const chatbotTitle = document.querySelector('.chatbot-title');
    if (chatbotTitle) {
        chatbotTitle.textContent = translations.chatHeader;
    }
    
    const inputField = document.querySelector('.chatbot-input input');
    if (inputField) {
        inputField.placeholder = translations.placeholder;
    }
    
    const sendButton = document.querySelector('.chatbot-submit');
    if (sendButton) {
        // Update icon button if it doesn't have text
        if (sendButton.childNodes.length === 1 && sendButton.firstChild.nodeType === 1 && sendButton.firstChild.nodeName === 'I') {
            // It's an icon button, keep it as is
        } else {
            sendButton.textContent = translations.sendButton;
        }
    }
    
    // Update suggested questions if they exist
    const suggestedTitle = document.querySelector('.suggested-questions h4');
    if (suggestedTitle) {
        suggestedTitle.textContent = translations.suggestedQuestions.title;
        
        // Update the questions
        const questionButtons = document.querySelectorAll('.suggested-question');
        questionButtons.forEach((btn, index) => {
            if (translations.suggestedQuestions.questions[index]) {
                btn.textContent = translations.suggestedQuestions.questions[index];
            }
        });
    }
    
    // If chat is empty, add greeting in current language
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages && chatMessages.childElementCount === 0) {
        // Only add greeting if addBotMessage function exists
        if (typeof addBotMessage === 'function') {
            addBotMessage(translations.greetingMessage);
        }
    }
    
    // Add a class to indicate the chatbot has been translated
    const chatbotContainer = document.querySelector('.chatbot-container');
    if (chatbotContainer) {
        chatbotContainer.classList.add('translated');
        chatbotContainer.setAttribute('data-language', currentLang);
    }
    
    console.log(`✅ Chatbot UI updated to language: ${currentLang}`);
    
    // Also update the translations for the chatbot's responses
    if (window.kadamiyaChatbot) {
        window.kadamiyaChatbot.setLanguage(currentLang);
        console.log(`✅ Chatbot responses set to language: ${currentLang}`);
    }
    
    return true;
};

// Function to initialize chatbot with language support
function initChatbotLanguageSupport() {
    console.log('🤖 Initializing chatbot language support...');
    
    // Listen for language changes
    if (window.i18n) {
        // Listen for custom language change event
        document.addEventListener('languageChanged', (event) => {
            console.log('🤖 Chatbot detected language change to:', event.detail.language);
            window.updateChatbotLanguage();
        });
        
        // Also listen for translations applied event
        document.addEventListener('translationsApplied', (event) => {
            console.log('🤖 Chatbot detected translations applied:', event.detail.language);
            window.updateChatbotLanguage();
        });
        
        // Also create a MutationObserver as backup
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                    window.updateChatbotLanguage();
                }
            });
        });
        
        // Start observing the html element
        observer.observe(document.documentElement, { attributes: true });
        
        // Initial update
        window.updateChatbotLanguage();
    } else {
        // If i18n is not available, check periodically
        const checkInterval = setInterval(() => {
            if (window.i18n) {
                window.updateChatbotLanguage();
                clearInterval(checkInterval);
                
                // Set up event listener once i18n is available
                document.addEventListener('languageChanged', (event) => {
                    console.log('🤖 Chatbot detected language change to:', event.detail.language);
                    window.updateChatbotLanguage();
                });
            }
        }, 500);
    }
}

// Chatbot knowledge base translations
let knowledgeBaseTranslations = {
    en: {},
    bn: {},
    hi: {}
};

// Load knowledge base translations
async function loadKnowledgeBaseTranslations() {
    try {
        // Determine the base path for asset loading
        const basePath = window.location.pathname.includes('/') && !window.location.pathname.endsWith('/') ? 
            (window.location.pathname.includes('.html') ? '' : '../') : '';
            
        // Load translation files for chatbot responses
        const enResponse = await fetch(`${basePath}assets/js/i18n/chatbot-en.json`).catch(() => null);
        const bnResponse = await fetch(`${basePath}assets/js/i18n/chatbot-bn.json`).catch(() => null);
        const hiResponse = await fetch(`${basePath}assets/js/i18n/chatbot-hi.json`).catch(() => null);
        
        if (enResponse) knowledgeBaseTranslations.en = await enResponse.json();
        if (bnResponse) knowledgeBaseTranslations.bn = await bnResponse.json();
        if (hiResponse) knowledgeBaseTranslations.hi = await hiResponse.json();
        
        console.log('Chatbot knowledge base translations loaded');
    } catch (error) {
        console.error('Error loading chatbot knowledge base translations:', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing chatbot i18n support');
    initChatbotLanguageSupport();
    loadKnowledgeBaseTranslations();
    
    // Override processUserInput function if it exists
    if (window.processUserInput) {
        console.log('Overriding processUserInput function');
        const originalProcessUserInput = window.processUserInput;
        
        window.processUserInput = function(input) {
            // Call original function to get response
            let response = originalProcessUserInput(input);
            
            // Translate the response based on current language
            if (window.i18n) {
                console.log('Translating response to', window.i18n.getCurrentLanguage());
                response = translateChatbotResponse(response);
            }
            
            return response;
        };
    }
    
    // Also try to override addBotMessage if it exists
    if (window.addBotMessage) {
        console.log('Overriding addBotMessage function');
        const originalAddBotMessage = window.addBotMessage;
        
        window.addBotMessage = function(message) {
            // Translate the message first
            if (window.i18n && window.i18n.getCurrentLanguage() !== 'en') {
                message = translateChatbotResponse(message);
            }
            
            // Call original function with translated message
            return originalAddBotMessage(message);
        };
    }
});

// Helper function to get translated messages based on current language
function getChatbotTranslation(key) {
    const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'en';
    const translations = chatbotTranslations[currentLang] || chatbotTranslations.en;
    
    // Handle nested keys
    if (key.includes('.')) {
        const parts = key.split('.');
        let value = translations;
        
        for (const part of parts) {
            if (value && value[part] !== undefined) {
                value = value[part];
            } else {
                return undefined;
            }
        }
        
        return value;
    }
    
    return translations[key];
}

// Translate chatbot responses based on current language
function translateChatbotResponse(response) {
    const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'en';
    if (currentLang === 'en') return response; // No translation needed for English
    
    // Check if we have translations loaded
    if (!knowledgeBaseTranslations[currentLang]) {
        console.log('No translations loaded for', currentLang);
        return response;
    }
    
    console.log('Looking for translation in', currentLang, 'for response:', response);
    
    // First try to match exact response
    for (const key in knowledgeBaseTranslations.en.responses) {
        if (knowledgeBaseTranslations.en.responses[key] === response) {
            console.log('Found exact match for key:', key);
            // Return the translated version
            const translatedResponse = knowledgeBaseTranslations[currentLang].responses[key];
            if (translatedResponse) {
                console.log('Using translated response:', translatedResponse);
                return translatedResponse;
            }
        }
    }
    
    // If no exact match, try partial match
    for (const key in knowledgeBaseTranslations.en.responses) {
        if (response.includes(knowledgeBaseTranslations.en.responses[key])) {
            console.log('Found partial match for key:', key);
            // Return the translated version
            const translatedResponse = knowledgeBaseTranslations[currentLang].responses[key];
            if (translatedResponse) {
                console.log('Using translated response:', translatedResponse);
                return translatedResponse;
            }
        }
    }
    
    console.log('No translation found, using original response');
    return response; // Return original if no translation found
}

// Make helper functions available globally
window.getChatbotTranslation = getChatbotTranslation;
window.translateChatbotResponse = translateChatbotResponse;