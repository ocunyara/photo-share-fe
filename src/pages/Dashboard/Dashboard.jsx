import React, { Fragment, useEffect, useState } from 'react'

import { Button } from 'components/Button/Button'
import firebase from 'components/Firebase/firebase'

import { PageHeader } from 'components/PageHeader/PageHeader'

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
    <Fragment>
      <PageHeader></PageHeader>
      <main>
        Hello {firebase.getCurrentUsername()}
        <Button type="submit" fullWidth variant="contained" color="secondary" handleClick={logout}>
          Logout
        </Button>
      </main>
    </Fragment>
  )

  async function logout() {
    await firebase.logout()
    props.history.push('/')
  }
}
