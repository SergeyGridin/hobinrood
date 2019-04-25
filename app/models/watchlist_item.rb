class WatchlistItem < ApplicationRecord
  validates :stock_id, presence: true, uniqueness:  { scope: :user_id }

  belongs_to :user
  belongs_to :stock


  def get_user_watchlist
    self.user.get_watchlist 
  end

end
