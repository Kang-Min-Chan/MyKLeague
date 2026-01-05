const express = require("express");
const router = express.Router();
const { execFile } = require("child_process");
const path = require("path");
const fs = require("fs");

router.post("/match", (req, res) => {
  console.log("👉 /ai/match called");

  const payload = req.body;
  const inputPath = path.join(__dirname, "../ai/input.json");
  const scriptPath = path.join(__dirname, "../ai/ai_match.py");

  try {
    fs.writeFileSync(inputPath, JSON.stringify(payload, null, 2));
  } catch (e) {
    console.error("❌ File write error:", e);
  }

  execFile("python", [scriptPath], { timeout: 20000 }, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Python exec error:", err);
      console.error("STDERR:", stderr);
      return res.status(500).json({ error: "Python exec error", stderr });
    }

    console.log("🧠 Python output:", stdout);

    try {
      const result = JSON.parse(stdout);
      res.json(result);
    } catch (e) {
      console.error("❌ JSON parse error:", stdout);
      res.status(500).json({ error: "Parse Error", raw: stdout });
    }
  });
});

module.exports = router;
