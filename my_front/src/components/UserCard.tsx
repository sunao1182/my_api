// UserCardコンポーネント
// ユーザの情報を表示するコンポーネント
import type { User } from "../types/user"

// propsの型
// これにより、UserCardコンポーネントがuserというプロパティを受け取ることが期待され、そのプロパティの型はUserであることが定義されます。
type Props = {
  // ユーザー情報
  user: User
}

// 子コンポーネント
// これにより、UserCardコンポーネントが定義され、親コンポーネントから渡されたユーザーデータを表示することができます。
export default function UserCard({ user }: Props) {

  return (
    <li>

      {/* 親から渡されたuser */}
      {user.id} : {user.name}

    </li>
  )

}