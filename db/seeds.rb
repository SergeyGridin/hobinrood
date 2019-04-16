require 'csv'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Create demo user
# demo_user = User.new({ email: 'putin@russia.ru', username: 'putin', password: '123456' })
# demo_user.save!


nyse_stocks = CSV.foreach("#{Rails.root}/db/companylist_nyse.csv").map { |row| {ticker: row[0], name: row[1]} }
nasdaq_stocks = CSV.foreach("#{Rails.root}/db/companylist_nasdaq.csv").map { |row| {ticker: row[0], name: row[1]} }

Stock.create(nyse_stocks)
Stock.create(nasdaq_stocks)




