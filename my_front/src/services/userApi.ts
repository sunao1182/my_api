import type { User } from "../types/user"

// APIのベースURL
const API_BASE = "http://localhost:3000/api/users"

// 認証用ヘッダーを作る共通関数
function getAuthHeaders() {
  const token = localStorage.getItem("token")

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

// ユーザー一覧取得
export async function fetchUsers(
  query = "",
  sort = "id",
  page = 1,
  perPage = 10
): Promise<User[]> {
  const params = new URLSearchParams({
    search: query,
    sort,
    page: String(page),
    per_page: String(perPage),
  })

  const res = await fetch(`${API_BASE}?${params.toString()}`, {
    headers: getAuthHeaders(),
  })

  if (!res.ok) {
    throw new Error("ユーザー一覧の取得に失敗しました")
  }

  return res.json()
}

// ユーザー詳細取得
export async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`${API_BASE}/${id}`, {
    headers: getAuthHeaders(),
  })

  if (!res.ok) {
    throw new Error("ユーザー詳細の取得に失敗しました")
  }

  return res.json()
}

// ユーザー新規作成
export async function createUser(user: {
  name: string
  email: string
  password: string
  password_confirmation: string
}): Promise<User> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ user }),
  })

  if (!res.ok) {
    throw new Error("ユーザー作成に失敗しました")
  }

  return res.json()
}

// ユーザー更新
export async function updateUser(
  id: number,
  user: {
    name: string
    email: string
    password?: string
    password_confirmation?: string
  }
): Promise<User> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ user }),
  })

  if (!res.ok) {
    throw new Error("ユーザー更新に失敗しました")
  }

  return res.json()
}

// ユーザー削除
export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!res.ok) {
    throw new Error("ユーザー削除に失敗しました")
  }
}