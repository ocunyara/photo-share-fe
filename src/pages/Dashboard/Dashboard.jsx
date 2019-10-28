import React, { Fragment, useEffect, useState } from 'react'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'

import firebase from 'components/Firebase/firebase'
import { PageHeader } from 'components/PageHeader/PageHeader'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import { AvatarImage } from 'components/AvatarImage/AvatarImage'

import styles from './Dashboard.module.scss'

export const Dashboard = props => {
  if (!firebase.getCurrentUser()) {
    // eslint-disable-next-line no-undef
    alert('Please login first')
    // eslint-disable-next-line react/prop-types
    props.history.replace('/login')

    return null
  }

  const [fullName, setFullName] = useState('')

  useEffect(() => {
    firebase.getCurrentFullName().then(setFullName)
  })

  firebase.consoleUser()

  return (
    <Fragment>
      <PageHeader></PageHeader>
      <div className={styles.container}>
        <div className={styles.user_profile}>
          <div className={styles.avatar}>
            <img alt="Avatar" />
            <AvatarImage />
          </div>
          <div className={styles.card_name}>
            <span className={styles.name}>{firebase.getCurrentUser().Name}</span>
            <span className={styles.full_name}>{fullName ? `${fullName}` : <VideogameAssetIcon size={20} />}</span>
          </div>
          <div className={styles.profile_editable}>
            <button>Edit profile</button>
            <a href="mailto:" className={styles.email}>
              <MailOutlineIcon className={styles.email_icon} />
              {firebase.getCurrentUser().Email}
            </a>
          </div>
        </div>
        <div className={styles.user_portfolio}></div>
      </div>
    </Fragment>
  )
}
