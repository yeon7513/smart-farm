export const selectCrop = [
  {
    id: 'strbr',
    name: '딸기',
    value: 'S23',
  },
  {
    id: 'tmt',
    name: '토마토',
    value: '349',
  },
  {
    id: 'pprk',
    name: '파프리카',
    value: 'SP205',
  },
];

export const selectEnvironment = [
  {
    id: 'insolation',
    name: '누적일사량',
    values: [
      '1210이하',
      '1210~1430',
      '1430~1610',
      '1610~1790',
      '1790~1960',
      '1960~2130',
      '2130이상',
    ],
  },
  {
    id: 'humidity',
    name: '주간평균습도',
    values: [
      '52.10이하',
      '52.1~67.6',
      '67.6~71.4',
      '71.4~74.7',
      '74.7~78.2',
      '78.2~82.7',
      '82.7이상',
    ],
  },
  {
    id: 'residualCarbonDioxide',
    name: '주간평균잔존CO2',
    values: ['319이하', '319~371', '371~411', '411~448', '448~500', '500~571'],
  },
];

export const evnironmentFields = ['inCo2', 'inTp', 'inHd', 'acSlrdQy'];

export function formatData(data, fields) {
  const totals = {};

  fields.forEach((field) => {
    totals[field] = 0;
  });

  data.forEach((item) => {
    fields.forEach((field) => {
      totals[field] += item[field] || 0;
    });
  });

  const averages = {};
  const length = data.length || 1;

  fields.forEach((field) => {
    averages[field] = totals[field] / length;
  });

  return { totals, averages };
}
