import React from 'react'
import PropTypes from 'prop-types'

import styles from './Textarea.module.scss'

export const Textarea = ({ value, handleChange, placeholder, type = 'text' }) => (
  <textarea
    className={styles.textarea}
    value={value}
    type={type}
    placeholder={placeholder}
    onChange={({ target: { value } }) => handleChange(value)}
  />
)

Textarea.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string,
}
