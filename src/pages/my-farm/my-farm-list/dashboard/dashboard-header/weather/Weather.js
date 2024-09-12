import React, { useEffect, useState } from "react";
import {
  BsCloudSun,
  BsFillCloudsFill,
  BsFillSunriseFill,
  BsSunsetFill,
} from "react-icons/bs";
import { IoIosThunderstorm, IoMdRainy } from "react-icons/io";
import { IoCloudSharp } from "react-icons/io5";
import { PiMoonStarsFill, PiSunDimFill } from "react-icons/pi";
import { TbMist } from "react-icons/tb";
import { WiDayRainMix } from "react-icons/wi";
import styles from "./Weather.module.scss";
function Weather() {
  const [forecastData, setForecastData] = useState([]); //5일치 데이터저장!
  const [todayData, setTodayData] = useState([]); //8개데이터
  const [avgForecastData, setAvgForecastData] = useState([]); //4일치 데이터
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
  const [selectedDay, setSelectedDay] = useState(null); //선택한 날짜를 추적하기위한
  const [groupedForecastData, setGroupedForecastData] = useState();

  // UTC 시간을 현지 시간으로 변환하는 함수
  const convertToLocalTime = (timeStamp) => {
    const date = new Date(timeStamp * 1000); // UNIX timestamp를 밀리초로 변환
    return date.toLocaleTimeString("ko-KR", {
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

  const convertTime = (dtTxt) => {
    const date = new Date(dtTxt * 1000);
    const offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
    const dateOffset = new Date(date.getTime() - offset);
    const localDate = dateOffset.toISOString();
    const splitArr = localDate.split("T");
    const timeArr = splitArr[1].split(".");

    return `${splitArr[0]} ${timeArr[0]}`;
  };

  //40개의 데이터를 {5:[8]}로 만듬
  const groupForecastData = (data) => {
    const grouped = [];

    // 처음에 들어가는 8개는 그냥 순서대로 8개 push
    grouped.push(data.slice(0, 8));

    // 그다음 들어가는 8개는 날짜(내일꺼부터)별로 묶어서 8개 push

    // 오늘이 몇일인지 알아야함
    const today = new Date().getTime();
    const yyyyMMdd = convertTime(today / 1000);
    const todayDate = yyyyMMdd.split(" ")[0];
    console.log(todayDate);

    // 반복문을 통해서 걸러내야하는데 오늘날짜인거 빼고,
    const filterdList = data.filter((item) => !item.dt_txt.includes(todayDate));
    for (let i = 0; i < filterdList.length; i += 8) {
      if (grouped.length == 5) break;
      const group = filterdList.slice(i, i + 8);
      grouped.push(group);
    }
    console.log(grouped);
    return grouped;
  };

  const handleWeather = async (lat, lon) => {
    const APIkey = "3bd960b544d8e85c3f24e4e2d139794c";
    const url = `/weather/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`;
    const url2 = `/weather/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`;

    const response = fetch(url) //5일
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const changedList = json.list.map((item) => ({
          ...item,
          dt: item.dt * 1000,
          dt_txt: convertTime(item.dt),
        }));
        console.log(changedList);
        setForecastData(changedList);
        const groupedData = groupForecastData(changedList);
        setGroupedForecastData(groupedData);
        setTodayData(groupedData[0]);
        const result = aggregateForecastData(changedList);
        setAvgForecastData(result);
      })
      .catch((error) => console.error("Error fetching data:", error));

    const response2 = fetch(url2) //오늘
      .then((response) => response.json())
      .then((json) => {
        setWeatherData({
          temperature: Math.round(json.main.temp), //온도
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
  const aggregateForecastData = (data) => {
    const grouped = {};

    data.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0];

      if (!grouped[date]) {
        grouped[date] = {
          minTemp: Math.round(entry.main.temp),
          maxTemp: Math.round(entry.main.temp),
          weatherIcon: entry.weather[0].icon,
        };
      } else {
        grouped[date].minTemp = Math.min(
          grouped[date].minTemp,
          entry.main.temp
        );
        grouped[date].maxTemp = Math.max(
          grouped[date].maxTemp,
          entry.main.temp
        );
        grouped[date].weatherIcon = entry.weather[0].icon;
        // grouped[date].precipitationChance = entry.pop
        //   ? Math.round(entry.pop * 100)
        //   : grouped[date].precipitationChance;
      }
    });

    // 최근4일치 데이터만 반환
    return Object.keys(grouped)
      .slice(0, 4)
      .map((date) => ({
        date,
        minTemp: grouped[date].minTemp,
        maxTemp: grouped[date].maxTemp,
        weatherIcon: grouped[date].weatherIcon,
      }));
  };

  // 날씨 설명에 따른 아이콘을 반환하는 함수
  const getWeatherIcon = (icon, size = 60) => {
    switch (icon) {
      case "01d": // 맑은 날 (낮)
        return <PiSunDimFill size={size} color="Coral" />;
      case "01n": // 맑은 날 (밤)
        return <PiMoonStarsFill size={size} color="#48484A" />;

      case "02d": // 약간의 구름 (낮)
        return <BsCloudSun size={size} color="Coral" />;
      case "02n": // 약간의 구름 (밤)
        return <BsCloudSun size={size} color="#48484A" />;
      case "03d": // 비가 내리는 구름 (낮)
      case "03n": // 비가 내리는 구름 (밤)
        return <IoCloudSharp size={size} color="#48484A" />;

      case "09d": // 구름 비(낮)
      case "09n": // 구름 비(밤)
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
        return <BsFillCloudsFill size={size} color="#48484A" />; // 기본값: 흐린 날씨 아이콘
    }
  };

  // 시간 포맷팅함수
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    // const localDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    const hours = date.getHours();
    // const minutes = localDate.getMinutes();

    const period = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 || 12; // 12시간 형식으로 변환
    // const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${period} ${formattedHours}시 `;
  };

  const handleClick = (index) => {
    setTodayData(groupedForecastData[index]);
  };

  return (
    <div className={styles.weather}>
      <div className={styles.today} onClick={() => handleClick(0)}>
        <h2>대전</h2>

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

          {/* // 첫 8개의 데이터를 가져옴  */}
          {todayData.map((forecast, index) => (
            <div key={index} className={styles.forecast_item}>
              <div>{formatTime(forecast.dt_txt)}</div> {/* 시간 표시 */}
              <div>{getWeatherIcon(forecast.weather[0].icon, 70)}</div>
              {forecast.pop > 0 && (
                <div className={styles.precipitation}>
                  {`${Math.round(forecast.pop)} %`}
                </div>
              )}
              <div className={styles.title}>{forecast.main.temp}°C</div>
            </div>
          ))}
        </div>
        <div>
          <div className={styles.next_day}>
            {/* 4일치 날씨 예보 렌더링 */}
            {avgForecastData.map((day, index) => (
              <div
                key={index}
                className={styles.forecast_item}
                onClick={() => handleClick(index + 1)}
              >
                <div>{day.dayOfWeek}</div>
                <div>{getWeatherIcon(day.weatherIcon, 58)}</div>
                {day.precipitationChance > 0 && ( // 강수확률이 0보다 클 때만 표시
                  <div className={styles.precipitation}>
                    {` ${Math.round(day.precipitationChance)}%`}
                  </div>
                )}
                <div
                  className={styles.temp_text}
                >{` ${day.minTemp}°C /  ${day.maxTemp}°C`}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
