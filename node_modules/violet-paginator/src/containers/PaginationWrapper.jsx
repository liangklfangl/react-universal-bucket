import { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import composables from '../actions'
import { defaultPaginator } from '../reducer'
import { preloadedPaginator } from '../lib/stateManagement'

export const connector = connect(
  (state, ownProps) => ({
    paginator: preloadedPaginator(state, ownProps.listId, ownProps.preloaded)
  }),
  (dispatch, ownProps) => ({
    pageActions: bindActionCreators(composables(ownProps), dispatch)
  })
)

export class PaginationWrapper extends Component {
  static propTypes = {
    pageActions: PropTypes.object.isRequired,
    paginator: PropTypes.object,
    children: PropTypes.element.isRequired
  }

  static defaultProps = {
    paginator: defaultPaginator
  }

  componentDidMount() {
    const { paginator, pageActions } = this.props

    if (!paginator.get('initialized')) {
      pageActions.initialize()
    }

    this.reloadIfStale(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.reloadIfStale(nextProps)
  }

  reloadIfStale(props) {
    const { paginator, pageActions } = props
    if (paginator.get('stale') && !paginator.get('isLoading') && !paginator.get('loadError')) {
      pageActions.reload()
    }
  }

  render() {
    return this.props.children
  }
}
