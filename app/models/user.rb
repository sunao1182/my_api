class User < ApplicationRecord
  # 名前が空だと保存できないようにする
  validates :name, presence: true
end
