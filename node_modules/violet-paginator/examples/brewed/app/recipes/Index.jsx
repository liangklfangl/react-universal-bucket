import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import {
  VioletFlipper,
  VioletDataTable,
  VioletPaginator,
  VioletPageSizeDropdown
} from 'violet-paginator'
import { Link } from 'react-router'

import Loading from './Loading'
import fetchRecipes from './actions'

export class Index extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    fetch: PropTypes.func.isRequired
  }

  nameColumn(recipe) {
    return (
      <Link to={`/recipes/${recipe.get('id')}`}>
        {recipe.get('name')}
      </Link>
    )
  }

  headers() {
    return [{
      field: 'name',
      text: I18n.t('recipes.name')
    }, {
      field: 'created_at',
      text: I18n.t('recipes.created_at')
    }, {
      field: 'boil_time',
      sortable: false,
      text: I18n.t('recipes.boil_time')
    }]
  }

  render() {
    const { fetch, loading } = this.props
    const flipper = (
      <VioletFlipper listId="recipeGrid" />
    )

    return (
      <section>
        <Loading loading={loading} />
        <VioletPageSizeDropdown listId="recipeGrid" />
        <VioletPaginator listId="recipeGrid"  />
        {flipper}
        <VioletDataTable listId="recipeGrid" headers={this.headers()} />
        {flipper}
        <VioletPaginator listId="recipeGrid" />
      </section>
    )
  }
}

export default connect(
  state => ({
    loading: !state.recipes.get('connected')
  }),
  { fetch: fetchRecipes }
)(Index)
