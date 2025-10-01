class Api::V1::TeaArtsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :set_tea_art, only: %i[show update destroy]
  before_action :check_owner, only: %i[update destroy]

  # GET /api/v1/tea_arts
  def index
    @tea_arts = TeaArt.includes(:user)
                      .order(created_at: :desc)
                      .page(params[:page])

    render json: {
      tea_arts: @tea_arts.map { |tea_art| tea_art_json(tea_art) },
      pagination: pagination_json(@tea_arts)
    }
  end

  # GET /api/v1/tea_arts/:id
  def show
    render json: {
      tea_art: tea_art_json(@tea_art),
      can_edit: current_user&.id == @tea_art.user_id
    }
  end

  # POST /api/v1/tea_arts
  def create
    @tea_art = current_user.tea_arts.build(tea_art_params)

    raise ActiveRecord::RecordInvalid.new(@tea_art) unless @tea_art.save

    render json: {
      tea_art: tea_art_json(@tea_art),
      message: 'ティーアートが作成されました'
    }, status: :created
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
    @tea_art = TeaArt.includes(:user).find(params[:id])
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
    params.require(:tea_art).permit(:title, :description, :season, :temperature)
  end

  def tea_art_json(tea_art)
    {
      id: tea_art.id,
      title: tea_art.title,
      description: tea_art.description,
      season: tea_art.season_display, # "Spring"（先頭大文字の表示用）
      temperature: tea_art.temperature,
      user: {
        id: tea_art.user.id,
        name: tea_art.user.name
      },
      is_owner: current_user&.id == tea_art.user_id
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
