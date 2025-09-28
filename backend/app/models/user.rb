class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  # Devise設定
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  # バリデーション
  validates :name, presence: true, length: { maximum: 50 }
  validates :bio, length: { maximum: 200 }
  validates :avatar_preset, inclusion: { in: 1..5 }
  validates :provider, inclusion: { in: %w[email google] }

  # コールバック
  before_create :generate_jti

  # OAuth用メソッド
  def self.from_omniauth(auth)
    where(email: auth.info.email).first_or_create do |user|
      user.name = auth.info.name
      user.email = auth.info.email
      user.provider = auth.provider
      user.uid = auth.uid
      user.encrypted_password = Devise.friendly_token[0, 20]
    end
  end

  private

  def generate_jti
    self.jti ||= SecureRandom.uuid
  end
end
