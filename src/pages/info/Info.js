import React from 'react';
import { Outlet } from 'react-router-dom';

function Info() {
  // const componentName = Object.keys(infoTitle);
  // const titleProps = getTitleProps(infoTitle, componentName);

  // console.log('infoTitle', infoTitle);

  // console.log(titleProps);

  // return <PageTemplate titleProps={titleProps} components={componentName} />;
  return (
    <>
      <Outlet />
    </>
  );
}

export default Info;
