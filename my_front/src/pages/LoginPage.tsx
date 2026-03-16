import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { login } from "../services/authApi"
import { isLoggedIn } from "../services/authStorage"

export default function LoginPage() {
  // メールアドレス入力欄
  const [email, setEmail] = useState("")

  // パスワード入力欄
  const [password, setPassword] = useState("")

  // エラーメッセージ表示用
  const [error, setError] = useState<string | null>(null)

  // 画面遷移用
  const navigate = useNavigate()

  // すでにログイン済みなら、ログイン画面を見せずにユーザー一覧へ移動する
  if (isLoggedIn()) {
    return <Navigate to="/users" replace />
  }

  // ログイン送信処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // フォーム送信時の画面リロードを防ぐ
    e.preventDefault()

    // 入力チェック
    if (!email.trim()) {
      setError("メールアドレスを入力してください")
      return
    }

    if (!password.trim()) {
      setError("パスワードを入力してください")
      return
    }

    try {
      // 前回エラーを消す
      setError(null)

      // Rails APIへログインリクエスト
      const data = await login(email, password)

      // JWTトークンを保存
      localStorage.setItem("token", data.token)

      // ログインユーザー情報を保存
      localStorage.setItem("loginUser", JSON.stringify(data.user))

      // ログイン成功後はユーザー一覧へ移動
      navigate("/users")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("ログインに失敗しました")
      }
    }
  }

  return (
    <div>
      <h1>ログイン</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="email">メールアドレス</label>
          <br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="password">パスワード</label>
          <br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">ログイン</button>
      </form>

      {/* 未ログイン時だけユーザー登録リンクを表示する */}
      <div style={{ marginTop: "16px" }}>
        <Link to="/users/new">ユーザー登録はこちら</Link>
      </div>
    </div>
  )
}