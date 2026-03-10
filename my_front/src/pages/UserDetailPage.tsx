import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import UserForm from "../components/UserForm"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import { fetchUser, updateUser } from "../services/userApi"
import type { User } from "../types/user"

// 詳細ページ
export default function UserDetailPage() {

  // URLのidを取得
  const { id } = useParams()

  // 一覧へ戻るために使う
  const navigate = useNavigate()

  // ユーザー情報
  const [user, setUser] = useState<User | null>(null)

  // 入力欄用の名前
  const [name, setName] = useState("")

  // ローディング
  const [loading, setLoading] = useState(true)

  // エラー
  const [error, setError] = useState<string | null>(null)

  // コンポーネントがマウントされたときにユーザー情報を取得する
  useEffect(() => {

    // API呼び出し関数を定義
    const loadUser = async () => {

      // API呼び出しをtry-catchで囲む
      try {
        // idがない場合は処理を終了する
        if (!id) return
        // API呼び出し
        // これにより、fetchUser関数が呼び出され、ユーザーのIDに対応するユーザーデータが取得されます。
        const data = await fetchUser(id)
        // 取得したユーザーデータをstateにセットする
        // これにより、ユーザーデータがコンポーネントの状態に保存され、後で表示することができます。
        setUser(data)
        // API呼び出しが成功した場合はエラーをnullにする
      } catch {
        // API呼び出しが失敗した場合はエラーメッセージをセットする
        setError("ユーザー取得失敗")
      // 最後にローディング状態をfalseにする
      } finally {
        // ローディング状態をfalseにする
        setLoading(false)

      }

    }
    // ユーザー情報を取得する関数を呼び出す
    // これにより、コンポーネントがマウントされたときにユーザー情報が取得されます。
    loadUser()
    // 第二引数の[id]は、useEffectがidの値が変わるたびに実行されることを意味します。
    // これにより、URLのidが変更されたときに新しいユーザー情報が取得されます。
  }, [id])

  // 更新ボタン押下時の処理
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    // フォーム送信による画面リロードを防ぐ
    e.preventDefault()

    try {
      // idがなければ更新できないので処理終了
      if (!id) return

      // APIへ更新リクエスト
      // これにより、updateUser関数が呼び出され、ユーザーのIDと新しい名前を引数として渡すことでユーザー情報が更新されます。
      await updateUser(id, name)

      // 更新成功後、一覧画面へ戻る
      navigate("/")
    } catch {
      setError("ユーザー更新失敗")
    }
  }

  // ローディング中はLoading...を表示
  if (loading) return <Loading />
  // エラーがある場合はエラーメッセージを表示
  if (error) return <ErrorMessage message={error} />
  // ユーザーが見つからない場合はUser not foundを表示
  if (!user) return <p>User not found</p>

  // ユーザー情報を表示
  return (
    <div>

      <h1>User Detail</h1>

      <p>ID: {user.id}</p>

      <p>Name: {user.name}</p>

      {/* 更新フォーム */}
      {/* これにより、ユーザーの名前を編集するためのフォームが表示されます。*/}
      {/* UserFormコンポーネントは、ユーザーの名前を入力するためのフォームを提供し、onChangeプロップで入力値の変更を処理し、
          onSubmitプロップでフォームの送信を処理します。
          buttonTextプロップは、送信ボタンに表示されるテキストを指定します。*/}
      <UserForm
        name={name}
        onChange={setName}
        onSubmit={handleUpdate}
        buttonText="更新"
      />
      
      <Link to="/">
        一覧へ戻る
      </Link>

    </div>
  )
}