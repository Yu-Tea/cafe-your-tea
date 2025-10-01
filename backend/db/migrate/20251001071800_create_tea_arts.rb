class CreateTeaArts < ActiveRecord::Migration[7.1]
  def change
    create_table :tea_arts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.text :description, null: false
      t.string :image_url
      t.string :ogp_image_url
      t.integer :season, default: 0
      t.integer :temperature, default: 0

      t.timestamps
    end

    add_index :tea_arts, :season
    add_index :tea_arts, :temperature
    add_index :tea_arts, :created_at
  end
end
