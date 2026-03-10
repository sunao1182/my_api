import { useState, useEffect } from "react"
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

  // 一覧取得処理
  const loadUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchUsers()
      setUsers(data)
    } catch {
      setError("ユーザー取得失敗")
    } finally {
      setLoading(false)
    }
  }

  // 削除処理
  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id)
      await loadUsers() // 削除後に一覧を再取得
    } catch {
      setError("ユーザー削除失敗")
    }
  }

  // コンポーネント初回レンダリング時に一覧取得
  useEffect(() => {
    loadUsers()
  }, [])

  // hook から返す値
  return { users, loading, error, loadUsers, handleDelete }
}