import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

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
  if (loading) return <p>Loading...</p>
  // エラーがある場合はエラーメッセージを表示
  if (error) return <p>{error}</p>
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
      {/* onSubmitイベントにhandleUpdate関数が設定されているため、フォームが送信されたときにhandleUpdate関数が呼び出されます。 */}
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="name">名前: </label>
          <input
            id="name"
            type="text"
            value={name}
            // onChangeイベントにsetName関数が設定されているため、ユーザーが入力欄に文字を入力するたびにnameの状態が更新されます。
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button type="submit">更新</button>
      </form>
      
      <Link to="/">
        一覧へ戻る
      </Link>

    </div>
  )
}