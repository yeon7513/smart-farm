import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { convertingGeocodeToAddress } from '../../api/geoCode';
import Container from '../../components/layout/container/Container';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import Title from '../../components/layout/title/Title';
import { useComponentContext } from '../../context/ComponentContext';
import { infoTitle } from '../../lib/intro';
import { infoSideMenu } from '../../lib/menu';
import styles from './Info.module.scss';

function Info() {
  const { currComp, setCurrComp } = useComponentContext();
  const navigate = useNavigate();

  const titleProps = infoTitle[currComp] || infoTitle.UsageStatus;

  const handleChangeTitles = (compName) => {
    setCurrComp(compName);
    navigate('/info');
  };

  const handleChangeAddress = async () => {
    const lat1 = 36.9929049;
    const lng1 = 127.7481477;

    const lat2 = 36.6094977;
    const lng2 = 127.3225154;

    const lat3 = 36.3325979;
    const lng3 = 127.4234768;

    const address1 = await convertingGeocodeToAddress(lat1, lng1);
    const address2 = await convertingGeocodeToAddress(lat2, lng2);
    const address3 = await convertingGeocodeToAddress(lat3, lng3);

    console.log('address1: ', address1);
    console.log('address2: ', address2);
    console.log('address3: ', address3);
  };

  handleChangeAddress();

  return (
    <>
      <Title {...titleProps} />
      <Container className={styles.container}>
        <ul className={styles.links}>
          {infoSideMenu.map((menu) => (
            <Sidebar
              key={menu.comp}
              comp={menu.comp}
              name={menu.name}
              handleClick={handleChangeTitles}
            />
          ))}
        </ul>
        <div className={styles.content}>
          <Outlet />
        </div>
      </Container>
    </>
  );
}

export default Info;
