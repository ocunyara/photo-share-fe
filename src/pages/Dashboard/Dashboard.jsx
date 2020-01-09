import React, { Fragment } from 'react'

import { PageHeader } from 'components/PageHeader/PageHeader'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

import styles from './Dashboard.module.scss'

export const Dashboard = props => (
  <Fragment>
    <PageHeader></PageHeader>
    <div className={styles.container}>
      <div className={styles.user_profile}>
        <div className={styles.avatar}></div>
        <div className={styles.card_name}>
          <span className={styles.name}></span>
          <span className={styles.full_name}></span>
        </div>
        <div className={styles.profile_editable}>
          <button>Edit profile</button>
          <a href="mailto:" className={styles.email}>
            <MailOutlineIcon className={styles.email_icon} />
          </a>
        </div>
      </div>
      <div className={styles.user_portfolio}></div>
    </div>
  </Fragment>
)
