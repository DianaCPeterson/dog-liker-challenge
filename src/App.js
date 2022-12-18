import { useState, useEffect, useMemo } from "react";
import DogDiv from "./DogDiv";
import "./App.css";

// extremely silly, ignore
console.dog = (message) => {
  console.log("woof woof arf");
  console.log(message);
};
const DOGS_URL = "http://localhost:3004/dogs";

function App() {
  // DELIVERABLE 1: dogs will be an array
  const [dogs, setDogs] = useState([]);

  // DELIVERABLE 3: example of filter state logic
  const [filter, setFilter] = useState("all");

  // DELIVERABLE 1: fetch the dogs and set them to state
  // use the useEffect hook for fetches on load!
  useEffect(() => {
    fetch(DOGS_URL)
      .then((resp) => resp.json())
      .then((data) => setDogs(data))
      .catch((e) => console.error(e));
    /* 
    use an empty array as the second argument to 
    useEffect to only run once-ish on load
    */
  }, []);

  // DELIVERABLE 3: Handle filtering for the dogs based on likes
  const dogsToReturn = (dogs, filter) => {
    if (filter === "liked") {
      //return all dogs with likes
      return dogs.filter((dog) => dog.likes > 0);
    } else {
      // if the filter says "all", return all dogs
      return dogs;
    }
  };

  // DELIVERABLE 3: BASIC
  // variable for the filtered dogs
  // comment out here and uncomment below to try that version!
  const filteredDogs = dogsToReturn(dogs, filter);

  /* 
  DELIVERABLE 3: BONUS
  useMemo is a good hook for filtered lists that 
  caches stateful stuff that you have to do a lot of logic on!
  */
  // uncomment below and comment out the other filteredDogs above to try!
  // const filteredDogs = useMemo(() => dogsToReturn(dogs, filter), [dogs, filter]);

  // DELIVERABLE 2: addLike, let's use linear search
  const addLike = (id, currentLikes) => {
    // increment likes
    const updatedLikes = currentLikes + 1;
    // we cant mutate state directly so let's make a copy of the array
    const copyOfDogs = [...dogs];
    // let's find the index of the dog we want to change
    const foundDogIndex = copyOfDogs.findIndex((dog) => dog.id === id);
    // let's change the value
    copyOfDogs[foundDogIndex].likes = updatedLikes;
    // let's update state
    setDogs(copyOfDogs);
  };

  return (
    <div className="App">
      <h2>Welcome to the Dog Liker!</h2>
      <div>
        <br />
        {/* example of a drodown implementation */}
        <select
          onChange={(e) => {
            /* 
            DELIVERABLE 3: onChange is used for a dropdown and the value is the value of the option selected
            the value of the dropdown should be the stateful value, i.e: filter!
             */
            setFilter(e.target.value);
          }}
          value={filter}
        >
          <option value="all">All Dogs</option>
          <option value="liked">Liked Dogs</option>
        </select>
        <br />
        <br />
        {/* we use Array.prototype.map because an array of JSX object is valid react code */}
        <div id="dogs">
          {/* DELIVERABLE 3: Check to see if there are any dogs to show */}
          {/* we use a ternary to check whether all the currently filtered dogs have a length greater than 0 */}
          {/* a length > 0 is truthy and less than 0 is falsy! */}
          {filteredDogs.length ? (
            filteredDogs.map((dog) => {
              return <DogDiv dog={dog} addLike={addLike} />;
            })
          ) : (
            <h2>No Dogs To Show ;(</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
