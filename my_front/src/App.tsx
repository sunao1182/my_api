import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "./pages/LoginPage"

import UsersPage from "./pages/UsersPage"
import UserNewPage from "./pages/UserNewPage"
import UserDetailPage from "./pages/UserDetailPage"
import UserEditPage from "./pages/UserEditPage"

import ArticlesPage from "./pages/ArticlesPage"
import ArticleNewPage from "./pages/ArticleNewPage"
import ArticleDetailPage from "./pages/ArticleDetailPage"
import ArticleEditPage from "./pages/ArticleEditPage"

import RequireAuth from "./components/RequireAuth"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ログイン画面 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ユーザー系 */}
        <Route
          path="/users/:id"
          element={
            <RequireAuth>
              <UserDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path="/users"
          element={
            <RequireAuth>
              <UsersPage />
            </RequireAuth>
          }
        />
        <Route path="/users/new" element={<UserNewPage />} />
        <Route
          path="/users/:id"
          element={
            <RequireAuth>
              <UserDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path="/users/:id/edit"
          element={
            <RequireAuth>
              <UserEditPage />
            </RequireAuth>
          }
        />

        {/* 記事系はログイン必須 */}
        <Route
          path="/articles"
          element={
            <RequireAuth>
              <ArticlesPage />
            </RequireAuth>
          }
        />

        <Route
          path="/articles/new"
          element={
            <RequireAuth>
              <ArticleNewPage />
            </RequireAuth>
          }
        />

        <Route
          path="/articles/:id"
          element={
            <RequireAuth>
              <ArticleDetailPage />
            </RequireAuth>
          }
        />

        <Route
          path="/articles/:id/edit"
          element={
            <RequireAuth>
              <ArticleEditPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}