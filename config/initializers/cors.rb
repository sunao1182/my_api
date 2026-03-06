# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

# CORSの設定は、異なるドメイン（オリジン）からのAPIリクエストを許可するために使用されます。
# 例えば、ReactやVue.jsなどのフロントエンドアプリケーションがRails APIにアクセスする場合、CORSの設定が必要になります。
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  # ここで、どのオリジンからのリクエストを許可するかを指定します。
  allow do
    # フロントエンドのURLを指定（例: http://localhost:5173）
    origins 'http://localhost:5173'
    # どのHTTPメソッドを許可するかを指定します。ここでは、GET、POST、PUT、PATCH、DELETE、OPTIONS、HEADを許可しています。
    resource '*',
      # どのヘッダーを許可するかを指定します。ここでは、すべてのヘッダーを許可しています。
      headers: :any,
      # どのHTTPメソッドを許可するかを指定します。ここでは、GET、POST、PUT、PATCH、DELETE、OPTIONS、HEADを許可しています。
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
