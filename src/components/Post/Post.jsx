import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import styles from './Post.module.scss'

import { Button } from '../Button/Button'
import { Textarea } from '../Textarea/Textarea'
import DeleteButton from '../DeleteButton/DeleteButton'
import LikeButton from '../LikeButton/LikeButton'
import { connect } from 'react-redux'

class Post extends Component {
  constructor() {
    super()

    this.state = {
      screamBody: '',
    }
  }

  handleChange = fildName => value => {
    this.setState({
      [fildName]: value,
    })
    console.log(this.state.screamBody)
  }

  handleSubmit = () => {
    console.log(this.state.screamBody)
  }

  render() {
    dayjs.extend(relativeTime)

    const {
      scream: { createAt, body, userImage, userHandle, userName, screamId, screamImg, likeCount },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props

    const deleteButton = authenticated && userHandle === handle ? <DeleteButton screamId={screamId} /> : null

    return (
      <div id={screamId} className={styles.wrapper}>
        <div className={styles.postHeader}>
          <img src={userImage} alt={userName} className={styles.profileImage} />
          <Link className={styles.profileLink} to={`/users/${userHandle}`}>
            {userHandle}
          </Link>
        </div>
        <div className={styles.post_body}>
          <img src={screamImg} alt={userName} className={styles.postImage} />
        </div>
        <div className={styles.post_footer}>
          <div className={styles.post_link}>
            <LikeButton screamId={screamId} />
            <span className={styles.like_count}>{likeCount} Likes</span>
            {deleteButton}
          </div>
          <div className={styles.post_text}>
            <Link className={styles.profileLink} to={`/users/${userHandle}`}>
              {userHandle}
            </Link>
            {body}
          </div>
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
  scream: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapActionsToProps = {}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Post)
