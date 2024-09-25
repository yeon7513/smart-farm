const pureNickName = [
  '꽃가람',
  '가온',
  '그린나래',
  '예그리나',
  '비나리',
  '늘솔길',
  '윤슬',
  '물비늘',
  '헤윰',
  '나린',
  '단미',
  '꼬두람이',
  '희나리',
  '물마',
  '라온',
  '안다미로',
  '나르샤',
  '노고지리',
  '너울',
  '별찌',
  '옛살비',
  '은가람',
  '늘해랑',
  '다소니',
  '산돌림',
  '마닐마닐',
  '새하마노',
];

export function changingNickName() {
  // 랜덤 인덱스 생성
  const randomIndex = Math.floor(Math.random() * pureNickName.length);
  // 랜덤 번호 (10000부터 99999까지) 생성
  const randomNumber = Math.floor(10000 + Math.random() * 90000);

  return `${pureNickName[randomIndex]}${randomNumber}`;
}
