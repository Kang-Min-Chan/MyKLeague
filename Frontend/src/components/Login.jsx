import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE } from "../api";

function Login() {
  const nav = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, password })
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "로그인 실패");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    nav("/home");
  };

  return (
    <div className="login">
      <div className="login-box">
        <h2 className="login-title">로그인</h2>
        <p className="login-sub">MY K-LEAGUE에 오신 걸 환영합니다 ⚽</p>

        <input
          type="text"
          placeholder="아이디 입력"
          className="login-input"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 입력"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>로그인</button>

        <div className="login-bottom">
          <span>계정이 없으신가요?</span>
          <button 
          className="join-btn" 
          onClick={() => nav("/join")}
          style={{
              background: "none",
              border: "none",
              color: "#0072ff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              padding: 0,
              marginLeft: "5px"
            }}
            >회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
