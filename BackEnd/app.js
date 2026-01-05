require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 회원
app.use("/join", require("./routes/join"));
app.use("/login", require("./routes/login"));

// 설문 / 추천
app.use("/type", require("./routes/type"));

// 팀 조회
app.use("/select", require("./routes/select"));

// 커뮤니티
app.use("/community", require("./routes/community"));

// 로그인 유저 정보 API
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("🔥 Server running at http://localhost:3000");
});
