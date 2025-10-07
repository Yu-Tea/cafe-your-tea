class CreateTeaArtTags < ActiveRecord::Migration[7.1]
  def change
    create_table :tea_art_tags do |t|
      t.references :tea_art, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true
      t.timestamps
    end

    add_index :tea_art_tags, %i[tea_art_id tag_id], unique: true, name: 'unique_tea_art_tag'
  end
end
