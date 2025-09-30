# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ''
      t.string :encrypted_password, null: false, default: ''

      ## 追加カラム
      t.string :name,               null: false                    # ユーザー名
      t.string :provider,           default: 'email'               # 認証プロバイダー
      t.string :uid                                                # OAuth用UID
      t.string :bio,                default: 'よろしくお願いします。' # 自己紹介
      t.integer :avatar_preset,     default: 1                    # アバター選択
      t.string :jti,                null: false                   # JWT識別子

      ## Recoverable
      # t.string   :reset_password_token
      # t.datetime :reset_password_sent_at

      ## Rememberable
      # t.datetime :remember_created_at

      t.timestamps null: false
    end

    add_index :users, :email,    unique: true
    add_index :users, :uid,      unique: true    # OAuth用
    add_index :users, :jti,      unique: true    # JWT用

    # add_index :users, :reset_password_token, unique: true
    # add_index :users, :confirmation_token,   unique: true
    # add_index :users, :unlock_token,         unique: true
  end
end
