import React from 'react'
import FontAwesome from 'react-fontawesome'
import { flip } from './decorators'

export function Next({ pageActions, hasNextPage }) {
  const next = <FontAwesome name="chevron-right" />
  const link = hasNextPage ? (
    <a onClick={pageActions.next}>{next}</a>
  ) : next

  return link
}

export default flip(Next)
