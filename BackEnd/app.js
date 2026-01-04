require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 회원가입 API
const joinRoutes = require("./routes/join");
app.use("/join", joinRoutes);

// 로그인 API
const loginRoutes = require("./routes/login");
app.use("/login", loginRoutes);

// 취향선택 API
const typeRoutes = require("./routes/type");
app.use("/type", typeRoutes);

// 팀 결과 API
const typeresultRoutes = require("./routes/typeresult");
app.use("/typeresult", typeresultRoutes);

app.listen(3000, () => {
  console.log("🔥 Server running at http://localhost:3000");
});
