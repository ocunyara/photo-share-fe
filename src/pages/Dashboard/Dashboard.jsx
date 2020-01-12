import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import { PageHeader } from 'components/PageHeader/PageHeader'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import MoodIcon from '@material-ui/icons/Mood'

import { connect } from 'react-redux'

import styles from './Dashboard.module.scss'

class Dashboard extends Component {
  render() {
    const {
      user: {
        credentials: { handle, createAt, imageUrl, bio, email },
        loading,
        authenticated,
      },
    } = this.props

    let profileMarkup = !loading ? (
      authenticated ? (
        <Fragment>
          <PageHeader></PageHeader>
          <div className={styles.container}>
            <div className={styles.user_profile}>
              <div className={styles.avatar}>
                <img src={imageUrl} alt="Avatar" />
              </div>
              <div className={styles.set_status}>
                <MoodIcon className={styles.smile_icon} />
                {bio}
              </div>
              <div className={styles.card_name}>
                <span className={styles.name}>{handle}</span>
                <span>Joined {dayjs(createAt).format('MMM YYYY')}</span>
              </div>
              <div className={styles.profile_editable}>
                <button>Edit profile</button>
                <a href="mailto:" className={styles.email}>
                  <MailOutlineIcon className={styles.email_icon} />
                  {email}
                </a>
              </div>
            </div>
            <div className={styles.user_portfolio}></div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <PageHeader></PageHeader>
          <div className={styles.container}>No profile found, please login again</div>
        </Fragment>
      )
    ) : (
      <p>loading...</p>
    )

    return profileMarkup
  }
}

Dashboard.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Dashboard)
