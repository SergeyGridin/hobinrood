export const fetchStock = (ticker) => (
  $.ajax({
    url: `api/stocks/${ticker}`
  })
);

export const fetchStocks = () => (
  $.ajax({
    url: 'api/stocks'
  })
);

export const fetchDailyData = ticker => (
  $.ajax({
    method: 'get',
    url: `https://api.iextrading.com/1.0/stock/${ticker}/chart/5y`
  })
);

export const fetchIntradayData = ticker => (
  $.ajax({
    url: `https://api.iextrading.com/1.0/stock/${ticker}/chart/1d`
  })
);

export const fetchInfo = ticker => (
  $.ajax({
    url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${ticker}&types=quote,company,stats`
  })
);

export const fetchStockNews = ticker => (
  $.ajax({
    url: `https://newsapi.org/v2/everything?q=${ticker}&apiKey=53eeb325d1d34dd19167158c3aa45798&sortBy=publishedAt&domains=wsj.com,zacks.com,cnn.com,nytimes.com,seekingalpha.com,bloomberg.com,yahoo.com&language=en`
  })
);

export const fetchIntradayPortfolioData = tickers => (
  $.ajax({
    url: `https://api.iextrading.com/1.0/stock/${tickers}/chart/1d`
  })
);


// export const fetchPortfolioWatchlistPrices = tickers => (
//   $.ajax({
//     url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${tickers}&types=quote`
//   })
// );

export const watchStock = (stock_id) => {
  return $.ajax({
    method: 'POST',
    url: `api/watchlist_items`,
    data: {stock_id}
  });
};

export const unwatchStock = (id) => (
  $.ajax({
    method: 'DELETE',
    url: `api/watchlist_items/${id}`
  })
);


