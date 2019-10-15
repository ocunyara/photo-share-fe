import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { FormWrapper } from 'components/LoginLayout/FormWrapper'
import { Button } from 'components/Button/Button'
import { Input } from 'components/Input/Input'
import firebase from 'components/Firebase/firebase'

import styles from './LoginPage.module.scss'

const LoginPageView = props => {
  const [form, setValues] = useState({
    email: '',
    password: '',
  })

  const handleChange = fieldName => value => {
    setValues({
      ...form,
      [fieldName]: value,
    })
  }

  const handleLogin = () => {
    const [email, password] = form

    async function login() {
      try {
        await firebase.login(email, password)
        props.history.replace('/dashboard')
      } catch (error) {
        alert(error.message)
      }
    }

    login()
  }

  return (
    <FormWrapper>
      <div className={styles.form}>
        <Input
          value={form.email}
          placeholder="Phone number, username, or email"
          handleChange={handleChange('email')}
          name="username"
        />
        <Input
          value={form.password}
          placeholder="Password"
          handleChange={handleChange('password')}
          name="password"
          type="password"
        />
        <Button handleClick={handleLogin}>Log in</Button>
        <div className={styles.separator}>
          <p>or</p>
        </div>
        <Link className={styles.forgotPassword} to="/reset">
          Forgot password?
        </Link>
      </div>
      <div className={styles.bottomField}>
        <p>
          Dont have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </FormWrapper>
  )
}

LoginPageView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export const LoginPage = compose(withRouter)(LoginPageView)
