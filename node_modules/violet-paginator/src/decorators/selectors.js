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
    results: paginator.get('results'),
    isLoading: paginator.get('isLoading'),
    updating: paginator.get('updating'),
    removing: paginator.get('removing')
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
    stretch,
    sort,
    violetPaginator
  }
}
