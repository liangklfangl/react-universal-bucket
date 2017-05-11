import React, { PropTypes } from 'react'
import { stretch } from './decorators'

const defaultOptions = [
  15,
  25,
  50,
  100
]

export function PageSizeDropdown({ pageSize, pageActions, options=defaultOptions }) {
  const optionTags = options.map(n =>
    <option key={n} value={n}>{n}</option>
  )

  const setPageSize = e =>
    pageActions.setPageSize(parseInt(e.target.value, 10))

  return (
    <select value={pageSize} onChange={setPageSize}>
      {optionTags}
    </select>
  )
}

PageSizeDropdown.propTypes = {
  pageSize: PropTypes.number,
  pageActions: PropTypes.object,
  options: PropTypes.array
}

export default stretch(PageSizeDropdown)
