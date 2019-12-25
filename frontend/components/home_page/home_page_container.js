import { connect } from "react-redux";
import HomePage from "./home_page";
import {
  logout,
  fetchUserInfo,
  fetchCompleteUserInfo,
  fetchHistoricalUserInfo
} from "../../actions/session_actions";
import { fetchPortfolioWatchlistPrices } from "../../util/stock_api_util";

const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchUserInfo: id => dispatch(fetchUserInfo(id)),
  fetchCompleteUserInfo: id => dispatch(fetchCompleteUserInfo(id)),
  fetchHistoricalUserInfo: id => dispatch(fetchHistoricalUserInfo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
