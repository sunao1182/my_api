import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import type { User } from "../types/user"
import { fetchUsers, deleteUser } from "../services/userApi"
import { getLoginUser, logout } from "../services/authStorage"

export default function useUsers() {
  const navigate = useNavigate()

  // 一覧データ
  const [users, setUsers] = useState<User[]>([])

  // 共通状態
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 並び替えとページ番号
  const [sort, setSort] = useState<"id" | "name">("id")
  const [page, setPage] = useState(1)

  // 1ページあたりの件数
  const perPage = 5

  // 一覧取得
  const loadUsers = useCallback(
    async (search: string) => {
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
    },
    [sort, page, perPage]
  )

  // 削除
  const handleDelete = async (id: number, search: string) => {
    try {
      setError(null)

      // 今ログインしているユーザーを取得
      const loginUser = getLoginUser()

      await deleteUser(id)

      // 自分自身を削除した場合はログアウトしてログイン画面へ戻す
      if (loginUser && loginUser.id === id) {
        logout()
        navigate("/login")
        return
      }

      // 他人を削除した場合は一覧を再取得
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
    setPage,
  }
}