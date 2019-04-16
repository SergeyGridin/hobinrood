import { connect } from 'react-redux';
import StockSearchBar from './stock_search_bar';
import { fetchStocks } from '../../actions/stock_actions';

const mapStateToProps = state => ({
  stocks: state.entities.stocks.stocks
});

const mapDispatchToProps = dispatch => ({
  fetchStocks: () => dispatch(fetchStocks())
});

export default connect(mapStateToProps, mapDispatchToProps)(StockSearchBar);
