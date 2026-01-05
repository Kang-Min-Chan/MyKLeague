from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import os

# -----------------------------
# 서버 객체 생성
# -----------------------------
app = FastAPI(title="K-League AI 추천 서버", version="1.0")

# -----------------------------
# 모델 경로
# -----------------------------
MODELS_DIR = "models"
SCALER_PATH = os.path.join(MODELS_DIR, "scaler.pkl")
KMEANS_PATH = os.path.join(MODELS_DIR, "kmeans.pkl")

# -----------------------------
# 모델 확인
# -----------------------------
if not os.path.exists(SCALER_PATH) or not os.path.exists(KMEANS_PATH):
    raise FileNotFoundError("scaler.pkl 또는 kmeans.pkl 파일이 models 폴더에 없습니다!")

# -----------------------------
# 모델 불러오기
# -----------------------------
scaler = joblib.load(SCALER_PATH)
kmeans = joblib.load(KMEANS_PATH)

# -----------------------------
# 설문 결과 POST API
# -----------------------------
class SurveyInput(BaseModel):
    answers: dict

@app.post("/recommend")
def recommend_team(data: SurveyInput):
    try:
        user_input = [list(data.answers.values())]
        user_scaled = scaler.transform(user_input)
        cluster = kmeans.predict(user_scaled)[0]
        return {
            "status": "success",
            "received_answers": data.answers,
            "recommended_cluster": int(cluster)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
