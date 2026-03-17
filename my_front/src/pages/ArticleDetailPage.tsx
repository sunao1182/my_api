import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import useArticle from "../hooks/useArticle"
import { deleteArticle } from "../services/articleApi"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import Header from "../components/Header" // ヘッダーを追加
import "./ArticleDetailPage.css" // CSSをインポート

export default function ArticleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { article, loading, error, loadArticle } = useArticle()

  // ログインユーザー情報の取得 (Railsの current_user 相当)
  const loginUser = JSON.parse(localStorage.getItem("loginUser") || "null")

  useEffect(() => {
    if (id) {
      loadArticle(Number(id))
    }
  }, [id, loadArticle])

  // 削除ボタン押下時の処理 (Railsの destroy アクションへのリクエスト相当)
  const handleDelete = async () => {
    if (!id) return
    if (!window.confirm("この記事を完全に削除してもよろしいですか？")) return

    try {
      await deleteArticle(Number(id))
      // Railsの redirect_to articles_path 相当
      navigate("/articles")
    } catch {
      window.alert("削除に失敗しました。権限がない可能性があります。")
    }
  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />
  if (!article) return <div className="article-detail-container">記事が見つかりません</div>

  // 本人確認フラグ
  const isOwner = loginUser && article.user && loginUser.id === article.user.id

  return (
    <div className="page-wrapper">
      <Header />
      
      <article className="article-detail-container">
        <span className="article-category">Blog Post</span>
        <h1 className="article-main-title">{article.title}</h1>
        
        <div className="article-meta">
          <span className="author-name">投稿者: <strong>{article.user.name}</strong></span>
          <span className="article-id">Article ID: {article.id}</span>
        </div>

        {/* 記事の本文 */}
        <div className="article-content-body">
          {article.body}
        </div>

        {/* 下部アクションエリア */}
        <footer className="article-footer-actions">
          {isOwner && (
            <div className="owner-ops">
              <Link to={`/articles/${article.id}/edit`} className="edit-link">
                ✎ この記事を編集する
              </Link>
              <button onClick={handleDelete} className="btn-delete-detail">
                この記事を削除する
              </button>
            </div>
          )}

          <Link to="/articles" className="back-link">
            ← 記事一覧へ戻る
          </Link>
        </footer>
      </article>
    </div>
  )
}
