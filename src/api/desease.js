const apiKey = "2024fae68820b6a8f539fd5def6a6dfd02c1";
const url = "";
fetch(url)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
  });
