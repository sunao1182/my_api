import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchUser } from "../services/userApi"
import type { User } from "../types/user"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"

export default function UserDetailPage() {
  // URLパラメータからユーザーIDを取得する
  const { id } = useParams()

  // ユーザー詳細を保持する
  const [user, setUser] = useState<User | null>(null)

  // ローディング状態
  const [loading, setLoading] = useState(true)

  // エラーメッセージ
  const [error, setError] = useState<string | null>(null)

  // localStorage からログインユーザー情報を取得する
  const loginUser = JSON.parse(localStorage.getItem("loginUser") || "null")

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!id) return

        setLoading(true)
        setError(null)

        // useParams で取得した id は string なので number に変換する
        const data = await fetchUser(Number(id))
        setUser(data)
      } catch {
        setError("ユーザー取得失敗")
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [id])

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />
  if (!user) return <p>ユーザーが見つかりません</p>

  // ログイン中ユーザー本人のページかどうかを判定する
  const isMyPage = loginUser && loginUser.id === user.id

  return (
    <div>
      <h1>ユーザー詳細</h1>

      <p>ID: {user.id}</p>
      <p>名前: {user.name}</p>
      <p>メールアドレス: {user.email}</p>

      <div style={{ marginTop: "16px" }}>
        {/* 本人のときだけ編集リンクを表示する */}
        {isMyPage && (
          <div style={{ marginBottom: "12px" }}>
            <Link to={`/users/${user.id}/edit`}>自分の情報を編集する</Link>
          </div>
        )}

        <Link to="/users">ユーザー一覧へ戻る</Link>
      </div>
    </div>
  )
}