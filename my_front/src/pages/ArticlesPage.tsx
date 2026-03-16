// useEffectとは、Reactのフックの一つで、副作用を処理するために使用されます。
// これにより、コンポーネントのレンダリング後に特定の処理を実行することができます。
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
// useArticlesカスタムフックをインポートします。
// これにより、記事の一覧を取得するためのロジックがこのページで使用できるようになります。
import useArticles from "../hooks/useArticles"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
// ArticleCardコンポーネントをインポートします。
// これにより、記事の情報を表示するためのコンポーネントがこのページで使用できるようになります。
import ArticleCard from "../components/ArticleCard"
import { logout } from "../services/authStorage"

export default function ArticlesPage() {
  // 画面遷移用
  const navigate = useNavigate()

  // 記事一覧取得用Hook
  const { articles, loading, error, loadArticles, handleDelete } = useArticles()

  // 初回表示時に記事一覧を取得する
  useEffect(() => {
    // loadArticles関数を呼び出して、記事の一覧を取得します。
    loadArticles()
    // 依存配列にloadArticlesを指定することで、loadArticles関数が変更されたときに再度記事の一覧を取得します。
  }, [loadArticles])

  // ログアウト処理
  const handleLogout = () => {
    // localStorage に保存したログイン情報を削除する
    logout()

    // ログイン画面へ戻る
    navigate("/login")
  }

  // 読み込み中
  if (loading) return <Loading />

  // エラー表示
  if (error) return <ErrorMessage message={error} />

  return (
    <div>
      <h1>記事一覧</h1>

      <div style={{ marginBottom: "16px" }}>
        <Link to="/articles/new">新規記事投稿</Link>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <button onClick={handleLogout}>ログアウト</button>
      </div>

      {articles.length === 0 ? (
        <p>記事がありません</p>
      ) : (
        <ul>
          {/* 取得した記事の一覧を表示します。articles配列をmap関数でループして、各記事に対してArticleCardコンポーネントをレンダリングします。 */}
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  )
}