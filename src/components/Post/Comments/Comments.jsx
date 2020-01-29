import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import styles from './Comments.module.scss'

class Comments extends Component {
  render() {
    const { comments } = this.props

    return (
      <Grid container className={styles.commentWrapper}>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment

          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={1}>
                    <img src={userImage} alt="comment" className={styles.commentImage} />
                  </Grid>
                  <Grid item sm={10} className={styles.paddingRigth}>
                    <div className={styles.commentData}>
                      <Typography
                        variant="h5"
                        className={styles.commentUser}
                        component={Link}
                        to={`/users/${userHandle}`}>
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={styles.invisibleSeparator} />
                      <Typography variabnt="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && <hr className={styles.visibleSeparator} />}
            </Fragment>
          )
        })}
      </Grid>
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
}

export default Comments
