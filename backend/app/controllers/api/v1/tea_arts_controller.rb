class Api::V1::TeaArtsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :set_tea_art, only: %i[show update destroy]
  before_action :check_owner, only: %i[update destroy]

  # GET /api/v1/tea_arts
  def index
    @tea_arts = TeaArt.includes(:user, :tags)
                      .order(created_at: :desc)
                      .page(params[:page])

    # タグでの絞り込み機能
    if params[:tag_id].present?
      @tea_arts = @tea_arts.by_tag_id(params[:tag_id])
      @selected_tag = Tag.find(params[:tag_id])
    end

    if params[:tag_name].present?
      @tea_arts = @tea_arts.by_tag(params[:tag_name])
      @selected_tag = Tag.find_by(name: params[:tag_name])
    end

    render json: {
      tea_arts: @tea_arts.map { |tea_art| tea_art_json(tea_art) },
      pagination: pagination_json(@tea_arts),
      selected_tag: @selected_tag ? tag_json(@selected_tag) : nil
    }
  end

  # GET /api/v1/tea_arts/:id
  def show
    @tea_art = TeaArt.find(params[:id])
    render json: {
      tea_art: tea_art_json(@tea_art),
      can_edit: current_user&.id == @tea_art.user_id
    }
  end

  # POST /api/v1/tea_arts
  def create
    @tea_art = current_user.tea_arts.build(tea_art_params)

    if @tea_art.save
    # タグの処理
    if tea_art_params[:tag_names].present?
      tag_names = tea_art_params[:tag_names]
      tags = tag_names.map { |name| Tag.find_or_create_by(name: name) }
      @tea_art.tags = tags
    end

    render json: {
      tea_art: tea_art_json(@tea_art),
      message: 'ティーアートが作成されました'
    }, status: :created
  else
    render json: { errors: @tea_art.errors }, status: :unprocessable_entity
  end
  end

  # PATCH/PUT /api/v1/tea_arts/:id
  def update
    raise ActiveRecord::RecordInvalid.new(@tea_art) unless @tea_art.update(tea_art_params)

    render json: {
      tea_art: tea_art_json(@tea_art),
      message: 'ティーアートが更新されました'
    }
  end

  # DELETE /api/v1/tea_arts/:id
  def destroy
    @tea_art.destroy!
    render json: { message: 'ティーアートが削除されました' }
  end

  private

  def set_tea_art
    @tea_art = TeaArt.includes(:user, :tags).find(params[:id])
  end

  def check_owner
    return if current_user.id == @tea_art.user_id

    render json: {
      error: {
        type: 'Forbidden',
        message: '他のユーザーの作品は編集・削除できません'
      }
    }, status: :forbidden
  end

  def tea_art_params
    params.require(:tea_art).permit(:title, :description, :season, :temperature, tag_names: [])
  end

  def tea_art_json(tea_art)
    {
      id: tea_art.id,
      title: tea_art.title,
      description: tea_art.description,
      season: tea_art.season_display, # "Spring"（先頭大文字の表示用）
      temperature: tea_art.temperature,
      tags: tea_art.tags.map { |tag| tag_json(tag) },
      tag_names: tea_art.tag_names,
      user: {
        id: tea_art.user.id,
        name: tea_art.user.name
      },
      is_owner: current_user&.id == tea_art.user_id
    }
  end
  

  def tag_json(tag)
    {
      id: tag.id,
      name: tag.name,
    }
  end

  def pagination_json(collection)
    {
      current_page: collection.current_page,
      total_pages: collection.total_pages,
      total_count: collection.total_count,
      per_page: collection.limit_value,
      next_page: collection.next_page,
      prev_page: collection.prev_page
    }
  end
end
