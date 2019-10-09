import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { HomePage } from 'pages/HomePage/HomePage'
import { RegisterPage } from 'pages/RegisterPage/RegisterPage'
import { LoginPage } from 'pages/LoginPage/LoginPage'
import { ResetPage } from 'pages/ResetPage/ResetPage'
import { NotFound } from 'pages/404Page/NotFound'
import { auth } from 'components/Firebase/firebase'

import './App.module.scss'
import './styles/app.general.scss'

// const renderUserRoutes = () => (
//   <Switch>
//     <Route path="/" component={HomePage} exact />
//   </Switch>
// )

const renderGuestRoutes = () => (
  <Switch>
    <Route path="/" component={HomePage} exact />
    <Route path="/register" component={RegisterPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/reset" component={ResetPage} />
    <Route path="/404" component={NotFound} />
    <Redirect from="*" to="/404" />
  </Switch>
)

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = { user: null }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      }
    })
  }

  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Switch>{renderGuestRoutes()}</Switch>
        </BrowserRouter>
      </Fragment>
    )
  }
}
