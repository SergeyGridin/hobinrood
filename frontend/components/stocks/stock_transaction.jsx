import React from 'react';
import WatchButton from './watch_button';

class StockTransaction extends React.Component {
  constructor(props) {
    super(props);
    let { stock } = this.props;

    let currPrice = stock.currentPrice;

    this.state = {
      stock_id: stock.id,
      num_shares: '',
      order_type: 'buy',
      cost: '0.00',
      currPrice,
      submitted: ''
    };
    this.update = this.update.bind(this);
    this.updateType = this.updateType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  update(e) {
    this.setState({ num_shares: e.target.value });
    this.updateCost(e.target.value);
  }

  updateCost(num_shares) {
    if (num_shares === '') {
      num_shares = '0';
      this.setState({ cost: '0.00' });
    } else {
      let cost = Math.round((parseFloat(num_shares) * parseFloat(this.state.currPrice)) * 100) / 100;
      this.setState({ cost });
    }
  }

  updateType(order_type) {
    this.setState({ order_type });
  }

  handleSubmit(e) {
    this.props.receiveErrors([]);
    e.preventDefault();
    this.setState({ submitted: true });

    let { stock_id, num_shares, order_type, currPrice } = this.state;
    let transaction = {
      stock_id,
      num_shares: parseInt(num_shares),
      order_type,
      price: currPrice
    };


    this.props.createTransaction(transaction)
      .then(() => this.setState({ num_shares: '', cost: '0.00', submitted: '' }))
      .then(() => this.props.fetchUserInfo(this.props.currentUser));

    this.setState({ num_shares: '', cost: '0.00', submitted: '' });
  }

  renderSellButton() {
    const { currentUser, stock } = this.props;
    let numShares = currentUser.stocks[stock.ticker];
    if (numShares > 0) {
      return <a className={this.state.order_type === 'sell' ? 'active' : ''} onClick={() => this.updateType('sell')}>Sell {`${stock.ticker}`}</a>;
    }
    return null;
  }

  renderLimit() {
    const { currentUser, stock } = this.props;
    let shares = currentUser.stocks[stock.ticker] || 0;

    return this.state.order_type === 'buy' ? (
      <div className="buying-power">
        <h4>${this.financial(currentUser.balance)} Buying Power Available</h4>
      </div>
    ) : (
        <div className="buying-power">
          <h4>{shares} Shares Available</h4>
        </div>
      );
  }

  financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  render() {

    const { stock, currentUser, errors } = this.props;
    return (
      <div className="outer-transaction">
        <div className="stock-transaction">
          <h3>
            <a className={this.state.order_type === 'buy' ? 'active' : ''} onClick={() => this.updateType('buy')}>Buy {`${stock.ticker}`}</a>
            {this.renderSellButton()}
          </h3>
          <form onSubmit={this.handleSubmit}>
            <div className='transaction-shares'>
              <h4>Shares</h4>
              <input type='text' placeholder='0' value={this.state.num_shares} onChange={this.update} />
            </div>
            <div className='transaction-price'>
              <h4>Market Price</h4>
              <p>${this.financial(stock.currentPrice)}</p>
            </div>
            <div className='transaction-cost'>
              <h4>Estimated Cost</h4>
              <p>${this.financial(parseFloat(this.state.cost))}</p>
            </div>
            <div className='transaction-errors'>
              <ul>
                {errors.map((error, i) => {
                  return (
                    <div key={i} className="session-errors-li">
                      <svg width="16" height="16" viewBox="0 0 16 16"><g fillRule="evenodd" transform="translate(0 -2)"><circle cx="8" cy="10" r="8"></circle><text fontFamily="DINPro-Black, DINPro" fontSize="11.5" fontWeight="700" letterSpacing=".048" fill="#fff"><tspan x="5.729" y="14">!</tspan></text></g></svg><li className="error-li" key={i}>{error}</li>
                    </div>
                  )
                })}
              </ul>
            </div>
            <div className='transaction-submit'>
              <input
                type="submit"
                value={`SUBMIT ${this.state.order_type.toUpperCase()}`}
                disabled={this.state.submitted}
              />
            </div>
          </form>
          {this.renderLimit()}
        </div>
        <div>
          <WatchButton currentUser={currentUser} stock={stock} />
        </div>

      </div>
    );
  }
}

export default StockTransaction;