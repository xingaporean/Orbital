class ChangeJobFields < ActiveRecord::Migration[6.1]
  def change
    add_column :jobs, :start_date, :date
    add_column :jobs, :end_date, :date
    remove_column :jobs, :date, :date
    remove_column :jobs, :duration, :string
  end
end
