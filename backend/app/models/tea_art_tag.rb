class TeaArtTag < ApplicationRecord
  belongs_to :tea_art
  belongs_to :tag

  validates :tea_art_id, uniqueness: { scope: :tag_id }
end
