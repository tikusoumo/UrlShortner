const shortid = require("shortid");
const Url = require("../models/url");
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "Missing URL" });
  }
  const shortID = shortid.generate();
  await Url.create({
    originalUrl: req.body.url,
    shortUrl: shortID,
    visiteHistory: [],
  });
  res.status(201).json({ shortUrl: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortID = req.params.shortID;
  const result = await Url.findOne({ shortUrl: shortID });
  if (!result) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = { handleGenerateNewShortURL , handleGetAnalytics};
