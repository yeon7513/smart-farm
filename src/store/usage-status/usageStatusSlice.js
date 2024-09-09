import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { usageStatusData } from '../../api/usageStatusData';

const initialState = {
  entireRegionFarm: [],
  localRegionFarm: [],
  entireRegionCrop: [],
  localRegionCrop: [],
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
      .addCase(fetchEntireRegionFarm.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEntireRegionFarm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entireRegionFarm = action.payload;
        state.error = null;
      })
      .addCase(fetchEntireRegionFarm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 지역별 상세 이용 현황
      .addCase(fetchLocalRegionFarm.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLocalRegionFarm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.localRegionFarm = action.payload;
        state.error = null;
      })
      .addCase(fetchLocalRegionFarm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 작물별 전체 이용 현황
      .addCase(fetchEntireRegionCrop.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEntireRegionCrop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entireRegionCrop = action.payload;
        state.error = null;
      })
      .addCase(fetchEntireRegionCrop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 작물별 상세 이용 현황
      .addCase(fetchLocalRegionCrop.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLocalRegionCrop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.localRegionCrop = action.payload;
        state.error = null;
      })
      .addCase(fetchLocalRegionCrop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// 지역별 전체 이용 현황
export const fetchEntireRegionFarm = createAsyncThunk(
  'usageStatus/fetchEntireRegionFarm',
  async () => {
    try {
      const data = await usageStatusData();
      const addr = data.map((data) => data.addressName);
      const locals = addr
        .map((addr) => addr.split(' ')[0])
        .reduce((acc, name) => {
          acc[name] = (acc[name] || 0) + 1;
          return acc;
        }, {});

      const result = Object.entries(locals).map(([name, value]) => ({
        name,
        value,
      }));

      return result;
    } catch (error) {
      return error;
    }
  }
);

// 지역별 상세 이용 현황
export const fetchLocalRegionFarm = createAsyncThunk(
  'usageStatus/localRegionFarm',
  async () => {
    try {
      const data = await usageStatusData();
      const locals = data
        .map((data) => data.addressName)
        .map((addr) => addr.split(' '));

      const result = locals.reduce((acc, [province, city]) => {
        let provinceObj = acc.find((item) => item[province]);

        if (!provinceObj) {
          provinceObj = { [province]: [{ name: city, value: 1 }] };
          acc.push(provinceObj);
        } else {
          const cityObj = provinceObj[province].find(
            (item) => item.name === city
          );

          if (cityObj) {
            cityObj.value += 1;
          } else {
            provinceObj[province].push({ name: city, value: 1 });
          }
        }
        return acc;
      }, []);

      if (result.length === 1) {
        const [province, cities] = Object.entries(result[0])[0];
        result[0] = {
          [province]: cities.map((city) => ({
            name: city.name,
            value: city.value,
          })),
        };
      }

      return result;
    } catch (error) {
      return error;
    }
  }
);

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

// 작물별 전체 이용 현황
export const fetchEntireRegionCrop = createAsyncThunk(
  'usageStatus/entireRegionCrop',
  async () => {
    const data = await usageStatusData();

    try {
    } catch (error) {}
  }
);

// 작물별 상세 이용 현황
export const fetchLocalRegionCrop = createAsyncThunk(
  'usageStatus/localRegionCrop',
  async () => {
    try {
    } catch (error) {}
  }
);

export default usageStatusSlice.reducer;
