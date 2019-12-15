import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { Post } from 'components/Post/Post'

//
// const mockPostList = [
//   {
//     id: 1,
//     user: {
//       id: 1,
//       userPictureSmall: 'https://via.placeholder.com/30',
//       userName: 'maxim.maruhnyak',
//     },
//     location: {
//       id: '1',
//       title: 'Location title',
//       link: 'https://googole.com',
//     },
//   },
//   {
//     id: 2,
//     user: {
//       id: 1,
//       userPictureSmall: 'https://via.placeholder.com/30',
//       userName: 'maxim.maruhnyak',
//     },
//     location: {
//       id: 1,
//       title: 'Location title',
//       link: 'https://googole.com',
//     },
//   },
// ]
//
// export const PostList = ({ postList = mockPostList }) => (
//   <div>
//     {postList.map(post => (
//       <Post key={post.id} {...post} />
//     ))}
//   </div>
// )
//
// PostList.propTypes = {
//   postList: PropTypes.array,
// }

class PostList extends Component {
  state = {
    screams: null,
  }
  componentDidMount() {
    axios
      .get('screams/')
      .then(res => {
        this.setState({
          screams: res.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return <div>{this.state.screams ? this.state.screams.map(scream => <Post {...scream} />) : <p>Loading ...</p>}</div>
  }
}

export default PostList
