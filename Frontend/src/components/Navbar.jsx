import { useState, useEffect } from "react";
import "../styles/Navbar.css";
import logoImg from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import homeicon from "../icons/home.svg";
import communityicon from "../icons/community.svg";
import calendarincon from "../icons/calendar.svg";
import myicon from "../icons/my.svg";
import { API_BASE } from "../api";

export default function Navbar() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  // 로그인 정보 불러오기
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setUser(data);
      });
  }, []);

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    nav("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* 로고 */}
        <div className="logo">
          <button
            onClick={() => nav("/")}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <img src={logoImg} alt="logo" />
          </button>
        </div>

        {/* 메뉴 */}
        <ul className="nav-links">
          <li>
            <button onClick={() => nav("/")} className="nav-btn">
              <img src={homeicon} alt="homeicon" style={{width:"25px", height:"25px", textAlign:"center"}} />홈
            </button>
          </li>
          <li>
            <button onClick={() => nav("/community")} className="nav-btn">
              <img src={communityicon} alt="communityicon" style={{width:"25px", height:"25px", textAlign:"center"}} />커뮤니티
            </button>
          </li>
          <li>
            <button onClick={() => nav("/team")} className="nav-btn">
              <img src={calendarincon} alt="calendaricon" style={{width:"25px", height:"25px", textAlign:"center"}} />캘린더
            </button>
          </li>
          <li>
            <button onClick={() => nav("/Myinfo")} className="nav-btn">
              <img src={myicon} alt="myicon" style={{width:"25px", height:"25px", textAlign:"center"}} />MY팀
            </button>
          </li>
        </ul>

        {/* 로그인 영역 (오른쪽) */}
        <div className="nav-user">
          {user ? (
            <button className="user-btn" onClick={handleLogout}>
              {user.user_id}님 (로그아웃)
            </button>
          ) : (
            <button className="user-btn" onClick={() => nav("/login")}>
              로그인
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
