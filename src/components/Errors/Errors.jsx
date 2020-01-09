import React from 'react'
import PropTypes from 'prop-types'

import styles from './Errors.module.scss'

export const Errors = ({ children }) => (
  <div className={styles.errors}>
    <span>{children}</span>
  </div>
)

Errors.propTypes = {
  children: PropTypes.node,
}
