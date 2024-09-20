const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.post("/submit-comment", (req, res) => {
  const commentData = req.body;
  const commentsDir = path.join(__dirname, "Comments");
  const commentsFile = path.join(commentsDir, "comments.json");

  if (!fs.existsSync(commentsDir)) {
    fs.mkdirSync(commentsDir);
  }

  let comments = [];
  if (fs.existsSync(commentsFile)) {
    const fileData = fs.readFileSync(commentsFile);
    comments = JSON.parse(fileData);
  }

  comments.push(commentData);
  fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2));

  res.status(200).json({ message: "Comment saved successfully." });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
