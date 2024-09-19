import axios from 'axios';

const apiKey = process.env.REACT_APP_BEST_FARM_API_KEY;

export const bestFarmInfo = async (type, query) => {
  const URL = `/bestfarm/${type}?serviceKey=${apiKey}&${query}&returnType=json`;

  try {
    const response = await axios.get(URL);
    return response.data.response.body.items.item;
  } catch (error) {
    console.error(error);
  }
};
