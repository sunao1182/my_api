import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchUser } from "../services/userApi"
import type { User } from "../types/user"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import Header from "../components/Header" // ヘッダーを追加
import "./UserDetailPage.css" // CSSをインポート

export default function UserDetailPage() {
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ログイン中ユーザー情報の取得 (Railsの current_user 相当)
  const loginUser = JSON.parse(localStorage.getItem("loginUser") || "null")

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!id) return
        setLoading(true)
        const data = await fetchUser(Number(id))
        setUser(data)
      } catch {
        setError("ユーザー情報の取得に失敗しました")
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [id])

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />
  if (!user) return <div className="user-detail-container">ユーザーが見つかりません</div>

  // 本人のページかどうか (Railsの current_user == @user 相当)
  const isMyPage = loginUser && loginUser.id === user.id

  return (
    <div className="page-wrapper">
      <Header />
      
      <div className="user-detail-container">
        {/* 名前の頭文字をアイコン風に表示 */}
        <div className="user-avatar-circle">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h1 className="user-detail-title">
          {isMyPage ? "マイプロフィール" : `${user.name} さんの詳細`}
        </h1>

        <div className="user-profile-info">
          <div className="info-item">
            <span className="info-label">ユーザーID</span>
            <span className="info-value">{user.id}</span>
          </div>
          <div className="info-item">
            <span className="info-label">お名前</span>
            <span className="info-value">{user.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">メールアドレス</span>
            <span className="info-value">{user.email}</span>
          </div>
        </div>

        <div className="user-detail-actions">
          {isMyPage && (
            <Link to={`/users/${user.id}/edit`} className="btn-edit-profile">
              プロフィールを編集する
            </Link>
          )}
          
          <Link to="/users" className="back-link">
            ← ユーザー一覧へ戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
