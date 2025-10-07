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
          tea_arts_count: tag.tea_arts_count
        }
      end
    }
  end
end
