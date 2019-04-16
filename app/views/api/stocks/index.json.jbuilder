json.array! @stocks do |stock|
  json.ticker stock.ticker
  json.name stock.name
end


