// ユーザーAPI
// API呼び出しの関数を定義するファイル
import type { User } from "../types/user"

// ユーザー一覧取得
export const fetchUsers = async (
  search = "",
  sort: "id" | "name" = "id",
  page = 1,
  perPage = 5
): Promise<User[]> => {

  // クエリパラメータを作成
  // これにより、APIに渡すクエリパラメータが作成されます。
  // search、sort、page、perPageの値がURLSearchParamsオブジェクトに追加され、API呼び出しのURLにクエリパラメータとして付加されます。
  const query = new URLSearchParams({
    search,
    sort,
    page: page.toString(),
    per_page: perPage.toString()
  })

  // Rails APIへアクセス
  const res = await fetch(`http://localhost:3000/api/users?${query.toString()}`)

  // エラー判定
  if (!res.ok) {
    throw new Error("ユーザー取得失敗")
  }

  // JSONを返す
  return res.json()
}

// ユーザー詳細取得
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

// ユーザー新規作成
export const createUser = async (name: string): Promise<User> => {
  // Rails APIへアクセス
  // これにより、ユーザーの名前を引数として受け取り、その名前を使用して新しいユーザーを作成する関数が定義されます。
  const res = await fetch("http://localhost:3000/api/users", {
    // HTTPメソッドをPOSTに指定することで、新しいリソースを作成することを示しています。
    method: "POST",
    // リクエストのヘッダーを指定することで、送信するデータの形式をJSONであることを示しています。
    headers: {
      "Content-Type": "application/json"
    },
    // リクエストのボディに、ユーザーの名前をJSON形式で含めています。これにより、APIに新しいユーザーの名前が送信されます。
    body: JSON.stringify({
      user: {
        name: name
      }
    })

  })
  // エラー判定
  if (!res.ok) {
    throw new Error("ユーザー作成失敗")
  }
  // JSONを返す
  // これにより、API呼び出しが成功した場合は新しく作成されたユーザーのデータが返されます。
  return res.json()
}

// ユーザー更新
export const updateUser = async (id: string, name: string): Promise<User> => {
  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: {
        name: name
      }
    })
  })

  if (!res.ok) {
    throw new Error("ユーザー更新失敗")
  }

  return res.json()
}

// 削除
// これにより、ユーザーのIDを引数として受け取り、そのIDに対応するユーザーを削除する関数が定義されます。
// voidを返すことで、削除が成功した場合は特に値を返さないことを示しています。
export const deleteUser = async (id: number): Promise<void> => {
  // Rails APIへアクセス
  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    // HTTPメソッドをDELETEに指定することで、リソースの削除を示しています。
    method: "DELETE"
  })

  if (!res.ok) {
    throw new Error("ユーザー削除失敗")
  }
}