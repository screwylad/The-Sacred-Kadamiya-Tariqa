/**
 * Stripe Payment Processing - Serverless Function
 * 
 * This function creates a payment intent with Stripe and returns the client secret
 * to the frontend for processing the payment.
 * 
 * Can be deployed on Netlify, Vercel, AWS Lambda, or other serverless platforms.
 */

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
        const { amount, currency = 'usd', name, email } = data;
        
        // Validate the required fields
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid amount' })
            };
        }
        
        // Convert amount to cents (Stripe requires amounts in cents)
        const amountInCents = Math.round(parseFloat(amount) * 100);
        
        // In a real implementation, we would initialize Stripe here with the API key
        // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        
        // Create a payment intent
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: amountInCents,
        //     currency: currency,
        //     payment_method_types: ['card'],
        //     receipt_email: email,
        //     metadata: {
        //         name: name,
        //         purpose: 'Donation to The Holy Kadamiya Tariqa'
        //     }
        // });
        
        // For demonstration purposes, we'll return a mock client secret
        const mockClientSecret = `pi_mock_${Date.now()}_secret_mock_${Math.random().toString(36).substring(2, 15)}`;
        
        // Return the client secret to the frontend
        return {
            statusCode: 200,
            body: JSON.stringify({
                clientSecret: mockClientSecret,
                amount: amountInCents,
                currency: currency
            })
        };
    } catch (error) {
        console.error('Error processing payment:', error);
        
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'An error occurred while processing your payment',
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
        const { amount, currency = 'usd', name, email } = req.body;
        
        // Validate the required fields
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }
        
        // Convert amount to cents
        const amountInCents = Math.round(parseFloat(amount) * 100);
        
        // In a real implementation, we would initialize Stripe here with the API key
        // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        
        // Create a payment intent
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: amountInCents,
        //     currency: currency,
        //     payment_method_types: ['card'],
        //     receipt_email: email,
        //     metadata: {
        //         name: name,
        //         purpose: 'Donation to The Holy Kadamiya Tariqa'
        //     }
        // });
        
        // For demonstration purposes, we'll return a mock client secret
        const mockClientSecret = `pi_mock_${Date.now()}_secret_mock_${Math.random().toString(36).substring(2, 15)}`;
        
        // Return the client secret to the frontend
        return res.status(200).json({
            clientSecret: mockClientSecret,
            amount: amountInCents,
            currency: currency
        });
    } catch (error) {
        console.error('Error processing payment:', error);
        
        return res.status(500).json({
            error: 'An error occurred while processing your payment',
            details: error.message
        });
    }
};