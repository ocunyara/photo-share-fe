import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

import { FormWrapper } from 'components/LoginLayout/FormWrapper'
import { Button } from 'components/Button/Button'
import { Input } from 'components/Input/Input'
import firebase from 'components/Firebase/firebase'

import styles from './LoginPage.module.scss'

const INITIAL_STATE = {
  email: '',
  password: '',
}

export class LoginPageView extends React.Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  handleChange = fildName => value => {
    this.setState({
      [fildName]: value,
    })
  }

  handleLogin = async () => {
    const { email, password } = this.state

    try {
      await firebase.login(email, password)
      this.props.history.push('/dashboard')
    } catch (error) {
      alert(error.message)
    }
    console.log(12)
  }

  render() {
    return (
      <FormWrapper>
        <div className={styles.form}>
          <Input
            value={this.state.email}
            placeholder="Phone number, username, or email"
            handleChange={this.handleChange('email')}
            name="username"
          />
          <Input
            value={this.state.password}
            placeholder="Password"
            handleChange={this.handleChange('password')}
            name="password"
            type="password"
          />
          <Button handleClick={this.handleLogin}>Log in</Button>
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
}

LoginPageView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(LoginPageView)
