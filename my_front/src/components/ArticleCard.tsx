import { Link } from "react-router-dom"
// ArticleCardコンポーネントは、記事の情報を表示するためのコンポーネントです。
import type { Article } from "../types/article"

// Propsの型を定義
// Propsとは、コンポーネントに渡されるデータのことです。
// ここでは、ArticleCardコンポーネントが受け取るpropsの型を定義しています。
// articleはArticle型のオブジェクトで、記事の情報を含みます。
type Props = {
  article: Article
  // onDeleteは、記事を削除するための関数で、記事のIDを引数として受け取ります。
  // これにより、ArticleCardコンポーネントが記事の削除機能を提供できるようになります。
  // ユーザーが削除ボタンをクリックしたときにonDelete関数が呼び出され、記事のIDが渡されます。
  onDelete: (id: number) => Promise<void>
}

// ArticleCardコンポーネントを定義
// これにより、ArticleCardコンポーネントが定義されます。
// 記事のタイトル、投稿者の名前、本文を表示し、タイトルは記事の詳細ページへのリンクになっています。
export default function ArticleCard({ article, onDelete }: Props) {
  const handleClickDelete = async () => {
    // 削除の確認ダイアログを表示します。
    // ユーザーが「OK」をクリックした場合はtrueが返され、「キャンセル」をクリックした場合はfalseが返されます。
    const ok = window.confirm("この記事を削除しますか？")
    // ユーザーが「キャンセル」をクリックした場合は、削除処理を中止します。
    if (!ok) return
    // onDelete関数を呼び出して、記事のIDを渡します。
    // これにより、記事の削除処理が実行されます。
    await onDelete(article.id)
  }

  return (
    <li style={{ marginBottom: "16px" }}>
      <Link to={`/articles/${article.id}`}>
        <strong>{article.title}</strong>
      </Link>

      <div>投稿者: {article.user.name}</div>

      <div>{article.body}</div>

      <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
        <Link to={`/articles/${article.id}/edit`}>編集</Link>
        <button onClick={handleClickDelete}>
          削除
        </button>
      </div>
    </li>
  )
}