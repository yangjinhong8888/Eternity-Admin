import { type ChangeEvent, type FC, useState } from "react"
import {
  addByAmount,
  decrement,
  increment,
  incrementAsync,
  resetCounter,
  selectCount,
  selectCounterError,
  selectCounterLoading,
} from "@/store/redux/slices/counterSlice"
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks"

const Test: FC = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const loading = useAppSelector(selectCounterLoading)
  const error = useAppSelector(selectCounterError)
  const [amount, setAmount] = useState<number>(2)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value)
    setAmount(Number.isFinite(next) ? next : 0)
  }

  return (
    <section style={{ maxWidth: 520, margin: "24px auto", lineHeight: 1.8 }}>
      <h2>Redux Toolkit 示例</h2>
      <p>当前计数：{count}</p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" onClick={() => dispatch(decrement())}>
          -1
        </button>
        <button type="button" onClick={() => dispatch(increment())}>
          +1
        </button>
        <button type="button" onClick={() => dispatch(resetCounter())}>
          重置
        </button>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <label htmlFor="add-amount">步长：</label>
        <input
          id="add-amount"
          type="number"
          value={amount}
          onChange={handleChange}
        />
        <button type="button" onClick={() => dispatch(addByAmount(amount))}>
          按步长增加
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => dispatch(incrementAsync(amount))}
        >
          {loading ? "处理中..." : "异步增加"}
        </button>
      </div>

      {error ? <p style={{ color: "#c62828" }}>错误：{error}</p> : null}
    </section>
  )
}

export default Test
