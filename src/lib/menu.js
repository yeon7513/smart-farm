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
        { path: '/info', name: '이용 현황', comp: 'UsageStatus' },
        {
          path: '/info',
          name: '시뮬레이션',
          comp: 'Simulation',
        },
        { path: '/info', name: '병해충', comp: 'Diseases' },
        {
          path: '/info',
          name: '자연재해',
          comp: 'Disaster',
        },
      ],
    },
    {
      path: 'community',
      name: '커뮤니티',
      depth: [
        { path: '/community', name: '공지사항', comp: 'Notice' },
        { path: '/community', name: 'FAQ', comp: 'Faq' },
        { path: '/community', name: '정보 공유', comp: 'SharingInformation' },
        { path: '/community', name: 'A/S 문의', comp: 'AfterService' },
      ],
    },
    {
      path: 'request',
      name: '견적의뢰',
    },
  ],
  spot: [
    { path: '/login', name: '로그인' },
    { path: '/register', name: '회원가입' },
    // { path: '/mypage', name: '마이페이지' },
  ],
};

export const myPageSideMenu = [
  {
    label: '내 정보',
    menu: [
      { comp: 'IntroMyPage', name: '내 정보 조회' },
      { comp: 'Myinfo', name: '내 정보 수정' },
    ],
  },
  {
    label: '결제',
    menu: [{ comp: 'Payment', name: '결제 내역' }],
  },
  {
    label: '챗봇',
    menu: [{ comp: 'MyChatbot', name: '챗봇 문의 내역' }],
  },
];

export const infoSideMenu = [
  { comp: 'UsageStatus', name: '이용현황' },
  { comp: 'Simulation', name: '시뮬레이션' },
  { comp: 'Diseases', name: '병해충 정보' },
  { comp: 'Disaster', name: '자연재해 정보' },
];

export const communitySideMenu = [{ comp: '', name: '' }];

export const managerSideMenu = [{ comp: '', name: '' }];
