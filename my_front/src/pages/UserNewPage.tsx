// ユーザー新規作成ページのコンポーネント
// ここでは、ユーザー新規作成ページのコンポーネントを定義しています。
import { Link } from "react-router-dom"

// 新規作成ページ
export default function UserNewPage() {

  return (
    <div>

      {/* タイトル */}
      <h1>User New Page</h1>

      {/* 説明 */}
      <p>ユーザー新規作成ページです</p>

      {/* 一覧へ戻る */}
      <Link to="/">
        一覧へ戻る
      </Link>

    </div>
  )
}