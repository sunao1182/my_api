import { useState, useCallback } from "react"
import type { Article } from "../types/article"
import { fetchArticles, deleteArticle } from "../services/articleApi"

export default function useArticles() {
  // 記事一覧データ
  const [articles, setArticles] = useState<Article[]>([])

  // 読み込み中かどうか
  const [loading, setLoading] = useState(true)

  // エラーメッセージ
  const [error, setError] = useState<string | null>(null)

  // 記事一覧を取得する関数
  const loadArticles = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await fetchArticles()
      setArticles(data)
    } catch {
      setError("記事一覧の取得に失敗しました")
    } finally {
      setLoading(false)
    }
  }, [])

  // 記事削除
  const handleDelete = async (id: number) => {
    try {
      setError(null)

      await deleteArticle(id)
      await loadArticles()
    } catch {
      setError("記事削除に失敗しました")
    }
  }

  // カスタムフックは、必要な値や関数をオブジェクトとして返します。
  return {
    articles,
    loading,
    error,
    loadArticles,
    handleDelete
  }
}