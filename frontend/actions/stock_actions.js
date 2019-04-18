import * as StockApiUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = 'RECEIVE_STOCK';
export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';
export const RECEIVE_INTRADAY_DATA = 'RECEIVE_INTRADAY_DATA';
export const RECEIVE_DAILY_DATA = 'RECEIVE_DAILY_DATA';
export const RECEIVE_INFO = 'RECEIVE_INFO';
export const RECEIVE_STOCK_NEWS = 'RECEIVE_STOCK_NEWS';



const receiveStock = stock => ({
  type: RECEIVE_STOCK,
  stock
});

const receiveStocks = stocks => ({
  type: RECEIVE_STOCKS,
  stocks
});

const receiveIntradayData = (ticker, data) => ({
  type: RECEIVE_INTRADAY_DATA,
  ticker,
  data
});

const receiveDailyData = (ticker, data) => ({
  type: RECEIVE_DAILY_DATA,
  ticker,
  data
});

const receiveInfo = (ticker, stockInfo) => ({
  type: RECEIVE_INFO,
  ticker,
  stockInfo
});

const receiveStockNews = (ticker, news) => ({
  type: RECEIVE_STOCK_NEWS,
  ticker,
  news
});


export const fetchStock = ticker => dispatch => (

  StockApiUtil.fetchStock(ticker)
    .then(stock => dispatch(receiveStock(stock)))
    .then( () => Promise.all([
        dispatch(fetchIntradayData(ticker)),
        dispatch(fetchDailyData(ticker)),
        dispatch(fetchInfo(ticker)),
        dispatch(fetchStockNews(ticker))
      ])
    )
);


export const fetchStocks = () => dispatch => (
  StockApiUtil.fetchStocks()
    .then(stocks => dispatch(receiveStocks(stocks)))
);

export const fetchIntradayData = ticker => dispatch => (
  StockApiUtil.fetchIntradayData(ticker)
    .then(data => dispatch(receiveIntradayData(ticker, data)))
);

export const fetchDailyData = ticker => dispatch => (
  StockApiUtil.fetchDailyData(ticker)
    .then(data => dispatch(receiveDailyData(ticker, data)))
);

export const fetchInfo = ticker => dispatch => (
  StockApiUtil.fetchInfo(ticker)
    .then(stockInfo => dispatch(receiveInfo(ticker, stockInfo[ticker])))
);

export const fetchStockNews = ticker => dispatch => (
  StockApiUtil.fetchStockNews(ticker)
    .then(news => dispatch(receiveStockNews(ticker, news.articles)))
);

