import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'

import { FormWrapper } from 'components/LoginLayout/FormWrapper'
import { Button } from 'components/Button/Button'
import { Input } from 'components/Input/Input'
import { Errors } from 'components/Errors/Errors'

import styles from './RegisterPage.module.scss'
import axios from 'axios'

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      handle: '',
      email: '',
      password: '',
      confirmPassword: '',
      loading: false,
      errors: '',
    }
  }

  handleChange = fildName => value => {
    this.setState({
      [fildName]: value,
    })
  }

  handleSign = async () => {
    const { email, password, confirmPassword, handle } = this.state

    this.setState({
      loading: true,
    })

    axios
      .post('/signup', { email, password, confirmPassword, handle })
      .then(res => {
        // eslint-disable-next-line no-console
        console.log(res.data)
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(RegisterPage)
