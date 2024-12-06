const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 8000;

const cors = require("cors");
app.use(cors({ origin: "https://bottle22.netlify.app:3000" })); // React 포트


// Middleware 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// React 정적 파일 제공
app.use(express.static(path.join(__dirname, "prompting/build")));

// React Catch-All 라우팅
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "prompting/build/index.html"));
});

// Endpoint: Prompt 저장
app.post("/api/save-prompt", (req, res) => {
  const { prompt } = req.body;
  console.log(prompt)
  // 요청 유효성 검사
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  console.log("Received prompt:", prompt);
  res.json({ prompt });
});
  
// React Catch-All 라우팅
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "prompting/build/second_page.html"));
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
