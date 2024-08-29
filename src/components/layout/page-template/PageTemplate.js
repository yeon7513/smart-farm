import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useComponentContext } from '../../../context/ComponentContext';
import Container from '../container/Container';
import Title from '../title/Title';
import styles from './PageTemplate.module.scss';

function PageTemplate({ titleProps, components }) {
  const { setCurrComp } = useComponentContext();

  return (
    <div>
      <Title {...titleProps} />
      <Container className={styles.container}>
        <ul className={styles.links}>
          {components.map((component, idx) => (
            <li key={idx}>
              <Link to={''} onClick={() => setCurrComp(component)}>
                {titleProps[idx].title}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.content}>
          <Outlet />
        </div>
      </Container>
    </div>
  );
}

export default PageTemplate;
