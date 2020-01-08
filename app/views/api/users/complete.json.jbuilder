json.extract! @user, :id, :username, :email

json.portfolioData @user.get_transactions_dates

json.intradayData @user.calculate_intraday_balance