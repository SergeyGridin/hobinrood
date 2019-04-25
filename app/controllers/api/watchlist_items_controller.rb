class Api::WatchlistItemsController < ApplicationController
  
  def show
    @watchlistitem = WatchlistItem.find(params[:id])    
  end

  def create
    @watchlistitem = WatchlistItem.new(stock_id: params[:stock_id])
    @watchlistitem.user_id = current_user.id

    if @watchlistitem.save
      render :show
    else
      render json: @watchlistitem.errors.full_messages, status: 401
    end
  end

  def destroy
    @watchlistitem = WatchlistItem.find_by(stock_id: params[:id], user_id: current_user.id)
    @watchlistitem.destroy
    render :show
  end

end