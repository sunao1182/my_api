import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { fetchArticle, updateArticle } from "../services/articleApi"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import Header from "../components/Header" // ヘッダーを追加
import "./ArticleEditPage.css" // CSSをインポート

export default function ArticleEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // --- フォームの状態管理 (Railsの f.text_field などの値) ---
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // --- 初期データの読み込み (Railsの edit アクションでの @article = Article.find 相当) ---
  useEffect(() => {
    const loadArticle = async () => {
      try {
        if (!id) return
        setLoading(true)

        const data = await fetchArticle(Number(id))

        // 本人確認 (Railsの before_action :correct_user 相当)
        const loginUser = JSON.parse(localStorage.getItem("loginUser") || "null")
        if (!loginUser || loginUser.id !== data.user.id) {
          // 本人じゃなければ詳細へ強制送還
          navigate(`/articles/${id}`)
          return
        }

        setTitle(data.title)
        setBody(data.body)
      } catch {
        setError("記事の取得に失敗しました")
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [id, navigate])

  // --- 更新処理 (Railsの update アクションへの送信相当) ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 画面リロードを防止

    if (!id) return

    // バリデーション (Railsの Model Validation 相当をフロントでも行う)
    if (!title.trim() || !body.trim()) {
      setError("すべての項目を入力してください")
      return
    }

    try {
      setError(null)
      await updateArticle(Number(id), { title, body })

      // 更新成功後は詳細画面へ (Railsの redirect_to article_path(@article) 相当)
      navigate(`/articles/${id}`)
    } catch {
      setError("記事の更新に失敗しました")
    }
  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="page-wrapper">
      <Header />
      
      <div className="article-edit-container">
        <h1 className="edit-title">記事を編集</h1>

        {/* エラーがあれば表示 */}
        {error && <div style={{ color: "#d93025", marginBottom: "15px", fontSize: "14px" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">タイトル</label>
            <input
              id="title"
              className="form-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="記事のタイトル"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="body">本文</label>
            <textarea
              id="body"
              className="form-textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="記事の内容を書いてください"
            />
          </div>

          <button type="submit" className="btn-submit-update">
            更新を保存する
          </button>
        </form>

        <div className="edit-footer">
          <Link to={`/articles/${id}`} className="back-to-detail">
            ← 変更せずに詳細へ戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
