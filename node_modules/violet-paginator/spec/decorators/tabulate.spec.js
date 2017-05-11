import { tabulate } from '../../src/decorators'
import * as shared from './shared'

describe('tabulate()', () => {
  shared.decorate(tabulate)
  shared.behavesLikeADataGrid()
})

