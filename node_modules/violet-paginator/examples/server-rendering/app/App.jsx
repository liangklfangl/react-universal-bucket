import React, { Component } from 'react'
import { VioletPaginator, VioletDataTable } from 'violet-paginator'
import { connect } from 'react-redux'
import { preloaded } from './recipesConfig'

export default function App() {
  const headers = [{
    field: 'name',
    text: 'Name',
    sortable: false
  }]

  return(
    <div>
      <h1>Hello World!</h1>
      <VioletPaginator listId="recipes" />
      <VioletDataTable listId="recipes" preloaded={preloaded} headers={headers} />
    </div>
  )
}
