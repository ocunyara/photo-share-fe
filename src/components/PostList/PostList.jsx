import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { Post } from 'components/Post/Post'

class PostList extends Component {
  state = {
    screams: null,
  }
  componentDidMount() {
    axios
      .get('screams/')
      .then(res => {
        console.log(res.data)
        this.setState({
          screams: res.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        {this.state.screams ? (
          this.state.screams.map(scream => <Post key={scream.screamId} {...scream} />)
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    )
  }
}

export default PostList
