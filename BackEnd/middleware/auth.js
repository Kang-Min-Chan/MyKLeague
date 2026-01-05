const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "토큰 없음" });
  }

  const token = auth.split(" ")[1];

  try {
    // 🔥 여기 중요
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { user_id }
    next();
  } catch (err) {
    console.error("JWT 검증 실패:", err);
    return res.status(401).json({ message: "토큰 유효하지 않음" });
  }
}

module.exports = verifyToken;
