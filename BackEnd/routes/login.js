const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { user_id, password } = req.body;

  const [[user]] = await db.execute(
    "SELECT * FROM Users WHERE user_id = ?",
    [user_id]
  );

  if (!user) return res.status(401).json({ message: "아이디 없음" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "비밀번호 틀림" });

  const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.json({
    token,
    user: {
      user_id: user.user_id,
      nickname: user.nickname,
    },
  });
});

module.exports = router;
