function recommendTeamBySurvey(answers) {
  const sum = answers.reduce((a, b) => a + b, 0);

  if (sum >= 70) return "울산 HD";
  if (sum >= 65) return "전북 현대";
  if (sum >= 60) return "포항 스틸러스";
  if (sum >= 55) return "FC 서울";
  if (sum >= 50) return "인천 유나이티드";
  if (sum >= 45) return "대구 FC";
  if (sum >= 40) return "제주 유나이티드";
  if (sum >= 35) return "대전 하나";
  if (sum >= 30) return "수원 FC";
  if (sum >= 25) return "강원 FC";
  if (sum >= 20) return "김천 상무";
  return "광주 FC";
}

module.exports = recommendTeamBySurvey;
