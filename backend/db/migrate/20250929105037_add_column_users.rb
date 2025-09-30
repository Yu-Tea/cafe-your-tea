class AddColumnUsers < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :encrypted_password, :string if column_exists?(:users, :encrypted_password)
    remove_column :users, :jti, :string if column_exists?(:users, :jti)

    add_column :users, :password_digest, :string unless column_exists?(:users, :password_digest)

    add_index :users, :uid, unique: true unless index_exists?(:users, :uid)
  end
end
