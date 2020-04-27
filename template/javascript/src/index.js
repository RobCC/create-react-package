import React from 'react';

import styles from './styles.module.scss';

export const Component = props => (
  <div className={styles.div}>
    <span className={styles.span}>{props.msg}</span>
  </div>
);
