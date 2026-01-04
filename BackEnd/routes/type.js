const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * 15문항 순서 (고정)
 * 1 패스 중심
 * 2 공격적
 * 3 수비 안정
 * 4 빠른 전개
 * 5 전방 압박
 * 6 전통 강호
 * 7 성장 스토리
 * 8 외국인 스타
 * 9 젊은 선수
 * 10 팬 열정
 * 11 홈 분위기
 * 12 지역 연고
 * 13 언더독
 * 14 골 장면
 * 15 역사 전통
 */

const teamProfiles = {
  "울산 HD":        [4,5,3,3,4,5,2,4,3,4,4,2,1,4,5],
  "전북 현대":     [3,4,4,2,4,5,1,4,3,5,5,3,1,4,5],
  "포항 스틸러스": [5,4,4,3,4,4,2,3,4,4,4,2,2,4,4],
  "FC 서울":       [4,4,3,3,3,4,2,4,3,4,5,5,1,4,5],
  "수원 FC":       [3,3,3,3,3,2,3,2,4,3,3,4,3,3,2],
  "대구 FC":       [3,3,4,2,3,3,2,2,3,5,4,3,2,3,3],
  "인천 유나이티드":[2,3,4,3,4,2,2,2,3,4,4,5,3,3,3],
  "광주 FC":       [3,3,2,4,3,1,5,2,5,3,3,2,5,3,2],
  "강원 FC":       [2,3,3,4,2,1,4,2,4,3,3,2,5,3,2],
  "제주 유나이티드":[3,3,4,3,2,3,2,2,3,3,3,5,2,3,3],
  "김천 상무":     [3,3,5,3,4,1,1,1,5,2,2,2,4,2,1],
  "대전 하나":     [4,4,2,4,3,2,4,3,4,3,3,3,4,4,2]
};

function distance(a, b) {
  return a.reduce((sum, v, i) => sum + Math.abs(v - b[i]), 0);
}

router.post("/survey", async (req, res) => {
  let { answers } = req.body;

  if (!Array.isArray(answers)) {
    return res.status(400).json({ message: "answers 배열 필요" });
  }
  if (answers.length !== 15) {
    return res.status(400).json({ message: "15개 문항 필요" });
  }

  // 방어 처리: 1~5 아니면 3으로 대체
  const safeAnswers = answers.map(v => {
    const n = Number(v);
    if (!n || n < 1 || n > 5) return 3;
    return n;
  });

  let bestName = null;
  let minDist = Infinity;

  for (const [name, profile] of Object.entries(teamProfiles)) {
    const d = distance(safeAnswers, profile);
    if (d < minDist) {
      minDist = d;
      bestName = name;
    }
  }

  try {
    const [[team]] = await db.execute(
      "SELECT * FROM Kteam WHERE name = ?",
      [bestName]
    );

    res.json({
      kteam_id: team.kteam_id,
      name: team.name,
      city: team.city,
      stadium: team.stadium,
      reason: "설문 응답과 팀 성향이 가장 유사하여 추천"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "추천 실패" });
  }
});

module.exports = router;
