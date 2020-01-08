import React, { Fragment } from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import jwtDwcode from 'jwt-decode'

// Redux
import { Provider } from 'react-redux'
import store from 'redux/store'

// Pages
import HomePage from 'pages/HomePage/HomePage'
import { RegisterPage } from 'pages/RegisterPage/RegisterPage'
import LoginPage from 'pages/LoginPage/LoginPage'
import { ResetPage } from 'pages/ResetPage/ResetPage'
import { Dashboard } from 'pages/Dashboard/Dashboard'
import { NotFound } from 'pages/404Page/NotFound'

// Styles
import './App.module.scss'
import './styles/app.general.scss'

let authenticated

const token = localStorage.FBIdToken

if (token) {
  const decodedToken = jwtDwcode(token)

  if (decodedToken.ext * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
  }
}

const commonPages = () => (
  <Switch>
    <Route path="/" component={HomePage} exact />
    <Route path="/users/" />
    <Route path="/404" component={NotFound} />
    <Redirect from="*" to="/404" />
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

export default function App() {
  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          {authenticated && isAuthenticated()}
          {!authenticated && renderGuestRoutes()}
        </Provider>
      </BrowserRouter>
    </Fragment>
  )
}
