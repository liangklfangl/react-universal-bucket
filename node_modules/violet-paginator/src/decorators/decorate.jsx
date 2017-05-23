import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import { PaginationWrapper, connector } from '../containers/PaginationWrapper'

function wrap(Component, decorator) {
  const Wrapped = (props) => {
    const { paginator, ...rest } = props

    return (
      <PaginationWrapper paginator={paginator} {...rest}>
        <Component
          {...rest}
          {...decorator(props)}
        />
      </PaginationWrapper>
    )
  }

  Wrapped.propTypes = {
    paginator: PropTypes.instanceOf(Map)
  }

  return Wrapped
}

export default function decorate(Component, decorator) {
  return connector(wrap(Component, decorator))
}

