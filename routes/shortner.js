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
    const durationInMinutes = validity || defaultValidity;
    const createdAt = new Date().toISOString();
    const expiry = new Date(Date.now() + durationInMinutes * 60000).toISOString();
    const shortCode = shortcode || generateRandomCode();
    const shortLink = `https://short.domain/${shortCode}`;
    
    shortUrls[shortCode] = {
        originalUrl: url,
        createdAt,
        expiry,
        totalClicks: 0,
        clickDetails: []
    };

    return res.status(201).json({
        shortLink,
        expiry
    });
});


const shortUrls = {
  "abcd": {
    originalUrl: "https://www.google.com/search?q=difererner+url&rlz=1C1GCEU_enIN1037IN1039&oq=difererner+url&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQABgNGIAEMgkIAhAAGA0YgAQyCQgDEAAYDRiABDIJCAQQABgNGIAEMgkIBRAAGA0YgAQyCQgGEAAYDRiABDIJCAcQABgNGIAEMggICBAAGA0YHjIICAkQABgNGB7SAQg0MjQzajBqN6gCCLACAfEF84ofLpiN5Bw&sourceid=chrome&ie=UTF-8",
    createdAt: "2025-01-01T00:00:00Z",
    expiry: "2025-01-01T00:30:00Z",
    totalClicks:2,
    clickDetails: [
      { timestamp: "2025-01-01T00:01:00Z", 
        refer: "https://google.com", location:"India" },
      { timestamp: "2025-01-01T00:05:00Z", 
        refer: "https://facebook.com", location:"USA" }
    ]
  }
};
shortnerRouter.get('/shorturls/:shortcode', (req, res) => {
  const { shortcode } = req.params;
  const data = shortUrls[shortcode];
  if (!data) {
    return res.status(404).json({ error: "Shortcode not found" });
  }
  res.json({
    originalUrl: data.originalUrl,
    createdAt: data.createdAt,
    expiry: data.expiry,
    totalClicks: data.totalClicks,
    clickDetails: data.clickDetails
  });
});


module.exports=shortnerRouter