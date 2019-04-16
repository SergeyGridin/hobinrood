class Stock < ApplicationRecord
  validates :name, :ticker, presence: true

end
