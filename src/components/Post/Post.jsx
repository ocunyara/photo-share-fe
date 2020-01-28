import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import styles from './Post.module.scss'

import { Button } from '../Button/Button'
import { Textarea } from '../Textarea/Textarea'
import DeleteButton from '../DeleteButton/DeleteButton'
import LikeButton from './LikeButton/LikeButton'
import Comments from './Comments/Comments'
import ScreamDialog from '../ScreamDialog/ScreamDialog'

import { connect } from 'react-redux'
import { getScream } from '../../redux/actions/dataActions'

class Post extends Component {
  constructor() {
    super()

    this.state = {
      screamBody: '',
      openComment: false,
    }
  }

  componentDidUpdate() {
    if (this.state.openComment) {
      this.showComments()
    }
  }

  showComments = () => {
    this.setState({
      openComment: true,
    })
    this.props.getScream(this.props.scream.screamId)
  }

  handleChange = fildName => value => {
    this.setState({
      [fildName]: value,
    })
  }

  handleSubmit = () => {}

  render() {
    dayjs.extend(relativeTime)

    const {
      scream: {
        createAt,
        body,
        userImage,
        userHandle,
        userName,
        screamId,
        screamImg,
        likeCount,
        comments,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props

    const deleteButton = authenticated && userHandle === handle ? <DeleteButton screamId={screamId} /> : null

    const likeScore = likeCount ? `${likeCount}` : null
    const commentScore = commentCount ? `${commentCount}` : null
    const showComments = this.state.openComment ? <Comments comments={comments} /> : null

    return (
      <div id={screamId} className={styles.wrapper}>
        <div className={styles.postHeader}>
          <img src={userImage} alt={userName} className={styles.profileImage} />
          <Link className={styles.profileLink} to={`/users/${userHandle}`}>
            {userHandle}
          </Link>
        </div>
        <div className={styles.post_body}>
          {body}
          <img src={screamImg} alt={userName} className={styles.postImage} />
        </div>
        <div className={styles.post_footer}>
          <div className={styles.post_icon}>
            <LikeButton screamId={screamId} />
            <span className={styles.likeCount}>{likeScore}</span>
            <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog} />
            <span className={styles.commentScore}>{commentScore}</span>

            {deleteButton}
          </div>
          {showComments}
          <p className={styles.time}>{dayjs(createAt).fromNow()}</p>
          <div className={styles.post_comment}>
            <Textarea
              placeholder="Добавьте комментарий..."
              value={this.state.screamBody}
              handleChange={this.handleChange('screamBody')}></Textarea>
            <Button handleClick={this.handleSubmit} disabled={this.state.screamBody ? '' : 'disabled'}>
              Опубликовать
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  getScream: PropTypes.func.isRequired,
  scream: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapActionsToProps = {
  getScream,
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Post)
