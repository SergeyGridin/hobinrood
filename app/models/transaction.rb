class Transaction < ApplicationRecord
  validates :user_id, :stock_id, :price, :num_shares, :order_type, presence: true

  belongs_to :user
  belongs_to :stock
end
