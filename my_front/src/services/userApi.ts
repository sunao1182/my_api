// ユーザーAPI
// API呼び出しの関数を定義するファイル
import type { User } from "../types/user"

// ユーザー一覧取得
export const fetchUsers = async (): Promise<User[]> => {

  // Rails APIへアクセス
  const res = await fetch("http://localhost:3000/api/users")

  // エラー判定
  if (!res.ok) {
    throw new Error("ユーザー取得失敗")
  }

  // JSONを返す
  return res.json()
}

// ユーザー詳細取得
// これにより、ユーザーのIDを引数として受け取り、そのIDに対応するユーザーのデータを取得する関数が定義されます。
export const fetchUser = async (id: string): Promise<User> => {
  // Rails APIへアクセス
  const res = await fetch(`http://localhost:3000/api/users/${id}`)
  // エラー判定
  if (!res.ok) {
    // エラーが発生した場合はエラーメッセージを投げる
    // これにより、API呼び出しが失敗した場合はエラーが発生し、呼び出し元でキャッチされるようになります。
    throw new Error("ユーザー取得失敗")
  }
  // JSONを返す
  // これにより、API呼び出しが成功した場合はユーザーのデータが返されます。
  return res.json()
}