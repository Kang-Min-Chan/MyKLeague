const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");

router.get("/team/:name", verifyToken, async (req, res) => {
  const { name } = req.params;

  const [teams] = await db.execute(
    "SELECT * FROM Kteam WHERE name = ?",
    [name]
  );

  if (teams.length === 0) {
    return res.status(404).json({ message: "팀 없음" });
  }

  const [players] = await db.execute(
    "SELECT player_name, position FROM Kplayer WHERE team_name = ?",
    [name]
  );

  res.json({
    team: teams[0],
    players
  });
});

module.exports = router;
