import axios from 'axios';

const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

export const convertAddressToGeocode = async (addr) => {
  const encodedAddress = encodeURIComponent(addr);
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await axios.get(URL);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
