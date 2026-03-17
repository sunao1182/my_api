import { Link, useNavigate } from "react-router-dom"
import ArticleForm from "../components/ArticleForm"
import { createArticle } from "../services/articleApi"
import Header from "../components/Header" // ヘッダーを追加
import "./ArticleNewPage.css" // CSSをインポート

export default function ArticleNewPage() {
  // --- 1. 画面遷移用 (Railsの redirect_to 用) ---
  const navigate = useNavigate()

  // --- 2. 記事作成の実行処理 (Railsの create アクションに相当) ---
  const handleCreate = async (data: {
    title: string
    body: string
  }) => {
    try {
      // サービス（API）を呼び出してサーバーに保存
      await createArticle(data)

      // 投稿成功後は記事一覧へ (Railsの redirect_to articles_path 相当)
      navigate("/articles")
    } catch (error) {
      console.error(error); // ここで「使う」ことで警告が消える
      window.alert("記事の投稿に失敗しました");
    }
  }

  return (
    <div className="page-wrapper">
      <Header />
      
      <div className="article-new-container">
        <h1 className="new-title">新規記事を投稿</h1>

        {/* 共通のフォームコンポーネントを表示 (Railsの render 'form' 相当) */}
        {/* onSubmit プロパティに作成処理を渡すことで、送信ボタンが押された時に動くようにする */}
        <ArticleForm onSubmit={handleCreate} />

        <div className="new-footer">
          <Link to="/articles" className="back-to-index">
            ← 投稿せずに記事一覧へ戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
