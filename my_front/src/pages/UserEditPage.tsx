import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { fetchUser, updateUser } from "../services/userApi"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"

export default function UserEditPage() {
  // URLパラメータからユーザーIDを取得する
  const { id } = useParams()

  // 画面遷移用
  const navigate = useNavigate()

  // フォーム入力用のstate
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  // ローディング状態
  const [loading, setLoading] = useState(true)

  // エラーメッセージ
  const [error, setError] = useState<string | null>(null)

  // localStorageからログインユーザー情報を取得する
  const loginUser = JSON.parse(localStorage.getItem("loginUser") || "null")

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!id) return

        setLoading(true)
        setError(null)

        const data = await fetchUser(Number(id))

        // useEffectの中でログインユーザー情報を取得する
        const loginUser = JSON.parse(localStorage.getItem("loginUser") || "null")

        // 本人以外の編集画面を開こうとした場合は詳細画面へ戻す
        if (!loginUser || loginUser.id !== data.id) {
          navigate(`/users/${id}`)
          return
        }

        // 取得したユーザー情報をフォーム初期値に入れる
        setName(data.name)
        setEmail(data.email)
      } catch {
        setError("ユーザー取得失敗")
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [id, navigate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!id) return

    if (!name.trim()) {
      setError("名前を入力してください")
      return
    }

    if (!email.trim()) {
      setError("メールアドレスを入力してください")
      return
    }

    // パスワードを変更する場合だけ確認チェックする
    if (password || passwordConfirmation) {
      if (password !== passwordConfirmation) {
        setError("パスワード確認が一致しません")
        return
      }
    }

    try {
      setError(null)

      await updateUser(Number(id), {
        name,
        email,
        ...(password ? { password } : {}),
        ...(passwordConfirmation ? { password_confirmation: passwordConfirmation } : {}),
      })

      // 自分のログイン情報を更新する
      localStorage.setItem(
        "loginUser",
        JSON.stringify({
          ...loginUser,
          id: Number(id),
          name,
          email,
        })
      )

      // 更新後は自分の詳細画面へ戻る
      navigate(`/users/${id}`)
    } catch {
      setError("ユーザー更新失敗")
    }
  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  return (
    <div>
      <h1>ユーザー情報編集</h1>

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
          <label htmlFor="password">新しいパスワード（変更する場合のみ）</label>
          <br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="password_confirmation">新しいパスワード確認</label>
          <br />
          <input
            id="password_confirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <button type="submit">更新する</button>
      </form>

      <div style={{ marginTop: "16px" }}>
        <Link to={`/users/${id}`}>ユーザー詳細へ戻る</Link>
      </div>
    </div>
  )
}