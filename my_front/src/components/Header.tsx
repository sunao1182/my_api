import { Link, useNavigate } from "react-router-dom"
import { getLoginUser, logout } from "../services/authStorage"

export default function Header() {
  const navigate = useNavigate()

  // ログイン中ユーザー情報を取得する
  const loginUser = getLoginUser()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div style={{ marginBottom: "24px", borderBottom: "1px solid #ccc", paddingBottom: "12px" }}>
      {/* ログイン中ユーザー表示 */}
      {loginUser && (
        <p style={{ marginBottom: "12px" }}>
          ログイン中: {loginUser.name}
        </p>
      )}

      {/* 画面遷移リンク */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <Link to="/users">ユーザー一覧</Link>
        <Link to="/articles">記事一覧</Link>
      </div>

      {/* ログアウト */}
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  )
}