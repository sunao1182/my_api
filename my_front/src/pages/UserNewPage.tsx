// ユーザー新規作成ページのコンポーネント
// これにより、ユーザーの新規作成ページを定義するUserNewPageコンポーネントが作成されます。
import { useState } from "react"

// React Routerの機能をimport
// useNavigateは、プログラム的にページ遷移を行うためのフックです。
// これにより、ユーザーの作成が成功した後にユーザー一覧ページへ遷移することができます。
// Linkは、ユーザーがクリックしてページ遷移できるリンクを作成するためのコンポーネントです。
import { useNavigate, Link } from "react-router-dom"

// API呼び出し関数をimport
// これにより、createUser関数がインポートされ、ユーザーの新規作成処理を行うことができます。
import { createUser } from "../services/userApi"

// ユーザーフォームコンポーネントをimport
// これにより、UserFormコンポーネントがインポートされ、ユーザーの名前を入力するフォームを表示することができます。
import UserForm from "../components/UserForm"

// useUsers hook をimport
// これにより、useUsersカスタムフックがインポートされ、ユーザーの一覧を再取得するためのloadUsers関数を利用することができます。
import useUsers from "../hooks/useUsers"

// ユーザー新規作成ページのコンポーネント
export default function UserNewPage() {
  // ユーザーの名前を管理するstate
  const [name, setName] = useState("")
  // 一覧へ戻るために使う
  // これにより、navigate関数が呼び出され、ユーザーの作成が成功した後にユーザー一覧ページへ遷移することができます。
  const navigate = useNavigate()

  // useUsers hook を利用して一覧再取得可能
  const { loadUsers } = useUsers()
  
  // フォームの送信処理
  // これにより、フォームが送信されたときにhandleSubmit関数が呼び出されます。
  // ユーザーの作成処理を行い、成功した場合はユーザー一覧を再取得して最新状態にし、その後一覧画面へ遷移します。
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // 新規作成
      await createUser(name)
      // 作成後、一覧を再取得して最新状態に
      await loadUsers("")
      // 一覧画面へ戻る
      navigate("/")
    } catch {
      alert("ユーザー作成失敗")
    }
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