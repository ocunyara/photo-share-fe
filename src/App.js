import React, { Fragment } from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'

import HomePage from 'pages/HomePage/HomePage'
import { RegisterPage } from 'pages/RegisterPage/RegisterPage'
import { LoginPageView } from 'pages/LoginPage/LoginPage'
import { ResetPage } from 'pages/ResetPage/ResetPage'
import { Dashboard } from 'pages/Dashboard/Dashboard'
import { NotFound } from 'pages/404Page/NotFound'
import { CssBaseline } from '@material-ui/core'

import './App.module.scss'
import './styles/app.general.scss'

const isAuthenticated = () => (
  <Switch>
    <Route path="/" component={HomePage} exact />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/404" component={NotFound} />
    <Redirect from="*" to="/404" />
  </Switch>
)

const renderGuestRoutes = () => (
  <Switch>
    <Route path="/" component={HomePage} exact />
    <Route path="/register" component={RegisterPage} />
    <Route path="/login" component={LoginPageView} />
    <Route path="/reset" component={ResetPage} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/users/" />
    <Route path="/404" component={NotFound} />
    <Redirect from="*" to="/404" />
  </Switch>
)

export default function App() {
  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>{renderGuestRoutes()}</BrowserRouter>
    </Fragment>
  )
}
