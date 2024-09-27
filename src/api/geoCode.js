import axios from "axios";

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

// 주소에서 좌표 변환
export const convertingAddressToGeoCode = async (addr) => {
  const encodedAddress = encodeURIComponent(addr);
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;

  try {
    const response = await axios.get(URL);

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    }
  } catch (error) {
    console.error("Geocoding API 호출 실패: ", error);
  }
};

// 좌표에서 주소 변환
export const convertingGeocodeToAddress = async (lat, lng) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

  try {
    const response = await axios.get(URL);

    if (response.data.status === "OK") {
      const address =
        response.data.results[0].formatted_address.split("대한민국 ")[1];
      return address;
    }
  } catch (error) {
    console.error("Geocoding API 호출 실패: ", error);
  }
};
