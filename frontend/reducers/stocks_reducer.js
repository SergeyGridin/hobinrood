import {
  RECEIVE_STOCK,
  RECEIVE_STOCKS,
  RECEIVE_INTRADAY_DATA,
  RECEIVE_DAILY_DATA,
  RECEIVE_INFO,
  RECEIVE_STOCK_NEWS
} from '../actions/stock_actions';
import merge from 'lodash/merge';

const stocksReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = merge({}, state);
  switch (action.type) {
    case RECEIVE_STOCK:
      nextState[action.stock.ticker] = action.stock;
      return nextState;
    case RECEIVE_STOCKS:
      nextState.stocks = action.stocks;
      return nextState;
    case RECEIVE_INTRADAY_DATA:
      nextState[action.ticker].intradayData = action.data;
      return nextState;
    case RECEIVE_DAILY_DATA:
      nextState[action.ticker].dailyData = action.data;
      return nextState;
    case RECEIVE_INFO:
      nextState[action.ticker].ceo = action.stockInfo.company.CEO;
      nextState[action.ticker].shortDescription = action.stockInfo.company.description;
      nextState[action.ticker].exchange = action.stockInfo.company.exchange;
      nextState[action.ticker].industry = action.stockInfo.company.industry;
      nextState[action.ticker].sector = action.stockInfo.quote.sector;
      nextState[action.ticker].marketCap = action.stockInfo.quote.marketCap;
      nextState[action.ticker].peRatio = action.stockInfo.quote.peRatio;
      nextState[action.ticker].avgVolume = action.stockInfo.quote.avgTotalVolume;
      nextState[action.ticker].divYield = action.stockInfo.stats.dividendYield;
      nextState[action.ticker].high = action.stockInfo.quote.high;
      nextState[action.ticker].low = action.stockInfo.quote.low;
      nextState[action.ticker].yearHigh = action.stockInfo.quote.week52High;
      nextState[action.ticker].yearLow = action.stockInfo.quote.week52Low;
      nextState[action.ticker].currentPrice = action.stockInfo.quote.latestPrice;
      return nextState;
    case RECEIVE_STOCK_NEWS:
      nextState[action.ticker].news = action.news;
      return nextState;
    default:
      return state;
  }
};

export default stocksReducer;
