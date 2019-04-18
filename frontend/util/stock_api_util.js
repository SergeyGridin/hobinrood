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



