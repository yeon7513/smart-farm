import React from 'react';
import { useComponentContext } from '../../../../context/ComponentContext';
import Alert from './alert/Alert';
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
    case 'Alert':
      return <Alert />;
    case 'Report':
      return <Report />;

    default:
      return <Monitoring />;
  }
}

export default RenderingMenu;
