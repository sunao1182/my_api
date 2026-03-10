// UsersPageコンポーネント
import { useEffect, useState } from "react"
// React RouterのLinkコンポーネントをimport
// これにより、ユーザー一覧ページからユーザーの詳細ページや新規作成ページへのリンクを作成することができます。
import { Link } from "react-router-dom"
// API呼び出し関数をimport
// これにより、ユーザーの一覧を取得するためのfetchUsers関数と、ユーザーを削除するためのdeleteUser関数が使用できるようになります。
import { fetchUsers, deleteUser } from "../services/userApi"
// ユーザーカードコンポーネントをimport
// これにより、ユーザーの情報を表示するためのUserCardコンポーネントが使用できるようになります。
import type { User } from "../types/user"
// ローディングコンポーネントをimport
import UserCard from "../components/UserCard"
// ローディングコンポーネントをimport
import Loading from "../components/Loading"
// エラーメッセージコンポーネントをimport
import ErrorMessage from "../components/ErrorMessage"

// 一覧ページ
// ここでは、ユーザーの一覧を表示するためのUsersPageコンポーネントを定義しています。
export default function UsersPage() {
  // ユーザー一覧
  const [users, setUsers] = useState<User[]>([])
  // ローディングとエラーの状態を管理するためのstateを定義
  const [loading, setLoading] = useState(true)
  // エラー
  const [error, setError] = useState<string | null>(null)
  // ユーザー一覧を取得する関数を定義
  const loadUsers = async () => {
    // API呼び出しをtry-catchで囲む
    try {
      // ローディング開始とエラーリセット
      // これにより、ユーザーの一覧を取得する前にローディング状態がtrueに設定され、エラー状態がnullにリセットされます。これにより、ユーザーが一覧を取得する際にローディング表示がされ、前回のエラーがクリアされるようになります。
      setLoading(true)
      setError(null)
      // API呼び出し
      // これにより、fetchUsers関数が呼び出され、ユーザーの一覧が取得されます。取得されたユーザーデータはsetUsers関数を使用してusersの状態に保存されます。
      const data = await fetchUsers()
      // 取得したユーザーデータをstateにセットする
      setUsers(data)
      // API呼び出しが成功した場合はエラーをnullにする
    } catch {
      // API呼び出しが失敗した場合はエラーメッセージをセットする
      setError("ユーザー取得失敗")
      // API呼び出しが失敗した場合はユーザー一覧を空にする
    } finally {
      setLoading(false)
    }
  }

  // コンポーネントがマウントされたときにユーザー一覧を取得する
  useEffect(() => {
    loadUsers()
  }, [])

  // ユーザー削除処理
  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id)
      await loadUsers()
    } catch {
      setError("ユーザー削除失敗")
    }
  }

  // ローディング中はLoadingコンポーネントを表示し、エラーがある場合はErrorMessageコンポーネントを表示する
  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  return (
    <div>
      <h1>Users</h1>
      <Link to="/users/new">新規作成</Link>
      <ul>
        {/* ユーザーの一覧を表示するために、users配列をmap関数でループしてUserCardコンポーネントを生成しています。*/}
        {users.map((user) => (
          <UserCard key={user.id} user={user} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  )
}