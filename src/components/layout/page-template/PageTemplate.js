import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Container from '../container/Container';
import Title from '../title/Title';
import styles from './PageTemplate.module.scss';

function PageTemplate({ titleProps, links }) {
  return (
    <div>
      <Title {...titleProps} />
      <Container className={styles.container}>
        <ul className={styles.links}>
          {links.map((link, idx) => (
            <li key={idx}>
              <Link to={link.path}>{link.name}</Link>
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
