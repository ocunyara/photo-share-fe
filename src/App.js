import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import jwtDwcode from 'jwt-decode'
import axios from 'axios'

// Pages
import PageRoute from 'PageRouter'

// Redux
import { Provider } from 'react-redux'
import store from 'redux/store'
import { SET_UNAUTHENTICATED } from './redux/types'
import { loginUser, getUserData } from './redux/actions/userActions'

// Styles
import './App.module.scss'
import './styles/app.general.scss'

const token = localStorage.FBIdToken

if (token) {
  const decodedToken = jwtDwcode(token)

  if (decodedToken.ext * 1000 < Date.now()) {
    store.dispatch(loginUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_UNAUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PageRoute />
      </Provider>
    </BrowserRouter>
  )
}
