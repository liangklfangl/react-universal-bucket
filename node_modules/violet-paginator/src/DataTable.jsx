import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'
import SortLink from './SortLink'
import { tabulate } from './decorators'
import { recordProps } from './pageInfoTranslator'

export function DataTable(props) {
  const { results, headers, isLoading, updating, removing, className = 'border' } = props

  if (isLoading) {
    return (
      <center>
        <FontAwesome
          name="spinner"
          spin
          size="5x"
        />
      </center>
    )
  }

  const headerRow = headers.map(h =>
    <th key={h.field}>
      <SortLink
        {...props}
        {...h}
      />
    </th>
  )

  const rows = results.map((r, i) => {
    const columns = headers.map(h => {
      const { field, format } = h
      const data = r.get(field)
      const displayData = (format && format(r, i)) || data

      return (
        <td key={field}>
          {displayData}
        </td>
      )
    })

    const classes = classNames({
      updating: updating.includes(r.get(recordProps().identifier)),
      removing: removing.includes(r.get(recordProps().identifier))
    })

    return (
      <tr className={classes} key={`results-${i}`}>
        {columns}
      </tr>
    )
  })

  return (
    <table className={className}>
      <thead>
        <tr>
          {headerRow}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

DataTable.propTypes = {
  headers: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  results: PropTypes.object,
  updating: PropTypes.object,
  removing: PropTypes.object,
  className: PropTypes.string
}

export default tabulate(DataTable)
