import React from 'react';
import { NavLink } from 'react-router-dom';

class StockSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
      hidden: false
    };
    this.renderStocks = this.renderStocks.bind(this);
    this.addHiddenClass = this.addHiddenClass.bind(this);
    this.removeHiddenClass = this.removeHiddenClass.bind(this);
  }

  componentDidMount() {
    if (!this.props.stocks) {
      this.props.fetchStocks();
    }
  }

  renderStocks() {
    const { stocks } = this.props;
    let foundStocks;
    if (stocks && this.state.inputVal.length > 0) {
      foundStocks = stocks.filter( (stock) => {
        return (stock.ticker.includes(this.state.inputVal.toUpperCase()));
      }).slice(0, 6);
      return (
        <ul className={this.state.hidden ? "search-res hide" : "search-res"}>
          <h4 key="header">Stocks</h4>
          {
            foundStocks.map( (stock, idx) => {
              return (
                <NavLink key={idx} to={`/stocks/${stock.ticker}`}>
                  <li key={idx} className="search-res-item" onClick={this.addHiddenClass}>
                    <p className='search-ticker'>{stock.ticker}</p>
                    <p className='search-name'>{stock.name}</p>
                  </li>
                </NavLink>
              );
            })
          }
        </ul>
      );
    } else {
      return (
        <div></div>
      );
    }

  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  addHiddenClass() {
    this.setState({ hidden: true });
  }

  removeHiddenClass() {
    this.setState({ hidden: false });
  }

  render() {
    return (
      <div className='stock-search'>
        <div className='search-bar' onClick={this.removeHiddenClass}>
          {/* <i className='fas fa-search'></i> */}
          <input
            type="text"
            placeholder="Search"
            value={this.state.inputVal}
            onChange={this.update("inputVal")}
            />
        </div>
        {this.renderStocks()}
      </div>
    );
  }
}

export default StockSearchBar;
