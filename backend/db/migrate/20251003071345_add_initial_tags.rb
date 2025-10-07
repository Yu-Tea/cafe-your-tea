class AddInitialTags < ActiveRecord::Migration[7.1]
  def up
    return if Tag.exists? # 既にタグが存在する場合はスキップ

    # 基本的なタグを定義
    characteristics = %w[エネルギッシュ リラックス ほっこり 爽やか 集中力アップ ごきげん ドリーミー]
    tastes = %w[甘い 苦い 渋い すっぱい まろやか フルーティー スパイシー]
    vibes = %w[キュート クール シンプル ポップ シック レトロ ゆるい ギャグ]

    all_tags = characteristics + tastes + vibes

    # トランザクション内で一括作成
    Tag.transaction do
      all_tags.each do |tag_name|
        Tag.find_or_create_by!(name: tag_name)
      end
    end

    puts "Created #{Tag.count} initial tags"
  end

  def down
    # 開発時のロールバック用
    Tag.destroy_all
    puts 'Removed all tags'
  end
end
