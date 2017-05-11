import { stretch } from '../../src/decorators'
import * as shared from './shared'

describe('stretch()', () => {
  shared.decorate(stretch)
  shared.behavesLikeAPageSizer()
})

