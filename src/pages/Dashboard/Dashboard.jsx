import React, { Fragment, useEffect, useState } from 'react'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'

import firebase from 'components/Firebase/firebase'
import { PageHeader } from 'components/PageHeader/PageHeader'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

import styles from './Dashboard.module.scss'

export const Dashboard = props => {
  if (!firebase.getCurrentUsername()) {
    // eslint-disable-next-line no-undef
    alert('Please login first')
    // eslint-disable-next-line react/prop-types
    props.history.replace('/login')

    return null
  }

  const [fullName, setFullName] = useState('')

  useEffect(() => {
    firebase.getCurrentUserQuote().then(setFullName)
  })

  return (
    <Fragment>
      <PageHeader></PageHeader>
      <div className={styles.container}>
        <div className={styles.user_profile}>
          <div className={styles.avatar}>
            <img src="https://via.placeholder.com/200" alt="Avatar" />
          </div>
          <div className={styles.card_name}>
            <span className={styles.full_name}>{firebase.getCurrentUsername()}</span>
            <span className={styles.name}>{fullName ? `${fullName}` : <VideogameAssetIcon size={20} />}</span>
          </div>
          <div className={styles.profile_editable}>
            <button>Edit profile</button>
            <a href="mailto:" className={styles.email}>
              <MailOutlineIcon className={styles.email_icon} />
              a@a.com
            </a>
          </div>
        </div>
        <div className={styles.user_portfolio}></div>
      </div>
    </Fragment>
  )
}
