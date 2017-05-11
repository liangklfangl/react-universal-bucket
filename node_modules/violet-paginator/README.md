[![npm](https://img.shields.io/npm/v/violet-paginator.svg)](https://github.com/sslotsky/violet-paginator)
[![npm](https://img.shields.io/npm/dt/violet-paginator.svg)](https://www.npmjs.com/package/violet-paginator)
[![npm](https://img.shields.io/npm/dm/violet-paginator.svg)](https://www.npmjs.com/package/violet-paginator)
[![Build Status](https://travis-ci.org/sslotsky/violet-paginator.svg?branch=master)](https://travis-ci.org/sslotsky/violet-paginator)
[![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/sslotsky/violet-paginator)
[![dependencies](https://david-dm.org/sslotsky/violet-paginator.svg)](https://david-dm.org/sslotsky/violet-paginator)

# violet-paginator

VioletPaginator is a react-redux package allowing users to manage arbitrarily many filtered, paginated lists
of records. We provide a set of premade components including both simple and robust pagination controls,
sort links, and data tables. We also make it ridiculously easy to write your own components and configure
and extend VioletPaginator's default behavior by composing actions.

## Demo

https://sslotsky.github.io/violet-paginator/

## Extended Documentation

https://sslotsky.gitbooks.io/violet-paginator/content/

## Installation

```
npm i --save violet-paginator
```

### Dependencies

The current version of this package includes the following peer dependencies:

```javascript
  "peerDependencies": {
    "immutable": "^3.7.6",
    "react": "^0.14.8 || ^15.1.0",
    "react-redux": "^4.4.4 || 5.x",
    "redux": "^3.4.0"
  },
```

Additionally, it is assumed that you are running some middleware that allows action creators to return
promises, such as [redux-thunk](https://github.com/gaearon/redux-thunk).

Finally, if you wish to use the premade `VioletPaginator` components, it is recommended that you include the `violet`
and `font-awesome` stylesheets as described later in this document.

## Usage

`VioletPaginator` is intended to be flexible so that it can be used in many ways without much fuss. We provide premade components, but our library is broken down into small, exposed pieces that allow you to easily override default settings, abstract core functionality, and create your own components.

### Creating a reducer

Rather than exposing a single reducer, `violet-paginator` uses a
[higher order reducer function](http://redux.js.org/docs/recipes/reducers/ReusingReducerLogic.html#customizing-behavior-with-higher-order-reducers)
that creates a reducer and ties it to a `listId` and a `fetch` function (this has changed since version 1, see the [upgrade guide](https://sslotsky.gitbooks.io/violet-paginator/content/upgrade_guide.html) for details).

```javascript
import { createPaginator } from 'violet-paginator'
import { combineReducers } from 'redux'
import users from './users/reducer'
import { fetch } from './recipes/actions'

export default combineReducers({
  users,
  recipes: createPaginator({
    listId: 'recipes',
    fetch
  })
})
```

### Configuration

VioletPaginator aims to make client-server communication painless. For us, usability means:

1. We know how to read data from your server.
2. We will provide you with the _correctly formatted_ parameters that you need to send to your server.

Because different backends will use different property names for pagination and sorting, we make this 
fully configurable. Example config:

```javascript
import { configurePageParams } from 'violet-paginator'

configurePageParams({
  perPage: 'results_per_page',
  sortOrder: 'sort_reverse',
  sortReverse: true // Means that a boolean will be used to indicate sort direction.
})

```

An example URL with this configuration:

```
https://brewed-dev.herokuapp.com/v1/recipes?page=6&results_per_page=15&sort=name&sort_reverse=true
```

Another example config:

```javascript
configurePageParams({
  perPage: 'page_size',
  sortOrder: 'direction'
})
```

And a corresponding example URL:

```
https://www.example.com/v1/users?page=6&page_size=15&sort=name&direction=asc
```

The complete list of configuration options and their defaults can be found in the [pageInfoTranslator](https://github.com/sslotsky/violet-paginator/blob/master/src/pageInfoTranslator.js):

Property Name | Default Value | Description
---|:---:|:---
page | `'page'` | The page number being requested
perPage | `'pageSize'` | The page size being requested
sort | `'sort'` | The field to sort by when requesting a page
sortOrder | `'sortOrder'` | The sort direction for the requested page
sortReverse | `false` | Use a boolean to indicate sort direction
totalCount | `'total_count'` | The name of the property on the server response that indicates total record count
results | `'results'` | The name of the property on the server that contains the page of results
id | `'id'` | The name of the property on the record to be used as the unique identifer

### Using Premade VioletPaginator Components

The following will display a 3 column data table with full pagination controls above and below the table.
All pagination components require the `listId` prop, and they will use the `fetch` function that was supplied
in the `createPaginator` call to retrieve the results at the appropriate times. _**You never actually call `fetch` yourself.**_
The `VioletDataTable` component also takes an array of headers.

```javascript
import React, { PropTypes } from 'react'
import { VioletDataTable, VioletPaginator } from 'violet-paginator'

export default function RecipeList() {
  const headers = [{
    field: 'name',
    text: 'Name'
  }, {
    field: 'created_at',
    text: 'Date Created'
  }, {
    field: 'boil_time',
    sortable: false,
    text: 'Boil Time'
  }]

  const paginator = (
    <VioletPaginator listId="recipes" />
  )

  return (
    <section>
      {paginator}
      <VioletDataTable listId="recipes" headers={this.headers()} />
      {paginator}
    </section>
  )
}
```

The `fetch` function that you supply to the paginator is an action creator that returns a promise. Therefore,
while [redux-thunk](https://github.com/gaearon/redux-thunk) isn't explicitly required as a peer dependency, you will need to have some such middleware
hooked up that allows action creators to return promises. Below is an example fetch function.

```javascript
export default function fetchRecipes(pageInfo) {
  return () => api.recipes.index(pageInfo.query);
}
```

Unlike most asynchronous action creators, notice that ours has no success and error handlers. `VioletPaginator` has its own
handlers, so supplying your own is not necessary. However, if you wish to handle the response before passing it along to 
`VioletPaginator`, this isn't a problem as long as your success handler returns the response and your failure handler re-throws
for us to catch, like below.

```javascript
export default function fetchRecipes(pageInfo) {
  return dispatch => {
    dispatch({ type: actionTypes.FETCH_RECIPES })
    return api.recipes.index(pageInfo.query).then(resp => {
      dispatch({ type: actionTypes.FETCH_RECIPES_SUCCESS, ...resp.data })
      return resp
    }).catch(error => {
      dispatch({ type: actionTypes.FETCH_RECIPES_ERROR, error })
      throw error
    })
  }
}
```

#### Styling

Our premade components were built to be dispalyed using the [Violet CSS framework](https://github.com/kkestell/violet)
and [Font Awesome](http://fontawesome.io/). We don't expose these stylesheets from our package. We leave it to you to
include those in your project however you see fit. The easiest way is with CDN links:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Work+Sans:400,500">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/violet/0.0.1/violet.min.css">
```

If Violet isn't for you but you still want to use our components, just write your own CSS. Our components
use very few CSS classess, since Violet CSS rules are mostly structural in nature. However, we do recommend
keeping the font-awesome link for displaying the icons.

### Customizing VioletDataTable

By default, the `VioletDataTable` will simply display the raw values from the data that correspond to the headers that
are specified. However, each header can be supplied with a `format` function, which can return a simple value, some markup,
or a full-fledged react component. Example:

```javascript
  const activeColumn = recipe => {
    const icon = recipe.get('active') ? 'check' : 'ban'
    return (
      <FontAwesome name={icon} />
    )
  }

  const headers = [{
    field: 'active',
    sortable: false,
    text: 'Active',
    format: activeColumn
  }, {
    ...
  }]
```

### Composing Actions

`violet-paginator` is a plugin for redux apps, and as such, it dispatches its own actions and stores state in its own reducer. To give you complete control of the pagination state, the API provides access to all of these actions via the [composables](composables.md) and [simpleComposables](simplecomposables.md) functions. This allows you the flexibility to call them directly as part of a more complex operation. The most common use case for this would be [updating an item within the list](updating_items.md). 

As an example, consider a datatable where one column has a checkbox that's supposed to mark an item as active or inactive.
Assuming that you have a `listId` of `'recipes'`, you could write an action creator like this to update the record on the server
and then toggle the active state of the corresponding recipe within the list:

```javascript
import api from 'ROOT/api'
import { composables } from 'violet-paginator'

const pageActions = composables({ listId: 'recipes' })

export function toggleActive(recipe) {
  const data = {
    active: !recipe.get('active')
  }

  return pageActions.updateAsync(
    recipe.get('id'),
    data,
    api.recipes.update(data)
  )
}
```

Now you can bring this action creator into your connected component using `connect` and `mapDispatchToProps`:

```javascript
import { toggleActive } from './actions'

export function Recipes({ toggle }) {
  ...
}

export default connect(
  undefined,
  { toggle: toggleActive }
)(Recipes)
```

Finally, the `format` function for the `active` column in your data table might look like this:

```javascript
  const activeColumn = recipe => (
    <input
      type="checkbox"
      checked={recipe.get('active')}
      onClick={toggle}
    />
  )
```

### Building Custom Components

We understand that every product team could potentially want something different, and our premade components sometimes just won't fit that mold. We want to make it painless
to write your own components, so to accomplish that, we made sure that it was every bit as painless to write ours. The best way to see how to build a custom component
is to look at some of the simpler premade components. For example, here's a link that retrieves the next page of records:

```javascript
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
```

And here's a link that can sort our list in either direction by a given field name:

```javascript
import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { sort as decorate } from './decorators'

export function SortLink({ pageActions, field, text, sort, sortReverse, sortable=true }) {
  if (!sortable) {
    return <span>{text}</span>
  }

  const sortByField = () =>
    pageActions.sort(field, !sortReverse)

  const arrow = sort === field && (
    sortReverse ? 'angle-up' : 'angle-down'
  )

  return (
    <a onClick={sortByField}>
      {text} <FontAwesome name={arrow || ''} />
    </a>
  )
}

SortLink.propTypes = {
  sort: PropTypes.string,
  sortReverse: PropTypes.bool,
  pageActions: PropTypes.object,
  field: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  sortable: PropTypes.bool
}

export default decorate(SortLink)

```

These components are simple and small enough to be written as pure functions rather than classes, and you should be able
to accomplish the same. As you might have guessed, we expose the `flip` and `sorter` functions that are being called as the default export
for our components, and those functions decorate your components with props that allow you to read and update the pagination state.
The only prop that callers need to supply to these components is
a `listId`, and one or two additional props in some cases. Simply import our decorators into your custom component:

```javascript
import { decorators } from 'violet-paginator'
```

and you are ready to roll your own:

```javascript
// Supports 'previous' and 'next' links
export defaut decorators.flip(MyFlipperComponent)

// Supports full pagination controls
export default decorators.paginate(MyPaginationComponent)

// Supports grids/datatables
export default decorators.tabulate(MyDataGridComponent)

// Supprts controls for changing the page size
export default decorators.stretch(MyPageSizeDropdown)

// Supports a control for sorting the list by the field name
export default decorators.sort(MySortLink)

// The kitchen sink! Injects properties from all decorators
export default decorators.violetPaginator(MyPaginatedGridComponent)
```

For more on using decorators or creating your own, [check the docs on decorators](the_paginationwrapper.md).

## Contributing

If you wish to contribute, please create a fork and submit a pull request, which will be reviewed as soon as humanly possible. A couple of
key points:

1. Don't check in any changes to the `lib` folder. When we are ready to publish a new version, we will do a build and commit the `lib` changes and the new version number.
2. Add tests for your feature, and make sure all existing tests still pass and that the code passes lint (described further below).

### Testing

This package is tested with mocha. The project uses CI through Travis which includes running tests, linting, and code coverage.
Please make sure to write tests for any new pull requests. Code coverage will block the PR if your code is not sufficiently covered.
