const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

// 인증 미들웨어 (로그인 토큰 필요)
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "토큰 필요" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "토큰 무효" });
  }
}

// 팀 선택
router.post("/select", auth, async (req, res) => {
  const user_id = req.user.user_id;
  const { kteam_id } = req.body;

  if (!kteam_id) return res.status(400).json({ message: "kteam_id 필요" });

  const [[exists]] = await db.execute(
    "SELECT 1 FROM Myteam WHERE user_id = ?",
    [user_id]
  );
  if (exists) return res.status(400).json({ message: "이미 팀 선택됨" });

  await db.execute(
    "INSERT INTO Myteam (user_id, kteam_id) VALUES (?, ?)",
    [user_id, kteam_id]
  );

  res.json({ success: true });
});

// 팀 상태 확인
router.get("/status", auth, async (req, res) => {
  const user_id = req.user.user_id;

  const [[row]] = await db.execute(
    "SELECT kteam_id FROM Myteam WHERE user_id = ?",
    [user_id]
  );

  res.json({
    selected: !!row,
    kteam_id: row?.kteam_id || null
  });
});

// 내 팀 조회
router.get("/mine", auth, async (req, res) => {
  const user_id = req.user.user_id;

  const [[team]] = await db.execute(
    `
    SELECT k.*
    FROM Myteam m
    JOIN Kteam k ON m.kteam_id = k.kteam_id
    WHERE m.user_id = ?
    `,
    [user_id]
  );

  if (!team) return res.status(404).json({ message: "팀 없음" });

  res.json(team);
});

module.exports = router;
