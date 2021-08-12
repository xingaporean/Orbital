class CreateJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :jobs do |t|
      t.string :identifier, null: false
      t.string :organisation_name, null: false
      t.string :description, null: false
      t.string :location, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.boolean :approved, default: false, null: false
      t.belongs_to :user
      t.timestamps
    end
  end
end
