import { Link } from "react-router-dom"
import type { Article } from "../types/article"
import { getLoginUser } from "../services/authStorage"
import "./ArticleCard.css"

// 親から受け取るデータの型定義
type Props = {
  article: Article
  onDelete: (id: number) => Promise<void>
}

export default function ArticleCard({ article, onDelete }: Props) {
  // 1. 権限チェック (Railsの current_user との比較に相当)
  const loginUser = getLoginUser()
  const isOwner = loginUser && loginUser.id === article.user.id

  // 2. 削除実行前の確認ダイアログ
  const handleClickDelete = async () => {
    // Railsの data: { confirm: "..." } と同じ役割
    const ok = window.confirm("この記事を削除しますか？")
    if (ok) {
      await onDelete(article.id)
    }
  }

  return (
    <li className="article-card-item">
      {/* 記事のヘッダー部分 */}
      <div className="article-header">
        <Link to={`/articles/${article.id}`} className="article-title">
          <strong>{article.title}</strong>
        </Link>
        <span className="article-author">投稿者: {article.user.name}</span>
      </div>

      {/* 記事の本文 (プレビューとして表示) */}
      <div className="article-body">
        {article.body}
      </div>

      {/* 操作アクション (詳細・編集・削除) */}
      <div className="article-actions">
        <Link to={`/articles/${article.id}`} className="action-link">
          詳細を見る
        </Link>

        {/* 自分の記事のときだけ、編集と削除の権利を与える */}
        {isOwner && (
          <div className="owner-actions">
            <Link to={`/articles/${article.id}/edit`} className="action-link edit">
              編集
            </Link>
            <button className="btn-delete" onClick={handleClickDelete}>
              削除
            </button>
          </div>
        )}
      </div>
    </li>
  )
}
