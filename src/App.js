import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterState } from "./redux/filterSlice";
import { dogsState, fetchNumDogs } from "./redux/dogsSlice";
import "./App.css";
import DogsContainer from "./components/DogsContainer";
import Signup from "./components/Signup";

function App() {
  // example of simple state, a count
  const [count, setCount] = useState(0);

  // to access a piece of state from the redux store, we use the `useSelector` hook
  const dogs = useSelector(dogsState);
  const filter = useSelector(filterState);

  // to dispatch an action to Redux, we need to use the `useDispatch` hook
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch num dogs get us whatever dogs we need
    dispatch(fetchNumDogs(4));
  }, [dispatch]);

  const getCurrentDogs = (dogs, filter) => {
    if (filter === "ok") {
      //return all dogs tracked as being ok or "false"
      return dogs.filter((dog) => !dog.isGoodBoy);
    } else if (filter === "good") {
      // return all dogs tracked as being good or "true"
      return dogs.filter((dog) => dog.isGoodBoy);
    } else {
      // if it's "all", the third option return all dogs
      return dogs;
    }
  };

  // useMemo is a good way of caching to make sure we don't have to recalculate who's in our array!
  // the array depdency is like useEffect, says recaculate this whenever our dog or filter state changes
  const currentDogs = useMemo(
    () => getCurrentDogs(dogs, filter),
    [dogs, filter]
  );

  return (
    <div className="App">
      <h1>This is React</h1>
      {/* simple state example with a counter*/}
      <h2>Simple State Section</h2>
      <h3>
        The count is: <span>{count}</span>
      </h3>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click to Increment
      </button>
      <br />
      <h2>Complex State Section: Featuring Redux!</h2>
      <DogsContainer dogs={currentDogs} />
      <Signup />
      <br />
      <br />
    </div>
  );
}

export default App;
