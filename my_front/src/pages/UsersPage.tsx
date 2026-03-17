import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import UserCard from "../components/UserCard"
import Header from "../components/Header"
import useUsers from "../hooks/useUsers"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import { useDebounce } from "../hooks/useDebounce"

import "./UsersPage.css"

export default function UsersPage() {
  const { users, loading, error, handleDelete, loadUsers, sort, setSort, page, setPage } = useUsers()

  const [query, setQuery] = useState("")

  // デバウンス時間を 500ms（0.5秒）に調整してサクサク動くようにします
  const debouncedQuery = useDebounce(query, 5000)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPage(1)
      loadUsers(query)
    }
  }

  // 自動検索：入力後、少し待ってから検索を実行
  useEffect(() => {
    if (debouncedQuery !== "") {
      setPage(1)
      loadUsers(debouncedQuery)
    }
  }, [debouncedQuery, loadUsers, setPage])

  // ページ、ソート、確定したクエリが変わった時に再取得
  useEffect(() => {
    loadUsers(debouncedQuery)
  }, [page, sort, loadUsers, debouncedQuery]) 

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="users-page-container">
      <Header />
      
      <div className="page-header">
        <h1>Users</h1>
        <Link to="/users/new" className="btn-new">新規作成</Link>
      </div>

      {/* 検索・ソートをまとめるエリア */}
      <div className="controls-section">
        <div className="search-sort-column">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="名前で検索"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="sort-container">
            <label>並び替え: </label>
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as "id" | "name")
                setPage(1)
              }}
            >
              <option value="id">ID順</option>
              <option value="name">名前順</option>
            </select>
          </div>
        </div>
      </div>

      {/* ユーザー一覧 */}
      <ul className="users-list">
        {users.length === 0 ? (
          <p className="no-data">ユーザーが見つかりませんでした。</p>
        ) : (
          users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={() => handleDelete(user.id, query)}
            />
          ))
        )}
      </ul>

      {/* ページネーション */}
      {users.length > 0 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            disabled={page <= 1} 
            onClick={() => setPage(page - 1)}
          >
            前へ
          </button>
          <span className="page-info">ページ: {page}</span>
          <button 
            className="pagination-btn"
            onClick={() => setPage(page + 1)}
          >
            次へ
          </button>
        </div>
      )}
    </div>
  )
}
