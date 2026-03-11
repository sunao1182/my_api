import { useState, useCallback } from "react"
import type { User } from "../types/user"
import { fetchUsers, deleteUser } from "../services/userApi"

export default function useUsers() {
  // 一覧データ
  const [users, setUsers] = useState<User[]>([])

  // 共通状態
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 並び替えとページ番号
  const [sort, setSort] = useState<"id" | "name">("id")
  const [page, setPage] = useState(1)

  // 1ページあたりの件数
  const perPage = 5

  // 一覧取得
  const loadUsers = useCallback(async (search: string) => {
    try {
      setLoading(true)
      setError(null)

      const data = await fetchUsers(search, sort, page, perPage)
      setUsers(data)
    } catch {
      setError("ユーザー取得失敗")
    } finally {
      setLoading(false)
    }
  }, [sort, page])

  // 削除
  const handleDelete = async (id: number, search: string) => {
    try {
      await deleteUser(id)
      await loadUsers(search)
    } catch {
      setError("ユーザー削除失敗")
    }
  }

  return {
    users,
    loading,
    error,
    loadUsers,
    handleDelete,
    sort,
    setSort,
    page,
    setPage
  }
}