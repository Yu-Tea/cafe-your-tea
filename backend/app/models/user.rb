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

  # ================== パスワードリセット機能 ==================
  
  # パスワードリセット用のトークン生成
  def generate_password_reset_token!
    self.reset_password_token = SecureRandom.urlsafe_base64(32)
    self.reset_password_sent_at = Time.current
    save!
  end

  # トークンの有効性チェック（24時間以内）
  def password_reset_token_valid?
    reset_password_sent_at && reset_password_sent_at > 24.hours.ago
  end

  # リセット処理のクリア
  def clear_password_reset_token!
    self.reset_password_token = nil
    self.reset_password_sent_at = nil
    save!
  end

  # トークンでユーザーを検索
  def self.find_by_reset_token(token)
    find_by(reset_password_token: token)
  end

  # パスワードリセット時の特別なバリデーション
  def reset_password!(new_password, new_password_confirmation)
    # Google認証ユーザーはパスワードリセット不可
    return false if google_user?
    
    # パスワードの更新
    self.password = new_password
    self.password_confirmation = new_password_confirmation
    
    # バリデーション（パスワードリセット時は強制的にチェック）
    if new_password.blank?
      errors.add(:password, 'を入力してください')
      return false
    end
    
    if new_password != new_password_confirmation
      errors.add(:password_confirmation, 'とパスワードが一致しません')
      return false
    end
    
    # 保存してトークンクリア
    if save
      clear_password_reset_token!
      true
    else
      false
    end
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
