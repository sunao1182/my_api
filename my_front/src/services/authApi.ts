const API_BASE = "http://localhost:3000/api"

// ログインAPIを呼び出す関数
export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "ログインに失敗しました")
  }

  return data
}