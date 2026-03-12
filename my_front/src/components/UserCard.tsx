// ユーザーカードコンポーネント
// ユーザーの情報を表示するためのコンポーネントです。ユーザーのID、名前、詳細ページへのリンク、削除ボタンを表示します。
import type { User } from "../types/user"
import { Link } from "react-router-dom"

// Propsの型を定義
// Propsとは、コンポーネントに渡されるデータのことです。
// ここでは、UserCardコンポーネントが受け取るpropsの型を定義しています。
// userはUser型のオブジェクトで、onDeleteはユーザーを削除するための関数です。
type Props = {
  user: User
  // onDeleteは、ユーザーを削除するための関数で、ユーザーのIDを引数として受け取ります。
  // これにより、UserCardコンポーネントがユーザーの削除機能を提供できるようになります。
  // ユーザーが削除ボタンをクリックしたときにonDelete関数が呼び出され、ユーザーのIDが渡されます。
  onDelete: (id: number) => void
}

// ユーザーカードコンポーネントを定義
// これにより、UserCardコンポーネントが定義されます。ユーザーのIDと名前を表示し、詳細ページへのリンクと削除ボタンを提供します。
// 削除ボタンがクリックされたときには、onDelete関数が呼び出され、ユーザーのIDが渡されます。
export default function UserCard({ user, onDelete }: Props) {
  return (
    <li>
      {user.id} : {user.name}{" "}
      <Link to={`/users/${user.id}`}>詳細</Link>{" "}
      {/* 削除ボタンがクリックされたときにonDelete関数が呼び出され、ユーザーのIDが渡されます。
      これにより、ユーザーの削除処理が実行されます。 */}
      <button onClick={() => onDelete(user.id)}>削除</button>
    </li>
  )
}