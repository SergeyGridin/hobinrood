class CreateWatchlistItems < ActiveRecord::Migration[5.2]
  def change
    create_table :watchlist_items do |t|
      t.integer :user_id, null: false, index: true
      t.integer :stock_id, null: false, index: true

      t.timestamps
    end
  end
end
