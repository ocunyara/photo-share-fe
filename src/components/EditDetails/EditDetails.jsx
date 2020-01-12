import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { editUserDetails } from '../../redux/actions/userActions'
import { connect } from 'react-redux'

import styles from './EditDetaild.module.scss'

class EditDetails extends Component {
  render() {
    return (
      <div className={styles.edit}>
        <button>Edit profile</button>
      </div>
    )
  }
}

EditDetails.propTypes = {
  credentials: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  credentials: state.user.credentials,
})

export default connect(
  mapStateToProps,
  { editUserDetails },
)(EditDetails)
