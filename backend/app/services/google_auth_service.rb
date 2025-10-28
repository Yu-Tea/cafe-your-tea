require "googleauth/id_tokens"
require "httparty"

class GoogleAuthService
  def initialize(auth_code)
    @auth_code = auth_code
  end

  def authenticate!
    begin

      # HTTPリクエスト実行
      response = HTTParty.post("https://oauth2.googleapis.com/token",
        headers: { "Content-Type" => "application/x-www-form-urlencoded" },
        body: {
          code: @auth_code,
          client_id: Rails.application.credentials.google[:client_id],
          client_secret: Rails.application.credentials.google[:client_secret],
          redirect_uri: Rails.env.production? ? 
            Rails.application.credentials.frontend_origin : 
            "http://localhost:5173",
          grant_type: "authorization_code"
        }
      )

      return { error: "無効なアクセストークンです", status: :unprocessable_entity } unless response.success?

      id_token = response.parsed_response["id_token"]
      payload = Google::Auth::IDTokens.verify_oidc(
        id_token,
        aud: Rails.application.credentials.google[:client_id]
      )

      unless payload
        return { error: "無効なIDトークンです", status: :unauthorized }
      end

      # Userモデルを調整
      user = User.find_or_initialize_by(email: payload["email"])
      user.google_uid = payload["sub"]
      user.password ||= SecureRandom.hex(10)

      if user.save
        { success: user }
      else
        { error: "ユーザーの保存に失敗しました", status: :unprocessable_entity }
      end

    rescue Google::Auth::IDTokens::VerificationError => e
      { error: "IDトークン検証エラー: #{e.message}", status: :unauthorized }
    rescue StandardError => e
      { error: "予期せぬエラー: #{e.message}", status: :internal_server_error }
    end
  end
end