import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useArticles from "../hooks/useArticles"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import ArticleCard from "../components/ArticleCard"
import Header from "../components/Header"
import { useDebounce } from "../hooks/useDebounce"
import "./ArticlesPage.css"

export default function ArticlesPage() {
  // --- 1. データと操作の取得 (RailsのControllerアクションに相当) ---
  const { 
    articles, loading, error, loadArticles, handleDelete, 
    sort, setSort, page, setPage 
  } = useArticles()

  // --- 2. 検索用の状態管理 ---
  // 入力中の生の文字を保持する（Railsの params[:query] の下書き）
  const [query, setQuery] = useState("")

  // 入力が止まって0.5秒後に確定させる（サーバーへの連打防止）
  const debouncedQuery = useDebounce(query, 5000)

  // --- 3. イベントハンドラ ---
  // Enterキーが押されたら、デバウンスを待たずに即時検索を実行
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPage(1) // 検索時は1ページ目に戻すのがお約束
      loadArticles(query)
    }
  }

  // --- 4. 副作用の監視 (Railsの redirect_to や render のトリガー) ---
  // ページ番号、並び替え順、検索ワードのいずれかが変わったら自動でデータを再取得
  useEffect(() => {
    loadArticles(debouncedQuery)
  }, [page, sort, debouncedQuery, loadArticles])

  // 読み込み中やエラー時の早期リターン
  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="articles-page">
      <Header />
      
      <div className="page-header">
        <h1>記事一覧</h1>
        {/* Railsの link_to "新規投稿", new_article_path に相当 */}
        <Link to="/articles/new" className="btn-new">新規記事投稿</Link>
      </div>

      {/* 検索と並び替えの操作エリア */}
      <div className="controls-section">
        <div className="search-sort-column">
          {/* 検索窓 */}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="タイトル名で検索"
              value={query}
              onChange={(e) => setQuery(e.target.value)} // 1文字打つたびに更新
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* 並び替えセレクトボックス */}
          <div className="sort-container">
            <label>並び替え: </label>
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as "id" | "title")
                setPage(1) // 条件変更時は1ページ目へ
              }}
            >
              <option value="id">ID順</option>
              <option value="title">タイトル名順</option>
            </select>
          </div>
        </div>
      </div>

      {/* 記事カードのリスト表示 (Railsの render @articles に相当) */}
      {articles.length === 0 ? (
        <p className="no-data">記事が見つかりませんでした。</p>
      ) : (
        <ul className="articles-list">
          {articles.map((article) => (
            <ArticleCard 
              key={article.id} // Reactが効率よく更新するために必須
              article={article} 
              onDelete={() => handleDelete(article.id, query)} 
            />
          ))}
        </ul>
      )}

      {/* ページネーション (Railsの paginate ヘルパーに相当) */}
      {articles.length > 0 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            disabled={page <= 1} 
            onClick={() => setPage(page - 1)}
          >
            前へ
          </button>
          
          <span className="page-info">ページ: {page}</span>
          
          <button 
            className="pagination-btn"
            onClick={() => setPage(page + 1)}
          >
            次へ
          </button>
        </div>
      )}
    </div>
  )
}
