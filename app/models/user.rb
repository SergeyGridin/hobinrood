class User < ApplicationRecord
  validates :username, :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token
  attr_reader :password

  has_one :deposit
  has_many :transactions


  def self.find_by_credentials(username, password)
    @user = User.find_by(username: username)
    return nil unless @user && @user.is_password?(password)
    @user 
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def stock_holdings
    stocks = Hash.new(0)
    return [] if transactions.empty?
    transactions_with_stocks = transactions.includes(:stock)

    transactions_with_stocks.each do |transaction|
      curr_stock = transaction.stock
      if transaction.order_type == 'buy'
        stocks[curr_stock.ticker] += transaction.num_shares
      else
        stocks[curr_stock.ticker] -= transaction.num_shares
      end
    end
    return stocks
  end

  def shares_owned(stock_id)
    stock = Stock.find(stock_id)
    self.stock_holdings[stock.ticker.to_sym]
  end
 

end
