画面で確認する場所

Reactサーバーを起動して

npm run dev

ブラウザで

http://localhost:5173

を開いてください。

# POST curlコマンド
# 例：ユーザー
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"user":{"name":"山本一郎"}}'