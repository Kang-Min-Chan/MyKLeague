// 환경변수(.env) 로드
require("dotenv").config();

// Express 서버 및 미들웨어 관련 모듈
const express = require("express");
const cors = require("cors");

// Express 앱 생성
const app = express();

// CORS 허용 (프론트엔드에서 API 호출 가능하게)
app.use(cors());

// JSON 형태의 요청 body 파싱
app.use(express.json());

/* =========================
   회원 관련 API
========================= */

// 회원가입 API
// POST /join
const joinRoutes = require("./routes/join");
app.use("/join", joinRoutes);

// 로그인 API (JWT 토큰 발급)
// POST /login
const loginRoutes = require("./routes/login");
app.use("/login", loginRoutes);

/* =========================
   설문 / 추천 관련 API
========================= */

// 취향 설문 API
// POST /type/survey
const typeRoutes = require("./routes/type");
app.use("/type", typeRoutes);

// 팀 + 선수 조회 API
// GET /select/team/:name
const selectRoutes = require("./routes/select");
app.use("/select", selectRoutes);

/* =========================
   서버 실행
========================= */

// 서버 포트 3000에서 실행
app.listen(3000, () => {
  console.log("🔥 Server running at http://localhost:3000");
});
