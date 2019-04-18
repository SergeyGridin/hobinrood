class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :user_id, null: false, index: true
      t.integer :stock_id, null: false, index: true
      t.float :price, null: false
      t.integer :num_shares, null: false
      t.string :order_type, null: false

      t.timestamps
    end
  end
end
