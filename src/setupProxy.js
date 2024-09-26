const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/weather', // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: 'https://api.openweathermap.org', // 기존 host
      changeOrigin: true,
      pathRewrite: {
        '^/weather': '',
      },
    })
  );
  // 병해충api
  app.use(
    '/desease', // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: 'http://ncpms.rda.go.kr/npmsAPI/service', // 기존 host
      changeOrigin: true,
      pathRewrite: {
        '^/desease': '',
      },
    })
  );

  // 우수농가api
  app.use(
    '/bestfarm', // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: 'https://apis.data.go.kr/1390000/SmartFarmdata', // 기존 host
      changeOrigin: true,
      pathRewrite: {
        '^/bestfarm': '',
      },
    })
  );

  // 스마트팜 빅데이터api
  app.use(
    '/smart', // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: 'https://www.smartfarmkorea.net', // 기존 host
      changeOrigin: true,
      pathRewrite: {
        '^/smart': '',
      },
    })
  );
  // 재난 문자 api
  app.use(
    '/desaster', // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target: 'https://www.safetydata.go.kr', // 기존 host
      changeOrigin: true,
      pathRewrite: {
        '^/desaster': '',
      },
    })
  );
  // 자연재해 상담
  // app.use(
  //   "/smart", // 기존 host 대신 사용할 경로
  //   createProxyMiddleware({
  //     target: "https://www.smartfarmkorea.net", // 기존 host
  //     changeOrigin: true,
  //     pathRewrite: {
  //       "^/smart": "",
};
