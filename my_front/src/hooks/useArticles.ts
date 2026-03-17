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

  // 並び替えとページ番号
  const [sort, setSort] = useState<"id" | "title">("id")
  const [page, setPage] = useState(1)

  // 1ページあたりの件数
  const perPage = 5

  // 記事一覧を取得する関数
  const loadArticles = useCallback(
   async (search: string) => {
    try {
      setLoading(true)
      setError(null)

      const data = await fetchArticles(search, sort, page, perPage)
      setArticles(data)
    } catch {
      setError("記事一覧の取得に失敗しました")
    } finally {
      setLoading(false)
    }
  }, [sort, page, perPage])

  // 記事削除
  const handleDelete = async (id: number, search: string) => {
    try {
      setError(null)
      

      await deleteArticle(id)
      await loadArticles(search)
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
    handleDelete,
    sort,
    setSort,
    page,
    setPage,
  }
}