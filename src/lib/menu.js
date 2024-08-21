export const paths = {
  gnb: [
    { path: '/', name: '홈' },
    {
      path: 'about',
      name: '소개',
      depth: [
        {
          path: 'about',
          name: '회사소개',
        },
        { path: '/about/service', name: '서비스소개' },
      ],
    },
    {
      path: 'info',
      name: '정보',
      depth: [
        { path: '/info/usage-status', name: '이용 현황' },
        {
          path: '/info/simulation',
          name: '시뮬레이션',
        },
      ],
    },
    {
      path: 'customer-service-center',
      name: '고객센터',
      depth: [
        { path: '/customer-service-center/faq', name: 'FAQ' },
        {
          path: '/customer-service-center/request',
          name: '견적 의뢰',
        },
      ],
    },
  ],
  spot: [
    { path: '/login', name: '로그인' },
    { path: '/register', name: '회원가입' },
    { path: '/mypage', name: '마이페이지' },
  ],
};
