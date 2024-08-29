import React from "react";
import Form from "../../../components/form/Form";

function SearchEm(props) {
  const url =
    "/desease?apiKey=2024fae68820b6a8f539fd5def6a6dfd02c1&serviceCode=SVC41&serviceType=AA003&displayCount=20&cropName=토마토";
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    });
  return (
    <div>
      <Form placeholder1={"닉네임"} placeholder2={"비밀번호"} />
    </div>
  );
}

export default SearchEm;
