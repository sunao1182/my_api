import { useState } from "react"
import { fetchUser, createUser, updateUser } from "../services/userApi"
import type { User } from "../types/user"

export default function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 詳細取得
  const loadUser = async (id: number) => {
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
  const handleCreate = async (userData: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => {
    try {
      setLoading(true)
      setError(null)

      const data = await createUser(userData)
      return data
    } catch {
      setError("ユーザー作成失敗")
      return null
    } finally {
      setLoading(false)
    }
  }

  // 更新
  const handleUpdate = async (
    id: number,
    userData: {
      name: string
      email: string
      password?: string
      password_confirmation?: string
    }
  ) => {
    try {
      setLoading(true)
      setError(null)

      const data = await updateUser(id, userData)
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
    handleUpdate,
  }
}