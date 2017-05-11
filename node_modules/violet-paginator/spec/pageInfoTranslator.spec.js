import expect from 'expect'
import {
  translate,
  configurePageParams,
  responseProps,
  recordProps
} from '../src/pageInfoTranslator'
import { defaultPaginator } from '../src/reducer'

describe('configurePageParams', () => {
  beforeEach(() => {
    configurePageParams({
      totalCount: 'total_records',
      results: 'records',
      id: 'uuid',
      page: 'page_num',
      perPage: 'limit',
      sort: 'order',
      sortOrder: 'direction'
    })
  })

  afterEach(() => {
    configurePageParams({
      totalCount: 'total_count',
      results: 'results',
      id: 'id',
      page: 'page',
      perPage: 'pageSize',
      sort: 'sort',
      sortOrder: 'sortOrder'
    })
  })

  it('can override the totalCountProp', () => {
    const [totalCountProp] = responseProps()
    expect(totalCountProp).toEqual('total_records')
  })

  it('can override the resultsProp', () => {
    const [_, resultsProp] = responseProps()
    expect(resultsProp).toEqual('records')
  })

  it('can override the idProp', () => {
    const { identifier } = recordProps()
    expect(identifier).toEqual('uuid')
  })

  it('can override the page param', () => {
    const pageInfo = translate(defaultPaginator)
    expect(pageInfo.query.page_num).toExist()
  })

  it('can override the page size param', () => {
    const pageInfo = translate(defaultPaginator)
    expect(pageInfo.query.limit).toExist()
  })

  it('can override the sort param', () => {
    const pageInfo = translate(defaultPaginator.set('sort', 'name'))
    expect(pageInfo.query.order).toExist()
  })

  it('can override the sort order param', () => {
    const pageInfo = translate(defaultPaginator.set('sort', 'name'))
    expect(pageInfo.query.direction).toExist()
  })

  context('when sortReverse is used', () => {
    beforeEach(() => {
      configurePageParams({ sortReverse: true })
    })

    afterEach(() => {
      configurePageParams({ sortReverse: false })
    })

    it('uses a boolean to indicate the sort order', () => {
      const pageInfo = translate(defaultPaginator.set('sort', 'name'))
      expect(pageInfo.query.direction).toBe(false)
    })
  })
})
