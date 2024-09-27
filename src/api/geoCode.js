import axios from "axios";

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

export const convertingAddressToGeoCode = async (addr) => {
  const encodedAddress = encodeURIComponent(addr);
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;

  try {
    const response = await axios.get(URL);
    console.log(response.data);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    }
  } catch (error) {
    console.error("Geocoding API 호출 실패: ", error);
  }
};
