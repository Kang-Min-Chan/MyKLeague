import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE } from "../api";

export default function TypeResult() {
  const { state } = useLocation();
  const nav = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>결과가 없습니다. 다시 시도해주세요.</p>
      </div>
    );
  }

  const { name, city, stadium, reason, kteam_id } = state;

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다.");
      nav("/login");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/typeresult/select`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ kteam_id })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "저장 실패");
        return;
      }

      alert("MY팀으로 저장되었습니다!");
      nav("/mypage"); // or 홈
    } catch (err) {
      console.error(err);
      alert("서버 오류");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl p-10 shadow-2xl">
        <h1 className="text-center text-4xl font-black tracking-wide mb-2">
          K MY K-LEAGUE
        </h1>
        <p className="text-center text-gray-600 mb-10">
          민찬님의 축구 DNA와 가장 잘 맞는 팀은…
        </p>

        <div className="flex flex-col items-center mb-8">
          <div className="text-6xl mb-4">⚡</div>
          <h2 className="text-3xl font-bold mb-2">{name}</h2>
          <p className="text-blue-600 font-semibold text-center">
            "{reason}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold mb-3">팀 정보</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>연고지: {city}</li>
              <li>홈구장: {stadium}</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold mb-3">주목 포인트</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>빠른 전환</li>
              <li>측면 공격</li>
              <li>강한 압박</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
          >
            MY팀 저장하기
          </button>
          <button
            onClick={() => nav("/type")}
            className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300"
          >
            팀 다시 고르기
          </button>
        </div>
      </div>
    </div>
  );
}
