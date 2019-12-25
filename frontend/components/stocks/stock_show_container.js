import { connect } from "react-redux";
import StockShow from "./stock_show";
import { logout, fetchUserInfo } from "./../../actions/session_actions";
import { fetchStock } from "../../actions/stock_actions";
import {
  createTransaction,
  receiveErrors
} from "../../actions/transaction_actions";

const mapStateToProps = (state, ownProps) => {
  // debugger;
  return {
    stock: state.entities.stocks[ownProps.match.params.ticker],
    currentUser: state.entities.users[state.session.id],
    errors: state.errors.transaction
  };
};

const mapDispatchToProps = dispatch => ({
  fetchStock: ticker => dispatch(fetchStock(ticker)),
  createTransaction: transaction => dispatch(createTransaction(transaction)),
  fetchUserInfo: id => dispatch(fetchUserInfo(id)),
  receiveErrors: errors => dispatch(receiveErrors(errors)),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockShow);
