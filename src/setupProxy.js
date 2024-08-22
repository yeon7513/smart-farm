const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: "https://www.smartfarmkorea.net/", // 기존 host
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
