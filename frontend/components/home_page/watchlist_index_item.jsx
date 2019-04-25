import React from 'react';
import { Link } from 'react-router-dom';

const WatchlistIndexItem = ({ currentUser, ticker }) => {

  return (
    <Link to={`/stocks/${ticker}`}>
      <li className='stock-index-item'>
        <div>
          <h5>{ticker}</h5>
        </div>
        <div>
          <h6>${parseFloat(currentUser.userPrices[ticker].quote.latestPrice)}</h6>
        </div>
      </li>
    </Link>
  );
};

export default WatchlistIndexItem;