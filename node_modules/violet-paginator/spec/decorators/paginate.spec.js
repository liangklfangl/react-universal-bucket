import paginate from '../../src/decorators/paginate'
import * as shared from './shared'

describe('paginate()', () => {
  shared.decorate(paginate)
  shared.behavesLikeAPaginator()
})

