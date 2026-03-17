import { useState } from "react"
import "./UserForm.css" // CSSをインポート

type Props = {
  onSubmit: (data: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => Promise<void>
  initialValues?: {
    name: string
    email: string
  }
}

export default function UserForm({ onSubmit, initialValues }: Props) {
  // --- 1. フォームの状態管理 (Railsの f.text_field などの値に相当) ---
  const [name, setName] = useState(initialValues?.name ?? "")
  const [email, setEmail] = useState(initialValues?.email ?? "")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState<string | null>(null)

  // --- 2. バリデーションと送信処理 ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // ページリロードを防止

    // Railsの Model Validation 相当をフロントでもチェック
    if (!name.trim() || !email.trim()) {
      setError("名前とメールアドレスは必須です")
      return
    }

    if (!password || password !== passwordConfirmation) {
      setError("パスワードが一致しないか、入力されていません")
      return
    }

    try {
      setError(null)
      // 親コンポーネント（NewPageやEditPage）から渡された関数を実行
      await onSubmit({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
    } catch {
      setError("サーバーへの保存に失敗しました")
    }
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      {/* エラーメッセージ（Railsの error_messages ヘルパー風） */}
      {error && <p className="error-text">{error}</p>}

      <div className="form-group">
        <label className="form-label" htmlFor="name">お名前</label>
        <input
          id="name"
          className="form-input"
          type="text"
          placeholder="例：山田 太郎"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="password_confirmation">パスワード（確認用）</label>
        <input
          id="password_confirmation"
          className="form-input"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-save-user">
        保存して登録する
      </button>
    </form>
  )
}
