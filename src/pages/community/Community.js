import React from 'react';
import { Outlet } from 'react-router-dom';
// import PageTemplate from '../../components/layout/page-template/PageTemplate';
// import { communityTitle } from '../../lib/intro';
// import { getTitleProps } from '../../utils/pageSetting';

function Community() {
  // const componentName = Object.keys(communityTitle);
  // const titleProps = getTitleProps(communityTitle, componentName);

  // return <PageTemplate titleProps={titleProps} components={componentName} />;
  return (
    <>
      <Outlet />
    </>
  );
}

export default Community;
