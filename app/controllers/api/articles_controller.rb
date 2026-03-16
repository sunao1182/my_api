class Api::ArticlesController < ApplicationController
  # 記事APIはログイン済みユーザーのみ利用可能にする
  before_action :authenticate_user!

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
    # user_id はフロントから受け取らず、
    # ログイン中のユーザーを記事の作成者にする
    article = current_user.articles.new(article_params)

    if article.save
      render json: article.as_json(include: { user: { only: [:id, :name] } }), status: :created
    else
      render json: { errors: article.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # 記事更新
  def update
    article = current_user.articles.find(params[:id])

    if article.update(article_params)
      render json: article.as_json(include: { user: { only: [:id, :name] } })
    else
      render json: { errors: article.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # 記事削除
  def destroy
    article = current_user.articles.find(params[:id])
    article.destroy

    render json: { message: "記事を削除しました" }
  end

  private

  def article_params
    # user_id は受け取らない
    params.require(:article).permit(:title, :body)
  end
end