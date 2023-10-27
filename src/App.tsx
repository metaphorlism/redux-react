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
