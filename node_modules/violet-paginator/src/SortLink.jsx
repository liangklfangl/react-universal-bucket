import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { sort as decorate } from './decorators'

export function SortLink({ pageActions, field, text, sort, sortReverse, sortable=true }) {
  if (!sortable) {
    return <span>{text}</span>
  }

  const sortByField = () =>
    pageActions.sort(field, !sortReverse)

  const arrow = sort === field && (
    sortReverse ? 'angle-up' : 'angle-down'
  )

  return (
    <a onClick={sortByField}>
      {text} <FontAwesome name={arrow || ''} />
    </a>
  )
}

SortLink.propTypes = {
  sort: PropTypes.string,
  sortReverse: PropTypes.bool,
  pageActions: PropTypes.object,
  field: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  sortable: PropTypes.bool
}

export default decorate(SortLink)

