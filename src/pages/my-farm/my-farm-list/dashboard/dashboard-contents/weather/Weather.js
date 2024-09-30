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
import PulseLoader from "react-spinners/PulseLoader";

import { convertingGeocodeToAddress } from "../../../../../../api/geoCode";
import styles from "./Weather.module.scss";
function Weather({ latitude, longitude }) {
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
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const [isHovered, setIsHovered] = useState(false); //호버상태
  const [localName, setLocalName] = useState(""); //지역이름

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
  //5일데이터의 날짜의 시간 변경
  const convertTime = (dtTxt) => {
    const date = new Date(dtTxt * 1000);
    const offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
    const dateOffset = new Date(date.getTime() - offset);
    const localDate = dateOffset.toISOString();
    const splitArr = localDate.split("T");
    const timeArr = splitArr[1].split(".");

    return `${splitArr[0]} ${timeArr[0]}`;
  };
  // 일몰,일출의 시간 변경
  const convertLolTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString("ko-KR", options);
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
    // console.log(todayDate);

    // 반복문을 통해서 걸러내야하는데 오늘날짜인거 빼고,
    const filterdList = data.filter((item) => !item.dt_txt.includes(todayDate));
    for (let i = 0; i < filterdList.length; i += 8) {
      if (grouped.length === 5) break;
      const group = filterdList.slice(i, i + 8);
      grouped.push(group);
    }
    // console.log(grouped);
    return grouped;
  };

  const handleWeather = async (lat, lon) => {
    setIsLoading(true); // 로딩 시작
    const APIkey = process.env.REACT_APP_WEATHER_API_KEY;

    const url = `/weather/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`;
    const url2 = `/weather/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      // console.log(json);
      const changedList = json.list.map((item) => ({
        ...item,
        dt: item.dt * 1000,
        dt_txt: convertTime(item.dt),
      }));
      setForecastData(changedList);
      const groupedData = groupForecastData(changedList);
      setGroupedForecastData(groupedData);
      setTodayData(groupedData[0]);
      const result = aggregateForecastData(changedList);
      setAvgForecastData(result);

      const response2 = await fetch(url2);
      const json2 = await response2.json();
      setWeatherData({
        temperature: Math.round(json2.main.temp),
        humidity: json2.main.humidity,
        precipitationChance: json2.rain ? json2.rain["1h"] : 0,
        solarRadiation: 655, // 임의의 값
        windSpeed: json2.wind.speed,
        windDirection: json2.wind.deg,
        sunrise: convertLolTime(json2.sys.sunrise),
        sunset: convertLolTime(json2.sys.sunset),
        icon: json2.weather[0].icon,
        description: json2.weather[0].description,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      handleWeather(latitude, longitude); //위도,경도
      // console.log(latitude, longitude);
    }
    //   대전 선화동 위도 경도
    // const latitude = 36.328799;
    // const longitude = 127.4230707;
  }, [latitude, longitude]);

  useEffect(() => {
    async function handlaGetLocalName() {
      const address = await convertingGeocodeToAddress(latitude, longitude);
      setLocalName(address);
    }

    handlaGetLocalName();
  }, [latitude, longitude]);

  //요일변환
  const getDayOfWeek = (dateString) => {
    const daysOfWeek = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

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
          precipitationChance: entry.pop ? Math.round(entry.pop * 100) : 0,
        };
      } else {
        grouped[date].minTemp = Math.min(
          grouped[date].minTemp,
          Math.round(entry.main.temp)
        );

        grouped[date].maxTemp = Math.max(
          grouped[date].maxTemp,
          Math.round(entry.main.temp)
        );
        grouped[date].weatherIcon = entry.weather[0].icon;
        grouped[date].precipitationChance = Math.max(
          grouped[date].precipitationChance,
          entry.pop ? Math.round(entry.pop * 100) : 0
        );
      }
    });
    // 오늘 날짜 제외
    const today = new Date().toISOString().split("T")[0];
    const filteredDates = Object.keys(grouped).filter((date) => date !== today);

    //날짜 오름차순 정렬
    filteredDates.sort();

    // 최근4일치 데이터만 반환
    return filteredDates.slice(0, 4).map((date) => ({
      dayOfWeek: getDayOfWeek(date), // 요일로 변환
      minTemp: grouped[date].minTemp,
      maxTemp: grouped[date].maxTemp,
      weatherIcon: grouped[date].weatherIcon,
      precipitationChance: grouped[date].precipitationChance,
    }));
  };

  // 날씨 설명에 따른 아이콘을 반환하는 함수
  const getWeatherIcon = (icon, size = 60, isSelected = false) => {
    const color = isSelected
      ? "#669900"
      : icon.includes("d")
      ? "Coral"
      : "#48484a";
    switch (icon) {
      case "01d": // 맑은 날 (낮)
        return <PiSunDimFill size={size} color={color} />;
      case "01n": // 맑은 날 (밤)
        return <PiMoonStarsFill size={size} color={color} />;

      case "02d": // 약간의 구름 (낮)
        return <BsCloudSun size={size} color={color} />;
      case "02n": // 약간의 구름 (밤)
        return <BsCloudSun size={size} color={color} />;
      case "03d": // 비가 내리는 구름 (낮)
      case "03n": // 비가 내리는 구름 (밤)
        return <IoCloudSharp size={size} color={color} />;

      case "09d": // 구름 비(낮)
      case "09n": // 구름 비(밤)
        return <IoMdRainy size={size} color={color} />;
      case "10d": // 해&빛 (낮)
        return <WiDayRainMix size={size} color={color} />;
      case "10n": // 해&빛 (밤)
        return <WiDayRainMix size={size} color={color} />;
      case "11d": // 천둥 (낮)
      case "11n": // 천둥 (밤)
        return <IoIosThunderstorm size={size} color={color} />;
      case "13d": // 눈 (낮)
      case "13n": // 눈 (밤)
        return <TbMist size={size} color={color} />;
      case "50d": // 안개 (낮)
      case "50n": // 안개 (밤)
        return <IoIosThunderstorm size={size} color={color} />;

      default:
        return <BsFillCloudsFill size={size} color={color} />; // 기본값: 흐린 날씨 아이콘
    }
  };

  // 시간 포맷팅함수
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const period = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 || 12; // 12시간 형식으로 변환

    return `${period} ${formattedHours}시 `;
  };

  const handleClick = (index) => {
    if (index === 0) {
      setSelectedDay(null);
    } else {
      setSelectedDay(index);
    }
    setTodayData(groupedForecastData[index]);
  };

  // 주소에 마우스를 갖다 대면 전체 주소가 나옵니다.
  const handleHover = () => setIsHovered(true);

  // 주소에서 마우스를 떼면 주소가 간략하게 표시됩니다.
  const handleUnHover = () => setIsHovered(false);
  // useEffect로 주소 정보 가져오는 로직을 추가
  useEffect(() => {
    async function fetchAddress() {
      const address = await convertingGeocodeToAddress(latitude, longitude);
      setLocalName(address);
    }
    fetchAddress();
  }, [latitude, longitude]);

  return (
    <>
      {isLoading ? (
        <div className={styles.loader}>
          <PulseLoader size={15} color={"#669900"} loading={isLoading} />
        </div>
      ) : (
        <div className={styles.weather}>
          <>
            <div className={styles.today} onClick={() => handleClick(0)}>
              <div>
                <h2
                  className={styles.localName}
                  onMouseEnter={handleHover}
                  onMouseLeave={handleUnHover}
                >
                  {/* 간략한 주소만 표시 */}
                  {localName.split(" ").slice(0, 3).join(" ")}
                </h2>
                {/* 호버 시 툴팁 표시 */}
                {isHovered && (
                  <div className={styles.tooltip}>
                    {localName} {/* 툴팁에 전체 주소 표시 */}
                  </div>
                )}
                <div className={styles.weather_icon}>
                  {getWeatherIcon(weatherData.icon, 110)}
                </div>
                <div className={styles.title}>{weatherData.description}</div>
              </div>
              <div className={styles.weather_bundle}>
                <div className={styles.weather_main}>
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
                      풍속:{" "}
                      {weatherData.windSpeed
                        ? `${weatherData.windSpeed} m/s`
                        : "N/A"}
                    </div>
                    <div className={styles.wind_title}>
                      풍향:{" "}
                      {weatherData.windDirection !== null
                        ? getWindDirection(weatherData.windDirection)
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className={styles.today_time}>
                  <div className={styles.sunrise}>
                    <div>
                      <BsFillSunriseFill size={40} color="Coral" />
                    </div>
                    <div>{weatherData.sunrise}</div>
                  </div>
                  <div className={styles.sunset}>
                    <div>
                      <BsSunsetFill size={40} color="#48484A" />
                    </div>
                    <div>{weatherData.sunset}</div>
                  </div>
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
                    <div className={styles.time}>
                      {formatTime(forecast.dt_txt)}
                    </div>{" "}
                    {/* 시간 표시 */}
                    <div className={styles.icon}>
                      {getWeatherIcon(forecast.weather[0].icon, 70)}
                    </div>
                    <div className={styles.title}>
                      {Math.round(forecast.main.temp)}°C
                      <div className={styles.precipitation_chance}>
                        {Math.round(forecast.pop * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
                {/* </Swiper> */}
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
                      {" "}
                      <div className={styles.dayOfWeek}>
                        {day.dayOfWeek}
                      </div>{" "}
                      {/* 요일 표시 */}
                      <div>
                        {getWeatherIcon(
                          day.weatherIcon,
                          58,
                          selectedDay === index + 1
                        )}
                      </div>
                      <div className={styles.temp_text}>
                        {` ${Math.round(day.minTemp)}°C /  ${Math.round(
                          day.maxTemp
                        )}°C`}

                        <div className={styles.precipitation_chance}>
                          {day.precipitationChance}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
}

export default Weather;
