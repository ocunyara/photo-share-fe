import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './Navbar.module.scss'
import { connect } from 'react-redux'
import store from '../../redux/store'
import { logoutUser } from '../../redux/actions/userActions'

const NavBar = ({ authenticated }) => {
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
        <Link onClick={() => store.dispatch(logoutUser())} to="/">
          Logout
        </Link>
      </li>
    </ul>
  )

  return <nav className={styles.nav}>{authenticated ? renderUserLinks() : renderGuestLinks()}</nav>
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
})

NavBar.propTypes = {
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(NavBar)
