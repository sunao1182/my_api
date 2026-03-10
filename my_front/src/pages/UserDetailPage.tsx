// ユーザー詳細ページのコンポーネント
// ここでは、ユーザーの詳細情報を表示し、ユーザーの名前を更新するためのフォームが表示されます。

// ReactのuseEffectとuseStateフックをimport
// これにより、ユーザーの詳細情報を取得して表示するための状態管理と副作用処理が可能になります。
import { useEffect, useState } from "react"

// React RouterのuseParams、Link、useNavigateをimport
// useParamsは、URLパラメータを取得するためのフックです。
// これにより、ユーザーのIDをURLから取得して、そのIDに基づいてユーザーの詳細情報を取得することができます。
// Linkは、ユーザーがクリックしてページ遷移できるリンクを作成するためのコンポーネントです。
// これにより、ユーザーが一覧ページへ戻るためのリンクを提供します。
// useNavigateは、プログラム的にページ遷移を行うためのフックです。
// これにより、ユーザーの更新が成功した後にユーザー一覧ページへ遷移することができます。
import { useParams, Link, useNavigate } from "react-router-dom"

// API呼び出し関数をimport
// これにより、fetchUser関数とupdateUser関数がインポートされ、ユーザーの詳細情報の取得と更新処理を行うことができます。
import { fetchUser, updateUser } from "../services/userApi"

// ユーザーの型をimport
// これにより、User型がインポートされ、ユーザーの詳細情報を管理するための状態の型定義に使用することができます。
import type { User } from "../types/user"

// ユーザーフォームコンポーネントをimport
// これにより、UserFormコンポーネントがインポートされ、ユーザーの名前を入力するフォームを表示することができます。
import UserForm from "../components/UserForm"

// Loadingコンポーネントをimport
// これにより、Loadingコンポーネントがインポートされ、ローディング状態を表示することができます。
import Loading from "../components/Loading"

// ErrorMessageコンポーネントをimport
// これにより、ErrorMessageコンポーネントがインポートされ、エラー状態を表示することができます。
import ErrorMessage from "../components/ErrorMessage"

// useUsers hook をimport
// これにより、useUsersカスタムフックがインポートされ、ユーザーの一覧を再取得するためのloadUsers関数を利用することができます。
import useUsers from "../hooks/useUsers"

// ユーザー詳細ページのコンポーネント
export default function UserDetailPage() {
  // URLパラメータからユーザーIDを取得
  // これにより、URLからユーザーのIDを取得して、そのIDに基づいてユーザーの詳細情報を取得することができます。
  const { id } = useParams()

  // 一覧へ戻るために使う
  // これにより、navigate関数が呼び出され、ユーザーの更新が成功した後にユーザー一覧ページへ遷移することができます。
  const navigate = useNavigate()

  // ユーザーの詳細情報を管理するための状態
  const [user, setUser] = useState<User | null>(null)
  // ユーザーの名前を管理するための状態
  const [name, setName] = useState("")
  // ローディング状態とエラー状態を管理するための状態
  const [loading, setLoading] = useState(true)
  // エラーメッセージを管理するための状態
  const [error, setError] = useState<string | null>(null)

  // useUsers hook を使って一覧再取得
  const { loadUsers } = useUsers()

  // コンポーネントの初回レンダリング時にユーザーの詳細情報を取得
  // これにより、コンポーネントが初めてレンダリングされたときにユーザーの詳細情報を取得するための副作用処理が実行されます。
  useEffect(() => {
    // ユーザーの詳細情報を取得する非同期関数
    // これにより、ユーザーの詳細情報を取得するための非同期関数が定義されます。
    const loadUser = async () => {

      // ユーザーの詳細情報を取得する処理
      try {
        // IDが存在しない場合は処理を中断
        if (!id) return
        // ユーザーの詳細情報を取得
        const data = await fetchUser(id)
        // 取得したユーザーの詳細情報を状態に保存し、ユーザーの名前をname状態に設定
        setUser(data)
        // これにより、取得したユーザーの詳細情報がuser状態に保存され、ユーザーの名前がname状態に設定されます。
        // これにより、ユーザーの詳細情報が画面に表示され、ユーザーの名前を更新するためのフォームに初期値として表示されます。
        setName(data.name)
      } catch {
        setError("ユーザー取得失敗")
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [id])

  // フォームの送信処理
  // これにより、ユーザーがフォームを送信したときにhandleUpdate関数が呼び出されます。
  // ユーザーの更新処理を行い、成功した場合はユーザー一覧を再取得して最新状態にし、その後一覧画面へ遷移します。
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!id) return

    try {
      // 更新
      await updateUser(id, name)
      // 更新後、一覧再取得
      await loadUsers()
      // 一覧画面へ戻る
      navigate("/")
    } catch {
      setError("ユーザー更新失敗")
    }
  }

  // ローディング中はLoadingコンポーネントを表示し、エラーがある場合はErrorMessageコンポーネントを表示する
  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />
  if (!user) return <p>User not found</p>

  return (
    <div>
      <h1>User Detail</h1>
      <p>ID: {user.id}</p>
      {/* ユーザーの名前を更新するためのフォームを表示 */}
      <UserForm
        // nameは、ユーザーの名前を表す文字列で、フォームの入力フィールドに表示されます。
        name={name}
        // onChangeは、ユーザーの名前が変更されたときに呼び出される関数で、変更された名前の値を引数として受け取ります。
        onChange={setName}
        // onSubmitは、フォームが送信されたときに呼び出される関数で、フォームの送信イベントを引数として受け取ります。
        onSubmit={handleUpdate}
        buttonText="更新"
      />

      <Link to="/">一覧へ戻る</Link>
    </div>
  )
}