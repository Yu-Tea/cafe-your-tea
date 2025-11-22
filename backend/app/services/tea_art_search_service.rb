class TeaArtSearchService
  def initialize(params)
    @season = params[:season]
    @tag_id = params[:tag_id]
    @search_text = params[:search_text]
    @page = params[:page] || 1
    @per_page = params[:per_page] || 2
  end

  def execute
    scope = TeaArt.all
    
    # 季節フィルタ
    scope = scope.where(season: @season) if @season.present?
    
    # タグフィルタ
    if @tag_id.present?
      scope = scope.where(
        "EXISTS (SELECT 1 FROM tea_art_tags WHERE tea_art_tags.tea_art_id = tea_arts.id AND tea_art_tags.tag_id = ?)",
        @tag_id
      )
    end
    
    # テキスト検索（メニュー名 or ユーザー名）
    if @search_text.present?
      scope = scope.left_joins(:user)
                   .where(
                     "tea_arts.title ILIKE ? OR users.name ILIKE ?",
                     "%#{@search_text}%", "%#{@search_text}%"
                   )
    end
    
    # ページネーション
    total_count = scope.count
    tea_arts = scope.includes(:user, :tags)
                    .order(created_at: :desc)
                    .page(@page)
                    .per(@per_page)
    
    {
      tea_arts: tea_arts.map { |tea_art| tea_art_list_json(tea_art) },
      pagination: build_pagination(tea_arts, total_count)
    }
  end

  private

  def tea_art_list_json(tea_art)
    {
      id: tea_art.id,
      title: tea_art.title,
      season: tea_art.season_display,
      image_url: tea_art.image_url,
      tags: tea_art.tags.map { |tag| tag_json(tag) },
      tag_names: tea_art.tag_names,
      user: {
        id: tea_art.user.id,
        name: tea_art.user.name
      },
      is_owner: @current_user&.id == tea_art.user_id
    }
  end

  def tag_json(tag)
    {
      id: tag.id,
      name: tag.name
    }
  end

  def build_pagination(collection, total_count)
    {
      current_page: collection.current_page,
      total_pages: collection.total_pages,
      total_count: total_count,
      per_page: collection.limit_value,
      next_page: collection.next_page,
      prev_page: collection.prev_page
    }
  end
end