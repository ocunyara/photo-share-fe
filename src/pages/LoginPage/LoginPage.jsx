import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { FormWrapper } from 'components/LoginLayout/FormWrapper'
import { Button } from 'components/Button/Button'
import { Input } from 'components/Input/Input'
import { Errors } from 'components/Errors/Errors'

// Redux stuff
import { connect } from 'react-redux'
import { loginUser } from '../../redux/actions/userActions'

import styles from './LoginPage.module.scss'

class LoginPage extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {},
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
  }
  handleLogin = () => {
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }

    this.props.loginUser(userData, this.props.history)
  }

  handleChange = fildName => value => {
    this.setState({
      [fildName]: value,
    })
  }

  render() {
    const {
      UI: { loading },
    } = this.props
    const { errors } = this.state

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
          <Button handleClick={this.handleLogin} isLoading={loading}>
            Log in
          </Button>
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

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
})

const mapActionsToProps = {
  loginUser,
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(LoginPage)
