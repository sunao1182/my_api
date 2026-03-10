import { Link } from "react-router-dom"
import UserCard from "../components/UserCard"
import useUsers from "../hooks/useUsers"
// ローディングコンポーネントをimport
import Loading from "../components/Loading"
// エラーメッセージコンポーネントをimport
import ErrorMessage from "../components/ErrorMessage"

export default function UsersPage() {
  // hookから必要な状態と関数を取得
  // これにより、useUsersカスタムフックからusers、loading、error、handleDeleteの状態と関数が取得されます。
  const { users, loading, error, handleDelete } = useUsers()

  // ローディング中はLoadingコンポーネントを表示し、エラーがある場合はErrorMessageコンポーネントを表示する
  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  // ユーザー一覧を表示
  return (
    <div>
      <h1>Users</h1>
      <Link to="/users/new">新規作成</Link>
      <ul>
        {users.map((user) => (
          <UserCard key={user.id} user={user} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  )
}