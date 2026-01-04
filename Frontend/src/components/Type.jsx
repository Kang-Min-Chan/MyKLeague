import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api";

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

    const orderedAnswers = questions.map(q => answers[q.id]);

    const res = await fetch(`${API_BASE}/TypeResult`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: orderedAnswers })
    });
    
    const data = await res.json();

    nav("/TypeResult", { state: data });
  };

  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl p-8 shadow-xl">
        <h1 className="text-center text-4xl font-black italic mb-4">K MY K-LEAGUE</h1>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>진행률</span>
            <span>{answeredCount}/{questions.length}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {questions.map(q => (
            <div key={q.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span>{q.id}. {q.text}</span>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleSelect(q.id, v)}
                    className={`w-9 h-9 rounded-lg border ${
                      answers[q.id] === v
                        ? "bg-blue-600 text-white border-blue-600 scale-110"
                        : "border-gray-300 hover:bg-blue-50"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-4">
            <button
              disabled={answeredCount !== questions.length}
              className={`px-8 py-3 rounded-lg ${
                answeredCount !== questions.length
                  ? "bg-gray-300 text-gray-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              입력완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
