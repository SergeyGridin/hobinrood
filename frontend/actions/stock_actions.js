import * as StockApiUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = 'RECEIVE_STOCK';
export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';

const receiveStock = stock => ({
  type: RECEIVE_STOCK,
  stock
});

const receiveStocks = stocks => ({
  type: RECEIVE_STOCKS,
  stocks
});


export const fetchStock= (stock) => dispatch => (
  StockApiUtil.fetchStock(stock)
    .then(stock => dispatch(receiveStock(stock)))
);

export const fetchStocks = () => dispatch => (
  StockApiUtil.fetchStocks()
    .then(stocks => dispatch(receiveStocks(stocks)))
);
