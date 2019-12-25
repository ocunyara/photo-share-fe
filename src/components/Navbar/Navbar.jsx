import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

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
        <Link to="/">Logout</Link>
      </li>
    </ul>
  )

  return <nav className={styles.nav}>{renderGuestLinks()}</nav>
}
