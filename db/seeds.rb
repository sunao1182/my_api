# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# 既存データを一旦削除
User.destroy_all

# 一覧表示確認用のサンプルデータ
User.create!(name: "山田太郎")
User.create!(name: "田中花子")
User.create!(name: "鈴木一郎")