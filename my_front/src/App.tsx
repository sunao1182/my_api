import { useEffect, useState } from "react"

// APIから返ってくるユーザーの形を定義
type User = {
  id: number
  name: string
}

export default function App() {
  // user情報を入れるstate
  // 最初はまだ何も取れていないので null
  // 例えば、APIからユーザー情報を取得する前は、userはまだ存在しないので、nullにしておきます。APIからデータが返ってきたら、そのデータをuserにセットします。
  const [user, setUser] = useState<User | null>(null)
  // 読み込み中かどうかを管理するstate
  // 初回表示ではAPI取得前なので true
  // 例えば、APIからデータを取得するのに時間がかかる場合や、ネットワークが遅い場合などは、ユーザーに「読み込み中」という状態を伝えるために、このloadingというstateを使います。
  const [loading, setLoading] = useState(true)
  // エラーメッセージを管理するstate
  // 最初はエラーがないので null
  // 例えば、APIからデータを取得する際に何らかの問題が発生した場合（APIサーバーが起動していない、URLが間違っている、ネットワークエラーなど）、そのエラーメッセージをユーザーに伝えるために、このerrorというstateを使います。
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // API取得処理を関数として定義
    // 例えば、fetchUserという関数を定義して、その中でAPIからユーザー情報を取得する処理を行います。
    // useEffectの中でこの関数を呼び出すことで、コンポーネントが初めてレンダリングされたときにAPIからデータを取得することができます。
    const fetchUser = async () => {
      // API通信開始
      try {
        // API取得開始時に loading を true にする
        // 例えば、APIからデータを取得する処理が始まったときに、ユーザーに「読み込み中」という状態を伝えるために、このloadingというstateをtrueにします。
        // APIからデータが返ってきたら、loadingをfalseにして、ユーザーに「読み込みが完了した」という状態を伝えます。
        setLoading(true)
        // 前回のエラーを消しておく
        // API取得開始時に error を null にする
        // 例えば、前回のAPI取得でエラーが起きていた場合、次にAPI取得を開始するときにエラーメッセージを消しておかないと、古いエラーメッセージが残ってしまうことがあります。
        setError(null)
        // Rails API にアクセスする。ここでは、IDが1のユーザーを取得する例です。
        const res = await fetch("http://localhost:3000/api/users/1")
        // HTTPステータスが200番台でなければエラーにする
        // 例えば、APIサーバーが起動していない場合や、URLが間違っている場合などは、ここでエラーになります。
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        // JSONをUser型として受け取る
        // 例えば、APIから返ってくるJSONが { id: 1, name: "テスト太郎" } のような形式であれば、そのデータをUser型として受け取ります。
        const data: User = await res.json()
        // 取得したユーザー情報を state にセット
        setUser(data)
      } catch (e) {
        // エラーが起きた場合はエラーメッセージを state にセット
        // 例えば、APIサーバーが起動していない場合や、URLが間違っている場合などは、ここでエラーになります。そのエラーメッセージをユーザーに伝えるために、このerrorというstateにセットします。
        setError(e instanceof Error ? e.message : "Unknown error")
        // ユーザー情報は取得できなかったので null にする
      } finally {
        // API通信終了
        // API取得が完了したら loading を false にする
        // 例えば、APIからデータが返ってきた場合や、エラーが発生した場合など、API取得の処理が完了したときに、ユーザーに「読み込みが完了した」という状態を伝えるために、このloadingというstateをfalseにします。
        setLoading(false)
      }
    }
    // コンポーネントが初めてレンダリングされたときに API からユーザー情報を取得する
    fetchUser()
  }, [])
  // 読み込み中なら Loading... を表示
  if (loading) return <p>Loading...</p>
  // エラーがあれば Error を表示
  if (error) return <p>Error: {error}</p>
  // user が取れなかったら User not found を表示
  if (!user) return <p>User not found</p>

  // ここまで来たら正常表示取得したユーザー情報を表示
  // 例えば、APIからユーザー情報が正常に取得できた場合は、そのユーザーのIDと名前を画面に表示します。
  return (
    <div>
      <h1>React × Rails API</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
    </div>
  )
}