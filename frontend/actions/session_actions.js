import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_COMPLETE_USER_INFO = 'RECEIVE_COMPLETE_USER_INFO';
export const RECEIVE_HISTORICAL_USER_INFO = 'RECEIVE_HISTORICAL_USER_INFO';




export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const receiveCompleteUserInfo = user => ({
  type: RECEIVE_COMPLETE_USER_INFO,
  user
});

export const receiveHistoricalUserInfo = user => ({
  type: RECEIVE_HISTORICAL_USER_INFO,
  user
});


export const signup = (user) => dispatch => (
  SessionApiUtil.signup(user)
  .then(user => dispatch(receiveCurrentUser(user)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const login = (user) => dispatch => (
  SessionApiUtil.login(user)
  .then(user => dispatch(receiveCurrentUser(user)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const logout = () => dispatch => (
  SessionApiUtil.logout()
    .then( () => dispatch(logoutCurrentUser()))
);

export const fetchUserInfo = (id) => dispatch => (
  SessionApiUtil.fetchUserInfo(id)
    .then((user) => dispatch(receiveCurrentUser(user)))
);

export const fetchCompleteUserInfo = (id) => dispatch => (
  SessionApiUtil.fetchCompleteUserInfo(id)
    .then((user) => dispatch(receiveCompleteUserInfo(user)))
);

export const fetchHistoricalUserInfo = (id) => dispatch => (
  SessionApiUtil.fetchHistoricalUserInfo(id)
    .then((user) => dispatch(receiveHistoricalUserInfo(user)))
);




