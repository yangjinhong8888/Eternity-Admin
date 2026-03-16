import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit"
import type { RootState } from "@/store/redux/store"

interface CounterState {
  value: number
  loading: boolean
  error: string | null
}

const initialState: CounterState = {
  value: 0,
  loading: false,
  error: null,
}

export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount: number = 1) => {
    await new Promise(resolve => setTimeout(resolve, 600))
    return amount
  }
)

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    addByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    resetCounter: state => {
      state.value = 0
      state.loading = false
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(incrementAsync.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.loading = false
        state.value += action.payload
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "异步计数失败"
      })
  },
})

export const { increment, decrement, addByAmount, resetCounter } =
  counterSlice.actions

const selectCounterState = (state: RootState) => state.counter

export const selectCount = createSelector(
  [selectCounterState],
  counter => counter.value
)
export const selectCounterLoading = createSelector(
  [selectCounterState],
  counter => counter.loading
)
export const selectCounterError = createSelector(
  [selectCounterState],
  counter => counter.error
)

export default counterSlice.reducer
