import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { likeScream, unlikeScream } from '../../redux/actions/dataActions'
import { connect } from 'react-redux'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

class LikeButton extends Component {
  likeScream = () => {
    this.props.likeScream(this.props.screamId)
  }

  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId)
  }

  likedScream = () => {
    if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId)) return true
    else return false
  }

  render() {
    const {
      user: { authenticated },
    } = this.props

    const likeButton = !authenticated ? (
      <Link to="/login">
        <FavoriteBorderIcon />
      </Link>
    ) : this.likedScream() ? (
      <FavoriteIcon onClick={this.unlikeScream} />
    ) : (
      <FavoriteBorderIcon onClick={this.likeScream} />
    )

    return <Fragment>{likeButton}</Fragment>
  }
}

LikeButton.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapActionsToProps = {
  likeScream,
  unlikeScream,
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(LikeButton)
