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
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createAt, userImage, userHandle } = comment

          return (
            <Fragment key={index}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img src={userImage} alt="comment" className={styles.commentImage} />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={styles.commentData}>
                      <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={styles.invisibleSeparator} />
                      <Typography variabnt="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
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
