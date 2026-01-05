const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const db = require("../db");

/**
 * 로그인 유저 정보 조회
 * GET /auth/me
 */
router.get("/me", verifyToken, async (req, res) => {
  const [[user]] = await db.execute(
    "SELECT user_id FROM Users WHERE user_id = ?",
    [req.user.user_id]
  );

  res.json({
    user_id: user.user_id
  });
});

module.exports = router;
