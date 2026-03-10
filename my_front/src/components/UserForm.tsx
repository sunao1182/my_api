// ユーザーフォームコンポーネント

// Propsの型定義
// Propsとは、コンポーネントに渡されるデータのことです。ここでは、UserFormコンポーネントが受け取るpropsの型を定義しています。
type Props = {
  // nameは、ユーザーの名前を表す文字列です。
  name: string
  // onChangeは、ユーザーの名前が変更されたときに呼び出される関数で、変更された名前の値を引数として受け取ります。
  onChange: (value: string) => void
  // onSubmitは、フォームが送信されたときに呼び出される関数で、フォームの送信イベントを引数として受け取ります。
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  // buttonTextは、フォームの送信ボタンに表示されるテキストを表す文字列です。
  buttonText: string
}
// これにより、UserFormコンポーネントが受け取るpropsの型を定義しています。
export default function UserForm({
  // nameは、ユーザーの名前を表す文字列で、フォームの入力フィールドに表示されます。
  name,
  // onChangeは、ユーザーの名前が変更されたときに呼び出される関数で、変更された名前の値を引数として受け取ります。
  // これにより、フォームの入力フィールドの値が更新されます。
  onChange,
  // onSubmitは、フォームが送信されたときに呼び出される関数で、フォームの送信イベントを引数として受け取ります。
  onSubmit,
  // buttonTextは、フォームの送信ボタンに表示されるテキストを表す文字列です。
  buttonText
}: Props) {

  return (

    <form onSubmit={onSubmit}>

      <div>

        <label htmlFor="name">名前</label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => onChange(e.target.value)}
        />

      </div>

      <button type="submit">
        {buttonText}
      </button>

    </form>

  )

}