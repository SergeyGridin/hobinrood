import * as TransactionApiUtil from '../util/transaction_api_util';

export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';
export const RECEIVE_TRANSACTION_ERRORS = 'RECEIVE_TRANSACTION_ERRORS';


export const receiveTransaction = transaction => ({
  type: RECEIVE_TRANSACTION,
  transaction
});

export const receiveErrors = errors => ({
  type: RECEIVE_TRANSACTION_ERRORS,
  errors
});

export const createTransaction = formTransaction => dispatch => {
  return TransactionApiUtil.createTransaction(formTransaction)
    .then(transaction => dispatch(receiveTransaction(transaction)),
      errors => dispatch(receiveErrors(errors.responseJSON))
      //can i add success and render json?
    );
};
