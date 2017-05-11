const results = [{
  name: 'Ewe and IPA'
}, {
  name: 'Pouty Stout'
}]

export const preloaded = {
  results: results.slice(0, 1),
  totalCount: 2
}

const mockFetch = pageInfo => () => {
  const data = {
    ...preloaded,
    results: results.slice(pageInfo.query.page - 1, pageInfo.query.page)
  }

  return Promise.resolve({ data })
}

export default {
  listId: 'recipes',
  fetch: mockFetch,
  pageParams: {
    totalCountProp: 'totalCount'
  },
  initialSettings: {
    pageSize: 1
  }
}
