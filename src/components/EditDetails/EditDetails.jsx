import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import { Textarea } from '../Textarea/Textarea'

import { editUserDetails } from '../../redux/actions/userActions'
import { connect } from 'react-redux'

import styles from './EditDetaild.module.scss'
import RoomIcon from '@material-ui/icons/Room'
import WebIcon from '@material-ui/icons/Web'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

class EditDetails extends Component {
  constructor() {
    super()

    this.state = {
      bio: '',
      location: '',
      website: '',
      open: false,
    }
  }

  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      location: credentials.location ? credentials.location : '',
      website: credentials.website ? credentials.website : '',
    })
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  handleChange = fildName => value => {
    this.setState({
      [fildName]: value,
    })
  }

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      location: this.state.location,
      website: this.state.website,
    }

    this.props.editUserDetails(userDetails)
  }

  componentDidMount() {
    const { credentials } = this.props

    this.mapUserDetailsToState(credentials)
  }

  render() {
    const {
      user: {
        credentials: { email, location, website, bio },
      },
    } = this.props

    const profileInfo = () => (
      <div className={styles.local_info}>
        <Button handleClick={this.handleToggle}>Edit profile</Button>
        <div className={styles.bio}>{bio}</div>
        <p className={styles.location}>
          <RoomIcon className={styles.location_icon} />
          {location}
        </p>
        {/* eslint-disable-next-line react/no-string-refs,react/jsx-no-target-blank */}
        <a href={website} className={styles.website} target="_blank" ref="noopener">
          <WebIcon className={styles.website_icon} />
          {website}
        </a>
        <a href="mailto:" className={styles.email}>
          <MailOutlineIcon className={styles.email_icon} />
          {email}
        </a>
      </div>
    )

    const changeProfileInfo = () => (
      <div className={styles.format_info}>
        <Textarea value={this.state.bio} placeholder="Enter bio" handleChange={this.handleChange('bio')} name="bio">
          {bio}
        </Textarea>
        <Input
          value={this.state.location}
          placeholder="Location"
          handleChange={this.handleChange('location')}
          name="location"
        />
        <Input
          value={this.state.website}
          placeholder="Website"
          handleChange={this.handleChange('website')}
          name="website"
        />
        <Button className={styles.btn_save} handleClick={this.handleSubmit}>
          Save
        </Button>
        <Button className={styles.btn_cansel} handleClick={this.handleToggle}>
          Cancel
        </Button>
      </div>
    )

    return <div className={styles.edit}>{this.state.open ? changeProfileInfo() : profileInfo()}</div>
  }
}

EditDetails.propTypes = {
  user: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  credentials: state.user.credentials,
})

export default connect(
  mapStateToProps,
  { editUserDetails },
)(EditDetails)
