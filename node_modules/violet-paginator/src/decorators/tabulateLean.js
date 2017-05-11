import decorate from './decorate'
import select from './selectors'
import control from './control'

export default function tabulateLean(Table) {
  return decorate(control(Table), props => select(props.paginator).tabulateLean())
}

