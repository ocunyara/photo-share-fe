import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class Comments extends Component {
  render() {
    const { comments } = this.props

    return (
      <Fragment>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment

          return <div key={index}>{body}</div>
        })}
      </Fragment>
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
}

export default Comments
