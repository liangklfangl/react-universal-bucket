import decorate from './decorate'
import select from './selectors'

export default function paginate(Component) {
  return decorate(Component, props => select(props.paginator).paginate())
}

