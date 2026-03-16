// ユーザーフォームコンポーネント
// ユーザーの新規作成や編集に使用するフォームコンポーネントです。
import { useState } from "react"

// Propsの型定義
// Propsとは、コンポーネントに渡されるデータのことです。
// ここでは、UserFormコンポーネントが受け取るpropsの型を定義しています。
// onSubmitは、フォームが送信されたときに呼び出される関数で、ユーザーのデータを引数として受け取ります。
// initialValuesは、フォームの初期値を指定するためのオプションのプロパティで、ユーザーの名前とメールアドレスを含むオブジェクトです。
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

// ユーザーフォームコンポーネントを定義
// これにより、UserFormコンポーネントが定義されます。
// ユーザーの名前、メールアドレス、パスワード、および確認用パスワードを入力するためのフォームを提供します。
// フォームが送信されたときには、onSubmit関数が呼び出され、ユーザーのデータが渡されます。
export default function UserForm({ onSubmit, initialValues }: Props) {
  const [name, setName] = useState(initialValues?.name ?? "")
  const [email, setEmail] = useState(initialValues?.email ?? "")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState<string | null>(null)

  // フォーム送信時の処理
  // eは、フォーム送信イベントを表すオブジェクトで、e.preventDefault()は、フォームが送信されたときのデフォルトの動作（ページのリロードなど）を防止するために使用されます。
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("名前を入力してください")
      return
    }

    if (!email.trim()) {
      setError("メールアドレスを入力してください")
      return
    }

    if (!password.trim()) {
      setError("パスワードを入力してください")
      return
    }

    if (!passwordConfirmation.trim()) {
      setError("確認用パスワードを入力してください")
      return
    }

    if (password !== passwordConfirmation) {
      setError("パスワード確認が一致しません")
      return
    }

    try {
      setError(null)

      await onSubmit({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
    } catch {
      setError("送信に失敗しました")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "12px" }}>
        <label htmlFor="name">名前</label>
        <br />
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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

      <div style={{ marginBottom: "12px" }}>
        <label htmlFor="password_confirmation">確認用パスワード</label>
        <br />
        <input
          id="password_confirmation"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">保存する</button>
    </form>
  )
}