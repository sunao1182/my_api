module Api
  class UsersController < ApplicationController
    # 1. ログインしていないと、どの操作もできないようにする
    before_action :authenticate_user!

    # ユーザー一覧を返すAPI
    def index
      users = User.all

      # 名前検索
      if params[:search].present?
        users = users.where("name LIKE ?", "%#{params[:search]}%")
      end

      # 並び替え・ページネーション処理（既存のまま）
      allowed_sorts = %w[id name email]
      sort_column = allowed_sorts.include?(params[:sort]) ? params[:sort] : "id"
      page = params[:page].to_i > 0 ? params[:page].to_i : 1
      per_page = params[:per_page].to_i > 0 ? params[:per_page].to_i : 10
      users = users.order(sort_column).limit(per_page).offset((page - 1) * per_page)

      # 安全のため項目を絞って返す
      render json: users, only: [:id, :name, :email]
    end

    # ユーザー詳細取得API（ログイン済みなら誰の詳細も見られる）
    def show
      user = User.find(params[:id])
      render json: user, only: [:id, :name, :email]
    end

    # ユーザー新規作成API
    # ※もし「誰でも会員登録できる」ようにするなら、ここだけ認証を除外する設定が必要です
    def create
      user = User.new(user_params)
      if user.save
        render json: user, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # ユーザー更新API
    def update
      user = User.find(params[:id])

      # 2. 本人確認：自分以外のデータは編集できないようにする
      if user.id != current_user.id
        return render json: { error: "他のユーザー情報は編集できません" }, status: :forbidden
      end

      if user.update(user_params)
        render json: user, status: :ok
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # ユーザー削除API
    def destroy
      user = User.find(params[:id])

      # 3. 本人確認：自分以外のデータは削除できないようにする
      if user.id != current_user.id
        return render json: { error: "他のユーザー情報は削除できません" }, status: :forbidden
      end

      user.destroy
      render json: { message: "User deleted successfully" }
    end

    private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
  end
end
