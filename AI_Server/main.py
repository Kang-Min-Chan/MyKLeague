from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# -----------------------------
# FastAPI 앱 생성
# -----------------------------
app = FastAPI(title="K-League 텍스트 기반 팀 추천 서버", version="2.0")

# -----------------------------
# K리그 팀 데이터 (CSV 기반)
# [pass, shot, def, forward_ratio, high_zone_ratio]
# -----------------------------
TEAM_DATA = {
    "FC서울": [15869, 346, 2899, 0.3803, 0.2537],
    "강원FC": [14825, 371, 2745, 0.3808, 0.2522],
    "광주FC": [15525, 367, 2759, 0.4208, 0.2719],
    "김천 상무": [14430, 429, 2945, 0.4060, 0.2759],
    "대구FC": [12595, 393, 3126, 0.3911, 0.2703],
    "대전 하나 시티즌": [13772, 278, 3147, 0.4062, 0.2712],
    "수원FC": [15240, 403, 2908, 0.3913, 0.2570],
    "울산 HD FC": [17272, 374, 2679, 0.3935, 0.2594],
    "인천 유나이티드": [15096, 329, 2954, 0.3783, 0.2411],
    "전북 현대 모터스": [14663, 335, 2845, 0.4051, 0.2701],
    "제주SK FC": [13529, 403, 3276, 0.3933, 0.2657],
    "포항 스틸러스": [15766, 353, 2660, 0.4033, 0.2640]
}

TEAM_NAMES = list(TEAM_DATA.keys())
TEAM_VECTORS = np.array(list(TEAM_DATA.values()))

# -----------------------------
# 스케일링 (팀 데이터 기준)
# -----------------------------
scaler = MinMaxScaler()
TEAM_VECTORS_SCALED = scaler.fit_transform(TEAM_VECTORS)

# -----------------------------
# 입력 모델
# -----------------------------
class TextInput(BaseModel):
    text: str

# -----------------------------
# 텍스트 → 벡터 변환 (룰 기반)
# -----------------------------
def text_to_vector(text: str):
    text = text.lower()

    pass_cnt = 15000
    shot_cnt = 350
    def_cnt = 2900
    forward_ratio = 0.39
    high_zone_ratio = 0.26

    if "공격" in text or "골" in text:
        shot_cnt += 80
        high_zone_ratio += 0.03

    if "수비" in text or "안정" in text:
        def_cnt += 250

    if "패스" in text or "점유" in text:
        pass_cnt += 2000

    if "역습" in text or "빠른" in text:
        forward_ratio += 0.04

    if "전방" in text or "압박" in text:
        high_zone_ratio += 0.03

    return np.array([[pass_cnt, shot_cnt, def_cnt, forward_ratio, high_zone_ratio]])

# -----------------------------
# 팀 추천 로직
# -----------------------------
def recommend_team(user_vector_scaled):
    similarities = cosine_similarity(user_vector_scaled, TEAM_VECTORS_SCALED)[0]
    best_index = np.argmax(similarities)
    return TEAM_NAMES[best_index], similarities[best_index]

# -----------------------------
# 추천 이유 문장 생성 (LLM 스타일)
# -----------------------------
def generate_reason(team, text):
    return (
        f"입력하신 문장에서 나타난 축구 성향을 분석한 결과, "
        f"{team}는 해당 성향과 가장 유사한 경기 스타일을 가진 팀입니다. "
        f"특히 '{text}'에서 드러난 전술적 키워드가 "
        f"{team}의 실제 경기 데이터와 높은 일치도를 보였습니다."
    )

# -----------------------------
# API 엔드포인트
# -----------------------------
@app.post("/recommend")
def recommend(data: TextInput):
    try:
        user_vector = text_to_vector(data.text)
        user_scaled = scaler.transform(user_vector)

        team, score = recommend_team(user_scaled)
        reason = generate_reason(team, data.text)

        return {
            "recommended_team": team,
            "similarity_score": round(float(score), 3),
            "reason": reason
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
