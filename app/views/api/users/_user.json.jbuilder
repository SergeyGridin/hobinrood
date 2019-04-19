json.extract! user, :id, :username, :email
json.stocks user.stock_holdings
json.balance user.deposit.amount

