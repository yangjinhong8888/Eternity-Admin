import React from "react"
import { Provider, useDispatch, useSelector } from "react-redux"
import { configureStore, createSlice } from "@reduxjs/toolkit"

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
  },
})

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
})

function CounterExample() {
  const dispatch = useDispatch()
  const count = useSelector(state => state.counter.value)

  return (
    <div>
      <p>当前计数：{count}</p>
      <button
        type="button"
        onClick={() => dispatch(counterSlice.actions.decrement())}
      >
        -1
      </button>
      <button
        type="button"
        onClick={() => dispatch(counterSlice.actions.increment())}
      >
        +1
      </button>
    </div>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <CounterExample />
    </Provider>
  )
}
