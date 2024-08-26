const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "https://ncpms.rda.go.kr/npmsAPI/service", // 기존 host
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
