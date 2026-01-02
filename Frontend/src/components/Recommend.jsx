import "../styles/Recommend.css";
import { useState } from "react";

function Recommend() {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) {
      alert("내용을 입력해주세요!");
      return;
    }
    console.log("입력값:", text);
    // 👉 여기에서 API 요청 or 페이지 이동 넣으면 됨
  };

  return (
    <div className="recommend">
      <div className="recommend-box">

        <h1 className="recommend-title">MY K-LEAGUE</h1>
        
        <div className="recommend-text">
          <strong>나에 취향에 맞게 입력해주세요.</strong>
          <p>AI가 입력한 내용에 맞게 팀을 추천해줄거에요 !</p>
        </div>

        <textarea
          className="recommend-input"
          placeholder="예: 성장형 팀 선호, 진출 축구 선호, 열정적인 분위기를 좋아함"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="recommend-btn" onClick={handleSubmit}>
          입력완료
        </button>

      </div>
    </div>
  );
}

export default Recommend;
