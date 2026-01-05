const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { user_id, password } = req.body;

  const [[user]] = await db.execute(
    "SELECT * FROM Users WHERE user_id = ?",
    [user_id]
  );

  if (!user) {
    return res.status(401).json({ message: "로그인 실패" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "로그인 실패" });
  }

const token = jwt.sign(
  { user_id: user.user_id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

  res.json({ accessToken: token });
});

module.exports = router;
