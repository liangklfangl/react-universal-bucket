import React, { PropTypes } from 'react'
import classNames from 'classnames'

export default function TableRow({ record, index, updating, removing, headers }) {
  const classes = classNames({ updating, removing })
  const columns = headers.map(h => {
    const { field, format } = h
    const data = record[field]
    const displayData = (format && format(record, index)) || data

    return (
      <td key={field}>
        {displayData}
      </td>
    )
  })

  return (
    <tr className={classes}>
      {columns}
    </tr>
  )
}

TableRow.propTypes = {
  record: PropTypes.object.isRequired,
  updating: PropTypes.bool,
  removing: PropTypes.bool,
  index: PropTypes.number.isRequired,
  headers: PropTypes.arrayOf(PropTypes.shape({
    format: PropTypes.func,
    field: PropTypes.string.isRequired
  })).isRequired
}
