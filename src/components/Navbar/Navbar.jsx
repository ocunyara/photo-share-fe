import React from 'react'
import { Link } from 'react-router-dom'

import firebase from 'components/Firebase/firebase'

import styles from './Navbar.module.scss'

export const NavBar = props => {
  const renderGuestLinks = () => (
    <ul>
      <li>
        <Link to="/login" className={styles.line}>
          Login
        </Link>
      </li>
      <li>
        <Link to="/register">Registration</Link>
      </li>
    </ul>
  )

  const renderUserLinks = () => (
    <ul>
      <li>
        <Link to="/dashboard" className={styles.line}>
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/" onClick={() => logout()}>
          Logout
        </Link>
      </li>
    </ul>
  )

  return <nav className={styles.nav}>{firebase.getCurrentUsername() ? renderUserLinks() : renderGuestLinks()}</nav>

  async function logout() {
    try {
      await firebase.logout()
      props.history.push('/')
    } catch (e) {
      alert(e)
    }
  }
}
