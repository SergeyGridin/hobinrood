import React from 'react';
import StockIndexItem from './stock_index_item';

const StockIndex = ({ currentUser }) => {
  let tickers = Object.keys(currentUser.stocks);
  return (
    <div>
      {
        tickers.length > 0 ? (
          <ul>
            {
              tickers.map((ticker, idx) => {
                return (
                  <StockIndexItem currentUser={currentUser} ticker={ticker} key={idx}/>
                );
              })
            }
          </ul>
        ) : (
          <div></div>
        )
      }
    </div>
  );
};

export default StockIndex;
