import decorate from './decorate'
import select from './selectors'

export default function stretch(Component) {
  return decorate(Component, props => select(props.paginator).stretch())
}

