import { withRecordProps } from '../../src/decorators'
import * as shared from './shared'

describe('tabulateLean()', () => {
  shared.decorate(withRecordProps)
  shared.behavesLikeADataRow()
})

