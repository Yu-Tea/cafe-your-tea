class OgpController < ApplicationController
  def tea_art
    @tea_art = TeaArt.includes(:user).find_by(id: params[:id])
    return render plain: "Not found", status: 404 unless @tea_art

    if bot_request?(request.user_agent)
      # ボット（X、Facebook等）ならOGP付きHTMLを表示
      render template: "ogp/tea_art", layout: false
    else
      # 人間ユーザーならReact側に即リダイレクト
      redirect_to "#{ENV['FRONTEND_URL']}/tea-arts/#{@tea_art.id}", allow_other_host: true
    end
  end

  private

  def bot_request?(user_agent)
    bot_keywords = [
      'Twitterbot', 'facebookexternalhit', 'Slackbot',
      'Discordbot', 'LinkedInBot', 'TelegramBot', 'WhatsApp',
      'bingbot', 'Googlebot'
    ]
    bot_keywords.any? { |keyword| user_agent.to_s.include?(keyword) }
  end
end
