// src/pages/ArticleDetailPage.tsxは、記事の詳細ページを提供するReactコンポーネントです。
// useEffectフックを使用して、コンポーネントの初回レンダリング時に記事の詳細を取得します。
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
// useArticleカスタムフックをインポートします。
// これにより、記事の詳細を取得するためのロジックがこのページで使用できるようになります。
import useArticle from "../hooks/useArticle"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"

export default function ArticleDetailPage() {
  // URLの :id を取得する
  const { id } = useParams()

  // 記事詳細取得用Hook
  const { article, loading, error, loadArticle } = useArticle()

  // 初回表示時に記事詳細を取得する
  useEffect(() => {
    if (id) {
      loadArticle(Number(id))
    }
    // 依存配列にidとloadArticleを指定することで、idが変更されたときやloadArticle関数が変更されたときに再度記事の詳細を取得します。
  }, [id, loadArticle])

  // 読み込み中
  if (loading) return <Loading />

  // エラー表示
  if (error) return <ErrorMessage message={error} />

  // 記事が見つからない場合
  if (!article) return <p>記事が見つかりません</p>

  return (
    <div>
      <h1>記事詳細</h1>

      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <p>投稿者: {article.user.name}</p>

      <div style={{ marginTop: "16px" }}>
        <Link to="/articles">記事一覧へ戻る</Link>
      </div>
    </div>
  )
}