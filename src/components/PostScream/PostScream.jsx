import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './PostScream.module.scss'

import { Button } from '../Button/Button'
import { Textarea } from '../Textarea/Textarea'

import { connect } from 'react-redux'
import { postScream } from '../../redux/actions/dataActions'
import { Errors } from '../Errors/Errors'

class PostScream extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' })
    }
  }

  handleChange = fildName => value => {
    this.setState({
      [fildName]: value,
    })
  }

  handleSubmit = () => {
    this.props.postScream({ body: this.state.body })
    this.setState({
      errors: {},
    })
  }

  render() {
    const {
      UI: { loading },
    } = this.props

    const { errors } = this.state

    return (
      <div>
        <Textarea
          value={this.state.body}
          placeholder="Post body"
          handleChange={this.handleChange('body')}
          name="body"></Textarea>
        <Button handleClick={this.handleSubmit} isLoading={loading}>
          Add post
        </Button>
        <Errors>{errors.body}</Errors>
      </div>
    )
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  UI: state.UI,
})

export default connect(
  mapStateToProps,
  { postScream },
)(PostScream)
