import React from "react";
import Form from "../../../components/form/Form";

function SearchPw(props) {
  const url =
    "/desease?apiKey=2024fae68820b6a8f539fd5def6a6dfd02c1&serviceCode=SVC42&serviceType=AA003&dgnssReqNo=6786";
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    });
  return (
    <div>
      <Form placeholder1={"닉네임"} placeholder2={"이메일"} />
    </div>
  );
}

export default SearchPw;
