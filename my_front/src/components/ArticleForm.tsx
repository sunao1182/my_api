import { useState } from "react"

// Props型を定義
// Propsとは、コンポーネントに渡されるデータのことです。
// ここでは、ArticleFormコンポーネントが受け取るpropsの型を定義しています。
// onSubmitは、記事を投稿するための関数で、記事のタイトル、本文、投稿者ユーザーIDを含むオブジェクトを引数として受け取ります。Promise<void>は、この関数が非同期であることを示しています。
type Props = {
  onSubmit: (data: {
    title: string
    body: string
    user_id: number
  }) => Promise<void>
  // initialValuesは、記事の初期値を設定するためのオプションのプロパティです。
  // これにより、記事の編集フォームなどで既存の記事データをフォームに表示することができます。
  // initialValuesは、タイトル、本文、投稿者ユーザーIDを含むオブジェクトで、これらの値がフォームの初期値として使用されます。
  // initialValuesは省略可能であるため、記事の新規作成フォームなどではこのプロパティを提供しなくても問題ありません。
  initialValues?: {
    title: string
    body: string
    user_id: number
  }
}

export default function ArticleForm({ onSubmit, initialValues }: Props) {
  // 初期値があれば編集用、なければ新規作成用
  const [title, setTitle] = useState(initialValues?.title ?? "")
  const [body, setBody] = useState(initialValues?.body ?? "")
  const [userId, setUserId] = useState(String(initialValues?.user_id ?? ""))
  const [error, setError] = useState<string | null>(null)

  // フォーム送信時の処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 画面リロードを防ぐ
    e.preventDefault()

    // 簡単な入力チェック
    if (!title.trim()) {
      setError("タイトルを入力してください")
      return
    }

    if (!body.trim()) {
      setError("本文を入力してください")
      return
    }

    if (!userId.trim()) {
      setError("投稿者ユーザーIDを入力してください")
      return
    }
    // onSubmit関数を呼び出して、記事のタイトル、本文、投稿者ユーザーIDを含むオブジェクトを渡します。
    try {
      // エラーメッセージをリセットします。
      // これにより、前回のエラーが残らないようにします。
      setError(null)
      // onSubmit関数は非同期であるため、awaitを使用して呼び出します。
      await onSubmit({
        title,
        body,
        user_id: Number(userId),
      })
      // 送信が成功した場合は、フォームの入力フィールドをリセットします。
    } catch {
      setError("送信に失敗しました")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "12px" }}>
        <label htmlFor="title">タイトル</label>
        <br />
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label htmlFor="body">本文</label>
        <br />
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          cols={40}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label htmlFor="user_id">投稿者ユーザーID</label>
        <br />
        <input
          id="user_id"
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">保存する</button>
    </form>
  )
}