import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';
import { UPDATE_USER_WATCHLIST } from '../actions/stock_actions';
// import { RECEIVE_PORTFOLIO_WATCHLIST_PRICES } from '../actions/stock_actions';


const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case UPDATE_USER_WATCHLIST:
      let nextState = merge({}, state);
      nextState[action.user.id]['watchlist'] = action.watchlist.watchlist;
      return nextState;
    // case RECEIVE_PORTFOLIO_WATCHLIST_PRICES:
    //   return merge({}, state, { [action.user.id]: action.stocksInfo});
    default:
      return state;
  }
};

export default usersReducer;
