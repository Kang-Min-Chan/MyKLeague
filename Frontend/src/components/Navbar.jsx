import { useState } from "react";
import "../styles/Navbar.css";
import logoImg from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import homeicon from "../icons/home.svg";
import communityicon from "../icons/community.svg";
import calendarincon from "../icons/calendar.svg";
import myicon from "../icons/my.svg";

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
            <li><button onClick={() => nav("/")} className="nav-btn">
              <img src={homeicon} alt="homeicon"
              style={{width:"25px", height:"25px", textAlign:"center"}} />홈</button></li>
            <li><button onClick={() => nav("/community")} className="nav-btn">
              <img src={communityicon} alt="communityicon"
              style={{width:"25px", height:"25px", textAlign:"center"}} />커뮤니티</button></li>
            <li><button onClick={() => nav("/team")} className="nav-btn">
              <img src={calendarincon} alt="calendaricon"
              style={{width:"25px", height:"25px", textAlign:"center"}} />캘린더</button></li>
            <li><button onClick={() => nav("/contact")} className="nav-btn">
              <img src={myicon} alt="myicon"
              style={{width:"25px", height:"25px", textAlign:"center"}} />MY팀</button></li>
            </ul>
        </div>
    </nav>
  );
}