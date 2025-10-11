class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.references :tea_art, null: false, foreign_key: true
      t.references :user, null: true, foreign_key: true  # ゲスト対応でnull許可
      t.text :body, null: false
      t.boolean :is_guest, null: false, default: false
      
      t.timestamps
    end
    
    add_index :comments, :tea_art_id, name: 'idx_comments_tea_art_id'
    add_index :comments, :user_id, name: 'idx_comments_user_id'
    add_index :comments, [:tea_art_id, :created_at], name: 'idx_comments_tea_art_created'
  end
end
