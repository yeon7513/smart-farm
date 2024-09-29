// 검색용 로직
export const searchingData = (data, field, keyword) => {
  if (!keyword) return data;

  const lowerCasedKeyword = keyword.toLowerCase();

  return data.filter((item) =>
    item[field].toLowerCase().includes(lowerCasedKeyword)
  );
};
