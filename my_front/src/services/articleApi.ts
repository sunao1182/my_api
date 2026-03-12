// articleApi.tsは、記事に関連するAPI呼び出しをまとめたファイルです。
// これにより、記事の一覧取得、詳細取得、作成などの操作を簡単に行うことができます。
import type { Article } from "../types/article"

// APIのベースURLを定義
const API_BASE = "http://localhost:3000/api/articles"

// 記事一覧取得
// これにより、fetchArticles関数が定義されます。APIから記事の一覧を取得し、Article型の配列を返します。
export async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(API_BASE)
  if (!res.ok) throw new Error("記事一覧取得失敗")
  return res.json()
}

// 記事詳細取得
// これにより、fetchArticle関数が定義されます。APIから指定されたIDの記事の詳細を取得し、Article型のオブジェクトを返します。
export async function fetchArticle(id: number): Promise<Article> {
  const res = await fetch(`${API_BASE}/${id}`)
  if (!res.ok) throw new Error("記事詳細取得失敗")
  return res.json()
}

// 記事作成
// これにより、createArticle関数が定義されます。APIに新しい記事のデータを送信して記事を作成し、
// 作成された記事の詳細をArticle型のオブジェクトとして返します。
export async function createArticle(article: {
  title: string
  body: string
  user_id: number
}): Promise<Article> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ article }),
  })

  if (!res.ok) throw new Error("記事作成失敗")
  return res.json()
}

// 記事更新
export async function updateArticle(
  id: number,
  article: {
    title: string
    body: string
    user_id: number
  }
): Promise<Article> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ article }),
  })

  if (!res.ok) {
    throw new Error("記事更新に失敗しました")
  }

  return res.json()
}

// 記事削除
export async function deleteArticle(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error("記事削除に失敗しました")
  }
}