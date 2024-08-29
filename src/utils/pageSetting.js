export function getTitleProps(title, componentName) {
  const pageTitle = componentName.map((name) => {
    return title[name];
  });

  console.log(pageTitle);

  return (
    [...pageTitle] || {
      title: '아이팜',
      description: '아이팜 페이지 입니다.',
      imgUrl: '',
    }
  );
}

// export function getPageLinks(path) {
//   return paths.gnb.find((link) => link.path === path)?.depth || [];
// }
