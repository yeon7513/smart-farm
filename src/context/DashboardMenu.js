import React from 'react';

import Briefing from '../pages/my-farm/my-farm-list/dashboard/dashboard-contents/briefing/Briefing';
import Alert from './../pages/my-farm/my-farm-list/dashboard/dashboard-contents/alert/Alert';
import ControlBox from './../pages/my-farm/my-farm-list/dashboard/dashboard-contents/control-box/ControlBox';
import Monitoring from './../pages/my-farm/my-farm-list/dashboard/dashboard-contents/monitoring/Monitoring';
import Report from './../pages/my-farm/my-farm-list/dashboard/dashboard-contents/report/Report';
import Sensor from './../pages/my-farm/my-farm-list/dashboard/dashboard-contents/sensor/Sensor';
import { useComponentContext } from './ComponentContext';

function DashboardMenu() {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case 'Briefing':
      return <Briefing />;
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
      return <Briefing />;
  }
}

export default DashboardMenu;
