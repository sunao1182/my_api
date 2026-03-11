// useDebounceは、指定された値が変更されたときに、一定の遅延時間が経過するまで新しい値を返さないカスタムフックです。これにより、例えばユーザーが入力フィールドに文字を入力している最中にAPIリクエストを送信するのを防ぐことができます。
import { useState, useEffect } from "react"

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}