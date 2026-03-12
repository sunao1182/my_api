// Article型
// Rails APIから受け取る記事データの形を定義する
export type Article = {
  id: number
  title: string
  body: string
  user_id: number
  created_at: string
  updated_at: string

  // 記事を投稿したユーザー情報
  user: {
    id: number
    name: string
  }
}