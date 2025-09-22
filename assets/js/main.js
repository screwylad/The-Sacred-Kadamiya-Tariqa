/**
 * The Holy Kadamiya Tariqa - Main JavaScript
 * Created: September 22, 2025
 * Author: GitHub Copilot
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initFaqAccordion();
    initGalleryLightbox();
    initChatbot();
    initPaymentForm();
    initParallaxEffect();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active nav link based on current section
    window.addEventListener('scroll', function() {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

/**
 * FAQ Accordion functionality
 */
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on the clicked question
            this.classList.toggle('active');
            
            // Get the answer element
            const answer = this.nextElementSibling;
            
            // Toggle the max-height to show/hide the answer
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
}

/**
 * Gallery lightbox functionality
 */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Open lightbox when clicking on a gallery item
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real implementation, this would show the actual image
            // For now, we're just showing a larger placeholder
            lightboxContent.innerHTML = '<div class="lightbox-placeholder">Image Placeholder</div>';
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Also close when clicking outside the content
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

/**
 * Chatbot functionality
 */
function initChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotForm = document.querySelector('.chatbot-input');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    // Toggle chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.style.display = 'flex';
            chatbotToggle.style.display = 'none';
            
            // Show welcome message
            addBotMessage("Welcome to the Sacred Kadamiya Tariqa chatbot! How can I assist you today?");
        });
    }
    
    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.style.display = 'none';
            chatbotToggle.style.display = 'flex';
        });
    }
    
    // Handle chatbot form submission
    if (chatbotForm) {
        chatbotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const message = chatbotInput.value.trim();
            
            if (message) {
                // Add user message to chat
                addUserMessage(message);
                
                // Clear input
                chatbotInput.value = '';
                
                // Process the message and get response
                processChatbotMessage(message);
            }
        });
    }
    
    // Add a message from the bot to the chat
    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'message-bot');
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        scrollChatToBottom();
    }
    
    // Add a message from the user to the chat
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'message-user');
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        scrollChatToBottom();
    }
    
    // Process the user message and provide a response
    function processChatbotMessage(message) {
        // In a real implementation, this would call an API with the knowledge base
        // For now, we'll use a simple keyword-based response system
        
        message = message.toLowerCase();
        
        // Simulate thinking delay
        setTimeout(() => {
            if (message.includes('tarika') || message.includes('kadamiya')) {
                addBotMessage("The literal meaning of the Arabic term \"Kadam\" is leg. The KADAMIYA Tarika is one where the divine blessings come directly from under the holy leg (Kadam Mubarak) of our beloved prophet Hazrat Mohammad (SAWS) in the heart of the believer.");
            }
            else if (message.includes('founder') || message.includes('imam')) {
                addBotMessage("Hazrat Muhiul Kulub Mahbube Rahmani Shah Sufi Syed Mawlana Amzad Ali Al-Hasani Al-Kadami (R) is the founder Imam of Holy KADAMIYA Tarika.");
            }
            else if (message.includes('contact') || message.includes('address')) {
                addBotMessage("Our address is: DARBAR-E-SHAHE KADMI (PAWSHAR SHARIF), UTTAR PAWSHAR, SIRAJDIKHAN, MUNSHIGANJ, DHAKA, BANGLADESH. You can contact us at +8801725774252 or via email at darbareshahekadmi@gmail.com.");
            }
            else if (message.includes('rules') || message.includes('instructions')) {
                addBotMessage("There are several rules to follow in the Sacred KADAMIYA TARIKA: 1) Act according to the Laws of Sharia, 2) Keep away from Haram and adopt Halal, 3) Not to tell a lie, 4) Thinking yourself inferior to all.");
            }
            else if (message.includes('practice') || message.includes('wazifa')) {
                addBotMessage("The daily practices include KADAMIYA TARIKA'S DURUD SHARIF, Fazr Practice, Magrib Practice, and Isha Practice. Would you like to know more about any specific practice?");
            }
            else if (message.includes('hierarchy') || message.includes('khalifa')) {
                addBotMessage("The current Sajjadanasin-Gadinasin of Darbar-e-Shahe Kadmi, Pawshar is Hazrat Mawlana Shah-Sufi Syed Abul Hasan Mohammad Mahbub-Ullah Al-Hasani-Al-Kadami.");
            }
            else if (message.includes('oli') || message.includes('oli-allah')) {
                addBotMessage("The meaning of the Arabic term \"Oli\" is friend and Oli-Allah means a friend of Allah. A man who is able to draw near Allah through supererogatory works is bestowed with innumerable favours, powers and dignity.");
            }
            else if (message.includes('sofir')) {
                addBotMessage("A Sofir is a person who has crossed a long way in his spiritual journey, but not yet reached to the goal but is given permission by his teacher (Murshid) to train up the students of lower classes. Sofir in fact, is a primary teacher.");
            }
            else if (message.includes('hello') || message.includes('hi') || message.includes('greetings')) {
                addBotMessage("Assalamu Alaikum! Welcome to the Sacred Kadamiya Tariqa. How may I assist you today?");
            }
            else {
                // Fallback message with contact details
                addBotMessage("I'm not sure I understand that question. For more specific information, please contact our office at +8801725774252 or email darbareshahekadmi@gmail.com.");
            }
        }, 1000);
    }
    
    // Scroll the chat to the bottom
    function scrollChatToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
}

/**
 * Payment form functionality
 */
function initPaymentForm() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const customAmountField = document.getElementById('custom-amount');
    const amountInput = document.getElementById('donation-amount');
    
    // Handle payment option selection
    if (paymentOptions) {
        paymentOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                paymentOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                const amount = this.getAttribute('data-amount');
                
                // Show/hide custom amount field
                if (amount === 'custom' && customAmountField) {
                    customAmountField.style.display = 'block';
                    amountInput.value = '';
                } else if (customAmountField) {
                    customAmountField.style.display = 'none';
                    amountInput.value = amount;
                }
            });
        });
    }
    
    // Handle form submission - In a real implementation, this would use Stripe
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, this would call the Stripe API
            // For now, we'll just show a success message
            alert('Thank you for your donation! This is a demo - no actual payment has been processed.');
        });
    }
}

/**
 * Parallax scrolling effect
 */
function initParallaxEffect() {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', function() {
        parallaxBgs.forEach(bg => {
            const scrollPosition = window.pageYOffset;
            const parentOffset = bg.parentElement.offsetTop;
            const distance = scrollPosition - parentOffset;
            
            bg.style.transform = `translateY(${distance * 0.5}px)`;
        });
    });
}