import decorate from './decorate'
import select from './selectors'

export default function sort(Component) {
  return decorate(Component, props => select(props.paginator).sort())
}

