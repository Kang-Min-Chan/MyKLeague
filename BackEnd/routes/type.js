const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");
const recommendTeamBySurvey = require("./ai");

/**
 * 설문 제출 + 팀 추천
 * POST /type/survey
 */
router.post("/survey", verifyToken, async (req, res) => {
  const { answers } = req.body;

  // 1️⃣ 유효성 검사
  if (!Array.isArray(answers) || answers.length !== 15) {
    return res.status(400).json({ message: "15개 문항 필요" });
  }

  // 2️⃣ 설문 값 보정
  const safeAnswers = answers.map(v => {
    const n = Number(v);
    return n >= 1 && n <= 5 ? n : 3;
  });

  // 3️⃣ 팀 추천
  const teamName = recommendTeamBySurvey(safeAnswers);

  try {
    // 4️⃣ 설문 결과 저장
    await db.execute(
      "INSERT INTO survey_result (user_id, answers, recommended_team) VALUES (?, ?, ?)",
      [req.user.user_id, JSON.stringify(safeAnswers), teamName]
    );

    // 5️⃣ 팀 정보 조회
    const [[team]] = await db.execute(
      "SELECT * FROM Kteam WHERE name = ?",
      [teamName]
    );

    // 6️⃣ 대표 선수 3명
    const [players] = await db.execute(
      `SELECT player_name, position
       FROM Kplayer
       WHERE team_name = ?
       ORDER BY RAND()
       LIMIT 3`,
      [teamName]
    );

    // 7️⃣ 응답
    res.json({
      user_id: req.user.user_id,
      team,
      players,
      reason: "설문 점수 기반 추천"
    });

  } catch (err) {
    console.error("설문 저장/추천 오류:", err);
    res.status(500).json({ message: "설문 처리 실패" });
  }
});

module.exports = router;
