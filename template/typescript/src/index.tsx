import React from 'react';

import styles from './styles.module.scss';

type Props = {
  msg: string;
};

export const Component = (props: Props): React.ReactElement => (
  <div className={styles.div}>
    <span className={styles.span}>{props.msg}</span>
  </div>
);
