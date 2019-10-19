import React from 'react'
import { Link } from 'react-router-dom'

import firebase from 'components/Firebase/firebase'

import styles from './Navbar.module.scss'

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

const logout = async () => {
  await firebase.logout()
}

export const NavBar = () => (
  <nav className={styles.nav}>{firebase.getCurrentUsername() ? renderUserLinks() : renderGuestLinks()}</nav>
)
