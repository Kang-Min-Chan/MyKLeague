const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

/**
 * 🔹 중복확인
 * GET /join/check?type=user_id&value=abc
 */
router.get("/check", async (req, res) => {
  const { type, value } = req.query;

  if (!type || !value) {
    return res.status(400).json({ message: "type과 value가 필요합니다." });
  }

  const allowed = ["user_id", "nickname", "email"];
  if (!allowed.includes(type)) {
    return res.status(400).json({ message: "잘못된 type입니다." });
  }

  try {
    const [rows] = await db.execute(
      `SELECT 1 FROM Users WHERE ${type} = ? LIMIT 1`,
      [value]
    );

    if (rows.length > 0) {
      return res.json({ available: false, message: "이미 사용 중입니다." });
    } else {
      return res.json({ available: true, message: "사용 가능합니다." });
    }
  } catch (err) {
    res.status(500).json({ message: "중복 확인 실패", error: err.message });
  }
});

/**
 * 🔹 회원가입
 * POST /join
 */
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
      return res.status(409).json({ message: "이미 사용 중인 아이디, 이메일 또는 닉네임입니다." });
    }
    res.status(500).json({ message: "회원가입 실패", error: err.message });
  }
});

module.exports = router;
