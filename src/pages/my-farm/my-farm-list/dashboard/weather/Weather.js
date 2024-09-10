import React, { useEffect, useState } from "react";
import styles from "./Weather.module.scss";
import {
  WiDaySunny,
  WiNightClear,
  WiCloud,
  WiRain,
  WiSnow,
  WiFog,
} from "react-icons/wi"; // 날씨 아이콘
// import { url } from "inspector";

// const weatherByDay = [
//   {
//     days: "오늘",
//     weather: "맑음",
//     precipitationProbability: "0%",
//     LowestTemperature: "15\u2103",
//     HighestTemperature: "22\u2103",
//   },
//   {
//     days: "내일",
//     weather: "맑음",
//     precipitationProbability: "0%",
//     LowestTemperature: "15\u2103",
//     HighestTemperature: "22\u2103",
//   },
//   {
//     days: "모레",
//     weather: "맑음",
//     precipitationProbability: "0%",
//     LowestTemperature: "15\u2103",
//     HighestTemperature: "22\u2103",
//   },
// ];

function Weather() {
  const [icon, setIcon] = useState();
  const [description, setDescription] = useState("");
  const [forecastData, setForecastData] = useState([]); //5일치 데이터저장!
  const [weatherData, setWeatherData] = useState({
    temperature: null, //온도
    humidity: null, //습도
    precipitation: null,
    solarRadiation: null,
    windSpeed: null,
    windDirection: null,
    icon: "",
    description: "",
  });

  const handleWeather = async (lat, lon) => {
    const APIkey = "3bd960b544d8e85c3f24e4e2d139794c";
    const url = `/weather/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`;
    const url2 = `/weather/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`;

    const response = fetch(url) //5일
      .then((response) => response.json())
      .then((json) => {
        setForecastData(json.list);
        console.log(json.list);
      })
      .catch((error) => console.error("Error fetching data:", error));

    const response2 = fetch(url2) //오늘
      .then((response) => response.json())
      .then((json) => {
        // setIcon(json.weather[0].icon);
        // setDescription(json.weather[0].description);
        setWeatherData({
          temperature: json.main.temp, //온도
          humidity: json.main.humidity, //습도
          precipitation: json.rain ? json.rain["1h"] : 0, //강수량
          solarRadiation: 655, // 이 값은 API에서 받아오는 값이 없으니 가정
          windSpeed: json.wind.speed, //풍속
          windDirection: json.wind.deg, //바람방향
          icon: json.weather[0].icon,
          description: json.weather[0].description,
        });

        console.log(json);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    //   대전 선화동 위도 경도
    const latitude = 36.328799;
    const longitude = 127.4230707;
    handleWeather(latitude, longitude);
  }, []);

  //   <img
  //   src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
  // />
  // 날씨 설명에 따른 아이콘을 반환하는 함수
  const getWeatherIcon = (icon) => {
    switch (icon) {
      case "01d": // 맑은 날 (낮)
        return <WiDaySunny size={64} color="gold" />;
      case "01n": // 맑은 날 (밤)
        return <WiNightClear size={64} color="darkblue" />;
      case "02d": // 약간의 구름 (낮)
      case "02n": // 약간의 구름 (밤)
      case "03d": // 드문드문 구름 (낮)
      case "03n": // 드문드문 구름 (밤)
      case "04d": // 구름 낀 날 (낮)
      case "04n": // 구름 낀 날 (밤)
        return <WiCloud size={64} color="gray" />;
      case "09d": // 약간의 비 (낮)
      case "09n": // 약간의 비 (밤)
      case "10d": // 비가 내리는 구름 (낮)
      case "10n": // 비가 내리는 구름 (밤)
        return <WiRain size={64} color="blue" />;
      case "13d": // 눈 (낮)
      case "13n": // 눈 (밤)
        return <WiSnow size={64} color="lightblue" />;
      case "50d": // 안개 (낮)
      case "50n": // 안개 (밤)
        return <WiFog size={64} color="gray" />;
      default:
        return <WiCloud size={64} color="gray" />; // 기본값: 흐린 날씨 아이콘
    }
  };
  const getNextEightForecasts = (forecastData) => {
    return forecastData.slice(0, 8); // 첫 8개의 데이터를 반환
  };

  // 시간 포맷팅함수
  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const date = new Date(dateString);
    return date.toLocaleTimeString([], options);
  };
  return (
    <div className={styles.weather}>
      <div className={styles.today}>
        <div>
          요일 <span>시간</span>
        </div>
        {/* <img
          src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
        /> */}
        {getWeatherIcon(weatherData.icon)}
      </div>
      <div className={styles.weather_menu}>
        <div className={styles.mr_today}>
          {/* 특정 날짜 (예: 오늘) 날씨 예보 렌더링 */}

          {getNextEightForecasts(forecastData) // 첫 8개의 데이터를 가져옴
            .map((forecast, index) => (
              <div key={index} className={styles.forecast_item}>
                <div>{formatTime(forecast.dt_txt)}</div> {/* 시간 표시 */}
                {/* <div>{forecast.weather[0].description}</div> */}
                <div>{getWeatherIcon(forecast.weather[0].icon)}</div>
                <div>{forecast.main.temp}°C</div>
              </div>
            ))}
        </div>
        <div className={styles.next_day}> {/* 5일치 날씨 예보 렌더링 */}</div>
      </div>
    </div>
  );
}

export default Weather;
