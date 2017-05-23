import React from 'react'
import { PaginationWrapper, connector } from '../containers/PaginationWrapper'

export default function decorate(Component, decorator) {
  return connector(props => (
    <PaginationWrapper {...props}>
      <Component
        {...props}
        {...decorator(props)}
      />
    </PaginationWrapper>
  ))
}

