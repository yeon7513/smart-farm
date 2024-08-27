import React from 'react';
import { useComponentContext } from '../../../../context/ComponentContext';
import ControlBox from './control-box/ControlBox';
import Monitoring from './monitoring/Monitoring';
import Report from './report/Report';
import Sensor from './sensor/Sensor';

function RenderingMenu() {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case 'Monitoring':
      return <Monitoring />;
    case 'ControlBox':
      return <ControlBox />;
    case 'Sensor':
      return <Sensor />;
    case 'Report':
      return <Report />;

    default:
      return <Monitoring />;
  }
}

export default RenderingMenu;
