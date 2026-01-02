import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE } from "../api";

function Join() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    user_id: "",
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleJoin = async () => {
    const res = await fetch(`${API_BASE}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "회원가입 실패");
      return;
    }

    alert("회원가입 성공!");
    nav("/login");
  };

  return (
    <div className="login">
      <div className="login-box">
        <h2 className="login-title">회원가입</h2>
        <p className="login-sub">MY K-LEAGUE에 오신 걸 환영합니다 ⚽</p>

        <div className="input-group">
          <input type="text" placeholder="아이디 입력" className="login-input" onChange={handleChange} />
          <button type="button" className="id-check-btn">중복확인</button>
        </div>
        <div className="input-group">
          <input type="text" placeholder="닉네임 입력" className="login-input" onChange={handleChange}/>
          <button type="button" className="nick-check-btn">중복확인</button>
        </div>
        <input type="text" placeholder="이메일 입력" className="login-input" onChange={handleChange}/>
        <input type="password" placeholder="비밀번호 입력" className="login-input" onChange={handleChange}/>
        <input type="password" placeholder="비밀번호 확인" className="login-input" onChange={handleChange}/>

        <button className="login-btn" onClick={handleJoin}>회원가입</button>

        <div className="login-bottom">
          <span>이미 계정이 있으신가요?</span>
          <button 
          className="join-btn" 
          onClick={() => nav("/login")}
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
            >로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Join;
