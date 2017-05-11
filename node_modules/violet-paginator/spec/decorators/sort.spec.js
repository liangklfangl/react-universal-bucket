import { sort } from '../../src/decorators'
import * as shared from './shared'

describe('sort()', () => {
  shared.decorate(sort)
  shared.behavesLikeASorter()
})

