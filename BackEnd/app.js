require("dotenv").config();
const express = require("express");
const cors = require("cors");

const joinRoutes = require("./routes/join");
const loginRoutes = require("./routes/login");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/join", joinRoutes);
app.use("/login", loginRoutes);

app.listen(3000, () => {
  console.log("🔥 Server running at http://localhost:3000");
});
