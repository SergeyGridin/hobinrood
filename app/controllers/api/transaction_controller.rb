class Api::TransactionsController < ApplicationController
  def index
    @transactions = current_user.transactions
  end

  def show
    @transaction = Transaction.find(params[:id])
  end

  def create
    @transaction = Transaction.new(transaction_params)
    @transaction.user_id = current_user.id

    shares_owned = current_user.shares_owned(@transaction.stock_id)
    transaction_amount = @transaction.price * @transaction.num_shares

    if transaction_amount > current_user.deposit && @transaction.order_type == 'buy'
      render json: ['Not Enough Buying Power'], status: 401
    elsif @transaction.num_shares.zero?
      render json: ['Shares must be greater than 0'], status: 422
    elsif @transaction.num_shares > shares_owned && @transaction.order_type == 'sell'
      render json: ['Not Enough Shares'], status: 401
    else
      if @transaction.save
        render json: ['success'], status: 200
      else
        render json: @transaction.errors.full_messages, status: 422
      end
    end
  end

  def update
    @transaction = Transaction.find(params[:id])

    if @transaction.update(transaction_params)
      render 'api/transactions/show', status: 200
    else
      render json: @transaction.errors.full_messages, status: 422
    end
  end

  def delete
    @transaction = Transaction.find(params[:id])
    @transaction.destroy
  end

  private

  def transaction_params
    params.require(:transaction).permit(:stock_id, :price, :num_shares, :order_type)
  end
end
