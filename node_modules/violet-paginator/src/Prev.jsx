import React from 'react'
import FontAwesome from 'react-fontawesome'
import { flip } from './decorators'

export function Prev({ pageActions, hasPreviousPage }) {
  const prev = <FontAwesome name="chevron-left" />
  const link = hasPreviousPage ? (
    <a onClick={pageActions.prev}>{prev}</a>
  ) : prev

  return link
}

export default flip(Prev)
