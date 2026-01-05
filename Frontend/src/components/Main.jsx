import "../styles/main.css";
import mainImg from "../images/main.png";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const nav = useNavigate();
  
  return (
    <div className="main">
        <div className="main-inner">

            <div className="main-left">
                <div className="title-box">
                  <h1>MY  K-LEAGUE</h1>
                
                  <p>K리그 입문자를 위한 취향에 맞는 나만의 팀 찾기</p>
                  <button 
                    className="main-btn"
                    onClick={() => nav("/type")}
                  >
                    시작하기 →
                  </button>
                </div>
            </div>

            <div className="main-right">
                <img src={mainImg} className="p1" />
            </div>

        </div>
    </div>
  );
}

