import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();

  return (
    <div className="login">
      <div className="login-box">

        <h2 className="login-title">로그인</h2>
        <p className="login-sub">MY K-LEAGUE에 오신 걸 환영합니다 ⚽</p>

        <input type="text" placeholder="아이디 입력" className="login-input" />
        <input type="password" placeholder="비밀번호 입력" className="login-input" />

        <button className="login-btn">로그인</button>

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
          >
            회원가입
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;
