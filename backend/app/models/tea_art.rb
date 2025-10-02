class TeaArt < ApplicationRecord
  belongs_to :user

  # バリデーション
  validates :title, presence: true, length: { maximum: 15 } # OGP画像に合わせて再調整
  validates :description, presence: true, length: { maximum: 500 }
  validates :image_url, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]), allow_blank: true }
  validates :ogp_image_url, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]), allow_blank: true }

  # enumの定義
  enum season: {
    all_seasons: 0,           # 通年
    spring: 1,        # 春
    summer: 2,        # 夏
    autumn: 3,        # 秋
    winter: 4         # 冬
  }

  enum temperature: {
    hot: 0,           # HOT
    ice: 1,           # ICE
    both: 2           # 両方
  }

  # 季節の先頭大文字テキストを取得
  def season_display
    case season
    when 'all_seasons'
      'All'
    else
      season&.capitalize
    end
  end

  # スコープ（仮）
  scope :by_season, ->(season) { where(season: season) if season.present? }
  scope :by_temperature, ->(temp) { where(temperature: temp) if temp.present? }
end

