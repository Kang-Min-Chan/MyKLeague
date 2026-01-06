import { useState } from "react";
import "../styles/MyInfo.css";
import { API_BASE } from "../api";

export default function MyInfo() {
  const [activeTab, setActiveTab] = useState("profile");

  const [form, setForm] = useState({
    user_id: "",
    nickname: "",
    password: ""
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

  return (
    <div className="myinfo-page">
      <div className="myinfo">
        {/* 상단 */}
        <div className="myinfo-header">
          <div className="team-info">
            <span className="team-icon">🔥</span>
            <div>
              <h2>광주 FC</h2>
              <p>665님</p>
            </div>
          </div>
        </div>

        {/* 탭 */}
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

        {/* 프로필 */}
        <div className="myinfo-content">
          {activeTab === "profile" && (
            <div className="profile-box">
              <h3>프로필 재설정</h3>

              {/* 아이디 */}
              <div className="profile-item">
                <label>아이디</label>
                <div className="input-row">
                  <input
                    type="text"
                    name="user_id"
                    placeholder="아이디 변경"
                    value={form.user_id}
                    onChange={handleChange}
                  />
                  <button
                    className="check-btn"
                    onClick={() => checkDuplicate("user_id")}
                  >
                    중복확인
                  </button>
                </div>
              </div>

              {/* 닉네임 */}
              <div className="profile-item">
                <label>닉네임</label>
                <div className="input-row">
                  <input
                    type="text"
                    name="nickname"
                    placeholder="닉네임 변경"
                    value={form.nickname}
                    onChange={handleChange}
                  />
                  <button
                    className="check-btn"
                    onClick={() => checkDuplicate("nickname")}
                  >
                    중복확인
                  </button>
                </div>
              </div>

              {/* 비밀번호 */}
              <div className="profile-item">
                <label>비밀번호</label>
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호 변경"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              {/* 버튼 */}
              <div className="profile-actions">
                <button className="save-btn">정보 수정</button>
                <button className="team-btn">팀 다시 선택</button>
                <button className="delete-btn">회원 탈퇴</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
