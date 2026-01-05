import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from llm import call_gpt

with open("ai/input.json", "r", encoding="utf-8") as f:
    payload = json.load(f)

prompt = f"""
사용자 취향: {payload['preference']}
팀 데이터: {payload['teams']}

이 사용자에게 가장 잘 맞는 팀과 이유를 설명해줘.
"""

result = call_gpt(prompt)

print(json.dumps({"result": result}, ensure_ascii=False))
