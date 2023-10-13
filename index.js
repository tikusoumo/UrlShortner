const express = require("express");

const urlRouter = require("./routes/url");
const { connectMongoDB } = require("./connect");
const URL = require("./models/url");

const app = express();
const port = 5550;

connectMongoDB("mongodb://127.0.0.1:27017/shortUrl").then(() => {
  console.log("Connect successfully!!!");
});
app.use(express.json());
app.use("/url", urlRouter);
app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    { shortUrl: shortID },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    return res.status(404).json({ error: "Not found" });
  }

  res.redirect(entry.originalUrl);
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
