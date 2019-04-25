import React from 'react';
import { connect } from 'react-redux';
import { watchStock, unwatchStock } from '../../actions/stock_actions';

class WatchButton extends React.Component {
  handleClick(e) {
    let { currentUser, stock } = this.props
    e.preventDefault();
    if (currentUser.watchlist.includes(stock.ticker)) {
      this.props.unwatchStock(currentUser, stock.id);
    } else {
      this.props.watchStock(currentUser, stock.id);
    }
  }

  render () {
    let { currentUser, stock } = this.props
    const action = currentUser.watchlist.includes(stock.ticker) ? "Remove from" : "Add to";
    return (
      <button onClick={this.handleClick.bind(this)} className="watch-button">
        {action} Watchlist
      </button>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  watchStock: (user, ticker_id) => dispatch(watchStock(user, ticker_id)),
  unwatchStock: (user, ticker_id) => dispatch(unwatchStock(user, ticker_id)),
});

export default connect(null, mapDispatchToProps)(WatchButton);
