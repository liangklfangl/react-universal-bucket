import React, { PropTypes } from 'react'
import { sort as decorate } from './decorators'

export function ColumnHeader({ pageActions, field, text, sort, sortReverse, sortable=true }) {
  if (!sortable) {
    return <span>{text}</span>
  }

  const sortByField = () =>
    pageActions.sort(field, !sortReverse)

  const arrow = sort === field && (
    sortReverse ? 'sort-desc' : 'sort-asc'
  )

  const icon = arrow || 'sort'

  return (
    <button onClick={sortByField}>
      {text}
      <i className={`fa fa-${icon}`} />
    </button>
  )
}

ColumnHeader.propTypes = {
  sort: PropTypes.string,
  sortReverse: PropTypes.bool,
  pageActions: PropTypes.object,
  field: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  sortable: PropTypes.bool
}

export default decorate(ColumnHeader)

