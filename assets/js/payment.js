/**
 * The Holy Kadamiya Tariqa - Stripe Payment Integration
 * Created: September 22, 2025
 * Author: GitHub Copilot
 * 
 * Note: This is a client-side implementation. In a production environment,
 * actual payment processing should happen on the server side for security.
 * This file is structured to work with serverless functions when deployed.
 */

// Stripe payment processing
class StripePaymentProcessor {
    constructor() {
        // Stripe public key would be initialized here in production
        // this.stripe = Stripe('YOUR_PUBLISHABLE_KEY');
        
        // For demonstration only - no actual Stripe key is used
        this.stripe = null;
        this.elements = null;
        this.card = null;
        
        // Form elements
        this.paymentForm = document.getElementById('payment-form');
        this.paymentOptions = document.querySelectorAll('.payment-option');
        this.customAmountField = document.getElementById('custom-amount-field');
        this.amountInput = document.getElementById('donation-amount');
        this.errorElement = document.getElementById('card-errors');
        this.submitButton = document.getElementById('submit-payment');
    }
    
    init() {
        // Check if payment form exists on the current page
        if (!this.paymentForm) return;
        
        try {
            this.setupEventListeners();
            this.setupFormValidation();
            
            console.log('Payment system initialized in demo mode');
            
            // In a real implementation, we would initialize Stripe here
            // this.setupStripe();
        } catch (error) {
            console.error('Error initializing payment system:', error);
        }
    }
    
    // Set up Stripe Elements (would be used in production)
    setupStripe() {
        // Initialize Stripe Elements
        this.elements = this.stripe.elements();
        
        // Create a card Element
        const cardElement = this.elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#333',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#b30000',
                    iconColor: '#b30000'
                }
            }
        });
        
        // Mount the card Element to the DOM
        cardElement.mount('#card-element');
        
        // Handle real-time validation errors
        cardElement.on('change', (event) => {
            if (event.error) {
                this.showError(event.error.message);
            } else {
                this.clearError();
            }
        });
        
        // Store the card element for later use
        this.card = cardElement;
    }
    
    // Set up event listeners for the payment form
    setupEventListeners() {
        // Handle payment option selection
        if (this.paymentOptions) {
            this.paymentOptions.forEach(option => {
                option.addEventListener('click', () => this.handlePaymentOptionClick(option));
            });
        }
        
        // Handle form submission
        if (this.paymentForm) {
            this.paymentForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }
    
    // Handle payment option selection
    handlePaymentOptionClick(option) {
        // Remove active class from all options
        this.paymentOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
        
        const amount = option.getAttribute('data-amount');
        
        // Show/hide custom amount field
        if (amount === 'custom' && this.customAmountField) {
            this.customAmountField.style.display = 'block';
            this.amountInput.value = '';
            this.amountInput.focus();
        } else if (this.customAmountField) {
            this.customAmountField.style.display = 'none';
            this.amountInput.value = amount;
        }
    }
    
    // Handle form submission
    handleFormSubmit(e) {
        e.preventDefault();
        
        // Disable the submit button to prevent multiple submissions
        if (this.submitButton) {
            this.submitButton.disabled = true;
            this.submitButton.textContent = 'Processing...';
        }
        
        // Get form data
        const formData = new FormData(this.paymentForm);
        const amount = formData.get('amount');
        const name = formData.get('name');
        const email = formData.get('email');
        
        // Basic validation
        if (!this.validateForm(amount, name, email)) {
            // Re-enable the submit button
            if (this.submitButton) {
                this.submitButton.disabled = false;
                this.submitButton.textContent = 'Make Donation';
            }
            return;
        }
        
        // In a real implementation, we would process the payment with Stripe here
        this.processPayment(amount, name, email);
    }
    
    // Process the payment with Stripe (would connect to serverless function in production)
    processPayment(amount, name, email) {
        // In a production environment, this would create a payment intent via a serverless function
        // and then confirm the payment with the card
        
        // For demonstration, we'll just show a success message after a delay
        setTimeout(() => {
            // Show success message
            const paymentContainer = document.querySelector('.payment-container');
            if (paymentContainer) {
                paymentContainer.innerHTML = `
                    <div class="payment-success">
                        <h2>Thank You For Your Donation!</h2>
                        <p>Your generous contribution of $${amount} will help support the Sacred Kadamiya Tariqa.</p>
                        <p>A confirmation receipt has been sent to ${email}.</p>
                        <p class="payment-note">Note: This is a demonstration. No actual payment was processed.</p>
                        <button class="btn btn-primary" onclick="window.location.reload()">Make Another Donation</button>
                    </div>
                `;
            }
        }, 1500);
    }
    
    // Validate the payment form
    validateForm(amount, name, email) {
        // Clear previous errors
        this.clearError();
        
        // Validate amount
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            this.showError('Please enter a valid donation amount.');
            return false;
        }
        
        // Validate name
        if (!name || name.trim() === '') {
            this.showError('Please enter your name.');
            return false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            this.showError('Please enter a valid email address.');
            return false;
        }
        
        return true;
    }
    
    // Set up form validation
    setupFormValidation() {
        // Add input event listeners for real-time validation
        if (this.amountInput) {
            this.amountInput.addEventListener('input', () => {
                // Allow only numbers and decimal point
                this.amountInput.value = this.amountInput.value.replace(/[^0-9.]/g, '');
                
                // Ensure only one decimal point
                const parts = this.amountInput.value.split('.');
                if (parts.length > 2) {
                    this.amountInput.value = parts[0] + '.' + parts.slice(1).join('');
                }
                
                // Limit to two decimal places
                if (parts.length > 1 && parts[1].length > 2) {
                    this.amountInput.value = parts[0] + '.' + parts[1].substring(0, 2);
                }
            });
        }
    }
    
    // Show error message
    showError(message) {
        if (this.errorElement) {
            this.errorElement.textContent = message;
            this.errorElement.style.display = 'block';
            
            // Scroll to error
            this.errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Re-enable submit button
        if (this.submitButton) {
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'Make Donation';
        }
    }
    
    // Clear error message
    clearError() {
        if (this.errorElement) {
            this.errorElement.textContent = '';
            this.errorElement.style.display = 'none';
        }
    }
}

// Initialize payment processor when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const paymentProcessor = new StripePaymentProcessor();
    paymentProcessor.init();
});