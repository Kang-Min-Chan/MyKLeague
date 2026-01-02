const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { user_id, email, password, passwordConfirm, nickname } = req.body;

  if (password !== passwordConfirm) {
    return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    await db.execute(
      "INSERT INTO Users (user_id, email, password, nickname) VALUES (?, ?, ?, ?)",
      [user_id, email, hashed, nickname]
    );
    res.status(201).json({ message: "회원가입 성공" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "이미 사용 중인 아이디 또는 이메일입니다." });
    }
    res.status(500).json({ message: "회원가입 실패", error: err.message });
  }
});

module.exports = router;
