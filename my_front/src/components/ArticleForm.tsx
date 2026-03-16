import { useState } from "react"

// Props型を定義
type Props = {
  // 記事タイトルと本文を受け取って保存する
  onSubmit: (data: {
    title: string
    body: string
  }) => Promise<void>

  // 編集画面で初期値を渡すためのプロパティ
  initialValues?: {
    title: string
    body: string
  }
}

export default function ArticleForm({ onSubmit, initialValues }: Props) {
  // 初期値があれば編集用、なければ新規作成用
  const [title, setTitle] = useState(initialValues?.title ?? "")
  const [body, setBody] = useState(initialValues?.body ?? "")
  const [error, setError] = useState<string | null>(null)

  // フォーム送信時の処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 画面リロードを防ぐ
    e.preventDefault()

    // タイトル未入力チェック
    if (!title.trim()) {
      setError("タイトルを入力してください")
      return
    }

    // 本文未入力チェック
    if (!body.trim()) {
      setError("本文を入力してください")
      return
    }

    try {
      // 前回のエラー表示を消す
      setError(null)

      // JWT認証後は user_id を送らない
      await onSubmit({
        title,
        body,
      })
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

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">保存する</button>
    </form>
  )
}