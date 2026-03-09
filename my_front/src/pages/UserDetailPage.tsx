import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import { fetchUser } from "../services/userApi"
import type { User } from "../types/user"

// 詳細ページ
export default function UserDetailPage() {

  // URLのidを取得
  const { id } = useParams()

  // ユーザー情報
  const [user, setUser] = useState<User | null>(null)

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

      <Link to="/">
        一覧へ戻る
      </Link>

    </div>
  )
}