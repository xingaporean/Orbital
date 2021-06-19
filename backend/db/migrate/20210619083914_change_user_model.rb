class ChangeUserModel < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :account_type, :integer
    remove_column :users, :name, :string
    add_column :users, :is_admin, :boolean
  end
end
