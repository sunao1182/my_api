import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { fetchArticle, updateArticle } from "../services/articleApi"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"

export default function ArticleEditPage() {
  // URLパラメータから記事IDを取得する
  const { id } = useParams()

  // 画面遷移用
  const navigate = useNavigate()

  // フォーム入力用のstate
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  // ローディング状態
  const [loading, setLoading] = useState(true)

  // エラーメッセージ
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        if (!id) return

        setLoading(true)
        setError(null)

        const data = await fetchArticle(Number(id))

        // localStorage からログインユーザー情報を取得する
        const loginUser = JSON.parse(localStorage.getItem("loginUser") || "null")

        // 本人以外が編集画面を開こうとしたら詳細画面へ戻す
        if (!loginUser || loginUser.id !== data.user.id) {
          navigate(`/articles/${id}`)
          return
        }

        // フォーム初期値をセットする
        setTitle(data.title)
        setBody(data.body)
      } catch {
        setError("記事取得失敗")
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [id, navigate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!id) return

    if (!title.trim()) {
      setError("タイトルを入力してください")
      return
    }

    if (!body.trim()) {
      setError("本文を入力してください")
      return
    }

    try {
      setError(null)

      await updateArticle(Number(id), {
        title,
        body,
      })

      // 更新後は詳細画面へ戻る
      navigate(`/articles/${id}`)
    } catch {
      setError("記事更新失敗")
    }
  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  return (
    <div>
      <h1>記事編集</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="title">タイトル</label>
          <br />
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="body">本文</label>
          <br />
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            cols={40}
          />
        </div>

        <button type="submit">更新する</button>
      </form>

      <div style={{ marginTop: "16px" }}>
        <Link to={`/articles/${id}`}>記事詳細へ戻る</Link>
      </div>
    </div>
  )
}