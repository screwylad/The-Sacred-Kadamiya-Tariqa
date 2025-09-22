/**
 * The Holy Kadamiya Tariqa - Chatbot JS
 * Created: September 22, 2025
 * Author: GitHub Copilot
 */

// Knowledge base extracted from the provided PDF content
const knowledgeBase = [
    {
        keywords: ['welcome', 'hello', 'hi', 'greeting', 'introduction'],
        response: "Welcome to the Official Site of The Sacred KADAMIYA TARIKA, the Tarika where divine blessings directly come from under the HOLY LEG (Kadam Mobarak) of our beloved Prophet HAZRAT MOHAMMAD (SAWS)."
    },
    {
        keywords: ['about', 'history', 'kadam', 'kadamiya', 'tarika', 'meaning'],
        response: "The literal meaning of the Arabic Term 'Kadam' is Leg and hence this Holy Tarika is named after our revered and beloved IMAM (founder) of the Sacred Tarika, IMAME TARIKAYE KADAMIYA MUHIUL KULUB MAHBUBE RAHMANI HAZRAT MAWLANA SHAH SUFI SYED AMZAD ALI AL-HASANI WAL-HUSSAINI AL-KADAMI (R) is supremely favored with the 'LEFT HOLY LEG' of our beloved PROPHET HAZRAT MOHAMMAD (SAWS)."
    },
    {
        keywords: ['mission', 'goal', 'purpose', 'aim'],
        response: "KADAMIYA TARIKA is a mystical Islamic path of enlightenment that emphasizes self-knowledge, spiritual growth, and service to humanity. Our goal is to attain proximity to Almighty Allah through LOVE and DEVOTION. We believe in the Power of community and the importance of building relationships with others. We welcome people of all races, religions, and cultures to join us in our journey towards Spirituality and Closeness to Almighty Allah."
    },
    {
        keywords: ['founder', 'imam', 'amzad ali'],
        response: "Hazrat Muhiul Kulub Mahbube Rahmani Shah Sufi Syed Mawlana Amzad Ali Al-Hasani Al-Kadami (R) is the founder Imam of Holy KADAMIYA Tarika. He was one of the descendants of Hazrat Syed Abdul Kader Zilani (R), the Iman of Kaderia Tarika. He was bestowed the KADAMIYA Tarika (Divine Path) by Allah, the Merciful, through his best friend our beloved prophet, Hazrat Mohmmad (SAWS) who taught him all the spiritual knowledge."
    },
    {
        keywords: ['hierarchy', 'leadership', 'khalifas', 'succession'],
        response: "The Khalifas of DARBARE-E-SHAHE KADAMI (PAWSHAR SHARIF) are as follows: 1. Hazrat Mawlana Shah-Sufi Syed Ajmal Ali Al-Hasani-Al-Kadami (R) Khalifaye Azam. 2. Hazrat Mawlana Shah-Sufi Syed Abul Hasan Ahsan Ali Al-Hasani-Al-Kadami (R) Khalifaye Waisey Zaman. 3. Hazrat Mawlana Shah-Sufi Syed Abul Mansoor Bakibillah Al-Hasani-Al-Kadami (R). 4. Alhaj Hazrat Shah-Sufi Syed Abul Fazal Mohammd Habib Ullah Mahfuz Al-Hasani-Al-Kadami (R). 5. Hazrat Mawlana Shah-Sufi Syed Abul Hasan Mohammad Mahbub-Ullah Al-Hasani-Al-Kadami (The present Sajjadanasin-Gadinasin of Darbar-e-Shahe Kadmi, Pawshar)."
    },
    {
        keywords: ['what is tarika', 'definition', 'meaning of tarika'],
        response: "The literal meaning of the Arabic word \"TARIKA\" is way/road/path. In the spiritual language for purification of soul/heart and to attain the knowledge of Hakekat and Marefat of Almighty Allah under the guidance and care of a spiritually knowledgeable Teacher is called a Tarika."
    },
    {
        keywords: ['pak panjatan', 'panjatan'],
        response: "There are five personalities through whose mediation, one can extinguish the burning difficulties. They are: 1. Prophet Mohammad (SAWS), 2. Hazrat Ali Asadullah (RA), 3. Hazrat Fatema Zuhra (RA), 4. Hazrat Hasan Mojtoba (RA), 5. Hazrat Husan Sohadaye Karbala (RA)."
    },
    {
        keywords: ['oli-allah', 'oli', 'friend of allah'],
        response: "The meaning of the Arabic term \"Oli\" is friend and Oli-Allah means a friend of Allah. A man who is able to draw near Allah through supererogatory works is bestowed with innumerable favours, powers and dignity."
    },
    {
        keywords: ['kadamiya tarika', 'what is kadamiya'],
        response: "The literal meaning of the Arabic term \"Kadam\" is leg. The KADAMIYA Tarika is one where the divine blessings come directly from under the holy leg (Kadam Mubarak) of our beloved prophet Hazrat Mohammad (SAWS) in the heart of the believer. It is a full-fledged Tarika and can't be the branch of any other Tarika."
    },
    {
        keywords: ['location', 'darbar', 'darbar-e-shahe kadami', 'pawshar', 'where'],
        response: "DARBAR-E-SHAHE KADAMI is situated in the North Pawshar Village of Sirajdikhan Police Station under Munshiganj District of Bangladesh."
    },
    {
        keywords: ['sofir', 'who is sofir'],
        response: "A Sofir is a person who has crossed a long way in his spiritual journey, but not yet reached to the goal but is given permission by his teacher (Murshid) to train up the students of lower classes. Sofir in fact, is a primary teacher."
    },
    {
        keywords: ['rules', 'instructions', 'guidelines', 'follow'],
        response: "One who is interested in getting involved (become a disciple/follower) into the Sacred KADAMIYA TARIKA must have to obey some rules and instructions: 1) Act according to the Laws of Sharia. 2) Keep away from Haram and adopt Halal. 3) Not to tell a lie. 4) Thinking yourself inferior to all."
    },
    {
        keywords: ['daily practices', 'wazifa', 'durud', 'prayer'],
        response: "KADAMIYA TARIKA'S DURUD SHARIF: [ALLAHUMMA SALLE ALA NORIKA WALA ALIHI WALA KADAMIHI WA SALLIM]. KADAMIYA TARIKA'S DUA: [ALLAHUMMA CHABBIT KULUBANA ALA DINIKA WALA TARIKATIL KAL KADAMIYA WASHURNA ALA KADMEY HABIBIKA RAHMATULLIL ALAMIN. MOHAMMADANIL MUSTAFA CHALLALAHH TALA ALAIHI WALA ALIHI WA ACH CHAHABIHI MUNAZZIHINAL MUTAHHIRINAL AJMAYIN. BIRAKMATIKA YA ARAHMANIR RAHIM]"
    },
    {
        keywords: ['fazr', 'fazr practice', 'morning practice'],
        response: "FAZR PRACTICE includes Fateha Sharif, Khatam Sharif, and Nafi and Isbat Zikr."
    },
    {
        keywords: ['magrib', 'magrib practice', 'evening practice'],
        response: "MAGRIB PRACTICE includes Fateha Sharif and Murakaba (Meditation of Allah)."
    },
    {
        keywords: ['isha', 'isha practice', 'night practice'],
        response: "ISHA PRACTICE: Recite Durud Sharif (313 TIMES) in order to receive the love, Ziyarat and Safayat of Prophet (SAWS)."
    },
    {
        keywords: ['stations', 'maqams', '9 stations'],
        response: "The 9 Stations (Maqams) of the Sacred Kadamiya Tarika are: 1. FANAFISH SHEIKH, 2. FANAFIR RASUL, 3. FANAFILLAH, 4. BAKABILLAH, 5. ABDIYAT AND MABUDIYAT, 6. AMBIYAYE ULUL AZAM, 7. MAHBUBIYATE MOHAMMODI, 8. HAKIKATE MOHAMMODI, 9. HAKIKATE ALLAH JALLEH SHANUH."
    },
    {
        keywords: ['contact', 'phone', 'email', 'address'],
        response: "Address: DARBAR-E-SHAHE KADMI (PAWSHAR SHARIF), UTTAR PAWSHAR, SIRAJDIKHAN, MUNSHIGANJ, DHAKA, BANGLADESH. Phone: +8801725774252; +8801926266156. Email: darbareshahekadmi@gmail.com, darbareshahekodomi@gmail.com"
    }
];

// Default fallback response if no matches are found
const fallbackResponse = "I'm sorry, I don't have specific information about that. For more details, please contact our office at +8801725774252 or email darbareshahekadmi@gmail.com.";

// Welcome message when chatbot is first opened
const welcomeMessage = "Assalamu Alaikum! Welcome to the Sacred Kadamiya Tariqa chatbot. How may I help you today?";

class KadamiyaAIChatbot {
    constructor(knowledgeBase, fallbackResponse, welcomeMessage) {
        this.knowledgeBase = knowledgeBase;
        this.fallbackResponse = fallbackResponse;
        this.welcomeMessage = welcomeMessage;
        this.chatHistory = [];
    }
    
    // Initialize the chatbot
    init() {
        // Set up DOM elements
        this.chatToggle = document.querySelector('.chatbot-toggle');
        this.chatContainer = document.querySelector('.chatbot-container');
        this.chatClose = document.querySelector('.chatbot-close');
        this.chatForm = document.querySelector('.chatbot-input');
        this.chatInput = document.querySelector('.chatbot-input input');
        this.chatMessages = document.querySelector('.chatbot-messages');
        
        // If elements exist, set up event listeners
        if (this.chatToggle && this.chatContainer) {
            this.setupEventListeners();
            this.addBotMessage(this.welcomeMessage);
        }
    }
    
    // Set up event listeners
    setupEventListeners() {
        // Toggle chatbot visibility
        this.chatToggle.addEventListener('click', () => {
            this.chatContainer.style.display = 'flex';
            this.chatToggle.style.display = 'none';
            this.scrollToBottom();
        });
        
        // Close chatbot
        this.chatClose.addEventListener('click', () => {
            this.chatContainer.style.display = 'none';
            this.chatToggle.style.display = 'flex';
        });
        
        // Handle form submission
        this.chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = this.chatInput.value.trim();
            
            if (message) {
                // Add user message to chat
                this.addUserMessage(message);
                
                // Clear input
                this.chatInput.value = '';
                
                // Get and display bot response
                this.getResponse(message);
            }
        });
    }
    
    // Add a message from the bot to the chat
    addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'message-bot');
        messageElement.textContent = message;
        
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
        
        // Store in chat history
        this.chatHistory.push({
            sender: 'bot',
            message: message
        });
    }
    
    // Add a message from the user to the chat
    addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'message-user');
        messageElement.textContent = message;
        
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
        
        // Store in chat history
        this.chatHistory.push({
            sender: 'user',
            message: message
        });
    }
    
    // Get response based on user input
    getResponse(userMessage) {
        // Add a small delay to simulate thinking
        setTimeout(() => {
            const response = this.findResponse(userMessage);
            this.addBotMessage(response);
        }, 800);
    }
    
    // Find the most relevant response from the knowledge base
    findResponse(userMessage) {
        userMessage = userMessage.toLowerCase();
        
        // Check each knowledge base entry for keyword matches
        let bestMatch = null;
        let highestScore = 0;
        
        for (const entry of this.knowledgeBase) {
            const score = this.calculateMatchScore(userMessage, entry.keywords);
            
            if (score > highestScore) {
                highestScore = score;
                bestMatch = entry;
            }
        }
        
        // Return the best match or fallback
        if (bestMatch && highestScore > 0) {
            return bestMatch.response;
        }
        
        return this.fallbackResponse;
    }
    
    // Calculate how well the user message matches the keywords
    calculateMatchScore(userMessage, keywords) {
        let score = 0;
        
        for (const keyword of keywords) {
            if (userMessage.includes(keyword.toLowerCase())) {
                // Add points based on keyword length (longer keywords are more specific)
                score += keyword.length;
            }
        }
        
        return score;
    }
    
    // Scroll the chat to the bottom
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    // Export chat history (could be used for saving/analytics)
    exportChatHistory() {
        return JSON.stringify(this.chatHistory);
    }
}

// Initialize the chatbot when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.kadamiyaChatbot = new KadamiyaAIChatbot(knowledgeBase, fallbackResponse, welcomeMessage);
    window.kadamiyaChatbot.init();
});