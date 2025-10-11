class Comment < ApplicationRecord
  belongs_to :tea_art
  belongs_to :user, optional: true  # ゲストの場合はnull許可

  validates :body, presence: true, length: { maximum: 150 }
  
  # 保存前にis_guestを自動設定
  before_validation :set_guest_status
  
  # スコープ（仮）
  scope :by_guests, -> { where(is_guest: true) }
  scope :by_users, -> { where(is_guest: false) }
  
  private
  
  def set_guest_status
    # user_idがnullの場合は自動的にゲストとして設定
    self.is_guest = user_id.nil?
  end
end
