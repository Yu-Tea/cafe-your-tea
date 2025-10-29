class User < ApplicationRecord
  # bcryptを使用（Google認証ユーザーの場合はバリデーション無効）
  has_secure_password validations: false

  # バリデーション
  validates :name, presence: true, length: { maximum: 15 }
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  # Google認証ユーザーの場合はパスワード不要
  validates :password, presence: true, length: { minimum: 6 }, if: :password_required?
  validates :bio, presence: true, length: { maximum: 200 }
  validates :avatar_preset, presence: true, inclusion: { in: 1..5 }
  validates :google_uid, uniqueness: true, allow_blank: true

  # デフォルト値の設定（DBレベルで設定済みだが念のため）
  before_validation :set_defaults, on: :create

  has_many :tea_arts, dependent: :destroy
  has_many :comments, dependent: :destroy

  # Google認証ユーザーかどうかを判定
  def google_user?
    google_uid.present?
  end

  private

  def set_defaults
    self.bio ||= 'よろしくお願いします。'
    self.avatar_preset ||= 1
  end

  # パスワードが必要かどうかを判定
  def password_required?
    # Google認証ユーザーの場合はパスワード不要
    google_uid.blank? && (new_record? || password.present?)
  end
end
