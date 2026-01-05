import os
from openai import OpenAI
import google.generativeai as genai

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini = genai.GenerativeModel("gemini-pro")

def call_gpt(prompt):
    res = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": "너는 축구 전술 분석 전문가다."},
            {"role": "user", "content": prompt}
        ]
    )
    return res.choices[0].message.content

def call_gemini(prompt):
    return gemini.generate_content(prompt).text
