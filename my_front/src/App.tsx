// Router機能をimport
import { BrowserRouter, Routes, Route } from "react-router-dom"

// ユーザー関連ページ
import UsersPage from "./pages/UsersPage"
import UserNewPage from "./pages/UserNewPage"
import UserDetailPage from "./pages/UserDetailPage"

// 記事関連ページ
import ArticlesPage from "./pages/ArticlesPage"
import ArticleNewPage from "./pages/ArticleNewPage"
import ArticleDetailPage from "./pages/ArticleDetailPage"
import ArticleEditPage from "./pages/ArticleEditPage"

// アプリのルーティング定義
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ユーザー一覧ページ */}
        <Route path="/" element={<UsersPage />} />

        {/* ユーザー新規作成 */}
        <Route path="/users/new" element={<UserNewPage />} />

        {/* ユーザー詳細 */}
        <Route path="/users/:id" element={<UserDetailPage />} />

        {/* 記事一覧ページ */}
        <Route path="/articles" element={<ArticlesPage />} />

        {/* 記事新規作成 */}
        <Route path="/articles/new" element={<ArticleNewPage />} />

        {/* 記事詳細 */}
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        {/* 記事編集 */}
        <Route path="/articles/:id/edit" element={<ArticleEditPage />} />
      </Routes>
    </BrowserRouter>
  )
}