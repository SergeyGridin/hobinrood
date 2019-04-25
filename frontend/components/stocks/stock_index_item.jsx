import React from 'react';
import { Link } from 'react-router-dom';

const StockIndexItem = ({ currentUser, ticker }) => {
  // debugger
  return (
    <Link to={`/stocks/${ticker}`}>
      <li className='stock-index-item'>
        <div>
          <h5>{ticker}</h5>
          <p>{currentUser.stocks[ticker]} shares</p>
        </div>
        <div>
          <h6>${parseFloat(currentUser.userPrices[ticker].quote.latestPrice)}</h6>
        </div>
      </li>
    </Link>
  );
};

export default StockIndexItem;
