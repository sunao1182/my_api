画面で確認する場所

Reactサーバーを起動して

npm run dev

ブラウザで

http://localhost:5173

を開いてください。

### POST curlコマンド
#### 例：ユーザー
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"user":{"name":"山本一郎"}}'

### DELETE curlコマンド
curl -X DELETE http://localhost:3000/api/users/1

### プロジェクトのMVC対応
RailsとReactを比較するとこうなります。

|React|Rails|
|:------|:-----:|
|pages   |View   |
|components   |partial   |
|hooks   |Controller + Logic   |
|services   |外部API通信   |
|types   |Model定義   |

### useUsers.ts の役割

このファイルは、ユーザー一覧画面のロジックを全部まとめています。

つまり「UsersPage」 の脳みそ

です。

### 処理の流れ（超重要）

UsersPageから呼ばれます。

const { users, loadUsers } = useUsers()

すると

UsersPage
   ↓
useUsers
   ↓
userApi
   ↓
Rails API

になります。

### コードをRuby脳で解説
#### ① state
const [users, setUsers] = useState<User[]>([])

これはRailsで言う

@users

です。

#### ② loading
const [loading, setLoading] = useState(true)

画面の読み込み中制御です。

Railsだと

Ajaxのローディング

に近いです。

#### ③ 並び替え
const [sort, setSort] = useState<"id" | "name">("id")

これは

params[:sort]

です。

#### ④ ページ
const [page, setPage] = useState(1)

Railsだと

params[:page]

です。

### 一番重要な関数
#### loadUsers()
const loadUsers = useCallback(async (search: string) => {

これは

Railsで言う

def index

に近いです。

処理

API呼び出し
↓
users state更新

#### 中身
const data = await fetchUsers(search, sort, page, perPage)

ここで

Rails API
GET /api/users

を呼んでいます。

userApi.ts

・役割
HTTP通信

つまり

useUsers
   ↓
userApi

です。

### useStateとuseUsersの説明
useState = データ保管庫
useUsers = 処理のまとまり

Reactを完全理解する最重要図

コードをそのまま図にするとこれです。

UsersPage.tsx
   │
   │ useUsers()
   ▼
useUsers.ts
   │
   │ fetchUsers()
   ▼
userApi.ts
   │
   │ HTTP
   ▼
Rails API
   │
   ▼
DB


|:------|:-----:|
|useState   |データを保存   |
|useEffect   |画面が開いたときの処理   |
|useCallback   |関数をキャッシュ   |

## UsersとArticles
今の users 機能とほぼ同じです。

Users機能
Page → Hook → Service → Rails API → DB

Articles機能
Page → Hook → Service → Rails API → DB