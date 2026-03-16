import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"
import { isLoggedIn } from "../services/authStorage"

type Props = {
  children: ReactNode
}

export default function RequireAuth({ children }: Props) {
  // ログインしていなければログイン画面へ飛ばす
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />
  }

  // ログインしていればそのまま画面を表示
  return <>{children}</>
}