// ユーザーの型を定義する
// ここでは、ユーザーはidとnameを持つと仮定しています。
export type User = {
  id: number
  name: string
  email: string
  password: string
  password_confirmation: string
}