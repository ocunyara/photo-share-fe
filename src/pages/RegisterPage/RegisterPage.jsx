import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { FormWrapper } from 'components/LoginLayout/FormWrapper'
import { Button } from 'components/Button/Button'
import { Input } from 'components/Input/Input'
import { Errors } from 'components/Errors/Errors'

import styles from './RegisterPage.module.scss'

// Redux stuff
import { connect } from 'react-redux'
import { signupUser } from '../../redux/actions/userActions'

class RegisterPage extends Component {
  constructor() {
    super()

    this.state = {
      handle: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
  }

  handleChange = fildName => value => {
    this.setState({
      [fildName]: value,
    })
  }

  handleSign = () => {
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.password,
      handle: this.state.password,
    }

    this.props.signupUser(newUserData, this.props.history)
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
            value={this.state.handle}
            placeholder="Full Name"
            handleChange={this.handleChange('handle')}
            name="handle"
          />
          <Input value={this.state.email} placeholder="Email" handleChange={this.handleChange('email')} name="email" />
          <Input
            value={this.state.password}
            placeholder="Password"
            handleChange={this.handleChange('password')}
            name="password"
            type="password"
          />
          <Input
            value={this.state.confirmPassword}
            placeholder="confirmPassword"
            handleChange={this.handleChange('confirmPassword')}
            name="confirmPassword"
            type="password"
          />
          <Errors>{errors.password}</Errors>
          <Errors>{errors.general}</Errors>
          <Button handleClick={this.handleSign} isLoading={loading}>
            Sing us
          </Button>
        </div>
        <div className={styles.bottomField}>
          <p>
            Have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </FormWrapper>
    )
  }
}

RegisterPage.propTypes = {
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
})

export default connect(
  mapStateToProps,
  { signupUser },
)(RegisterPage)
