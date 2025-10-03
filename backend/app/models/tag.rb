class Tag < ApplicationRecord
  has_many :tea_art_tags, dependent: :destroy
  has_many :tea_arts, through: :tea_art_tags
  
  validates :name, presence: true, uniqueness: true
end