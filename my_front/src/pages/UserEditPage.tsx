import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { fetchUser, updateUser } from "../services/userApi"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import Header from "../components/Header" // ヘッダーを忘れずに
import "./UserEditPage.css" // CSSをインポート

export default function UserEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // --- 1. フォームの状態 ---
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ログイン中ユーザー情報
  const loginUser = JSON.parse(localStorage.getItem("loginUser") || "null")

  // --- 2. 初期データの読み込み (Railsの edit アクション相当) ---
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!id) return
        setLoading(true)

        // APIからデータを取得
        const data = await fetchUser(Number(id))

        // ★このタイミングで localStorage をチェックする（外から中に移動）
        const storedUser = JSON.parse(localStorage.getItem("loginUser") || "null")

        // 本人確認フラグ（dataが取得できてから比較する）
        if (!storedUser || storedUser.id !== data.id) {
          navigate(`/users/${id}`)
          return
        }

        setName(data.name)
        setEmail(data.email)
      } catch {
        setError("ユーザー情報の取得に失敗しました")
      } finally {
        setLoading(false)
      }
    }
    loadUser()
    // 依存配列から loginUser を消せるので、無限ループや警告も防げます
  }, [id, navigate])

  // --- 3. 送信処理 (Railsの update アクション相当) ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!id) return

    // 簡易バリデーション
    if (!name.trim() || !email.trim()) {
      setError("名前とメールアドレスは必須です")
      return
    }

    if (password && password !== passwordConfirmation) {
      setError("パスワードの確認用が一致しません")
      return
    }

    try {
      setError(null)
      // Rails APIへのリクエスト
      await updateUser(Number(id), {
        name,
        email,
        ...(password ? { password } : {}),
        ...(passwordConfirmation ? { password_confirmation: passwordConfirmation } : {}),
      })

      // ★重要：ヘッダー表示などに使っているlocalStorageの情報も更新する
      localStorage.setItem(
        "loginUser",
        JSON.stringify({ ...loginUser, name, email })
      )

      // 更新後は詳細画面へ戻る (Railsの redirect_to user_path 相当)
      navigate(`/users/${id}`)
    } catch {
      setError("ユーザー情報の更新に失敗しました")
    }
  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="page-wrapper">
      <Header />
      
      <div className="user-edit-container">
        <h1 className="user-edit-title">プロフィール編集</h1>

        {/* エラー表示 (Railsの error_messages 相当) */}
        {error && <div className="error-text" style={{ color: '#d93025', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}

        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">お名前</label>
            <input
              id="name"
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">メールアドレス</label>
            <input
              id="email"
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              新しいパスワード
              <span className="field-hint">（変更する場合のみ入力）</span>
            </label>
            <input
              id="password"
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password_confirmation">新しいパスワード（確認）</label>
            <input
              id="password_confirmation"
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-update-profile">
            プロフィールを更新する
          </button>
        </form>

        <div className="edit-footer">
          <Link to={`/users/${id}`} className="back-link">
            ← 変更せずに詳細へ戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
