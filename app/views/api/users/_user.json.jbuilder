json.extract! user, :id, :username, :email

json.stocks user.stock_holdings
json.balance user.deposit.amount
json.watchlist user.get_watchlist
json.userPrices user.get_portfolio_watchlist_prices



