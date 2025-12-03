class UserMailer < ApplicationMailer
  def reset_password_email(user)
    @user = user
    # 環境に応じてURLを変更
    @url = if Rails.env.development?
             "http://localhost:5173/password-reset/#{user.reset_password_token}"
           else
             "#{ENV['FRONTEND_URL']}/password-reset/#{user.reset_password_token}"
           end

    # 開発環境では標準のActionMailerを使用
    if Rails.env.development?
      mail(
        to: @user.email,
        subject: 'パスワードリセット'
      )
    else
      # 本番環境ではResendを使用
      resend_service = ResendService.new

      html_content = render_to_string(
        template: 'user_mailer/reset_password_email',
        layout: false
      )

      resend_service.send_email(
        to: @user.email,
        subject: 'パスワードリセット',
        html: html_content
      )
    end
  end
end
