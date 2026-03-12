class Api::ArticlesController < ApplicationController
  # 記事一覧
  def index
    articles = Article.includes(:user).order(created_at: :desc)
    render json: articles.as_json(include: { user: { only: [:id, :name] } })
  end

  # 記事詳細
  def show
    article = Article.includes(:user).find(params[:id])
    render json: article.as_json(include: { user: { only: [:id, :name] } })
  end

  # 記事作成
  def create
    article = Article.new(article_params)

    if article.save
      render json: article.as_json(include: { user: { only: [:id, :name] } }), status: :created
    else
      render json: { errors: article.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # 記事更新
  def update
    article = Article.find(params[:id])

    if article.update(article_params)
      render json: article
    else
      render json: { errors: article.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # 記事削除
  def destroy
    article = Article.find(params[:id])
    article.destroy

    render json: { message: "記事を削除しました" }
  end

  private

  def article_params
    params.require(:article).permit(:title, :body, :user_id)
  end
end