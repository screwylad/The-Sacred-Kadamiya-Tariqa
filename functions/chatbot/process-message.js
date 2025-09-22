/**
 * AI Chatbot Processing - Serverless Function
 * 
 * This function processes chatbot queries using the knowledge base
 * extracted from the provided PDF document about the Sacred Kadamiya Tarika.
 * 
 * Can be deployed on Netlify, Vercel, AWS Lambda, or other serverless platforms.
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

/**
 * Find the most relevant response from the knowledge base
 * @param {string} userMessage - The message from the user
 * @returns {string} The best matching response or a fallback
 */
function findResponse(userMessage) {
    userMessage = userMessage.toLowerCase();
    
    // Check each knowledge base entry for keyword matches
    let bestMatch = null;
    let highestScore = 0;
    
    for (const entry of knowledgeBase) {
        const score = calculateMatchScore(userMessage, entry.keywords);
        
        if (score > highestScore) {
            highestScore = score;
            bestMatch = entry;
        }
    }
    
    // Return the best match or fallback
    if (bestMatch && highestScore > 0) {
        return bestMatch.response;
    }
    
    return fallbackResponse;
}

/**
 * Calculate how well the user message matches the keywords
 * @param {string} userMessage - The message from the user
 * @param {Array<string>} keywords - Array of keywords to match against
 * @returns {number} Match score
 */
function calculateMatchScore(userMessage, keywords) {
    let score = 0;
    
    for (const keyword of keywords) {
        if (userMessage.includes(keyword.toLowerCase())) {
            // Add points based on keyword length (longer keywords are more specific)
            score += keyword.length;
        }
    }
    
    return score;
}

/**
 * Process the message using Natural Language Processing (NLP) techniques
 * In a production environment, this would use a more sophisticated NLP approach
 * or connect to an external API like OpenAI's GPT
 */
function processMessage(userMessage) {
    // For a more advanced implementation, this would use NLP techniques
    // or connect to an external API for more sophisticated processing
    
    // For now, we'll use our simple keyword matching
    return findResponse(userMessage);
}

// For Netlify functions
exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    
    try {
        // Parse the incoming request body
        const data = JSON.parse(event.body);
        const { message } = data;
        
        if (!message || typeof message !== 'string') {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid message' })
            };
        }
        
        // Process the message and get a response
        const response = processMessage(message);
        
        // Return the response
        return {
            statusCode: 200,
            body: JSON.stringify({
                response: response
            })
        };
    } catch (error) {
        console.error('Error processing message:', error);
        
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'An error occurred while processing your message',
                details: error.message
            })
        };
    }
};

// For Vercel serverless functions
module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { message } = req.body;
        
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Invalid message' });
        }
        
        // Process the message and get a response
        const response = processMessage(message);
        
        // Return the response
        return res.status(200).json({
            response: response
        });
    } catch (error) {
        console.error('Error processing message:', error);
        
        return res.status(500).json({
            error: 'An error occurred while processing your message',
            details: error.message
        });
    }
};