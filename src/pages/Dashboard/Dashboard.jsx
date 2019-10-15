import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import firebase from 'components/Firebase/firebase'

export const Dashboard = props => {
  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert('Please login first')
    props.history.replace('/login')

    return null
  }

  const [quote, setQuote] = useState('')

  useEffect(() => {
    firebase.getCurrentUserQuote().then(setQuote)
  })

  return (
    <main>
      Hello {firebase.getCurrentUsername()}
      <Button type="submit" fullWidth variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>
    </main>
  )

  async function logout() {
    await firebase.logout()
    props.history.push('/')
  }
}
