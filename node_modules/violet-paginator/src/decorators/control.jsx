import React, { PropTypes, Component } from 'react'
import { List } from 'immutable'

export default function control(Table) {
  return class extends Component {
    static propTypes = {
      ids: PropTypes.instanceOf(List).isRequired,
      shouldUpdate: PropTypes.func,
      isLoading: PropTypes.bool
    }

    static defaultProps = {
      shouldUpdate: () => false
    }

    shouldComponentUpdate(nextProps) {
      const { ids, isLoading, shouldUpdate } = this.props

      return !ids.equals(nextProps.ids) ||
        isLoading !== nextProps.isLoading ||
        shouldUpdate(this.props, nextProps)
    }

    render() {
      const { ids, ...rest } = this.props

      return (
        <Table ids={ids.toArray()} {...rest} />
      )
    }
  }
}

