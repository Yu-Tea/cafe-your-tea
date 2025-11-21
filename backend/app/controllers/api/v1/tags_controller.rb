class Api::V1::TagsController < ApplicationController
  def index
    tags = Tag.left_joins(:tea_art_tags)
              .select('tags.*, COUNT(tea_art_tags.id) as tea_arts_count')
              .group('tags.id')
              .order('tags.id ASC')

    render json: {
      tags: tags.map do |tag|
        {
          id: tag.id,
          name: tag.name,
        }
      end
    }
  end

  def show
    tag = Tag.find(params[:id])
    tea_arts = TeaArt.joins(:tea_art_tags)
                     .where(tea_art_tags: { tag_id: tag.id })
                     .includes(:user, :tags)
                     .order(created_at: :desc)
                     .page(params[:page])

    render json: {
      tea_arts: tea_arts.map { |tea_art| tea_art_list_json(tea_art) },
      tag_name:tag.name,
      pagination: pagination_json(tea_arts)
    }
  end
end
