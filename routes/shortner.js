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

module.exports=shortnerRouter