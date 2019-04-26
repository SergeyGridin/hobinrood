class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      Deposit.create({user_id: @user.id, amount: 100000})
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 404 
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def historical
    @user = User.find(params[:id])
  end

  def complete
    @user = User.find(params[:id])
  end


  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end