// localStorage から JWT トークンを取得する
export function getToken(): string | null {
  return localStorage.getItem("token")
}

// localStorage からログインユーザー情報を取得する
export function getLoginUser() {
  const user = localStorage.getItem("loginUser")
  return user ? JSON.parse(user) : null
}

// ログイン中かどうかを判定する
export function isLoggedIn(): boolean {
  return !!localStorage.getItem("token")
}

// ログアウト処理
export function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("loginUser")
}