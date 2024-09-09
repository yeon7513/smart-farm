import React, { useEffect, useState } from "react";
import styles from "./Weather.module.scss";
// import { url } from "inspector";

const weatherByDay = [
  {
    days: "오늘",
    weather: "맑음",
    precipitationProbability: "0%",
    LowestTemperature: "15\u2103",
    HighestTemperature: "22\u2103",
  },
  {
    days: "내일",
    weather: "맑음",
    precipitationProbability: "0%",
    LowestTemperature: "15\u2103",
    HighestTemperature: "22\u2103",
  },
  {
    days: "모레",
    weather: "맑음",
    precipitationProbability: "0%",
    LowestTemperature: "15\u2103",
    HighestTemperature: "22\u2103",
  },
];

function Weather() {
  const [icon, setIcon] = useState();
  const [description, setDescription] = useState("");
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
        console.log(json);
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
  return (
    <div className={styles.weather}>
      <div className={styles.today}>
        <div>
          요일 <span>시간</span>
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
        />
      </div>
      <div className={styles.weather_menu}>
        <div className={styles.mr_today}>
          {" "}
          <div>
            <div>오후00:00</div>
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              />
            </div>
            <div>
              <div>{weatherData.temperature}</div>
            </div>
          </div>
          <div>
            <div>오후00:00</div>
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              />
            </div>
            <div>
              <div>{weatherData.temperature}</div>
            </div>
          </div>
          <div>
            <div>오후00:00</div>
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              />
            </div>
            <div>
              <div>{weatherData.temperature}</div>
            </div>
          </div>
          <div>
            <div>오후00:00</div>
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              />
            </div>
            <div>
              <div>{weatherData.temperature}</div>
            </div>
          </div>
        </div>
        <div className={styles.next_day}>
          {" "}
          <p>sdfs</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
