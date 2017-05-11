import React, { PropTypes } from 'react'
import { flip } from './decorators'
import { Prev } from './Prev'
import { Next } from './Next'

export function Flipper(props) {
  return (
    <ul className="pagination">
      <li>
        <Prev {...props} />
      </li>
      <li>
        <Next {...props} />
      </li>
    </ul>
  )
}

Flipper.propTypes = {
  hasPreviousPage: PropTypes.bool,
  hasNextPage: PropTypes.bool
}

export default flip(Flipper)
