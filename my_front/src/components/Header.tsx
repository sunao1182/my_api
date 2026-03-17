import { Link, useNavigate, useLocation } from "react-router-dom"
import { getLoginUser, logout } from "../services/authStorage"
import "./Header.css"

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation() // 今のURLを取得して「現在地」を光らせるため
  const loginUser = getLoginUser()

  const handleLogout = () => {
    if (window.confirm("ログアウトしますか？")) {
      logout()
      navigate("/login")
    }
  }

  // Railsの active_link_to のような判定用関数
  const isActive = (path: string) => location.pathname.startsWith(path) ? "active" : ""

  return (
    <header className="main-header">
      <div className="header-inner">
        {/* 左端：ロゴエリア */}
        <div className="header-logo">
          <Link to="/articles">MyBoard</Link>
        </div>

        {/* 中央：メインナビゲーション */}
        <nav className="nav-group">
          <Link to="/articles" className={`nav-link ${isActive("/articles")}`}>
            Articles
          </Link>
          <Link to="/users" className={`nav-link ${isActive("/users")}`}>
            Users
          </Link>
        </nav>

        {/* 右端：ユーザーメニュー */}
        <div className="user-controls">
          {loginUser && (
            <Link to={`/users/${loginUser.id}`} className="user-profile-link">
              <div className="user-avatar-small">
                {loginUser.name.charAt(0).toUpperCase()}
              </div>
              <span className="user-name-text">{loginUser.name}</span>
            </Link>
          )}
          
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
