import { useState, useEffect, useCallback } from "react"
import type { User } from "../types/user"
import { fetchUsers, deleteUser } from "../services/userApi"

// Reactのカスタムhook
export default function useUsers() {

  // state管理
  // usersはユーザーの一覧を保存するためのstateで、初期値は空の配列です。
  // loadingはデータの読み込み状態を管理するためのstateで、初期値はtrueです。
  // errorはエラーメッセージを保存するためのstateで、初期値はnullです。
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ソートキーとページ番号
  // 検索文字列はコンポーネント側で管理し、loadUsersに渡す設計に変更。
  const [sort, setSort] = useState<"id" | "name">("id")
  const [page, setPage] = useState(1)
  const perPage = 5

  // 一覧取得処理
  // loadUsers は検索語を引数に受け取るように変える
  const loadUsers = useCallback(async (search: string) => {
    try {
      setLoading(true)
      setError(null)
      // fetchUsers に検索・並び替え・ページ情報を渡す
      const data = await fetchUsers(search, sort, page, perPage)
      setUsers(data)
    } catch {
      setError("ユーザー取得失敗")
    } finally {
      setLoading(false)
    }
  }, [sort, page, perPage])

  // 削除処理
  // 呼び出し側が検索語を渡して再取得する
  const handleDelete = async (id: number, search: string) => {
    try {
      await deleteUser(id)
      await loadUsers(search) // 削除後に一覧を再取得
    } catch {
      setError("ユーザー削除失敗")
    }
  }

  // ソートやページが変わったときは自動で再取得するが、検索語は引数で渡す
  useEffect(() => {
    // 呼び出し側のコンポーネントが必要なときに検索語を渡す
    // ページだけ変更された場合など、呼び出し側で明示的にloadUsersを呼ぶ仕組みにするため
  }, [sort, page])

  // hook から返す値
  // 検索文字列はコンポーネント側で管理されるため返さない
  return { users, loading, error, loadUsers, handleDelete, sort, setSort, page, setPage }
}