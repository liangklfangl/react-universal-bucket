let [
  pageParam,
  pageSizeParam,
  sortParam,
  sortOrderParam,
  useBooleanOrdering,
  totalCountProp,
  resultsProp,
  idProp
] = [
  'page',
  'pageSize',
  'sort',
  'sortOrder',
  false,
  'total_count',
  'results',
  'id'
]

export function responseProps() {
  return [totalCountProp, resultsProp]
}

export function recordProps() {
  return { identifier: idProp }
}

export function configurePageParams({
  page,
  perPage,
  sort,
  sortOrder,
  sortReverse,
  totalCount,
  results,
  id
}) {
  if (page) {
    pageParam = page
  }

  if (perPage) {
    pageSizeParam = perPage
  }

  if (sort) {
    sortParam = sort
  }

  if (sortOrder) {
    sortOrderParam = sortOrder
  }

  if (totalCount) {
    totalCountProp = totalCount
  }

  if (results) {
    resultsProp = results
  }

  if (id) {
    idProp = id
  }

  useBooleanOrdering = !!sortReverse
}

function sortDirection(value) {
  if (useBooleanOrdering) {
    return value
  }

  return value ? 'desc' : 'asc'
}

function sortParams(paginator) {
  if (paginator.get('sort')) {
    return {
      [sortParam]: paginator.get('sort'),
      [sortOrderParam]: sortDirection(paginator.get('sortReverse'))
    }
  }

  return {}
}

export function translate(paginator) {
  const {
    id,
    page,
    pageSize,
    filters
  } = paginator.toJS()

  return {
    id,
    query: {
      [pageParam]: page,
      [pageSizeParam]: pageSize,
      ...sortParams(paginator),
      ...filters
    }
  }
}
