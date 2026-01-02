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
            <li><a href="#">홈</a></li>
            <li><a href="#">매칭</a></li>
            <li><a href="#">팀 소개</a></li>
            <li><a href="#">문의</a></li>
            </ul>
        </div>
    </nav>
  );
}