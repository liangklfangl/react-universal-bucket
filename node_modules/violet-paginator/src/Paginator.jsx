import React, { PropTypes } from 'react'
import classNames from 'classnames'

import paginate from './decorators/paginate'
import range from './lib/range'
import { PageNumber } from './PageNumber'
import { Prev } from './Prev'
import { Next } from './Next'

export function Paginator(props) {
  const { currentPage, totalPages } = props

  const upperOffset = Math.max(0, (currentPage - totalPages) + 3)
  const minPage = Math.max(props.currentPage - 3 - upperOffset, 1)
  const maxPage = Math.min(minPage + 6, totalPages)

  const pageLinks = [...range(minPage, maxPage)].map(page => {
    const pageLinkClass = classNames({ current: page === currentPage })

    return (
      <li className={pageLinkClass} key={page}>
        <PageNumber {...props} page={page} />
      </li>
    )
  })

  const separator = totalPages > 7 ? (
    <li className="skip">
      <i className="fa fa-ellipsis-h" />
    </li>
  ) : false

  const begin = separator && minPage > 1 ? (
    <li>
      <PageNumber {...props} page={1} />
    </li>
  ) : false

  const end = separator && maxPage < totalPages ? (
    <li>
      <PageNumber {...props} page={totalPages} />
    </li>
  ) : false

  return (
    <ul className="pagination">
      <li>
        <Prev {...props} />
      </li>
      {begin}
      {begin && separator}
      {pageLinks}
      {end && separator}
      {end}
      <li>
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
