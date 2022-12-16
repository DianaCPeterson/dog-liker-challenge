import { useState, useEffect, useMemo } from "react";
import DogDiv from "./DogDiv";
import "./App.css";

const DOG_URL = "https://dog.ceo/api/breeds/image/random/4";

// maps preserve order of insertion in JS
const DROPDOWN_VALUES = {
  "All Dogs": "all",
  "Good Dogs": "good",
  "OK Dogs": "ok",
};

function App() {
  // example of simple state, a count
  const [count, setCount] = useState(0);

  // example of complex state, an object
  const [dogs, setDogs] = useState({});

  // example of filter state logic
  const [filter, setFilter] = useState("all");

  // instead of an array of strings, i want dogs to be an object with:
  // {img_url: Boolean(true/false)}

  // using async/await instead of .then
  // const getDogs = async () => {
  //   const resp = await fetch(DOG_URL);
  //   const { message } = await resp.json();
  //   setDogs(message);
  //   console.log(dogs);
  // };

  useEffect(() => {
    fetch(DOG_URL)
      .then((resp) => resp.json())
      // object destructuring because we know the response has a key of message which is an array of dog img urls
      .then(({ message }) => {
        // create the initial state for dogs
        const dogTracker = {};
        // initialize each dog to false
        message.forEach((dog) => (dogTracker[dog] = false));
        // set state
        setDogs(dogTracker);
      })
      .catch((e) => console.error(e));
    // getDogs();
  }, []);

  const dogsToReturn = (dogs, filter) => {
    const dogArray = Object.keys(dogs);
    if (filter === "ok") {
      //return all dogs tracked as being ok or "false"
      return dogArray.filter((dog) => !dogs[dog]);
    } else if (filter === "good") {
      // return all dogs tracked as being good or "true"
      return dogArray.filter((dog) => dogs[dog]);
    } else {
      // if it's "all", the third option return all dogs
      return dogArray;
    }
  };

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
      <h2>Complex State Section</h2>
      <div>
        <br />
        {/* example of a drodown implementation */}
        <select
          onChange={(e) => {
            // onChange is used for a dropdown and the value is the value of the option selected
            setFilter(e.target.value);
          }}
        >
          {Object.keys(DROPDOWN_VALUES).map((key) => {
            return <option value={DROPDOWN_VALUES[key]}>{key}</option>;
          })}
        </select>
        <br />
        <br />
        {/* complex state example using the dogs state */}

        {/* we use Array.prototype.map because an array of JSX object is valid react code */}
        {/* we pass down both the isGoodBoy boolean and a callback function to change the boolean!*/}
        {/* we use a ternary to check whether all the currently filtered dogs have a length greater than 0 */}
        {/* a length > 0 is truthy and less than 0 is falsy! */}
        {dogsToReturn(dogs, filter).length ? (
          dogsToReturn(dogs, filter).map((dog) => {
            return (
              <DogDiv
                dog={dog}
                name="Rover"
                isGoodBoy={dogs[dog]}
                toggleGoodBoy={() => {
                  setDogs({ ...dogs, [dog]: !dogs[dog] });
                }}
              />
            );
          })
        ) : (
          <h2>No Dogs To Show ;(</h2>
        )}
      </div>
    </div>
  );
}

export default App;
