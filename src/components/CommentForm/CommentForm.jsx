import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { Textarea } from '../Textarea/Textarea'
import { Button } from '../Button/Button'

import styles from './CommentForm.module.scss'
// Redux stuff
import { connect } from 'react-redux'
import { submitComment } from '../../redux/actions/dataActions'

class CommentForm extends Component {
  state = {
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
    this.props.submitComment(this.props.screamId, { body: this.state.body });
  }

  render() {
    const { authenticated } = this.props
    const errors = this.state.errors

    const commentsFilds = authenticated ? (
      <Fragment>
        <div className={styles.post_comment}>
          <Textarea
            placeholder="Добавьте комментарий..."
            value={this.state.body}
            handleChange={this.handleChange('body')}></Textarea>
          {errors.body}
          <Button handleClick={this.handleSubmit} disabled={this.state.body ? '' : 'disabled'}>
            Опубликовать
          </Button>
        </div>
      </Fragment>
    ) : null

    return commentsFilds
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
})

export default connect(
  mapStateToProps,
  { submitComment },
)(CommentForm)
