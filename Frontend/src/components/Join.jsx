import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Join() {
  const nav = useNavigate();

  return (
    <div className="login">
      <div className="login-box">
        <h2 className="login-title">회원가입</h2>
        <p className="login-sub">MY K-LEAGUE에 오신 걸 환영합니다 ⚽</p>

        {/* 아이디 입력 + 중복확인 버튼 그룹 */}
        <div className="input-group">
          <input type="text" placeholder="아이디 입력" className="login-input" />
          <button type="button" className="id-check-btn">중복확인</button>
        </div>
        <div className="input-group">
          <input type="text" placeholder="닉네임 입력" className="login-input" />
          <button type="button" className="nick-check-btn">중복확인</button>
        </div>
        <input type="text" placeholder="이메일 입력" className="login-input" />
        <input type="password" placeholder="비밀번호 입력" className="login-input" />
        <input type="password" placeholder="비밀번호 확인" className="login-input" />
        

        <button className="login-btn">회원가입</button>

        <div className="login-bottom">
          <span>이미 계정이 있으신가요? </span>
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