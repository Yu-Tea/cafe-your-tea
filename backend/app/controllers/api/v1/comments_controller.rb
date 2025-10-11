class Api::V1::CommentsController < ApplicationController
  before_action :set_tea_art, only: [:index, :create]
  before_action :set_comment, only: [:update, :destroy]
  before_action :authenticate_user!, only: [:update, :destroy]  # ログインユーザーのみ
  before_action :check_comment_owner, only: [:update, :destroy]
  
  def index
    # ページネーション設定
    page = params[:page]&.to_i || 1
    limit = [params[:limit]&.to_i || 10, 50].min  # 最大50件制限
    
    @comments = @tea_art.comments
                      .includes(:user)
                      .order(created_at: :desc)
                      .page(params[:page])
    
    render json: {
      comments: @comments.map { |comment| comment_json(comment) },
      pagination: pagination_json(@comments)
    }
  end
  
  def create
    @comment = @tea_art.comments.build(comment_params)
    
    # ログイン状態に応じて自動設定
    if current_user
      @comment.user = current_user
    end
    
    if @comment.save
      render json: {
        comment: comment_json(@comment),
        message: "コメントを投稿しました"
      }, status: :created
    else
      render json: {
        errors: @comment.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
  
  def update
    if @comment.update(comment_params)
      render json: {
        comment: comment_json(@comment),
        message: "コメントを更新しました"
      }
    else
      render json: {
        errors: @comment.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @comment.destroy
    render json: {
      message: "コメントを削除しました",
      comment_id: @comment.id
    }
  end

  private
  
  def set_tea_art
    @tea_art = TeaArt.find(params[:tea_art_id])
  end
  
   def set_comment
    @comment = Comment.find(params[:id])
  end
  
  def check_comment_owner
    # ログインユーザーのコメントのみ編集・削除可能（ゲストコメントは対象外）
    unless @comment.user == current_user
      render json: {
        error: "このコメントを編集・削除する権限がありません"
      }, status: :forbidden
      return
    end
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
  
  def comment_json(comment)
    {
      id: comment.id,
      body: comment.body,
      user_name: comment.is_guest ? "匿名" : comment.user&.name,
      avatar_preset: comment.is_guest ? nil : comment.user&.avatar_preset,
      created_at: comment.created_at.strftime('%Y/%m/%d %H:%M'),
      is_owner: comment.user_id == current_user&.id
    }
  end

  def pagination_json(collection)
    {
      current_page: collection.current_page,
      total_pages: collection.total_pages,
      total_count: collection.total_count,
      per_page: collection.limit_value,
      next_page: collection.next_page,
      prev_page: collection.prev_page,
      has_next_page: collection.next_page.present?,
      has_prev_page: collection.prev_page.present?,
    }
  end
end