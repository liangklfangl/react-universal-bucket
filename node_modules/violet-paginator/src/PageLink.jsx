import React from 'react'
import { paginate } from './decorators'

export function PageLink({ pageActions, page, currentPage }) {
  const navigate = () =>
    pageActions.goTo(page)

  const pageNumber = <span>{page}</span>
  const link = page === currentPage ? pageNumber : (
    <a onClick={navigate}>{pageNumber}</a>
  )

  return link
}

export default paginate(PageLink)

