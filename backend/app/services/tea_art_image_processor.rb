class TeaArtImageProcessor
  include ActiveModel::Model
  
  # 画像パスの定数定義
  CUP_IMAGE_PATH = Rails.root.join('public/images/cup_img_big.png')
  TEXTURE_IMAGE_PATH = Rails.root.join('public/images/tea_texture.png')
  
  def initialize(base64_image_data)
    @base64_image_data = base64_image_data
  end

  def process
    temp_file = nil
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
      
      # 一時ファイルとして保存
      temp_file_path = save_temp_image(final_result)
      
      # Cloudinaryにアップロード
      cloudinary_url = upload_to_cloudinary(temp_file_path)
      
      # CloudinaryのURLを返す
      cloudinary_url
      
    rescue => e
      Rails.logger.error "画像処理エラー: #{e.message}"
      raise "画像の合成処理に失敗しました: #{e.message}"
    ensure
      # 最後に一時ファイルを削除
      cleanup_temp_file(temp_file) if temp_file
    end
  end

  private

  # base64からPNG画像を作成
  def create_image_from_base64(base64_data)
    raise "base64データが空です" if base64_data.blank?
    
    # base64のヘッダーを除去（data:image/png;base64, など）
    image_data = base64_data.gsub(/^data:image\/[a-z]+;base64,/, '')
    
    # base64をデコード
    decoded_data = Base64.decode64(image_data)
    
    # 一時ファイルに保存
    temp_file = Tempfile.new(['user_image', '.png'])
    temp_file.binmode
    temp_file.write(decoded_data)
    temp_file.rewind
    
    # MiniMagickで読み込み
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
    base_image = MiniMagick::Image.open(CUP_IMAGE_PATH.to_s)
    
    base_image
  rescue MiniMagick::Error => e
    raise "ベース画像の読み込みに失敗しました: #{e.message}"
  end

  # ユーザーが書いたイラスト画像を中央配置で合成
  def composite_user_image(base_image, user_image)

    # dupで複製してから合成（元の画像を保護）
    result = base_image.dup.composite(user_image) do |c|
      c.compose "Over"      # 通常の重ね合わせ
      c.gravity "center"    # 中央配置
    end
    result.flatten

    result
  rescue MiniMagick::Error => e
    raise "ユーザー画像の合成に失敗しました: #{e.message}"
  end

  # テクスチャをオーバーレイ効果で合成
  def apply_texture_overlay(input_image)
    texture_image = MiniMagick::Image.open(TEXTURE_IMAGE_PATH.to_s)

    # dupで複製してから合成
    result = input_image.dup.composite(texture_image) do |c|
      c.compose "Overlay"   # オーバーレイ効果
      c.gravity "center"    # 中央配置
    end
    result.flatten

    result
  rescue MiniMagick::Error => e
    raise "テクスチャの合成に失敗しました: #{e.message}"
  end

  # 最終サイズにリサイズ
  def resize_final_image(image)
    
    # dupで複製してからリサイズ
    resized = image.dup
    resized.resize "600x600"
    
    resized
  rescue MiniMagick::Error => e
    raise "画像のリサイズに失敗しました: #{e.message}"
  end

  # 一時ファイルパスを返す
  def save_temp_image(image)
    temp_file = Tempfile.new(['tea_art', '.png'])
    temp_file.binmode # バイナリモードに設定
    
    image.write(temp_file.path)
    temp_file.flush # バッファをフラッシュ
    

    temp_file # Tempfileオブジェクトを返す
  end

  # Cloudinaryアップロード処理
  def upload_to_cloudinary(file_path)
    
    # ファイルの存在確認を追加
    unless File.exist?(file_path)
      raise "アップロード対象のファイルが見つかりません: #{file_path}"
    end

    # Cloudinaryに画像をアップロード
    result = Cloudinary::Uploader.upload(
      file_path,
      {
        folder: "tea_art", # フォルダ名を指定
        public_id: "tea_art_#{Time.current.to_i}_#{SecureRandom.hex(4)}", # ユニークなID
        overwrite: false, # 同名ファイルの上書きを防ぐ
        resource_type: "image",
        format: "png"
      }
    )
    
    cloudinary_url = result['secure_url']
    
    cloudinary_url
  rescue => e
    Rails.logger.error "Cloudinaryアップロードエラー: #{e.message}"
    raise "画像のアップロードに失敗しました: #{e.message}"
  end

  # 一時ファイル削除処理
  def cleanup_temp_file(temp_file)
    return unless temp_file.is_a?(Tempfile)
    
    begin
      temp_file.close
      temp_file.unlink # 明示的にファイルを削除
    rescue => e
      Rails.logger.warn "一時ファイル削除エラー: #{e.message}"
      # エラーが発生してもプロセス全体は続行
    end
  end
end