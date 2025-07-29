const express=require("express");
const app=express();
const shortnerRouter=express.Router();




shortnerRouter.post('/shorturls', (req, res) => {
    const { url, validity, shortcode } = req.body;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({
             error: "Valid 'url' is required."
             });
    }
    const defaultValidity = 30;
    const durationInMinutes = validity 

    const expiry = new Date(Date.now() + durationInMinutes * 60000).toISOString();

    const shortLink = `https://short.domain/${shortcode}`;

    return res.status(201).json({
        shortLink,
        expiry
    });
});

// Helper function to generate a random shortcode if not provided
function generateRandomCode(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length })
        .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
        .join('');
}


module.exports=shortnerRouter