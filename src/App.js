import React, { useState, useEffect, Fragment } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { HomePage } from 'pages/HomePage/HomePage'
import { RegisterPage } from 'pages/RegisterPage/RegisterPage'
import { LoginPageView } from 'pages/LoginPage/LoginPage'
import { ResetPage } from 'pages/ResetPage/ResetPage'
import { Dashboard } from 'pages/Dashboard/Dashboard'
import { NotFound } from 'pages/404Page/NotFound'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import firebase from 'components/Firebase/firebase'

import './App.module.scss'
import './styles/app.general.scss'

const renderGuestRoutes = () => (
  <Switch>
    <Route path="/" component={HomePage} exact />
    <Route path="/register" component={RegisterPage} />
    <Route path="/login" component={LoginPageView} />
    <Route path="/reset" component={ResetPage} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/404" component={NotFound} />
    <Redirect from="*" to="/404" />
  </Switch>
)

export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false)

  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val)
    })
  })

  return firebaseInitialized !== false ? (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Switch>{renderGuestRoutes()}</Switch>
      </BrowserRouter>
    </Fragment>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  )
}
