// src/pages/ArticleDetailPage.tsxは、記事の詳細ページを提供するReactコンポーネントです。
// useEffectフックを使用して、コンポーネントの初回レンダリング時に記事の詳細を取得します。
import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
// useArticleカスタムフックをインポートします。
// これにより、記事の詳細を取得するためのロジックがこのページで使用できるようになります。
import useArticle from "../hooks/useArticle"
import { deleteArticle } from "../services/articleApi"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"

export default function ArticleDetailPage() {
  // URLの :id を取得する
  const { id } = useParams()

  // 画面遷移用
  const navigate = useNavigate()

  // 記事詳細取得用Hook
  const { article, loading, error, loadArticle } = useArticle()

  // localStorage からログインユーザー情報を取得する
  // 文字列で保存されているため、JSON.parse でオブジェクトに戻す
  const loginUser = JSON.parse(localStorage.getItem("loginUser") || "null")

  // 初回表示時に記事詳細を取得する
  useEffect(() => {
    if (id) {
      loadArticle(Number(id))
    }
    // 依存配列にidとloadArticleを指定することで、idが変更されたときやloadArticle関数が変更されたときに再度記事の詳細を取得します。
  }, [id, loadArticle])

  // 削除処理
  const handleDelete = async () => {
    if (!id) return

    // 確認ダイアログを表示する
    const ok = window.confirm("この記事を削除しますか？")
    if (!ok) return

    try {
      await deleteArticle(Number(id))

      // 削除後は記事一覧へ戻る
      navigate("/articles")
    } catch {
      window.alert("記事削除に失敗しました")
    }
  }
  // 読み込み中
  if (loading) return <Loading />

  // エラー表示
  if (error) return <ErrorMessage message={error} />

  // 記事が見つからない場合
  if (!article) return <p>記事が見つかりません</p>

  // ログイン中ユーザーがこの記事の投稿者本人かどうかを判定する
  const isOwner = loginUser && article.user && loginUser.id === article.user.id

  return (
    <div>
      <h1>記事詳細</h1>

      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <p>投稿者: {article.user.name}</p>

      <div style={{ marginTop: "16px" }}>
        {/* 本人の記事のときだけ編集リンクを表示する */}
        {isOwner && (
          <div style={{ marginBottom: "12px" }}>
            <Link to={`/articles/${article.id}/edit`}>この記事を編集する</Link>
          </div>
        )}

        {/* 本人の記事のときだけ削除ボタンを表示する */}
        {isOwner && (
          <div style={{ marginBottom: "12px" }}>
            <button onClick={handleDelete}>この記事を削除する</button>
          </div>
        )}

        <Link to="/articles">記事一覧へ戻る</Link>
      </div>
    </div>
  )
}