import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import { PageHeader } from 'components/PageHeader/PageHeader'

import MailOutlineIcon from '@material-ui/icons/MailOutline'
import MoodIcon from '@material-ui/icons/Mood'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'

import { connect } from 'react-redux'
import { uploadImage } from '../../redux/actions/userActions'

import styles from './Dashboard.module.scss'

class Dashboard extends Component {
  handleImageChange = event => {
    const image = event.target.files[0]
    const formData = new FormData()

    formData.append('image', image, image.name)
    this.props.uploadImage(formData)
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')

    fileInput.click()
  }

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
                <input type="file" id="imageInput" onChange={this.handleImageChange} />
                <Tooltip title="Edit profile picture" placement="top">
                  <EditIcon onClick={this.handleEditPicture} className={styles.avatar_edit} />
                </Tooltip>
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
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(
  mapStateToProps,
  { uploadImage },
)(Dashboard)
