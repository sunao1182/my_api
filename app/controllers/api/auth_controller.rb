module Api
  class AuthController < ApplicationController
    # ログインAPI
    def login
      # メールアドレスでユーザーを検索する
      user = User.find_by(email: params[:email])

      # ユーザーが存在し、パスワード認証に成功した場合
      if user&.authenticate(params[:password])
        # JWTトークンを発行する
        token = JsonWebToken.encode(user_id: user.id)

        render json: {
          token: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        }, status: :ok
      else
        render json: { error: "メールアドレスまたはパスワードが不正です" }, status: :unauthorized
      end
    end
  end
end