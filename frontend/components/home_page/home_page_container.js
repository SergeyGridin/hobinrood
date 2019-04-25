import { connect } from 'react-redux';
import HomePage from './home_page';
import { logout, fetchUserInfo } from '../../actions/session_actions';
import { fetchPortfolioWatchlistPrices } from '../../util/stock_api_util';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchUserInfo: (id) => dispatch(fetchUserInfo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
