import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'class-names'
import Spinner from 'react-spinkit'

import styles from './Button.module.scss'

export const Button = ({ isLoading, handleClick, children, disabled }) => (
  <button
    className={classNames(styles.button, { [styles.loading]: isLoading }, disabled)}
    onClick={({ target: { value } }) => handleClick(value)}>
    {isLoading && <Spinner fadeIn="none" name="three-bounce" />}
    {!isLoading && <span>{children}</span>}
  </button>
)

Button.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  handleClick: PropTypes.func,
  disabled: PropTypes.string,
}
