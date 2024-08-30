const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 날씨api
  app.use(
    "/weather", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "https://apis.data.go.kr/1390000/SmartFarmdata", // 기존 host
      changeOrigin: true,
      pathRewrite: {
        "^/weather": "",
      },
    })
  );
  // 병해충api
  app.use(
    "/desease", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "http://ncpms.rda.go.kr/npmsAPI/service", // 기존 host
      changeOrigin: true,
      pathRewrite: {
        "^/desease": "",
      },
    })
  );

  // 우수농가api
  app.use(
    "/bestfarm", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "https://apis.data.go.kr/1390000/SmartFarmdata", // 기존 host
      changeOrigin: true,
      pathRewrite: {
        "^/bestfarm": "",
      },
    })
  );

  // 스마트팜 빅데이터api
  app.use(
    "/smart", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "https://www.smartfarmkorea.net", // 기존 host
      changeOrigin: true,
      pathRewrite: {
        "^/smart": "",
      },
    })
  );
  // app.use(
  //   "/kakao", // 기존 host 대신 사용할 경로
  //   createProxyMiddleware({
  //     target: "https://kauth.kakao.com/oauth/authorize", // 기존 host
  //     changeOrigin: true,
  //     pathRewrite: {
  //       "^/kakao": "",
  //     },
  //   })
  // );
};
