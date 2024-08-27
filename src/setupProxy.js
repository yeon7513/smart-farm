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
};
module.exports = function (app) {
  // 병해충api
  app.use(
    "/api1", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "https://ncpms.rda.go.kr/npmsAPI/service", // 기존 host
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
