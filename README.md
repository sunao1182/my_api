🚀 MyBoard

Rails API × React（TypeScript）で作成した掲示板アプリ

Rails API をバックエンド、React（TypeScript）をフロントエンドとして分離した構成で作成した、学習用かつ実務を意識した掲示板アプリです。

📖 アプリ概要

MyBoard は、Rails API と React（TypeScript） を組み合わせて作成した掲示板アプリです。

このアプリでは、役割を次のように分けています。

・Rails

データベースとのやり取りを行う

APIとしてJSONを返す

認証やデータ管理を担当する

・React

Rails APIから受け取ったデータを画面に表示する

フォーム入力や画面遷移を担当する

TypeScript

データの型を定義する

実装ミスを減らし、保守性を高める

Rails経験者が React を学ぶときに、
「Railsでいうとどの役割に近いのか」 を意識しながら理解できる教材になることを目指しました。

🎯 このアプリの目的

このアプリの主な目的は、次の3点です。

Rails API と React のつながりを理解する

React / TypeScript の基本構成に慣れる

実務で意識される責務分離を学ぶ

特に、Railsしか触ったことがない人がフロントエンドを学ぶ最初の教材 として使いやすい構成を意識しています。

👶 想定読者

このアプリは、特に次のような方を想定しています。

Ruby / Rails を学習したことがある方

Rails1年目エンジニア

React初学者

TypeScript未経験者

APIモードのRailsとフロントエンドの連携を理解したい方

🛠️ 使用技術
バックエンド

Ruby

Ruby on Rails

SQLite3

JWT認証

フロントエンド

React

TypeScript

Vite

React Router

その他

Git / GitHub

ESLint

✨ 主な機能
認証機能

ログイン機能

JWTを使った認証管理

認証が必要な画面へのアクセス制御

ユーザー機能

ユーザー一覧表示

ユーザー詳細表示

ユーザー作成

ユーザー編集

ユーザー削除

記事機能

記事一覧表示

記事詳細表示

記事作成

記事編集

記事削除

UI / 画面制御

ローディング表示

エラー表示

検索

ソート

ページネーション

🧠 Rails経験者向け：対応イメージ

React / TypeScript は Rails と完全に同じではありませんが、最初は次のように考えると理解しやすいです。

Rails	React / TypeScript
html.erb	tsx
partial	component
controllerで用意する表示用データ	hooks / page内の処理
routes.rb	App.tsx のルーティング
modelの属性イメージ	types/ の型定義
before_action的な初期処理の感覚	useEffect

完全な対応ではありませんが、Rails経験者が最初に全体像をつかむには有効な考え方です。

```md
## 🏗️ ディレクトリ構成

```text
my_api/
├─ app/
│  ├─ channels/
│  │  └─ application_cable/
│  │     ├─ channel.rb
│  │     └─ connection.rb
│  ├─ controllers/
│  │  ├─ api/
│  │  │  ├─ articles_controller.rb
│  │  │  ├─ auth_controller.rb
│  │  │  └─ users_controller.rb
│  │  ├─ concerns/
│  │  │  └─ json_web_token.rb
│  │  └─ application_controller.rb
│  ├─ models/
│  │  ├─ article.rb
│  │  └─ user.rb
│  └─ views/

├─ config/
├─ db/
│  ├─ migrate/
│  ├─ schema.rb
│  └─ seeds.rb

├─ my_front/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ pages/
│  │  ├─ services/
│  │  ├─ types/
│  │  ├─ App.tsx
│  │  └─ main.tsx
│  └─ package.json

└─ README.md

📂 重要フォルダの役割
Rails側
app/controllers/api/

React から送られてきたリクエストを受け取り、JSONを返す場所です。

articles_controller.rb
記事機能のAPIを担当します。

users_controller.rb
ユーザー機能のAPIを担当します。

auth_controller.rb
ログイン処理や認証関連のAPIを担当します。

app/controllers/concerns/json_web_token.rb

JWTトークンを発行・検証するための共通処理です。

app/models/

データベースとやり取りするモデルです。

article.rb

user.rb

config/routes.rb

APIのURLと、どのcontrollerにつなぐかを定義します。

db/schema.rb

現在のテーブル構成を確認できます。

React側
my_front/src/pages/

画面単位のファイルを置く場所です。

例：

ArticlesPage.tsx

ArticleDetailPage.tsx

ArticleNewPage.tsx

ArticleEditPage.tsx

UsersPage.tsx

UserDetailPage.tsx

UserNewPage.tsx

UserEditPage.tsx

LoginPage.tsx

Railsでいうと、1画面分の view に近い役割です。

my_front/src/components/

画面の中で使う部品を置く場所です。

例：

ArticleCard.tsx

ArticleForm.tsx

UserCard.tsx

UserForm.tsx

Header.tsx

Loading.tsx

ErrorMessage.tsx

RequireAuth.tsx

Railsでいう partial に近い役割です。

my_front/src/hooks/

画面で使うロジックをまとめる場所です。

例：

useArticles.ts

useArticle.ts

useUsers.ts

useUser.ts

useDebounce.ts

API取得、loading管理、error管理、検索条件の制御などをまとめます。

my_front/src/services/

Rails API と通信する処理を書く場所です。

例：

articleApi.ts

userApi.ts

authApi.ts

authStorage.ts

my_front/src/types/

TypeScript の型定義を書く場所です。

例：

article.ts

user.ts

my_front/src/App.tsx

フロントエンド側のルーティング定義をまとめる中心ファイルです。

my_front/src/main.tsx

Reactアプリの起点となるファイルです。

🔥 このアプリのデータの流れ

このアプリで最も大切なのは、次の流れです。

① Reactの画面が開く
        ↓
② hooks が API取得処理を呼ぶ
        ↓
③ services が Rails API にリクエストを送る
        ↓
④ Rails controller が JSON を返す
        ↓
⑤ React が state に保存する
        ↓
⑥ 画面に一覧や詳細が表示される

この流れを理解できると、Rails API × React の基本がかなり見えやすくなります。

🧭 おすすめの読み進め方

React初学者は、次の順番でコードを見ると理解しやすいです。

1. 画面を確認する

まずは pages/ を見て、どんな画面があるかを確認します。

おすすめ：

ArticlesPage.tsx

UsersPage.tsx

LoginPage.tsx

2. 画面の部品を見る

次に components/ を見て、画面のどの部分を分けているかを確認します。

おすすめ：

ArticleCard.tsx

UserCard.tsx

ArticleForm.tsx

UserForm.tsx

3. ロジックを見る

次に hooks/ を見て、データ取得や状態管理の流れを確認します。

おすすめ：

useArticles.ts

useUsers.ts

useArticle.ts

useUser.ts

4. API通信を見る

次に services/ を見て、どのURLへリクエストしているかを確認します。

おすすめ：

articleApi.ts

userApi.ts

authApi.ts

5. 最後にRailsを見る

最後に Rails 側の controller と routes を見て、フロントからの通信先を確認します。

おすすめ：

config/routes.rb

app/controllers/api/articles_controller.rb

app/controllers/api/users_controller.rb

app/controllers/api/auth_controller.rb

🧪 Reactコードの見方（Rails1年目向け）
pages/ は画面本体

pages/ では、画面全体の流れを組み立てます。

たとえば ArticlesPage.tsx では、

記事一覧を取得する

loadingなら読み込み中を表示する

errorならエラー表示を出す

正常なら記事一覧を表示する

といった流れを持ちます。

components/ は表示の部品

ArticleCard.tsx は記事1件を表示する部品、
UserForm.tsx はユーザー入力フォームの部品です。

部品に分けることで、コードが読みやすくなり、再利用しやすくなります。

hooks/ は画面用ロジック

useArticles.ts では、

記事一覧の取得

loading管理

error管理

のような処理をまとめます。

Railsでいう controller に少し近い考え方ですが、Reactでは再利用しやすいように hooks に分けることがあります。

services/ はAPIとの橋渡し

articleApi.ts や userApi.ts では、Rails APIへの通信を書きます。

React側から見ると、Railsへお願いを送る窓口のような役割です。

types/ はデータの設計図

TypeScriptでは、データの形を型として定義します。

たとえば article.ts で Article 型を定義しておくと、

id は数値

title は文字列

body は文字列

のように明確になります。

🧩 初学者がつまずきやすいポイント
propsとは

親コンポーネントから子コンポーネントへ渡す値です。
Railsでいうと、partial に locals を渡す感覚に近いです。

stateとは

画面が現在持っている値です。
値が変わると、Reactは画面を再描画します。

例：

記事一覧

フォーム入力値

ローディング状態

エラーメッセージ

useEffectとは

画面表示後に処理を実行したいときに使います。

例：

一覧画面を開いたらAPIを呼ぶ

URLのIDが変わったら再取得する

mapとは

配列を1件ずつ取り出して表示するときによく使います。

awaitとは

API通信などの非同期処理が終わるまで待つための書き方です。

🔐 認証機能の流れ

このアプリでは JWT を使った認証を実装しています。

関連ファイル
Rails側

app/controllers/api/auth_controller.rb

app/controllers/concerns/json_web_token.rb

React側

my_front/src/services/authApi.ts

my_front/src/services/authStorage.ts

my_front/src/components/RequireAuth.tsx

my_front/src/pages/LoginPage.tsx

ログインの流れ
① ログイン画面でメールアドレス・パスワードを入力
        ↓
② React が authApi.ts で Rails に送信
        ↓
③ Rails が認証成功なら JWT を返す
        ↓
④ React が token を保存する
        ↓
⑤ RequireAuth で未ログイン時のアクセスを制御する

この流れは、実務でもよく使われる基本構成です。

📘 最初に読むと理解しやすいファイル
フロント側

my_front/src/App.tsx

my_front/src/pages/ArticlesPage.tsx

my_front/src/components/ArticleCard.tsx

my_front/src/hooks/useArticles.ts

my_front/src/services/articleApi.ts

my_front/src/types/article.ts

次に読む

my_front/src/pages/UsersPage.tsx

my_front/src/components/UserCard.tsx

my_front/src/hooks/useUsers.ts

my_front/src/services/userApi.ts

my_front/src/types/user.ts

認証を読む

my_front/src/pages/LoginPage.tsx

my_front/src/components/RequireAuth.tsx

my_front/src/services/authApi.ts

my_front/src/services/authStorage.ts

Rails側

config/routes.rb

app/controllers/api/articles_controller.rb

app/controllers/api/users_controller.rb

app/controllers/api/auth_controller.rb

app/models/article.rb

app/models/user.rb

🚀 セットアップ手順
1. Rails API を起動
cd my_api
bundle install
bin/rails db:migrate
bin/rails db:seed
bin/rails s

Rails は通常、http://localhost:3000 で起動します。

2. React を起動
cd my_api/my_front
npm install
npm run dev

React は通常、http://localhost:5173 で起動します。

📡 APIの役割

このアプリでは、React が Rails API に対してリクエストを送る構成です。

主なAPIは次の通りです。

メソッド	パス	内容
GET	/api/articles	記事一覧取得
GET	/api/articles/:id	記事詳細取得
POST	/api/articles	記事作成
PUT / PATCH	/api/articles/:id	記事更新
DELETE	/api/articles/:id	記事削除
GET	/api/users	ユーザー一覧取得
GET	/api/users/:id	ユーザー詳細取得
POST	/api/users	ユーザー作成
PUT / PATCH	/api/users/:id	ユーザー更新
DELETE	/api/users/:id	ユーザー削除
POST	認証用エンドポイント	ログイン

認証エンドポイントの正確なパスは config/routes.rb を確認してください。

🎯 このアプリで学べること

Rails APIモードの基本

Reactの画面構成

componentによる部品分割

hooksによるロジック分離

servicesによるAPI通信の分離

TypeScriptの型定義

JWT認証の基本

検索 / ソート / ページネーションの考え方

ローディング / エラー処理の基本

💡 学習のコツ

React / TypeScript は、最初から全部理解しようとすると難しく感じやすいです。
そのため、次の意識で学ぶのがおすすめです。

まずは全体の流れをつかむ

1ファイルずつ役割を見る

Railsでいうと何に近いか考える

文法より先にデータの流れを追う

1回目で完璧を目指さない

特に大事なのは、

「どこでAPIを呼んで、どこで値を保存して、どこで表示しているか」

を追えるようになることです。

🔥 面談で説明しやすいポイント

このアプリを面談で説明するときは、次のように伝えると整理しやすいです。

1. どんなアプリか

Rails API と React を分離した掲示板アプリです。
ユーザー機能、記事機能、ログイン機能を実装しています。

2. 工夫した点

フロント側を pages / components / hooks / services / types に分けて、責務を整理しました。

3. 学習・設計上のポイント

Rails経験者でも理解しやすいように、画面、部品、ロジック、API通信を分離した構成にしています。

4. 技術的な見どころ

JWT認証、TypeScriptによる型定義、検索・ソート・ページネーションなど、実務を意識した実装を取り入れています。

🔚 まとめ

このアプリは、
Railsエンジニアが React / TypeScript / API連携 / JWT認証 を学ぶための教材兼ポートフォリオ として作成しました。

特にフロント側では、次の5つを意識するとコードが読みやすくなります。

pages = 画面

components = 部品

hooks = ロジック

services = API通信

types = 型

この役割分担を理解することで、React初学者でもコードを追いやすくなる構成を目指しています。