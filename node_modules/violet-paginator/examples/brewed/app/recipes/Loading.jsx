import React, { Component, PropTypes } from 'react'
import DropModal from 'boron/DropModal'

export default class Loading extends Component {
  static propTypes = {
    loading: PropTypes.bool
  }

  componentDidMount() {
    if (this.props.loading) {
      this.modal.show()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading) {
      this.modal.show()
    } else {
      setTimeout(() => {
        this.modal.hide()
      }, 1000)
    }
  }

  render() {
    return (
      <DropModal ref={node => this.modal = node}>
        <div className="alert">
          <h1>Connecting to Brewed API...</h1>
        </div>
      </DropModal>
    )
  }
}

