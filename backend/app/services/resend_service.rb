class ResendService
  include HTTParty
  base_uri 'https://api.resend.com'

  def initialize
    @headers = {
      'Authorization' => "Bearer #{ENV['RESEND_API_KEY']}",
      'Content-Type' => 'application/json'
    }
  end

  def send_email(to:, subject:, html:)
    from_email = ENV['RESEND_FROM_EMAIL']
    raise 'RESEND_FROM_EMAIL environment variable is required' if from_email.blank?

    response = self.class.post('/emails', {
                                 headers: @headers,
                                 body: {
                                   from: from_email,
                                   to: [to],
                                   subject: subject,
                                   html: html
                                 }.to_json
                               })

    # レスポンスの確認
    if response.success?
      Rails.logger.info "Email sent successfully to #{to}"
      response
    else
      Rails.logger.error "Failed to send email: #{response.body}"
      response
    end
  end
end
