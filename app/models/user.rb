require 'rest-client'



class User < ApplicationRecord
  validates :username, :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token
  attr_reader :password

  has_one :deposit
  has_many :transactions
  has_many :watchlist_items


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

  def get_watchlist
    tickers = []
    watchlist = self.watchlist_items.includes(:stock)
    watchlist.each do |item|
      tickers << item.stock.ticker
    end
    tickers
  end

  def get_portfolio_watchlist_prices
    # tickers = self.stock_holdings.keys.join(",")
    # finals = tickers + "," + self.get_watchlist.join(",")
    # need to combine tickers and finals
    finals = (self.stock_holdings.keys + self.get_watchlist).uniq.join(",")
    url = "https://cloud.iexapis.com/v1/stock/market/batch?symbols=#{finals}&types=quote&token=pk_9aec779f906148508a27dc224023172d"
    response = RestClient.get(url)
    JSON.parse(response)
  end


  def stock_holdings
    stocks = Hash.new(0)
    return {} if transactions.empty?
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
    self.stock_holdings[stock.ticker] ? self.stock_holdings[stock.ticker] : 0
  end
 
  def get_transactions_dates
    now = Time.now.utc.to_date
    created_date = self.created_at.to_date
    date_hash = {}
    (created_date..now).each do |date| 
      date_hash[date.to_s] = { 'stocks' => {} } 
    end
    date_hash[created_date.to_s]['cash'] = 100000

    stocks_arr = []

    date_hash.each_key do |date|
      parsed_date = Date.parse date
      transactions_for_date = self.transactions.where(created_at: parsed_date.all_day).includes(:stock)
      date_hash[date] = (date_hash[(parsed_date - 1.day).to_s]).clone if date != created_date.to_s
      transactions_for_date.each do |transaction|
        # ticker = Stock.find(transaction.stock_id).ticker
        ticker = transaction.stock.ticker
        stocks_arr << ticker unless stocks_arr.include?(ticker)
        tr_hash = {ticker => transaction.num_shares}
        if transaction.order_type == 'buy'
          new_hash = date_hash[date]['stocks'].merge(tr_hash){|key, oldval, newval| newval + oldval}
          date_hash[date]['stocks'] = new_hash
          date_hash[date]['cash'] -= (transaction.price * transaction.num_shares).round(2)
        else
          new_hash = date_hash[date]['stocks'].merge(tr_hash){|key, oldval, newval| oldval - newval}
          date_hash[date]['stocks'] = new_hash
          date_hash[date]['cash'] += (transaction.price * transaction.num_shares).round(2)
        end
      end
    end
    daily_portfolio_value_arr= []
   
   
    if stocks_arr.length > 0
      daily_data = get_portfolio_daily_data_two(stocks_arr)
    # idx = -1
    
    # daily_portfolio_value_hash = {}

    #
      idx = -1
      while date_hash[daily_data[stocks_arr[0]]['chart'][idx]['date']]
        daily_portfolio_value_hash = {}
        day = daily_data[stocks_arr[0]]['chart'][idx]['date']
        stocks_for_the_day = date_hash[day]['stocks'].keys
        sum = date_hash[day]['cash']
        stocks_for_the_day.each do |ticker|
          sum += (daily_data[ticker]['chart'][idx]['close'] * date_hash[day]['stocks'][ticker])
        end
        daily_portfolio_value_hash['date'] = day
        daily_portfolio_value_hash['balance'] = sum.round(2)
        daily_portfolio_value_arr << daily_portfolio_value_hash
        idx-=1
      end
    end

    #

    # while date_hash[daily_data.values[0][idx]['date']]
    #   daily_portfolio_value_hash = {}
    #   day = daily_data.values[0][idx]['date']
    #   stocks_for_the_day = date_hash[day]['stocks'].keys
    #   sum = date_hash[day]['cash']
    #   stocks_for_the_day.each do |ticker|
    #     sum += (daily_data[ticker][idx]['close'] * date_hash[day]['stocks'][ticker])
    #   end
    #   daily_portfolio_value_hash['date'] = day
    #   daily_portfolio_value_hash['balance'] = sum
    #   daily_portfolio_value_arr << daily_portfolio_value_hash
    #   idx-=1
    # end
    # # daily_portfolio_value_hash
    daily_portfolio_value_arr.reverse 
    # # date_hash
  end

  def get_portfolio_daily_data(stocks_arr)
    responses = {}
    stocks_arr.each do |ticker|
      url = "https://cloud.iexapis.com/v1/stock/#{ticker}/chart"
      response = RestClient.get(url)
      responses[ticker] = JSON.parse(response)
    end
    responses
  end

  def get_portfolio_daily_data_two(stocks_arr)
    tickers = stocks_arr.join(",")
    url = "https://cloud.iexapis.com/v1/stock/market/batch?symbols=#{tickers}&types=chart&range=5y&token=pk_9aec779f906148508a27dc224023172d"
    response = RestClient.get(url)
    JSON.parse(response)

    # responses = {}
    # stocks_arr.each do |ticker|
    #   url = "https://api.iextrading.com/1.0/stock/#{ticker}/chart"
    #   response = RestClient.get(url)
    #   responses[ticker] = JSON.parse(response)
    # end
    # responses
  end

  def get_portfolio_intraday_data
    tickers = self.stock_holdings.keys.join(",")
    url = "https://cloud.iexapis.com/v1/stock/market/batch?symbols=#{tickers}&types=chart&range=1d&token=pk_9aec779f906148508a27dc224023172d"
    response = RestClient.get(url)
    JSON.parse(response)
  end

  def calculate_intraday_balance
    times = ['09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00'];

    portfolio = self.stock_holdings
    stocks_arr = portfolio.keys
    cash = self.deposit.amount
    if portfolio.length > 0
      data = self.get_portfolio_intraday_data
    end
    hash_arr = []
    idx = 0
    times_idx = 0
    if portfolio.length > 0
      
      while idx < data[stocks_arr[0]]['chart'].length
        break if stocks_arr.any? { |stock| data[stock]['chart'][idx]['marketClose'].nil? }
        hash = {}
        sum = cash
        stocks_arr.each do |stock|
          # break if data[stock]['chart'][idx]['marketClose'].nil?
          sum += portfolio[stock] * data[stock]['chart'][idx]['marketClose']
          # hash[data[stock]['chart'][idx]['minute']] = sum.round(2)
          # hash['time'] = data[stock]['chart'][idx]['minute']
          # hash['balance'] = sum.round(2)
          # hash_arr << hash
        end
        hash['time'] = data[stocks_arr[0]]['chart'][idx]['label']
        hash['balance'] = sum.round(2)
        hash_arr << hash

        idx+=5
        times_idx+=1
      end
    else
      hash = {}
      hash['time'] = '9:30'
      hash['balance'] = cash
      hash_arr << hash

    end

    while times_idx < times.length
      hash = {}
      hash['time'] = times[times_idx]
      hash['balance'] = nil
      hash_arr << hash
      times_idx+=1      
    end
    hash_arr
  end

end
