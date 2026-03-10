// ユーザー新規作成ページのコンポーネント
// ここでは、ユーザー新規作成ページのコンポーネントを定義しています。
// これにより、ユーザーの名前を入力して新しいユーザーを作成するためのフォームが表示されます。
import { useState } from "react"
// React RouterのuseNavigateとLinkコンポーネントをimport
// これにより、ユーザー新規作成ページからユーザーの一覧ページへのリンクを作成したり、ユーザー作成後に一覧ページへ遷移することができます。
import { useNavigate, Link } from "react-router-dom"
// API呼び出し関数をimport
// これにより、ユーザーを作成するためのcreateUser関数が使用できるようになります。
import { createUser } from "../services/userApi"
// ユーザーフォームコンポーネントをimport
// これにより、ユーザーの名前を入力するためのUserFormコンポーネントが使用できるようになります。
import UserForm from "../components/UserForm"

// 新規作成ページ
export default function UserNewPage() {
  // 入力値
  const [name, setName] = useState("")

  // 画面遷移
  // useNavigateは、React Routerのフックで、プログラム的に画面遷移を行うために使用されます。
  const navigate = useNavigate()
  // フォームの送信処理
  // これにより、ユーザーがフォームを送信したときにhandleSubmit関数が呼び出されます。
  const handleSubmit = async (e: React.FormEvent) => {

    // ページリロード防止
    // これにより、フォームが送信されたときにページがリロードされるのを防ぎます。これにより、ユーザーが入力したデータが失われるのを防ぐことができます。
    e.preventDefault()

      // API呼び出し
      // これにより、createUser関数が呼び出され、ユーザーの名前を引数として渡すことで新しいユーザーが作成されます。
      await createUser(name)

      // 一覧ページへ戻る
      navigate("/")

  }

  return (

    <div>

      <h1>User New</h1>

      <UserForm
        name={name}
        onChange={setName}
        onSubmit={handleSubmit}
        buttonText="作成"
      />

      <Link to="/">一覧へ戻る</Link>

    </div>

  )
}