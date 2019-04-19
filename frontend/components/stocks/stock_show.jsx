import React from 'react';
import NavBar from '../nav_bar/nav_bar';
import StockChart from '../charts/stock_chart';
import StockAbout from './stock_about';
import StockNews from './stock_news';


class StockShow extends React.Component {

  componentDidMount() {
    this.props.fetchStock(this.props.match.params.ticker);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.ticker !== prevProps.match.params.ticker) {
      const ticker = this.props.match.params.ticker;
      this.props.fetchStock(ticker);
    }
  }
  
  render() {
    const { currentUser, logout, stock } = this.props;
    return (
      
      <div>
        <NavBar currentUser={currentUser} logout={logout} />
        {
          stock && stock.intradayData && stock.dailyData ? 
            <div className="stock-dashboard">
              <StockChart stock={stock} />
              <StockAbout stock={stock} />
              <StockNews news={stock.news} />
            </div>
            // <div>
            //   {/* BUY/SELL goes HERE */}
            // </div>
          : 
          <div>wait</div>
        }
      </div>
    )

  }
}

export default StockShow;
