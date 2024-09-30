export const paths = {
  gnb: [
    { path: "/", name: "홈" },
    {
      path: "about",
      name: "소개",
      depth: [
        {
          path: "about",
          name: "회사소개",
        },
        { path: "/about/service", name: "서비스소개" },
      ],
    },
    {
      path: "info",
      name: "정보",
      depth: [
        { path: "/info", name: "이용 현황", comp: "UsageStatus" },
        {
          path: "/info",
          name: "시뮬레이션",
          comp: "Simulation",
        },
        { path: "/info", name: "병해충", comp: "Diseases" },
        {
          path: "/info",
          name: "자연재해",
          comp: "Disaster",
        },
      ],
    },
    {
      path: "community",
      name: "커뮤니티",
      depth: [
        { path: "/community", name: "공지사항", comp: "Notice" },
        { path: "/community", name: "FAQ", comp: "Faq" },
        { path: "/community", name: "정보 공유", comp: "SharingInformation" },
        { path: "/community", name: "A/S 문의", comp: "AfterService" },
      ],
    },
    {
      path: "request",
      name: "견적의뢰",
    },
  ],
  spot: [
    { path: "/login", name: "로그인" },
    { path: "/register", name: "회원가입" },
    // { path: '/mypage', name: '마이페이지' },
  ],
};

export const myPageSideMenu = [
  {
    label: "내 정보",
    menu: [
      { comp: "IntroMyPage", name: "내 정보 조회" },
      { comp: "InfoEdit", name: "내 정보 수정" },
    ],
  },
  {
    label: "결제",
    menu: [{ comp: "Payment", name: "결제 내역" }],
  },
  {
    label: "채팅상담",
    menu: [{ comp: "MyChatRoom", name: "채팅상담 문의 내역" }],
  },
  {
    label: '회원탈퇴',
    menu: [{ comp: 'Userout', name: '회원 탈퇴 하기' }],
  },
];

export const infoSideMenu = [
  { comp: "UsageStatus", name: "이용현황" },
  { comp: "Simulation", name: "시뮬레이션" },
  { comp: "Diseases", name: "병해충 정보" },
  { comp: "Disaster", name: "자연재해 정보" },
];

export const communitySideMenu = [
  { comp: "Notice", name: "공지사항" },
  { comp: "Faq", name: "FAQ" },
  { comp: "SharingInformation", name: "정보 공유" },
  { comp: "AfterService", name: "A/S 문의" },
];

export const managerSideMenu = [
  { comp: "OverallStatus", name: "전체 현황" },
  { comp: "MembersCare", name: "회원 관리" },
  { comp: "QuotationsCare", name: "견적 관리" },
  { comp: "ComplaintsCare", name: "신고 관리" },
  { comp: "AfterServiceCare", name: "A/S 관리" },
  { comp: "ChatRoomCare", name: "채팅상담 관리" },
];
