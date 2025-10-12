class TeaArtImageProcessor
  include ActiveModel::Model

  # 画像パスの定数定義
  CUP_IMAGE_PATH = Rails.root.join('public/images/cup_img_big.png')
  TEXTURE_IMAGE_PATH = Rails.root.join('public/images/tea_texture.png')
  OGP_BG_IMAGE_PATH = Rails.root.join('public/images/ogp_bg.png')

  def initialize(base64_image_data, title = nil)
    @base64_image_data = base64_image_data
    @title = title
  end

  # 新規投稿時の画像生成
  def process
    temp_file_path = nil
    ogp_temp_file_path = nil

    begin
      # base64からPNG画像を作成
      user_image = create_image_from_base64(@base64_image_data)

      # ベース画像を読み込み
      base_image = load_base_image

      # フロント側から受け取ったイラストを中央配置で合成
      step1_result = composite_user_image(base_image, user_image)

      # テクスチャをオーバーレイ効果で合成
      step2_result = apply_texture_overlay(step1_result)

      # 最終サイズにリサイズ
      final_result = resize_final_image(step2_result)

      # ティーアート画像を一時ファイルとして保存
      temp_file_path = save_temp_image(final_result)

      # OGP画像を作成
      ogp_image = create_ogp_image(temp_file_path, @title)

      # OGP画像も同じsave_temp_imageメソッドで保存
      ogp_temp_file_path = save_temp_image(ogp_image)

      # Cloudinaryにアップロード
      tea_art_url = upload_to_cloudinary(temp_file_path)
      ogp_url = upload_to_cloudinary(ogp_temp_file_path)

      # 両方のURLを返す
      {
        tea_art_url: tea_art_url,
        ogp_url: ogp_url
      }
    rescue StandardError => e
      raise "画像の合成処理に失敗しました: #{e.message}"
    ensure
      cleanup_temp_file(temp_file_path) if temp_file_path
      cleanup_temp_file(ogp_temp_file_path) if ogp_temp_file_path
    end
  end

  # 編集時にタイトル更新があった場合のOGP修正
  def process_ogp_update(tea_art)
    ogp_temp_file_path = nil

    begin
      # OGP画像を修正（CloudinaryのURLから画像を取得して修正）
      ogp_image = update_ogp_image(tea_art.ogp_image_url, tea_art.title)

      # OGP画像を一時保存
      ogp_temp_file_path = save_temp_image(ogp_image)

      # Cloudinaryにアップロード
      ogp_url = upload_to_cloudinary(ogp_temp_file_path)

      # TeaArtモデルのOGP URLを更新
      tea_art.update_column(:ogp_image_url, ogp_url)
      { success: true, ogp_url: ogp_url }
      # OGP URLを返す
      { ogp_url: ogp_url }
    rescue StandardError => e
      raise "OGP画像の更新処理に失敗しました: #{e.message}"
    ensure
      # 🔥 既存のcleanup_temp_fileメソッドで一時ファイルをクリーンアップ
      cleanup_temp_file(ogp_temp_file_path) if ogp_temp_file_path
    end
  end

  private

  # base64からPNG画像を作成
  def create_image_from_base64(base64_data)
    raise 'base64データが空です' if base64_data.blank?

    # base64のヘッダーを除去（data:image/png;base64など）
    image_data = base64_data.gsub(%r{^data:image/[a-z]+;base64,}, '')

    # base64をデコード
    decoded_data = Base64.decode64(image_data)

    # 一時ファイルに保存
    temp_file = Tempfile.new(['user_image', '.png'])
    temp_file.binmode
    temp_file.write(decoded_data)
    temp_file.rewind

    user_image = MiniMagick::Image.open(temp_file.path)

    user_image
  rescue Base64::DecodeError => e
    raise "base64デコードに失敗しました: #{e.message}"
  rescue MiniMagick::Error => e
    raise "画像の読み込みに失敗しました: #{e.message}"
  ensure
    temp_file&.close
    temp_file&.unlink
  end

  # ベース画像（カップ）を読み込み
  def load_base_image
    MiniMagick::Image.open(CUP_IMAGE_PATH.to_s)
  rescue MiniMagick::Error => e
    raise "ベース画像の読み込みに失敗しました: #{e.message}"
  end

  # ユーザーが書いたイラスト画像を中央配置で合成
  def composite_user_image(base_image, user_image)
    # dupで複製してから合成（元の画像を保護）
    result_base = base_image.dup
    result_user = user_image.dup

    # 透過チャンネルを明示的に保持
    result_base.alpha('set')
    result_user.alpha('set')

    result = result_base.composite(result_user) do |c|
      c.compose 'Over'      # 通常の重ね合わせ
      c.gravity 'center'    # 中央配置
    end

    # 結果画像も透過を保持（flattenは削除）
    result.format 'png'
    result.alpha('set')

    result
  rescue MiniMagick::Error => e
    raise "ユーザー画像の合成に失敗しました: #{e.message}"
  end

  # テクスチャをオーバーレイ効果で合成
  def apply_texture_overlay(input_image)
    texture_image = MiniMagick::Image.open(TEXTURE_IMAGE_PATH.to_s)

    # dupで複製してから合成
    result_input = input_image.dup
    result_texture = texture_image.dup

    # 透過チャンネルを明示的に保持
    result_input.alpha('set')
    result_texture.alpha('set')

    result = result_input.composite(result_texture) do |c|
      c.compose 'Overlay'   # オーバーレイ効果
      c.gravity 'center'    # 中央配置
    end

    # 結果画像も透過を保持（flattenは削除）
    result.format 'png'
    result.alpha('set')

    result
  rescue MiniMagick::Error => e
    raise "テクスチャの合成に失敗しました: #{e.message}"
  end

  # 最終サイズにリサイズ
  def resize_final_image(image)
    # dupで複製してからリサイズ
    resized = image.dup
    resized.resize '600x600'

    resized
  rescue MiniMagick::Error => e
    raise "画像のリサイズに失敗しました: #{e.message}"
  end

  # 一時ファイルパスを返す
  def save_temp_image(image)
    temp_file = Tempfile.new(['tea_art', '.png'])
    temp_file.binmode

    image.write(temp_file.path)
    temp_file.flush

    temp_file
  end

  # OGP新規生成
  def create_ogp_image(tea_art_image_path, title)
    # 背景画像を読み込み
    ogp_base = MiniMagick::Image.open(OGP_BG_IMAGE_PATH)

    # 加工済みティーアート画像を読み込み
    tea_art_image = MiniMagick::Image.open(tea_art_image_path)

    # ティーアート画像の下95pxをカット
    cropped_tea_art = tea_art_image.dup
    current_width = cropped_tea_art.width
    current_height = cropped_tea_art.height
    new_height = current_height - 95

    tea_art_image.crop "#{current_width}x#{new_height}+0+0"

    # 背景画像にティーアート画像を合成（左下ピッタリ）
    ogp_result = ogp_base.dup
    ogp_result = ogp_result.composite(tea_art_image) do |c|
      c.compose 'Over'
      c.geometry "+0+#{630 - new_height}" # 左下ピッタリ（630 - 画像の高さ）
    end

    # フォントパスを設定
    font_path = Rails.root.join('public/fonts/MPLUS1p-Bold.ttf')

    # ティータイトルのテキストを追加（中央揃え）
    ogp_result.combine_options do |c|
      c.font font_path.to_s if File.exist?(font_path)
      c.pointsize '72'  # フォントサイズ
      c.fill '#f6f1eb'  # テキスト色
      c.gravity 'North' # 上揃え
      c.annotate '+0+60', title.to_s.truncate(15) # 上から60px
    end

    ogp_result
  rescue StandardError => e
    raise "OGP画像の作成に失敗しました: #{e.message}"
  end

  # 生成済みOGP画像のタイトル上書き処理
  def update_ogp_image(existing_ogp_url, title)
    # URLから画像を読み込み
    ogp_image = load_image_from_url(existing_ogp_url)

    # タイトル部分を背景色で塗りつぶす（上から69px、1200×80pxの長方形）
    ogp_image.combine_options do |c|
      c.fill '#6f9169' # 背景色と同じ色
      c.draw 'rectangle 0,69 1200,149' # x1,y1 x2,y2 (69 + 80 = 149)
    end

    # フォントパスを設定
    font_path = Rails.root.join('public/fonts/MPLUS1p-Bold.ttf')

    # 新たなタイトルのテキストを追加
    ogp_image.combine_options do |c|
      c.font font_path.to_s if File.exist?(font_path)
      c.pointsize '72'  # フォントサイズ
      c.fill '#f6f1eb'  # テキスト色
      c.gravity 'North' # 上揃え
      c.annotate '+0+60', title.to_s.truncate(15) # 上から60px
    end

    ogp_image
  rescue StandardError => e
    raise "OGP画像の作成に失敗しました: #{e.message}"
  end

  # URLから画像をダウンロードして読み込み
  def load_image_from_url(url)
    require 'open-uri'
    require 'tempfile'

    # 一時ファイルを作成
    tempfile = Tempfile.new(['tea_art', '.jpg'])

    begin
      # URLから画像をダウンロード
      URI.open(url) do |image|
        tempfile.binmode
        tempfile.write(image.read)
        tempfile.rewind
      end

      # MiniMagickで画像を読み込み
      MiniMagick::Image.open(tempfile.path)
    ensure
      # 一時ファイルを削除
      tempfile.close
      tempfile.unlink
    end
  rescue StandardError
    raise "URL画像の読み込みに失敗しました: #{url}"
  end

  # Cloudinaryへのアップロード処理
  def upload_to_cloudinary(file_path)
    raise "アップロード対象のファイルが見つかりません: #{file_path}" unless File.exist?(file_path)

    result = Cloudinary::Uploader.upload(
      file_path,
      {
        folder: 'tea_art',
        public_id: "tea_art_#{Time.current.to_i}_#{SecureRandom.hex(4)}",
        overwrite: false, # 同名ファイルの上書きを防ぐ
        resource_type: 'image',
        format: 'png'
      }
    )

    result['secure_url']
  rescue StandardError => e
    raise "画像のアップロードに失敗しました: #{e.message}"
  end

  def cleanup_temp_file(temp_file)
    return unless temp_file.is_a?(Tempfile)

    begin
      temp_file.close
      temp_file.unlink
    rescue StandardError => e
      Rails.logger.warn "一時ファイル削除エラー: #{e.message}"
    end
  end
end
