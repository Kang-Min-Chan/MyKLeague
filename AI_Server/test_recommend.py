import requests

url = "http://127.0.0.1:8000/recommend"

data = {
    "answers": {
        "pass_cnt": 50,
        "shot_cnt": 10,
        "def_cnt": 20,
        "forward_ratio": 0.6,
        "high_zone_ratio": 0.3
    }
}

response = requests.post(url, json=data)
print(response.json())

