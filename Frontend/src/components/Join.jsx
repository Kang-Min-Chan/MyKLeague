import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE } from "../api";

function Join() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    user_id: "",
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkDuplicate = async (type) => {
    const value = form[type];

    if (!value) {
      alert("값을 입력해주세요.");
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/join/check?type=${type}&value=${encodeURIComponent(value)}`
      );
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert("중복 확인 중 오류 발생");
      console.error(err);
    }
  };

  const handleJoin = async () => {
    if (!form.user_id || !form.email || !form.password || !form.nickname) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (form.password !== form.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
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
    } catch (err) {
      alert("서버 오류");
      console.error(err);
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <h2 className="login-title">회원가입</h2>
        <p className="login-sub">MY K-LEAGUE에 오신 걸 환영합니다 ⚽</p>

        {/* 아이디 */}
        <div className="input-group">
          <input
            type="text"
            name="user_id"
            placeholder="아이디 입력"
            className="login-input"
            value={form.user_id}
            onChange={handleChange}
          />
          <button
            type="button"
            className="id-check-btn"
            onClick={() => checkDuplicate("user_id")}
          >
            중복확인
          </button>
        </div>

        {/* 닉네임 */}
        <div className="input-group">
          <input
            type="text"
            name="nickname"
            placeholder="닉네임 입력"
            className="login-input"
            value={form.nickname}
            onChange={handleChange}
          />
          <button
            type="button"
            className="nick-check-btn"
            onClick={() => checkDuplicate("nickname")}
          >
            중복확인
          </button>
        </div>

        {/* 이메일 */}
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="이메일 입력"
            className="login-input"
            value={form.email}
            onChange={handleChange}
          />
          <button
            type="button"
            className="email-check-btn"
            onClick={() => checkDuplicate("email")}
          >
            중복확인
          </button>
        </div>

        {/* 비밀번호 */}
        <input
          type="password"
          name="password"
          placeholder="비밀번호 입력"
          className="login-input"
          value={form.password}
          onChange={handleChange}
        />

        {/* 비밀번호 확인 */}
        <input
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          className="login-input"
          value={form.passwordConfirm}
          onChange={handleChange}
        />

        <button className="login-btn" onClick={handleJoin}>
          회원가입
        </button>

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
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Join;
