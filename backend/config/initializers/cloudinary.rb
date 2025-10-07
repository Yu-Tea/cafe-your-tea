if Settings.cloudinary&.url.present?
  Cloudinary.config_from_url(Settings.cloudinary.url)
end

# セキュア設定
Cloudinary.config do |config|
  config.secure = Settings.cloudinary&.secure || true
end if Settings.cloudinary