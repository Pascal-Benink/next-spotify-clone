import Stripe from 'stripe';

// @ts-expect-error: Stripe is not defined
export const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
        appInfo: {
            name: "Spotify Clone",
            version: "0.1.0"
        }
    }
)