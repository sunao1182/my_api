import { useEffect, useState } from "react"

// Rails APIから返ってくる1件分のユーザー型
type User = {
  id: number
  name: string
}

export default function App() {
  // ユーザー一覧を保持するstate
  // 一覧なので、型は User の配列にする
  // 最初はまだデータがないので空配列 []
  const [users, setUsers] = useState<User[]>([])

  // API通信中かどうかを管理するstate
  const [loading, setLoading] = useState(true)

  // エラーメッセージを管理するstate
  const [error, setError] = useState<string | null>(null)

  // コンポーネントが初めてレンダリングされたときに、Rails APIからユーザー一覧を取得する
  useEffect(() => {
    // Rails APIからユーザー一覧を取得する関数
    const fetchUsers = async () => {
      try {
        // API取得開始時にローディングをON
        setLoading(true)

        // 前回のエラーを消す
        setError(null)

        // Rails APIへ一覧取得リクエスト
        const res = await fetch("http://localhost:3000/api/users")

        // HTTPステータスが正常でない場合はエラー
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }

        // JSONを User[] 型として受け取る
        // JSONをJavaScriptオブジェクトに変換して、さらに型アサーションで User[] 型にする
        const data: User[] = await res.json()

        // stateに保存
        setUsers(data)
      } catch (e) {
        // エラーメッセージをstateに保存
        setError(e instanceof Error ? e.message : "Unknown error")
      } finally {
        // 通信終了
        setLoading(false)
      }
    }

    // 初回レンダリング時に1回だけ実行
    fetchUsers()
  }, [])

  // ローディング中
  if (loading) return <p>Loading...</p>

  // エラー時
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Users</h1>

      {/* usersが0件ならメッセージ表示 */}
      {users.length === 0 ? (
        <p>ユーザーが存在しません</p>
      ) : (
        <ul>
          {/* users配列を1件ずつ表示 */}
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