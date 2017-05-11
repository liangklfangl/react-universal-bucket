import decorate from './decorate'
import select from './selectors'

export default function flip(Component) {
  return decorate(Component, props => select(props.paginator).flip())
}
