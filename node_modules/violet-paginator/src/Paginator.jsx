import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'

import paginate from './decorators/paginate'
import range from './lib/range'
import { PageLink } from './PageLink'
import { Prev } from './Prev'
import { Next } from './Next'

export function Paginator(props) {
  const { currentPage, totalPages, hasPreviousPage, hasNextPage } = props

  const upperOffset = Math.max(0, (currentPage - totalPages) + 3)
  const minPage = Math.max(props.currentPage - 3 - upperOffset, 1)
  const maxPage = Math.min(minPage + 6, totalPages)
  const prevClasses = classNames({ disabled: !hasPreviousPage })
  const nextClasses = classNames({ disabled: !hasNextPage })

  const pageLinks = [...range(minPage, maxPage)].map(page => {
    const pageLinkClass = classNames({ current: page === currentPage })

    return (
      <li className={pageLinkClass} key={page}>
        <PageLink {...props} page={page} />
      </li>
    )
  })

  const separator = totalPages > 7 ? (
    <li className="skip">
      <FontAwesome name="ellipsis-h" />
    </li>
  ) : false

  const begin = separator && minPage > 1 ? (
    <li>
      <PageLink {...props} page={1} />
    </li>
  ) : false

  const end = separator && maxPage < totalPages ? (
    <li>
      <PageLink {...props} page={totalPages} />
    </li>
  ) : false

  return (
    <ul className="pagination">
      <li className={prevClasses}>
        <Prev {...props} />
      </li>
      {begin}
      {begin && separator}
      {pageLinks}
      {end && separator}
      {end}
      <li className={nextClasses}>
        <Next {...props} />
      </li>
    </ul>
  )
}

Paginator.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  hasPreviousPage: PropTypes.bool,
  hasNextPage: PropTypes.bool
}

export default paginate(Paginator)
