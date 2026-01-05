import { useLocation, useNavigate } from "react-router-dom";
import "../styles/TypeResult.css";

export default function TypeResult() {
  const nav = useNavigate();
  const { state } = useLocation();

  // 임시 데이터 (백엔드 연결 전 테스트용)
  const result = state || {
    team: "울산 현대",
    slogan: "우승 DNA + 강력한 공격력 + 전통의 강호",
    info: {
      region: "울산광역시",
      stadium: "울산문수축구경기장",
      founded: "1983년",
      league: "K리그1",
      colors: "파랑, 주황",
    },
    points: ["빠른 전환", "측면 공격", "이번 시즌기"],
  };

  return (
    <div className="type-result">
      <h1 className="result-title">MY K-LEAGUE</h1>
      <p className="result-sub">
        만찬님의 축구 DNA와 가장 잘 맞는 팀은…
      </p>

      <div className="result-card">
        <div className="result-header">
          <div className="result-icon">⚡</div>
          <h2 className="result-team">{result.team}</h2>
          <p className="result-slogan">"{result.slogan}"</p>
        </div>

        <div className="result-content">
          <div className="result-box">
            <h3>팀 정보</h3>
            <ul>
              <li>연고지: {result.info.region}</li>
              <li>홈구장: {result.info.stadium}</li>
              <li>창단년도: {result.info.founded}</li>
              <li>리그: {result.info.league}</li>
              <li>팀 컬러: {result.info.colors}</li>
            </ul>
          </div>

          <div className="result-box">
            <h3>주목 포인트</h3>
            <ul>
              {result.points.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="result-actions">
          <button className="primary" onClick={() => alert("저장!")}>
            MY팀 저장하기
          </button>
          <button className="secondary" onClick={() => nav("/Type")}>
            팀 다시 고르기
          </button>
        </div>
      </div>
    </div>
  );
}
