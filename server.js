const express = require("express");
const path = require("path");
const posts = require("./data/posts");
const app = express();
const PORT = process.env.PORT || 3000;

// Make the files in the public folder available to the browser.
app.use(express.static(path.join(__dirname, "public")));

// API endpoint: return posts with the newest date first.
app.get("/api/posts", (req, res) => {
  const sortedPosts = [...posts].sort((a, b) => {
    return parseDate(b.createdAt) - parseDate(a.createdAt);
  });
  res.json(sortedPosts);
});
// Convert DD-MM-YYYY into a JavaScript Date.
function parseDate(dateString) {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}
app.listen(PORT, () => {
  console.log(`The Timeline is running at http://localhost:${PORT}`);
});
