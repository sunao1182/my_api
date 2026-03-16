class ApplicationController < ActionController::API
  include JsonWebToken

  # ログイン中ユーザーを取得するためのメソッド
  def current_user
    return @current_user if defined?(@current_user)

    token = request.headers["Authorization"]&.split(" ")&.last
    return nil if token.blank?

    begin
      decoded = JsonWebToken.decode(token)
      @current_user = User.find_by(id: decoded[:user_id])
    rescue JWT::DecodeError, JWT::ExpiredSignature
      @current_user = nil
    end
  end

  # 認証必須にしたいAPIで使う
  def authenticate_user!
    return if current_user.present?

    render json: { error: "認証が必要です" }, status: :unauthorized
  end
end