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
        { path: "/info/usage-status", name: "이용 현황" },
        {
          path: "/info/simulation",
          name: "시뮬레이션",
        },
        { path: "/info/diseases", name: "병해충" },
        {
          path: "/info/disaster",
          name: "자연재해",
        },
      ],
    },
    {
      path: "community",
      name: "커뮤니티",
      depth: [
        { path: "/community", name: "공지사항" },
        { path: "/community", name: "FAQ" },
        { path: "/community", name: "정보 공유" },
        { path: "/community", name: "A/S 문의" },
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
    { path: "/mypage", name: "마이페이지" },
  ],
};
