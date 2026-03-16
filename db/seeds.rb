Article.destroy_all
User.destroy_all

yamada = User.create!(
  name: "山田太郎",
  email: "test@example.com",
  password: "password123",
  password_confirmation: "password123"
)

tanaka = User.create!(
  name: "田中花子",
  email: "user2@example.com",
  password: "password123",
  password_confirmation: "password123"
)

suzuki = User.create!(
  name: "鈴木一郎",
  email: "user3@example.com",
  password: "password123",
  password_confirmation: "password123"
)

Article.create!(
  title: "React学習記録",
  body: "React Hooksの理解を進めた",
  user: yamada
)

Article.create!(
  title: "Rails API学習",
  body: "API設計の基本を学習",
  user: yamada
)