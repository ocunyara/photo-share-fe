import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import { Button } from '../Button/Button'

import styles from './DeleteButton.module.scss'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

import { connect } from 'react-redux'
import { deleteScream } from '../../redux/actions/dataActions'

class DeleteButton extends Component {
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: !this.state.open })
  }

  deleteScream = () => {
    this.props.deleteScream(this.props.screamId)
    this.setState({ open: false })
  }

  render() {
    return (
      <div className={styles.delete_scream}>
        <Button handleClick={this.handleOpen}>
          <DeleteOutline />
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Are you sure you want to delete this scream</DialogTitle>
          <DialogActions>
            <Button handleClick={this.handleOpen}>Cancel</Button>
            <Button handleClick={this.deleteScream}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

DeleteButton.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
}

export default connect(
  null,
  { deleteScream },
)(DeleteButton)
