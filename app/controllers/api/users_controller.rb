class Api::UsersController < ApplicationController

  # ユーザー一覧を返すAPI
  def index
    users = User.all

    # React側で扱いやすいように、必要な項目だけJSONで返す
    # 例えば、APIから返すJSONの形式は、[{ id: 1, name: "テスト太郎" }, { id: 2, name: "テスト花子" }] のような形式になります。
    render json: users.map { |user|
      {
        id: user.id,
        name: user.name
      }
    }
  end

  # showアクションは、ユーザーのIDをURLパラメータから取得し、そのIDに対応するユーザーをデータベースから検索します。
  # 見つかったユーザーのIDと名前をJSON形式でレスポンスとして返します。
  def show
    # 例えば、http://localhost:3000/api/users/1 にアクセスすると、IDが1のユーザーの情報がJSON形式で返されます。
    user = User.find(params[:id])
    # 返すJSONの形式は、{ id: user.id, name: user.name } となります。
    render json: { id: user.id, name: user.name }
  end

  # ユーザー新規作成API
  def create
    user = User.new(user_params)
    # ユーザーの保存に成功した場合は、保存されたユーザーのIDと名前をJSON形式で返し、HTTPステータスコード201 Createdを返します。
    if user.save
      render json: {
        id: user.id,
        name: user.name
      }, status: :created
    else
      # ユーザーの保存に失敗した場合は、エラーメッセージをJSON形式で返し、HTTPステータスコード422 Unprocessable Entityを返します。
      render json: {
        errors: user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end