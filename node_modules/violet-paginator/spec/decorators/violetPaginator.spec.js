import { violetPaginator } from '../../src/decorators'
import * as shared from './shared'

describe('violetPaginator()', () => {
  shared.decorate(violetPaginator)
  shared.behavesLikeAPaginator()
  shared.behavesLikeADataGrid()
  shared.behavesLikeAPageSizer()
  shared.behavesLikeASorter()
})

