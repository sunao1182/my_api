import { Link, useNavigate } from "react-router-dom"
import ArticleForm from "../components/ArticleForm"
import { createArticle } from "../services/articleApi"

export default function ArticleNewPage() {
  // 画面遷移用
  const navigate = useNavigate()

  // 記事作成処理
  const handleCreate = async (data: {
    title: string
    body: string
  }) => {
    await createArticle(data)

    // 投稿成功後に記事一覧へ移動
    navigate("/articles")
  }

  return (
    <div>
      <h1>記事投稿</h1>

      <ArticleForm onSubmit={handleCreate} />

      <div style={{ marginTop: "16px" }}>
        <Link to="/articles">記事一覧へ戻る</Link>
      </div>
    </div>
  )
}