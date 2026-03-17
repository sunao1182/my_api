import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { login } from "../services/authApi"
import { isLoggedIn } from "../services/authStorage"
import "./LoginPage.css" // CSSをインポート

export default function LoginPage() {
  // --- 1. 状態管理 (Railsの params 相当を保持) ---
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // --- 2. ログイン済みチェック (Railsの redirect_if_logged_in 相当) ---
  // すでにログイン済みなら、ログイン画面を見せずにユーザー一覧へ
  if (isLoggedIn()) {
    return <Navigate to="/users" replace />
  }

  // --- 3. 送信処理 (Railsの sessions#create 相当) ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 簡易バリデーション
    if (!email.trim() || !password.trim()) {
      setError("メールアドレスとパスワードを入力してください")
      return
    }

    try {
      setError(null)
      // Rails APIへリクエストを飛ばす
      const data = await login(email, password)

      // トークンとユーザー情報を保存 (Railsの session[:user_id] = user.id の現代版)
      localStorage.setItem("token", data.token)
      localStorage.setItem("loginUser", JSON.stringify(data.user))

      // 成功したらリダイレクト
      navigate("/users")
    } catch (err) {
      // エラーメッセージを表示
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("ログインに失敗しました。内容を確認してください。")
      }
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">MyBoard Login</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* エラー表示 (Railsの flash[:alert] 相当) */}
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label className="form-label" htmlFor="email">メールアドレス</label>
            <input
              id="email"
              className="form-input"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">パスワード</label>
            <input
              id="password"
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-login-submit">
            ログイン
          </button>
        </form>

        <div className="login-footer">
          <Link to="/users/new" className="register-link">
            アカウントをお持ちでない方はこちら
          </Link>
        </div>
      </div>
    </div>
  )
}
