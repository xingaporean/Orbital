class CreateJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :jobs do |t|
      t.string :identifier, null: false
      t.string :poster, null: false
      t.string :description, null: false
      t.date :date
      t.integer :duration
      t.boolean :approved, default: false
      t.timestamps
    end
  end
end
