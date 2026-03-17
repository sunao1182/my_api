import type { User } from "../types/user"
import { Link } from "react-router-dom"
import { getLoginUser } from "../services/authStorage"
import "./UserCard.css" // ★CSSファイルを読み込む

type Props = {
  user: User
  onDelete: () => void
}

export default function UserCard({ user, onDelete }: Props) {
  const loginUser = getLoginUser()

  // 自分自身のカードかどうかを判定する
  const isMyCard = loginUser && loginUser.id === user.id

  // 削除ボタンのクリックハンドラ（確認ダイアログ付き）
  const handleClickDelete = () => {
    const ok = window.confirm("本当にこのユーザーを削除しますか？")
    if (ok) {
      onDelete()
    }
  }

  return (
    // ★isMyCardがtrueの場合、"is-me"クラスも追加して自分であることを強調できるようにする
    <li className={`user-card-item ${isMyCard ? "is-me" : ""}`}>
      {isMyCard && <span className="me-badge">あなた</span>}

      <div className="user-info">
        <p className="user-id">ID: {user.id}</p>
        <h3 className="user-name">名前: {user.name}</h3>
        <p className="user-email">メール: {user.email}</p>
      </div>

      <div className="user-actions">
        <Link to={`/users/${user.id}`} className="detail-link">
          詳細を見る
        </Link>

        {/* 自分のカードの時だけ削除ボタンを表示 */}
        {isMyCard && (
          <button className="btn-delete-user" onClick={handleClickDelete}>
            削除
          </button>
        )}
      </div>
    </li>
  )
}
