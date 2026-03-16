// ユーザー新規作成ページ
// ユーザーを新規作成するためのページコンポーネントです。
import { Link, useNavigate } from "react-router-dom"
// UserFormコンポーネントをインポートします。
// これにより、ユーザーの新規作成や編集に使用するフォームコンポーネントがこのページで使用できるようになります。
import UserForm from "../components/UserForm"
// createUser関数をインポートします。
// これにより、ユーザーを新規作成するためのAPI呼び出しがこのページで使用できるようになります。
import { createUser } from "../services/userApi"

// 画面遷移用
export default function UserNewPage() {
  // useNavigateは、React Routerのフックで、プログラム的に画面遷移を行うために使用されます。
  const navigate = useNavigate()

  // ユーザー作成処理
  const handleCreate = async (data: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => {
    await createUser(data)

    // 作成後はユーザー一覧へ戻る
    navigate("/users")
  }

  return (
    <div>
      <h1>ユーザー新規作成</h1>

      <UserForm onSubmit={handleCreate} />

      <div style={{ marginTop: "16px" }}>
        <Link to="/users">ユーザー一覧へ戻る</Link>
      </div>
    </div>
  )
}