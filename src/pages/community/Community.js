import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../../components/layout/page-template/PageTemplate";
import { getPageLinks, getTitleProps } from "../../utils/pageSetting";

function Community() {
  const { pathname } = useLocation();
  const titleProps = getTitleProps(pathname);
  const links = getPageLinks("community");

  // return <PageTemplate titleProps={titleProps} components={componentName} />;
  return (
    <>
      <Outlet />
    </>
  );
}

export default Community;
