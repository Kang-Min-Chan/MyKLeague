import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api";
import "../styles/Type.css";

const questions = [
  { id: 1, text: "패스 위주의 경기 좋아하나요?" },
  { id: 2, text: "공격적인 유형 많은 팀 좋아하나요?" },
  { id: 3, text: "수비가 안정적인 팀 선호하나요?" },
  { id: 4, text: "빠른 전개(역습) 좋아하나요?" },
  { id: 5, text: "상대 진영에서 많이 압박하는 팀 좋아하나요?" },
  { id: 6, text: "우승 경험이 많은 전통 강호를 선호하나요?" },
  { id: 7, text: "성장형 팀의 스토리를 좋아하나요?" },
  { id: 8, text: "유명 외국인 선수가 있는 팀을 선호하나요?" },
  { id: 9, text: "젊은 선수들이 활약하는 팀을 좋아하나요?" },
  { id: 10, text: "열정적인 팬 문화를 중요하게 생각하나요?" },
  { id: 11, text: "홈 경기장 분위기가 중요한가요?" },
  { id: 12, text: "지역 연고가 중요하나요?" },
  { id: 13, text: "언더독의 반란 스토리를 좋아하나요?" },
  { id: 14, text: "화려한 골 장면을 중요시하나요?" },
  { id: 15, text: "팀의 역사와 전통을 중요하게 생각하나요?" }
];

export default function Type() {
  const nav = useNavigate();
  const [answers, setAnswers] = useState({});
  const answeredCount = Object.keys(answers).length;

  const handleSelect = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (answeredCount !== questions.length) {
      alert("모든 문항을 선택해주세요.");
      return;
    }

    // 🔹 순서 보장된 answers 배열
    const orderedAnswers = questions.map(q => answers[q.id]);

    // 🔥 추가 1: JWT 토큰 가져오기
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      nav("/login");
      return;
    }

    // 🔥 추가 2: 올바른 백엔드 API로 전송
    const res = await fetch(`${API_BASE}/type/survey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // 🔥 핵심
      },
      body: JSON.stringify({ answers: orderedAnswers })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "설문 처리 실패");
      return;
    }

    // 🔹 결과 페이지로 이동
    nav("/TypeResult", { state: data });
  };

  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="type">
      {/* 상단 진행률 */}
      <div className="progress-fixed">
        <div className="progress-inner">
          <div className="progress-info">
            <span>진행률</span>
            <span>{answeredCount}/{questions.length}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* 질문 영역 */}
      <div className="type-box">
        <h1 className="type-title">MY K-LEAGUE</h1>
        <p style={{textAlign:'right'}}>팀 매칭을 위한 초기 설문을 진행합니다.<br />
        <button className="answer-btn">1</button> - 매우 부정적 | <button className="answer-btn">5</button> - 매우 긍정적</p>

        <form onSubmit={handleSubmit} className="question-list">
          {questions.map(q => (
            <div key={q.id} className="question-item">
              <span>{q.id}. {q.text}</span>

              <div className="answer-buttons">
                {[1,2,3,4,5].map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleSelect(q.id, v)}
                    className={`answer-btn ${answers[q.id] === v ? "active" : ""}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="submit-area">
            <button
              disabled={answeredCount !== questions.length}
              className={`submit-btn ${answeredCount !== questions.length ? "disabled" : ""}`}
            >
              입력완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
