import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

function Bus() {
  const [busNo, setBusNo] = useState(150);
  const [cityName, setCityName] = useState("");
  const [cityId, setCityId] = useState("");
  let result = useQuery(["test", busNo], () =>
    axios
      .get(
        `https://api.odsay.com/v1/api/searchBusLane?apiKey=apikey&busNo=${busNo}&CID=${cityId}`
      )
      .then((a) => {
        console.log("요청됨");
        return a.data;
      })
  );
  console.log(result.data);

  const renderBusLaneInfo = () => {
    if (
      result.data &&
      result.data.result &&
      result.data.result.lane.length > 0
    ) {
      const lane = result.data.result.lane[0];
      return (
        <>
          <p>기점: {lane.busStartPoint}</p>
          <p>종점 : {lane.busEndPoint}</p>
          <p>첫차 시간: {lane.busFirstTime}</p>
          <p>막차 시간: {lane.busLastTime}</p>
          <p>주중 배차간격: {lane.bus_Interval_Week}분</p>
          <p>토요일 배차간격: {lane.bus_Interval_Sat}분</p>
          <p>일요일 배차간격: {lane.bus_Interval_Sun}분</p>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <p>jang public bus</p>
      <label htmlFor="cityInput">도시:</label>

      <input
        type="text"
        onChange={(e) => {
          setCityName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          axios
            .get(
              `https://api.odsay.com/v1/api/searchCID?apiKey=apikey&cityName=${cityName}`
            )
            .then((response) => {
              const cityData = response.data.result.CID[0];
              const cityCode = cityData.cityCode;
              setCityId(cityCode);
            })
            .catch(() => {
              console.log("error");
            });
        }}
      >
        도시 번호 가져오기
      </button>
      <br />
      <br />
      <label htmlFor="busNoInput">버스 번호:</label>
      <input
        type="text"
        onChange={(e) => {
          setBusNo(e.target.value);
        }}
      />
      <br />
      <br />
      {renderBusLaneInfo()}
    </>
  );
}

export default Bus;
