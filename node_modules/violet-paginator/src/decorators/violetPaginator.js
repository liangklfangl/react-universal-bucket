import decorate from './decorate'
import select from './selectors'

export default function violetPaginator(Component) {
  return decorate(Component, props => select(props.paginator).violetPaginator())
}

