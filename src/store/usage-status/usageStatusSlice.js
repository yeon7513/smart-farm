import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { usageStatusData } from '../../api/usageStatusData';

const initialState = {
  entireRegion: [],
  localRegion: [],
  isLoading: false,
  error: null,
};

const usageStatusSlice = createSlice({
  name: 'usageStatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 지역별 전체 이용 현황
      .addCase(fetchEntireRegion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEntireRegion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entireRegion = action.payload;
        state.error = null;
      })
      .addCase(fetchEntireRegion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 지역별 상세 이용 현황
      .addCase(fetchLocalRegion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLocalRegion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.localRegion = action.payload;
        state.error = null;
      })
      .addCase(fetchLocalRegion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// 작물 코드
const changeItemCode = (code) => {
  switch (code) {
    case '090300':
      return '가지';
    case '26E800':
      return '국화';
    case '230000':
      return '다육이';
    case '080400':
      return '딸기';
    case '080600':
      return '방울토마토';
    case '065900':
      return '블루베리';
    case '100500':
      return '상추';
    case '100800':
      return '시금치';
    case '090100':
      return '오이';
    case '080200':
      return '참외';
    case '080300':
      return '토마토';
    case '132600':
      return '파프리카';
    case '060300':
      return '포도';
    case '120500':
      return '풋고추';
    case '090200':
      return '호박';

    default:
      return '기타';
  }
};

// ========= 데이터 가공 함수 =========

// 전체 이용 현황 데이터 가공
const EntireDataProcessing = (data, sortation) => {
  const processData = data
    .map((data) =>
      sortation === 'local'
        ? data.addressName.split(' ')[0]
        : changeItemCode(data.itemCode)
    )
    .reduce((acc, name) => {
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

  const resultData = Object.entries(processData).map(([name, value]) => ({
    name,
    value,
  }));

  return resultData;
};

// 상세 이용 현황 데이터 가공
const localDataProcessing = (data, sortation) => {
  const result = {};

  data.forEach((item) => {
    const local = item.addressName.split(' ')[0];
    const city = item.addressName.split(' ')[1];
    const cropName = changeItemCode(item.itemCode);

    if (sortation === 'local') {
      if (!result[local]) {
        result[local] = {
          local: local,
          data: [{ name: city, value: 1 }],
        };
      } else {
        const dataIdx = result[local].data.findIndex(
          (data) => data.name === city
        );

        if (dataIdx > -1) {
          result[local].data[dataIdx].value += 1;
        } else {
          result[local].data.push({ name: city, value: 1 });
        }
      }
    }

    if (sortation === 'crop') {
      if (!result[local]) {
        result[local] = {
          local: local,
          data: [
            {
              name: city,
              crops: [{ item: cropName, value: 1 }],
            },
          ],
        };
      } else {
        const cityIdx = result[local].data.findIndex(
          (cityData) => cityData.name === city
        );

        if (cityIdx > -1) {
          const cropIdx = result[local].data[cityIdx].crops.findIndex(
            (crop) => crop.item === cropName
          );

          if (cropIdx > -1) {
            result[local].data[cityIdx].crops[cropIdx].value += 1;
          } else {
            result[local].data[cityIdx].crops.push({
              item: cropName,
              value: 1,
            });
          }
        } else {
          result[local].data.push({
            name: city,
            crops: [{ item: cropName, value: 1 }],
          });
        }
      }
    }
  });

  return Object.values(result);
};

// ========= fetch 함수 =========

// 전체 이용 현황
export const fetchEntireRegion = createAsyncThunk(
  'usageStatus/fetchEntireRegionFarm',
  async (sortation) => {
    try {
      const data = await usageStatusData();

      const result = EntireDataProcessing(data, sortation);

      return result;
    } catch (error) {
      return error;
    }
  }
);

// 상세 이용 현황
export const fetchLocalRegion = createAsyncThunk(
  'usageStatus/localRegionFarm',
  async (sortation) => {
    try {
      const data = await usageStatusData();

      const result = localDataProcessing(data, sortation);

      return result;
    } catch (error) {
      return error;
    }
  }
);

export default usageStatusSlice.reducer;
