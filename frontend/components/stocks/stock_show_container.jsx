import { connect } from 'react-redux';
import StockShow from './stock_show';
import {
  fetchStock,
} from '../../actions/stock_actions';


const mapStateToProps = (state, ownProps) => {
  return {
    stock: state.entities.stocks[ownProps.match.params.ticker],
    currentUser: state.entities.users[state.session.id],
  };
};

const mapDispatchToProps = dispatch => ({
  fetchStock: ticker => dispatch(fetchStock(ticker)),

});

export default connect(mapStateToProps, mapDispatchToProps)(StockShow);
