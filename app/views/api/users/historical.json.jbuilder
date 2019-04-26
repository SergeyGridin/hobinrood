json.extract! @user, :id, :username, :email
json.portfolioData @user.get_transactions_dates
