const express = require("express");
const router = express.Router();
const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url");

router
  .route("/")
  
  .post(handleGenerateNewShortURL);

  router.get("/analytics/:shortID", handleGetAnalytics);

module.exports = router;
