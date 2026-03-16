import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserCard from "../components/UserCard"
import useUsers from "../hooks/useUsers"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import { useDebounce } from "../hooks/useDebounce"
import { logout } from "../services/authStorage"

import "./UsersPage.css"

export default function UsersPage() {
  const { users, loading, error, handleDelete, loadUsers, sort, setSort, page, setPage } = useUsers()

  // 画面遷移用
  const navigate = useNavigate()

  // 入力中の検索語（手動/自動両方で使う）
  const [query, setQuery] = useState("")

  // デバウンスで遅延検索（自動検索用）
  const debouncedQuery = useDebounce(query, 5000) // 5秒待つ

  // Enterキー押下で手動検索
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPage(1)
      loadUsers(query) // 手動検索
    }
  }

  // 自動検索：入力後 5秒経ったら検索
  // これにより、ユーザーが検索入力を行った後、5秒間入力がない場合に自動的に検索が実行されます。
  // debouncedQueryが更新されると、loadUsers関数が呼び出され、ユーザーの一覧が更新されます。
  useEffect(() => {
    if (debouncedQuery !== "") {
      setPage(1)
      loadUsers(debouncedQuery)
    }
  }, [debouncedQuery, loadUsers, setPage])

  // ログアウト処理
  const handleLogout = () => {
    // localStorage に保存したログイン情報を削除する
    logout()

    // ログイン画面へ戻る
    navigate("/login")
  }

  // 2. 【ページやソートが切り替わった時】だけ、その条件で再取得
  useEffect(() => {
    // ここでは query ではなく、確定した debouncedQuery を使うのがポイントです
    loadUsers(debouncedQuery)
  
  // 警告を消すために、使っている変数をすべて配列に入れます
}, [page, sort, loadUsers, debouncedQuery]) 

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  return (
    <div>
      <h1>Users</h1>
      <Link to="/users/new">新規作成</Link>

      <div style={{ marginBottom: "16px" }}>
        <button onClick={handleLogout}>ログアウト</button>
      </div>

      {/* 検索 */}
      <div className="search-container">
        <input
          type="text"
          placeholder="名前で検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* 並び替え */}
      <div className="sort-container">
        <label>並び替え: </label>
        <select
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

      {/* ページネーション */}
      {/* 一覧 */}
      <ul className="users-list">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={() => handleDelete(user.id, query)}
          />
        ))}
      </ul>

      {/* ページネーション */}
      {users.length > 0 && (
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)}>前へ</button>
          <span>ページ: {page}</span>
          <button onClick={() => setPage(page + 1)}>次へ</button>
        </div>
      )}
    </div>
  )
}