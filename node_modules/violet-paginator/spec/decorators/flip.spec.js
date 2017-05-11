import flip from '../../src/decorators/flip'
import * as shared from './shared'

describe('flip()', () => {
  shared.decorate(flip)
  shared.behavesLikeAFlipper()
})
