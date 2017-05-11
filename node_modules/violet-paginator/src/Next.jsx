import React, { PropTypes } from 'react'
import { flip } from './decorators'

export function Next({ pageActions, hasNextPage }) {
  return (
    <button type="button" disabled={!hasNextPage} onClick={pageActions.next}>
      <i className="fa fa-chevron-right" />
    </button>
  )
}

Next.propTypes = {
  pageActions: PropTypes.shape({
    next: PropTypes.func.isRequired
  }).isRequired,
  hasNextPage: PropTypes.bool
}

export default flip(Next)
