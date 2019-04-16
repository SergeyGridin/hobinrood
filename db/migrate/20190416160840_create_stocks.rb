class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string "name", null: false, index: true
      t.string "ticker", null: false, index: true
      t.timestamps
    end
  end
end
