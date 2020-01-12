import React, { Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import HomePage from './pages/HomePage/HomePage'
import { NotFound } from './pages/404Page/NotFound'
import Dashboard from './pages/Dashboard/Dashboard'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import { ResetPage } from './pages/ResetPage/ResetPage'

const commonPages = () => (
  <Switch>
    <Route path="/" component={HomePage} exact />
    <Route path="/users/" />
    <Route component={NotFound} />
  </Switch>
)

const isAuthenticated = () => (
  <Switch>
    <Route path="/dashboard" component={Dashboard} />
    {commonPages()}
  </Switch>
)

const renderGuestRoutes = () => (
  <Switch>
    <Route path="/register" component={RegisterPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/reset" component={ResetPage} />
    {commonPages()}
  </Switch>
)

const PageRouter = ({ authenticated }) => (
  <Fragment>
    {authenticated && isAuthenticated()}
    {!authenticated && renderGuestRoutes()}
  </Fragment>
)

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
})

PageRouter.propTypes = {
  user: PropTypes.object,
}

export default connect(mapStateToProps)(PageRouter)
