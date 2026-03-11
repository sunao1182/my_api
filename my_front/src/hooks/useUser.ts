import { useState } from "react"
import type { User } from "../types/user"
import { fetchUser, createUser, updateUser } from "../services/userApi"

export default function useUser() {
  // 1件分のユーザー
  const [user, setUser] = useState<User | null>(null)

  // 共通状態
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 詳細取得
  const loadUser = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const data = await fetchUser(id)
      setUser(data)
    } catch {
      setError("ユーザー取得失敗")
    } finally {
      setLoading(false)
    }
  }

  // 新規作成
  const handleCreate = async (name: string) => {
    try {
      setLoading(true)
      setError(null)

      const data = await createUser(name)
      return data
    } catch {
      setError("ユーザー作成失敗")
      return null
    } finally {
      setLoading(false)
    }
  }

  // 更新
  const handleUpdate = async (id: string, name: string) => {
    try {
      setLoading(true)
      setError(null)

      const data = await updateUser(id, name)
      setUser(data)
      return data
    } catch {
      setError("ユーザー更新失敗")
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    loadUser,
    handleCreate,
    handleUpdate
  }
}