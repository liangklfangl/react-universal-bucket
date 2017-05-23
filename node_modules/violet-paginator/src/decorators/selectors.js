import { recordProps } from '../pageInfoTranslator'

export default function select(paginator) {
  const totalPages =
    Math.ceil(paginator.get('totalCount') / paginator.get('pageSize'))

  const page = paginator.get('page')

  const flip = () => ({
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages
  })

  const paginate = () => ({
    currentPage: page,
    totalPages,
    ...flip()
  })

  const tabulate = () => ({
    results: paginator.get('results').toJS(),
    isLoading: paginator.get('isLoading')
  })

  const tabulateLean = () => ({
    ids: paginator.get('results').map(r => r.get(recordProps().identifier)),
    isLoading: paginator.get('isLoading')
  })

  const stretch = () => ({
    pageSize: paginator.get('pageSize')
  })

  const sort = () => ({
    sort: paginator.get('sort'),
    sortReverse: paginator.get('sortReverse')
  })

  const violetPaginator = () => ({
    ...paginate(),
    ...tabulate(),
    ...stretch(),
    ...sort()
  })

  return {
    flip,
    paginate,
    tabulate,
    tabulateLean,
    stretch,
    sort,
    violetPaginator
  }
}
