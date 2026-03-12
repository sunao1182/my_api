// src/hooks/useArticle.tsは、記事の詳細データを取得するためのカスタムフックを提供するファイルです。
// これにより、記事の詳細を取得するロジックをコンポーネントから分離し、再利用可能な形で提供できます。
// useCallbackとは、Reactのフックの一つで、関数をメモ化するために使用されます。
// これにより、依存関係が変更されたときにのみ関数が再生成されるため、パフォーマンスの最適化に役立ちます。
import { useState, useCallback } from "react"
import type { Article } from "../types/article"
import { fetchArticle } from "../services/articleApi"

export default function useArticle() {
  // 記事詳細データ
  const [article, setArticle] = useState<Article | null>(null)

  // 読み込み中かどうか
  const [loading, setLoading] = useState(true)

  // エラーメッセージ
  const [error, setError] = useState<string | null>(null)

  // 記事詳細を取得する関数
  const loadArticle = useCallback(async (id: number) => {
    try {
      setLoading(true)
      setError(null)

      const data = await fetchArticle(id)
      setArticle(data)
    } catch {
      setError("記事詳細の取得に失敗しました")
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    article,
    loading,
    error,
    loadArticle,
  }
}