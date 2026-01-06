import { useState } from "react";
import "../styles/MyInfo.css";

export default function MyInfo() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="myinfo">
      {/* 상단 팀 영역 */}
      <div className="myinfo-header">
        <div className="team-info">
          <span className="team-icon">🔥</span>
          <div>
            <h2>광주 FC</h2>
            <p>665님</p>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="myinfo-tabs">
        <button
          className={activeTab === "team" ? "tab active" : "tab"}
          onClick={() => setActiveTab("team")}
        >
          팀 정보
        </button>
        <button
          className={activeTab === "store" ? "tab active" : "tab"}
          onClick={() => setActiveTab("store")}
        >
          팀 스토어
        </button>
        <button
          className={activeTab === "profile" ? "tab active" : "tab"}
          onClick={() => setActiveTab("profile")}
        >
          프로필
        </button>
      </div>

      {/* 콘텐츠 */}
      <div className="myinfo-content">
        {activeTab === "profile" && (
          <div className="profile-box">
            <h3>프로필 재설정</h3>

            <div className="profile-item">
              <label>아이디</label>
              <input type="text" placeholder="아이디 변경" />
            </div>

            <div className="profile-item">
              <label>닉네임</label>
              <input type="text" placeholder="닉네임 변경" />
            </div>

            <div className="profile-item">
              <label>비밀번호</label>
              <input type="password" placeholder="비밀번호 변경" />
            </div>

            <div className="profile-actions">
              <button className="save-btn">정보 수정</button>
              <button className="team-btn">팀 다시 선택</button>
              <button className="delete-btn">회원 탈퇴</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
