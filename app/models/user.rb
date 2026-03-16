class User < ApplicationRecord
  # パスワードを安全にハッシュ化して保存する
  # また、authenticate メソッドが使えるようになる
  has_secure_password

  # 名前が空だと保存できないようにする
  validates :name, presence: true

  # メールアドレスもログインに使うため必須にする
  validates :email, presence: true, uniqueness: true

  # パスワードの最低文字数
  validates :password, length: { minimum: 6 }, if: -> { password.present? }

  # ユーザーが削除されたら、そのユーザーの記事も削除する
  has_many :articles, dependent: :destroy
end