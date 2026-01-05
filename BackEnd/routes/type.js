const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");
const recommendTeamBySurvey = require("./ai"); // 또는 ../utils/recommend

/**
 * 설문 제출 + 팀 추천 API
 * POST /type/survey
 * Authorization: Bearer <token>
 */
router.post("/survey", verifyToken, async (req, res) => {
  const { answers } = req.body;

  // 1️⃣ 유효성 검사
  if (!Array.isArray(answers) || answers.length !== 15) {
    return res.status(400).json({ message: "15개 문항 필요" });
  }

  // 2️⃣ 방어 처리 (1~5 범위)
  const safeAnswers = answers.map(v => {
    const n = Number(v);
    return n >= 1 && n <= 5 ? n : 3;
  });

  // 3️⃣ 설문 기반 팀 추천 (임의 로직, 추후 AI 교체)
  const teamName = recommendTeamBySurvey(safeAnswers);

  try {
    // 4️⃣ 팀 정보 조회
    const [[team]] = await db.execute(
      "SELECT * FROM Kteam WHERE name = ?",
      [teamName]
    );

    if (!team) {
      return res.status(404).json({ message: "팀 정보 없음" });
    }

    // 5️⃣ 대표 선수 3명 조회
    const [players] = await db.execute(
      `SELECT player_name, position
       FROM Kplayer
       WHERE team_name = ?
       ORDER BY RAND()
       LIMIT 3`,
      [teamName]
    );

    // 6️⃣ 응답
    res.json({
      user_id: req.user.user_id,
      team,
      players,
      reason: "설문 점수 구간 기반 임의 추천"
    });

  } catch (err) {
    console.error("설문 추천 오류:", err);
    res.status(500).json({ message: "추천 실패" });
  }
});

module.exports = router;
