import {
  RECEIVE_STOCK,
  RECEIVE_STOCKS
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
    default:
      return state;
  }
};

export default stocksReducer;
