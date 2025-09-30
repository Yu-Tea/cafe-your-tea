require 'jwt'

class TokenGenerator
  SECRET_KEY = Rails.application.credentials.dig(:jwt, :key) || Rails.application.credentials.secret_key_base

  def self.encode(data)
    payload = { token: data, exp: 24.hours.from_now.to_i }
    JWT.encode(payload, SECRET_KEY, 'HS256')
  end

  def self.decode(token)
    decoded_token = JWT.decode(token, SECRET_KEY, true, { algorithm: 'HS256' })
    decoded_token[0]
  rescue JWT::DecodeError => e
    Rails.logger.error "JWT decode error: #{e.message}"
    nil
  end
end
