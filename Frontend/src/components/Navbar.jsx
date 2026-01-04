import { useState } from "react";
import "../styles/Navbar.css";
import logoImg from "../images/logo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();

  return (
    <nav className="navbar">
        <div className="nav-inner">
            <div className="logo">
                <button 
                  onClick={() => nav("/")} 
                  style={{ background:"none", border:"none", padding:0, cursor:"pointer" }}
                >
                  <img src={logoImg} alt="logo" />
                </button>
            </div>

            <ul className="nav-links">
            <li><button onClick={() => nav("/")} className="nav-btn">홈</button></li>
            <li><button onClick={() => nav("/recommend")} className="nav-btn">커뮤니티</button></li>
            <li><button onClick={() => nav("/team")} className="nav-btn">캘린더</button></li>
            <li><button onClick={() => nav("/contact")} className="nav-btn">MY팀</button></li>
            </ul>
        </div>
    </nav>
  );
}