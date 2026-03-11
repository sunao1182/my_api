import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import UserForm from "../components/UserForm"

// 1件用 hook
import useUser from "../hooks/useUser"

export default function UserNewPage() {
  const [name, setName] = useState("")
  const navigate = useNavigate()

  // ここで hook を呼ぶ
  const { handleCreate, loading, error } = useUser()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 新規作成
    const createdUser = await handleCreate(name)

    // 成功したら一覧へ戻る
    if (createdUser) {
      navigate("/")
    }
  }

  return (
    <div>
      <h1>User New</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <UserForm
        name={name}
        onChange={setName}
        onSubmit={handleSubmit}
        buttonText="作成"
      />

      <Link to="/">一覧へ戻る</Link>
    </div>
  )
}