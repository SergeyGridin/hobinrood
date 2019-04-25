import React from 'react';
import WatchlistIndexItem from './watchlist_index_item';

const WatchlistIndex = ({ currentUser }) => {
  let tickers = currentUser.watchlist;
  return (
    <div>
      {
        tickers.length > 0 ? (
          <ul>
            {
              tickers.map((ticker, idx) => {
                return (
                  <WatchlistIndexItem currentUser={currentUser} ticker={ticker} key={idx} />
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

export default WatchlistIndex;