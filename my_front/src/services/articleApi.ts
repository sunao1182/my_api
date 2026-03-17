// articleApi.tsは、記事に関連するAPI呼び出しをまとめたファイルです。
import type { Article } from "../types/article"

// APIのベースURLを定義
const API_BASE = "http://localhost:3000/api/articles"

/**
 * 共通機能：認証用ヘッダーを作成する
 * ブラウザの保存スペース（localStorage）からトークンを取り出し、
 * サーバーに「ログイン済み」であることを伝えるための情報をセットします。
 */
function getAuthHeaders() {
  const token = localStorage.getItem("token")

  return {
    "Content-Type": "application/json",
    // Rails側でJWTを認識させるための形式（Bearer トークン）
    "Authorization": `Bearer ${token}`,
  }
}

// 記事一覧取得
export async function fetchArticles(
  query = "",
  sort = "id",
  page = 1,
  perPage = 10
): Promise<Article[]> {
  const params = new URLSearchParams({
    // ★Rails側(params[:query])に合わせてキーを "query" にする
    query: query,       
    sort: sort,
    page: String(page),
    // ★Rails側(params[:perPage])に合わせてキーを "perPage" にする
    perPage: String(perPage), 
  })

  const res = await fetch(`${API_BASE}?${params.toString()}`, {
    headers: getAuthHeaders(),
  })

  if (!res.ok) throw new Error("記事一覧取得失敗")
  return res.json()
}

// 記事詳細取得
export async function fetchArticle(id: number): Promise<Article> {
  // headersに認証情報を追加
  const res = await fetch(`${API_BASE}/${id}`, {
    headers: getAuthHeaders(),
  })

  if (!res.ok) throw new Error("記事詳細取得失敗")
  return res.json()
}

// 記事作成
export async function createArticle(article: {
  title: string
  body: string
}): Promise<Article> {
  const res = await fetch(API_BASE, {
    method: "POST",
    // 共通関数を使ってヘッダーをセット
    headers: getAuthHeaders(),
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
  }
): Promise<Article> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    // 共通関数を使ってヘッダーをセット
    headers: getAuthHeaders(),
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
    // 削除時も「誰が消そうとしているか」の証明が必要
    headers: getAuthHeaders(),
  })

  if (!res.ok) {
    throw new Error("記事削除に失敗しました")
  }
}
