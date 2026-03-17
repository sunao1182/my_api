class Api::ArticlesController < ApplicationController
  # 記事APIはログイン済みユーザーのみ利用可能にする
  before_action :authenticate_user!

  # 記事一覧（検索・並び替え・ページネーション対応）
  def index
    articles = Article.includes(:user)

    # 1. タイトル検索 (React側の query パラメータに対応)
    if params[:query].present?
      articles = articles.where("title LIKE ?", "%#{params[:query]}%")
    end

    # 2. 並び替え (React側の sort パラメータに対応)
    # タイトル順(title)かID順(id)を選択可能に。デフォルトは作成日新しい順
    allowed_sorts = %w[id title]
    sort_column = allowed_sorts.include?(params[:sort]) ? params[:sort] : "created_at"
    sort_direction = sort_column == "created_at" ? "DESC" : "ASC"

    # 3. ページネーション (React側の page, perPage パラメータに対応)
    page = params[:page].to_i > 0 ? params[:page].to_i : 1
    per_page = params[:perPage].to_i > 0 ? params[:perPage].to_i : 5 # 初期表示5件

    articles = articles.order("#{sort_column} #{sort_direction}")
                       .limit(per_page)
                       .offset((page - 1) * per_page)

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