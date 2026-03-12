import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ArticleForm from "../components/ArticleForm"
import useArticle from "../hooks/useArticle"
import { updateArticle } from "../services/articleApi"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"

export default function ArticleEditPage() {
  // URLの :id を取得
  const { id } = useParams()

  // 画面遷移用
  const navigate = useNavigate()

  // 記事詳細取得用Hook
  const { article, loading, error, loadArticle } = useArticle()

  // 初回表示時に記事詳細を取得
  useEffect(() => {
    if (id) {
      loadArticle(Number(id))
    }
  }, [id, loadArticle])

  // 更新処理
  const handleUpdate = async (data: {
    title: string
    body: string
    user_id: number
  }) => {
    if (!id) return

    await updateArticle(Number(id), data)

    // 更新後は詳細画面へ戻る
    navigate(`/articles/${id}`)
  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />
  if (!article) return <p>記事が見つかりません</p>

  return (
    <div>
      <h1>記事編集</h1>

      <ArticleForm
        onSubmit={handleUpdate}
        initialValues={{
          title: article.title,
          body: article.body,
          user_id: article.user_id,
        }}
      />

      <div style={{ marginTop: "16px" }}>
        <Link to={`/articles/${article.id}`}>記事詳細へ戻る</Link>
      </div>
    </div>
  )
}