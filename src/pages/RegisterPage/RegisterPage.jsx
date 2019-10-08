import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import { FormWrapper } from 'components/LoginLayout/FormWrapper'
import { Button } from 'components/Button/Button'
import { Input } from 'components/Input/Input'
import firebase from 'components/Firebase/firebase'

import styles from './RegisterPage.module.scss'

const INITIAL_STATE = {
  fullName: '',
  userName: '',
  email: '',
  password: '',
  error: null,
}

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  handleChange = fildName => value => {
    this.setState({
      [fildName]: value,
    })
  }

  handleSign = () => {
    const { email, password } = this.state

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser

        user
          .updateProfile({ displayName: password })
          .then(() => {
            this.props.history.push('/')
          })
          .catch(error => {
            this.setState({ error })
          })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    return (
      <FormWrapper>
        <div className={styles.form}>
          <Input
            value={this.state.firstName}
            placeholder="Full Name"
            handleChange={this.handleChange('fullName')}
            name="fullName"
          />
          <Input value={this.state.email} placeholder="Email" handleChange={this.handleChange('email')} name="email" />
          <Input
            value={this.state.userName}
            placeholder="Username"
            handleChange={this.handleChange('userName')}
            name="username"
          />
          <Input
            value={this.state.password}
            placeholder="Password"
            handleChange={this.handleChange('password')}
            name="password"
            type="password"
          />
          <Button handleClick={this.handleSign}>Sing us</Button>
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

export default RegisterPage
