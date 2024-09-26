import React, { useEffect, useState } from "react";
import styles from "./Weather.module.scss";
// import { FaCircle } from "react-icons/fa";
import {
  BsCloudSun,
  BsFillCloudsFill,
  BsFillSunriseFill,
  BsSunsetFill,
} from "react-icons/bs";
import { IoCloudSharp, IoSunny } from "react-icons/io5";
import { IoMdRainy, IoIosThunderstorm } from "react-icons/io";
import { WiDayRainMix } from "react-icons/wi";
import { TbMist } from "react-icons/tb";
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";
function Weather() {
  const [forecastData, setForecastData] = useState([]); //5일치 데이터저장!
  const [weatherData, setWeatherData] = useState({
    temperature: null, //온도
    humidity: null, //습도
    precipitationChance: null, // 강수 확률
    precipitation: null,
    solarRadiation: null,
    windSpeed: null,
    windDirection: null,
    sunrise: null, // 일출 시간
    sunset: null, // 일몰 시간
    icon: "",
    description: "",
  });
  // utc시간을 로컬 시간대로 변환하는 함수
  const convertToLocalTime = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    const localDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return localDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getWindDirection = (degrees) => {
    const directions = [
      "북풍",
      "북북동풍",
      "북동풍",
      "동북동풍",
      "동풍",
      "동남동품",
      "남동풍",
      "남남동풍",
      "남풍",
      "남남서풍",
      "남서풍",
      "서남서풍",
      "서풍",
      "서남서풍",
      "북서풍",
      "북북서풍",
    ];
    const index = Math.floor((degrees + 11.25) / 22.5);
    return directions[index % 16];
  };

  const handleWeather = async (lat, lon) => {
    const APIkey = "3bd960b544d8e85c3f24e4e2d139794c";
    const url = `/weather/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`;
    const url2 = `/weather/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`;

    const response = fetch(url) //5일
      .then((response) => response.json())
      .then((json) => {
        const updatedForecastData = json.list.map((forecast) => ({
          ...forecast,
          precipitationChance: forecast.pop ? forecast.pop * 100 : 0,
        }));
        setForecastData(updatedForecastData);
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
          // precipitation: json.rain ? json.rain["1h"] : 0, //강수량
          precipitationChance: json.rain ? json.rain["1h"] : 0,
          solarRadiation: 655, // 이 값은 API에서 받아오는 값이 없으니 가정
          windSpeed: json.wind.speed, //풍속
          windDirection: json.wind.deg, //바람방향
          sunrise: json.sys.sunrise, // 일출 시간
          sunset: json.sys.sunset, // 일몰 시간
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

  // // 2번째 라인에서 4일날씨의 데이터..?!
  // const groupByDate=(data)=>{
  //   const grouped={};

  //   data.forEach((entry)=>{
  //     const date=new Date(entry.dt_txt).toISOString().split('T')[0];
  //     if(!grouped[date]){
  //       grouped[date]=[];
  //     }
  //     grouped[date].push(entry);
  //   });

  // }

  // 날씨 설명에 따른 아이콘을 반환하는 함수
  const getWeatherIcon = (icon, size = 55) => {
    switch (icon) {
      case "01d": // 맑은 날 (낮)
        return <PiSunDimFill size={size} color="Coral" />;
      case "01n": // 맑은 날 (밤)
        return <PiMoonStarsFill size={size} color="#48484A" />;

      case "02d": // 약간의 구름 (낮)
        return <BsCloudSun size={size} color="Coral" />;
      case "02n": // 약간의 구름 (밤)
        return <BsCloudSun size={size} color="#48484A" />;
      case "3d": // 비가 내리는 구름 (낮)
      case "30n": // 비가 내리는 구름 (밤)
        return <IoCloudSharp size={size} color="#48484A" />;

      case "9d": // 구름 비(낮)
      case "9n": // 구름 비(밤)
        return <IoMdRainy size={size} color="#48484A" />;
      case "10d": // 해&빛 (낮)
        return <WiDayRainMix size={size} color="Coral" />;
      case "10n": // 해&빛 (밤)
        return <WiDayRainMix size={size} color="#48484A" />;
      case "11d": // 천둥 (낮)
      case "11n": // 천둥 (밤)
        return <IoIosThunderstorm size={size} color="#48484A" />;
      case "13d": // 눈 (낮)
      case "13n": // 눈 (밤)
        return <TbMist size={size} color="#48484A" />;
      case "50d": // 안개 (낮)
      case "50n": // 안개 (밤)
        return <IoIosThunderstorm size={size} color="#48484A" />;

      default:
        return <BsFillCloudsFill size={size} color="gray" />; // 기본값: 흐린 날씨 아이콘
    }
  };
  const getNextEightForecasts = (forecastData) => {
    return forecastData.slice(0, 8); // 첫 8개의 데이터를 반환
  };

  // 시간 포맷팅함수
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    const hours = localDate.getHours();
    const minutes = localDate.getMinutes();

    const period = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 || 12; // 12시간 형식으로 변환
    // const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${period} ${formattedHours}시 `;
  };
  return (
    <div className={styles.weather}>
      <div className={styles.today}>
        {/* <div> */}
        <h2>강원도 </h2>
        {/* </div> */}

        <div className={styles.weather_icon}>
          {getWeatherIcon(weatherData.icon, 110)}
        </div>
        <div className={styles.title}>{weatherData.description}</div>
        <div className={styles.temperature}>
          {/* 온습도 등 표시 */}
          <div>{`${weatherData.temperature}°C`}</div>
          <div>/</div>
          <div> {weatherData.humidity}%</div>
        </div>
        <div className={styles.wind}>
          {/* 강수,풍속,풍량 */}
          <div className={styles.wind_title}>
            <div>강수확률</div>
            <div>:</div>
            <div>{weatherData.precipitationChance}%</div>
          </div>
          <div className={styles.wind_title}>
            {/* <div>풍속</div>
            <div>:</div>
            <div>{weatherData.windSpeed}m/s</div> */}
            풍속:{" "}
            {weatherData.windSpeed ? `${weatherData.windSpeed} m/s` : "N/A"}
          </div>
          <div className={styles.wind_title}>
            풍향:{" "}
            {weatherData.windDirection !== null
              ? getWindDirection(weatherData.windDirection)
              : "N/A"}
          </div>
        </div>
        <div className={styles.today_time}>
          <div className={styles.sunrise}>
            <div>
              <BsFillSunriseFill size={40} color="Coral" />
            </div>
            <div>{convertToLocalTime(weatherData.sunrise)}</div>
          </div>
          <div className={styles.sunset}>
            <div>
              <BsSunsetFill size={40} color="#48484A" />
            </div>
            <div>{convertToLocalTime(weatherData.sunset)}</div>
          </div>
        </div>
      </div>
      {/* 리스트 */}

      <div className={styles.weather_menu}>
        <div className={styles.mr_today}>
          {/* 특정 날짜 (예: 오늘) 날씨 예보 렌더링 */}

          {getNextEightForecasts(forecastData) // 첫 8개의 데이터를 가져옴
            .map((forecast, index) => (
              <div key={index} className={styles.forecast_item}>
                <div>{formatTime(forecast.dt_txt)}</div> {/* 시간 표시 */}
                {/* <div>{forecast.weather[0].description}</div> */}
                <div>{getWeatherIcon(forecast.weather[0].icon, 55)}</div>
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
