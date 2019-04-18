class CreateDeposits < ActiveRecord::Migration[5.2]
  def change
    create_table :deposits do |t|
      t.integer :user_id, null: false, index: true
      t.float :amount, null: false

      t.timestamps
    end
  end
end
