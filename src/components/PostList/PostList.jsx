import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Post from 'components/Post/Post'

import { connect } from 'react-redux'
import { getScreams } from '../../redux/actions/dataActions'

class PostList extends Component {
  componentDidMount() {
    this.props.getScreams()
  }

  render() {
    const { screams, loading } = this.props.data

    return (
      <div>{!loading ? screams.map(scream => <Post key={scream.screamId} scream={scream} />) : <p>Loading ...</p>}</div>
    )
  }
}

PostList.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
})

const mapActionsToProps = {
  getScreams,
}

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(PostList)
