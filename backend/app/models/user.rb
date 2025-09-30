class User < ApplicationRecord
  # bcryptを使用
  has_secure_password

  # バリデーション
  validates :name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 6 }, on: :create
  validates :bio, length: { maximum: 200 }
  validates :avatar_preset, inclusion: { in: 1..5 }
  validates :provider, inclusion: { in: %w[email google] }
  validates :uid, uniqueness: true, allow_blank: true

  # デフォルト値の設定（DBレベルで設定済みだが念のため）
  before_validation :set_defaults, on: :create

  private

  def set_defaults
    self.provider ||= 'email'
    self.bio ||= 'よろしくお願いします。'
    self.avatar_preset ||= 1
  end
end
