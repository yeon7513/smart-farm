export const paths = {
  gnb: [
    { path: '/', name: '홈' },
    {
      path: 'about',
      name: '소개',
      depth: [
        {
          path: '/',
          name: '회사소개',
        },
        { path: '/', name: '서비스소개' },
      ],
    },
    {
      path: 'simulation',
      name: '시뮬레이션',
      depth: [
        {
          path: '/',
          name: '과채',
        },
        { path: '/', name: '과수' },
      ],
    },
    {
      path: '/',
      name: '고객센터',
      depth: [
        {
          path: '/',
          name: '견적 요청',
        },
        { path: '/', name: 'FAQ' },
      ],
    },
  ],
  spot: [
    { path: '/login', name: '로그인' },
    { path: '/register', name: '회원가입' },
    { path: '/mypage', name: '마이페이지' },
  ],
};
