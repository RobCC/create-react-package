import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

export const Component = (props) => (
  <div className={styles.div}>
    <span className={styles.span}>{props.msg}</span>
  </div>
);

Component.propTypes = {
  msg: PropTypes.string,
};
