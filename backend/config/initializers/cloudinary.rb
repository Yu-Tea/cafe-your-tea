Cloudinary.config_from_url(Settings.cloudinary.url) if Settings.cloudinary&.url.present?

# セキュア設定
if Settings.cloudinary
  Cloudinary.config do |config|
    config.secure = Settings.cloudinary&.secure || true
  end
end
