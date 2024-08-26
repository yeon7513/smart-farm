import { pageTitle } from '../lib/intro';
import { paths } from '../lib/menu';

export function getTitleProps(pathname) {
  return (
    pageTitle[pathname] || {
      title: '아이팜',
      description: '아이팜 페이지 입니다.',
      imgUrl: '',
    }
  );
}

export function getPageLinks(path) {
  return paths.gnb.find((link) => link.path === path)?.depth || [];
}
