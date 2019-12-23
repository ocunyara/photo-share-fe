import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

import { FormWrapper } from 'components/LoginLayout/FormWrapper'
import { Button } from 'components/Button/Button'
import { Input } from 'components/Input/Input'
import { Errors } from 'components/Errors/Errors'

import styles from './LoginPage.module.scss'

export class LoginPageView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: '',
    }
  }

  handleChange = fildName => value => {
    this.setState({
      [fildName]: value,
    })
  }

  handleLogin = async () => {
    const { email, password } = this.state

    this.setState({
      loading: true,
    })

    axios
      .post('/login', { email, password })
      .then(res => {
        console.log(res.data)
        this.setState({
          loading: false,
        })
        this.props.history.push('/')
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false,
        })
      })
  }

  render() {
    const { errors, loading } = this.state

    return (
      <FormWrapper>
        <div className={styles.form}>
          <Input
            value={this.state.email}
            placeholder="Phone number, username, or email"
            handleChange={this.handleChange('email')}
            name="username"
          />
          <Errors>{errors.email}</Errors>
          <Input
            value={this.state.password}
            placeholder="Password"
            handleChange={this.handleChange('password')}
            name="password"
            type="password"
          />
          <Errors>{errors.password}</Errors>
          <Errors>{errors.general}</Errors>
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
