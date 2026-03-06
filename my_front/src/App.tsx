// Reactの基本的な機能をインポート
import { useEffect, useState } from "react"

// Rails APIから返ってくる1件分のユーザー型
type User = {
  id: number
  name: string
}

// バリデーションエラー用の型
type ErrorResponse = {
  errors: string[]
}

export default function App() {
  // ユーザー一覧
  const [users, setUsers] = useState<User[]>([])

  // 一覧取得中かどうか
  const [loading, setLoading] = useState(true)

  // 一覧取得エラー
  const [error, setError] = useState<string | null>(null)

  // 入力フォームの名前
  const [name, setName] = useState("")

  // 作成時のエラーメッセージ
  const [createError, setCreateError] = useState<string | null>(null)

  // ユーザー一覧を取得する関数
  const fetchUsers = async () => {
    try {
      // 一覧取得開始
      setLoading(true)
      // 前回のエラーを消す
      setError(null)
      // Rails APIへGETリクエスト
      const res = await fetch("http://localhost:3000/api/users")
      // ネットワークエラーなど
      // HTTPエラーはネットワークエラーではないため、fetchは成功しているとみなされる。
      // そのため、res.okでHTTPエラーをチェックする必要がある。
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }
      // レスポンスのJSONをUser型の配列として受け取る
      const data: User[] = await res.json()
      // 受け取ったデータを状態にセット
      // 一覧取得成功
      setUsers(data)
    } catch (e) {
      // エラーメッセージを状態にセット
      setError(e instanceof Error ? e.message : "Unknown error")
      // 一覧取得失敗
    } finally {
      // 一覧取得終了
      setLoading(false)
    }
  }

  // 初回表示時に一覧取得
  useEffect(() => {
    // ユーザー一覧を取得する関数を呼び出す
    fetchUsers()
  }, [])

  // フォーム送信時の処理
  // async関数にすることで、非同期処理を簡単に書けるようにする
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // フォーム送信時の画面リロードを防ぐ
    e.preventDefault()

    try {
      // 前回の作成エラーを消す
      setCreateError(null)

      // Rails APIへPOSTリクエスト
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: {
            name: name
          }
        })
      })

      // バリデーションエラーなど
      if (!res.ok) {
        const errorData: ErrorResponse = await res.json()
        throw new Error(errorData.errors.join(", "))
      }

      // 入力欄を空に戻す
      setName("")

      // 作成成功後、一覧を再取得
      await fetchUsers()
    } catch (e) {
      setCreateError(e instanceof Error ? e.message : "Unknown error")
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Users</h1>

      {/* 新規作成フォーム */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">名前: </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button type="submit">作成</button>
      </form>

      {/* 作成時のエラー表示 */}
      {createError && <p>Error: {createError}</p>}

      {/* 一覧表示 */}
      {users.length === 0 ? (
        <p>ユーザーが存在しません</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.id}: {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}