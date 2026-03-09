// ユーザー一覧ページ
// これにより、ユーザー一覧を表示するためのUsersPageコンポーネントが定義されます。
import { useEffect, useState } from "react"
// React RouterのLinkコンポーネントをimport
// これにより、ユーザー一覧ページからユーザーの詳細ページや新規作成ページへのリンクを作成することができます。
import { Link } from "react-router-dom"
// API呼び出し関数をimport
// これにより、ユーザー一覧を取得するためのfetchUsers関数が使用できるようになります。
import { fetchUsers } from "../services/userApi"
// ユーザーの型をimport
import type { User } from "../types/user"
// UserCardコンポーネントをimport
import UserCard from "../components/UserCard"

// ユーザー一覧ページコンポーネント
export default function UsersPage() {

  // ユーザー一覧
  // useStateのジェネリクスでUser[]型を指定
  const [users, setUsers] = useState<User[]>([])

  // ローディング状態
  // 初期値はtrue（読み込み中）
  const [loading, setLoading] = useState(true)

  // エラー状態
  // 初期値はnull（エラーなし）
  const [error, setError] = useState<string | null>(null)

  // コンポーネントがマウントされたときにユーザー一覧を取得する
  useEffect(() => {
    // API呼び出し関数を定義
    const loadUsers = async () => {

      try {

        // API呼び出し
        const data = await fetchUsers()

        // stateにセット
        setUsers(data)

      } catch  {
        
        // エラーが発生した場合はエラーメッセージをセット
        setError("ユーザー取得失敗")
      // 最後にローディング状態をfalseにする  
      } finally {
        // ローディング状態をfalseにする
        // これにより、API呼び出しが成功しても失敗してもローディング状態が終了するようになります。
        setLoading(false)

      }

    }
    // ユーザー一覧を取得する関数を呼び出す
    // これにより、コンポーネントがマウントされたときにユーザー一覧が取得されます。
    loadUsers()
    // 第二引数の空配列は、useEffectがコンポーネントのマウント時に一度だけ実行されることを意味します。
  }, [])

  if (loading) return <p>Loading...</p>
  // エラーがある場合はエラーメッセージを表示
  if (error) return <p>{error}</p>
  
  // ユーザー一覧を表示
  return (
    <div>

      <h1>Users</h1>

      <Link to="/users/new">
        新規作成
      </Link>

      <ul>
        {/* ユーザー一覧をmapでループして表示 */}
        {users.map((user) => (
          // ユーザーごとに<li>を作成 */}
          <li key={user.id}>
            {/* UserCardコンポーネントを呼び出し、userをpropsとして渡す */}
            <UserCard
            // keyはReactがリストを効率的に更新するために必要なプロパティで、user.idを使用して一意のキーを指定しています。
            key  = {user.id}
            user = {user}
            />

            <Link to={`/users/${user.id}`}>
              詳細
            </Link>
          </li>
        ))}
      </ul>

    </div>
  )
}