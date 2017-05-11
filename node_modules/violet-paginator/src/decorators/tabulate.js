import decorate from './decorate'
import select from './selectors'

export default function tabulate(Component) {
  return decorate(Component, props => select(props.paginator).tabulate())
}

