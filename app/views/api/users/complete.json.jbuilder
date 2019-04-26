json.extract! @user, :id, :username, :email


json.intradayData @user.calculate_intraday_balance