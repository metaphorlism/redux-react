# ReduxJS

We are using redux to manage your large state of data. The state can become more complex after 3-4 more states in one of the components. Sometimes we also want to pass state to the deep layer of components and now it becomes state drilling into each component on top of our target component. That is why using state management like redux helps you solve those problems.

Redux supports a lot of frameworks:
- NextJS
- VueJS
- Angular

Since I am familiar with React, I will show you how to use redux in our projects.

## Installation

Firstly first, we'll need [nodejs](https://nodejs.org/en) installed. After the node installation is completed, you can create a react project.

```bash
$ npm create vite@latest
```

Install redux-toolkit

```bash
$ npm install @reduxjs/toolkit
# For react
$ npm install react-redux
```

### Redux Store

After that, we can create the redux folder. We create `index.ts` in the folder.

```typescript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer, // This is from the next stage
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
```

### Redux Slice

We can create a new folder in the `redux` folder. The folder name will depend on the data you want to store.

We will create customer data.

```typescript
// redux/counter/counterSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state = initialState;
    },
    addByAmount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    deduceByAmount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, reset, addByAmount, deduceByAmount } =
  counterSlice.actions;
export default counterSlice.reducer;
```

After that add a counter reducer to store the reducer like the top.

### Redux Provider

Add a redux provider at the root so that we can use the data through the app.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### Hook

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./redux/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Usage

#### Get the state

```jsx
import "./App.css";
import { useAppSelector } from "./hooks";

function App() {
  const count = useAppSelector((state) => state.counter.value);

  return (
    <>
      <button>Increase</button>
      <div>{count}</div>
      <button>Decrease</button>
    </>
  );
}

export default App;
```

#### Manipulate the state

```jsx
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { decrement, increment } from "./redux/counter/counterSlice";

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <button onClick={() => dispatch(increment())}>Increase</button>
      <div>{count}</div>
      <button onClick={() => dispatch(decrement())}>Decrease</button>
    </>
  );
}

export default App;
```

## Source Code

- [GitHub](https://github.com/metaphorlism/redux-react)

## Bonus

- [Redux Development Tool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd): Debug tool for redux state and action
