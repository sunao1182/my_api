// Router機能をimport
import { BrowserRouter, Routes, Route } from "react-router-dom"

// 各ページをimport
import UsersPage from "./pages/UsersPage"
import UserNewPage from "./pages/UserNewPage"
import UserDetailPage from "./pages/UserDetailPage"

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

      </Routes>

    </BrowserRouter>
  )
}