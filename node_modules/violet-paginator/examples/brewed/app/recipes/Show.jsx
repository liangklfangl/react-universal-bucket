import { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

export class Show extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    fetch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetch, id } = this.props
    fetch(id)
  }

  render() {
    return false
  }
}

export default connect(
  (_, ownProps) => ({
    id: ownProps.params.id
  }),
  { fetch: actions.fetchRecipe }
)(Show)
