import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import styles from './Post.module.scss'

import { Button } from '../Button/Button'
import { Textarea } from '../Textarea/Textarea'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'

import { likeScream, unlikeScream } from '../../redux/actions/dataActions'
import { connect } from 'react-redux'

class Post extends Component {
  likedScream = () => {
    if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId))
      return true
    else return false
  }

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId)
  }

  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId)
  }

  render() {
    dayjs.extend(relativeTime)

    const {
      scream: { createAt, body, userImage, userHandle, userName, screamId, likeCount, commentCount },
      user: { authenticated },
    } = this.props

    const likeButton = !authenticated ? (
      <Link to="/login">
        <FavoriteBorderIcon />
      </Link>
    ) : this.likedScream() ? (
      <FavoriteIcon color="primary" onClick={this.unlikeScream} />
    ) : (
      <FavoriteBorderIcon color="primary" onClick={this.likeScream} />
    )

    return (
      <div id={screamId} className={styles.wrapper}>
        <div className={styles.postHeader}>
          <img src={userImage} alt={userName} className={styles.profileImage} />
          <Link className={styles.profileLink} to={`/users/${userHandle}`}>
            {userHandle}
          </Link>
        </div>
        <div className={styles.post_body}>
          {/*<img src={screamImg} alt={userName} className={styles.postImage} />*/}
        </div>
        <div className={styles.post_footer}>
          <div className={styles.post_link}>
            {likeButton}
            <span className={styles.like_count}>{likeCount} Likes</span>
          </div>
          <div className={styles.post_text}>
            <Link className={styles.profileLink} to={`/users/${userHandle}`}>
              {userHandle}
            </Link>
            {body}
          </div>
          <p className={styles.time}>{dayjs(createAt).fromNow()}</p>
          <div className={styles.post_comment}>
            <Textarea placeholder="Добавьте комментарий..."></Textarea>
            <Button>Опубликовать</Button>
          </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
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
)(Post)
