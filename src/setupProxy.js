const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 날씨api
  app.use(
    "/api", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "https://apihub.kma.go.kr", // 기존 host
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
  // 병해충api
  app.use(
    "/api1", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "https://ncpms.rda.go.kr/npmsAPI/service", // 기존 host
      changeOrigin: true,
      pathRewrite: {
        "^/api1": "",
      },
    })
  );

  // 우수농가api
  app.use(
    "/api2", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "https://apis.data.go.kr/1390000/SmartFarmdata", // 기존 host
      changeOrigin: true,
      pathRewrite: {
        "^/api2": "",
      },
    })
  );

  // 스마트팜 빅데이터api
  app.use(
    "/api3", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "https://www.smartfarmkorea.net", // 기존 host
      changeOrigin: true,
      pathRewrite: {
        "^/api3": "",
      },
    })
  );
};
